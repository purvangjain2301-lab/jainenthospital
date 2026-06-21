
-- Add missing columns to appointments
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS token_number INT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_method TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_reference TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_submitted_at TIMESTAMPTZ;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMPTZ;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_rejected_at TIMESTAMPTZ;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_rejection_reason TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_verified_by UUID;

-- Slots table
CREATE TABLE IF NOT EXISTS public.slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time_label TEXT NOT NULL,
  max_capacity INT NOT NULL DEFAULT 1000,
  is_blocked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (date, time_label)
);
ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads slots" ON public.slots FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin writes slots" ON public.slots FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Patient policy for appointments
DROP POLICY IF EXISTS "Patient reads own appointments" ON public.appointments;
CREATE POLICY "Patient reads own appointments" ON public.appointments FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Token allocation function (no capacity limit, just blocked check)
CREATE OR REPLACE FUNCTION public.allocate_token(_date date, _slot text)
RETURNS int
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_blocked boolean := false;
  v_next int;
BEGIN
  IF _date < (now() AT TIME ZONE 'Asia/Kolkata')::date THEN
    RAISE EXCEPTION 'Bookings for past dates are not allowed.';
  END IF;
  PERFORM 1 FROM public.appointments WHERE date = _date AND slot = _slot AND status <> 'cancelled' FOR UPDATE;
  SELECT is_blocked INTO v_blocked FROM public.slots WHERE date = _date AND time_label = _slot LIMIT 1;
  IF v_blocked THEN RAISE EXCEPTION 'This slot is blocked. Please pick another slot.'; END IF;
  SELECT COALESCE(MAX(token_number), 0) + 1 INTO v_next FROM public.appointments WHERE date = _date AND slot = _slot;
  RETURN v_next;
END;
$$;
GRANT EXECUTE ON FUNCTION public.allocate_token(date, text) TO anon, authenticated;

-- Find appointments by contact
CREATE OR REPLACE FUNCTION public.find_appointments_by_contact(_contact text)
RETURNS SETOF public.appointments
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT * FROM public.appointments
  WHERE _contact IS NOT NULL AND length(btrim(_contact)) >= 3
    AND (phone ILIKE btrim(_contact) OR (email IS NOT NULL AND email ILIKE btrim(_contact)))
  ORDER BY date DESC, created_at DESC
$$;
GRANT EXECUTE ON FUNCTION public.find_appointments_by_contact(text) TO anon, authenticated;

-- Cancel by contact
CREATE OR REPLACE FUNCTION public.cancel_appointment_by_contact(_id uuid, _contact text)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF _contact IS NULL OR length(btrim(_contact)) < 3 THEN RAISE EXCEPTION 'Contact required'; END IF;
  UPDATE public.appointments SET status = 'cancelled'
   WHERE id = _id AND status <> 'cancelled'
     AND (phone ILIKE btrim(_contact) OR (email IS NOT NULL AND email ILIKE btrim(_contact)));
END;
$$;
GRANT EXECUTE ON FUNCTION public.cancel_appointment_by_contact(uuid, text) TO anon, authenticated;

-- Cancel own appointment (authenticated)
CREATE OR REPLACE FUNCTION public.cancel_my_appointment(_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  UPDATE public.appointments SET status = 'cancelled'
   WHERE id = _id AND user_id = auth.uid() AND status <> 'cancelled';
END;
$$;
REVOKE ALL ON FUNCTION public.cancel_my_appointment(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cancel_my_appointment(uuid) TO authenticated;

-- Bootstrap first admin
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'admin');
  END IF;
  RETURN new;
END;
$$;
DROP TRIGGER IF EXISTS on_auth_user_created_bootstrap_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_bootstrap_admin AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin() FROM public, anon, authenticated;

-- Reschedule functions
CREATE OR REPLACE FUNCTION public.reschedule_my_appointment(_id uuid, _new_date date, _new_slot text)
RETURNS int
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_blocked boolean := false; v_new_token int; v_owner uuid; v_status text;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF _new_date < (now() AT TIME ZONE 'Asia/Kolkata')::date THEN RAISE EXCEPTION 'Cannot reschedule to a past date.'; END IF;
  IF _new_slot IS NULL OR length(btrim(_new_slot)) = 0 THEN RAISE EXCEPTION 'Please pick a new slot.'; END IF;
  SELECT user_id, status INTO v_owner, v_status FROM public.appointments WHERE id = _id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Appointment not found'; END IF;
  IF v_owner IS DISTINCT FROM auth.uid() THEN RAISE EXCEPTION 'You can only reschedule your own appointment.'; END IF;
  IF v_status = 'cancelled' THEN RAISE EXCEPTION 'Cancelled appointments cannot be rescheduled.'; END IF;
  SELECT is_blocked INTO v_blocked FROM public.slots WHERE date = _new_date AND time_label = _new_slot LIMIT 1;
  IF v_blocked THEN RAISE EXCEPTION 'This slot is blocked. Please pick another slot.'; END IF;
  SELECT COALESCE(MAX(token_number), 0) + 1 INTO v_new_token FROM public.appointments WHERE date = _new_date AND slot = _new_slot;
  UPDATE public.appointments SET date = _new_date, slot = _new_slot, token_number = v_new_token WHERE id = _id;
  RETURN v_new_token;
END;
$$;
GRANT EXECUTE ON FUNCTION public.reschedule_my_appointment(uuid, date, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.reschedule_appointment_by_contact(_id uuid, _contact text, _new_date date, _new_slot text)
RETURNS int
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE v_blocked boolean := false; v_new_token int; v_match boolean;
BEGIN
  IF _contact IS NULL OR length(btrim(_contact)) < 3 THEN RAISE EXCEPTION 'Contact required'; END IF;
  IF _new_date < (now() AT TIME ZONE 'Asia/Kolkata')::date THEN RAISE EXCEPTION 'Cannot reschedule to a past date.'; END IF;
  IF _new_slot IS NULL OR length(btrim(_new_slot)) = 0 THEN RAISE EXCEPTION 'Please pick a new slot.'; END IF;
  SELECT EXISTS (SELECT 1 FROM public.appointments WHERE id = _id AND status <> 'cancelled'
    AND (phone ILIKE btrim(_contact) OR (email IS NOT NULL AND email ILIKE btrim(_contact)))) INTO v_match;
  IF NOT v_match THEN RAISE EXCEPTION 'Appointment not found for that contact.'; END IF;
  PERFORM 1 FROM public.appointments WHERE id = _id FOR UPDATE;
  SELECT is_blocked INTO v_blocked FROM public.slots WHERE date = _new_date AND time_label = _new_slot LIMIT 1;
  IF v_blocked THEN RAISE EXCEPTION 'This slot is blocked. Please pick another slot.'; END IF;
  SELECT COALESCE(MAX(token_number), 0) + 1 INTO v_new_token FROM public.appointments WHERE date = _new_date AND slot = _new_slot;
  UPDATE public.appointments SET date = _new_date, slot = _new_slot, token_number = v_new_token WHERE id = _id;
  RETURN v_new_token;
END;
$$;
GRANT EXECUTE ON FUNCTION public.reschedule_appointment_by_contact(uuid, text, date, text) TO anon, authenticated;
