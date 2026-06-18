
-- Reschedule for signed-in patient
CREATE OR REPLACE FUNCTION public.reschedule_my_appointment(_id uuid, _new_date date, _new_slot text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_blocked boolean := false;
  v_new_token int;
  v_owner uuid;
  v_status text;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF _new_date < (now() AT TIME ZONE 'Asia/Kolkata')::date THEN
    RAISE EXCEPTION 'Cannot reschedule to a past date.';
  END IF;
  IF _new_slot IS NULL OR length(btrim(_new_slot)) = 0 THEN
    RAISE EXCEPTION 'Please pick a new slot.';
  END IF;

  SELECT user_id, status INTO v_owner, v_status
  FROM public.appointments WHERE id = _id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Appointment not found'; END IF;
  IF v_owner IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'You can only reschedule your own appointment.';
  END IF;
  IF v_status = 'cancelled' THEN
    RAISE EXCEPTION 'Cancelled appointments cannot be rescheduled.';
  END IF;

  SELECT is_blocked INTO v_blocked
  FROM public.slots WHERE date = _new_date AND time_label = _new_slot LIMIT 1;
  IF v_blocked THEN
    RAISE EXCEPTION 'This slot is blocked. Please pick another slot.';
  END IF;

  SELECT COALESCE(MAX(token_number), 0) + 1 INTO v_new_token
  FROM public.appointments WHERE date = _new_date AND slot = _new_slot;

  UPDATE public.appointments
     SET date = _new_date,
         slot = _new_slot,
         token_number = v_new_token,
         status = CASE WHEN status IN ('cancelled') THEN status ELSE 'pending' END
   WHERE id = _id;

  RETURN v_new_token;
END;
$$;

-- Reschedule for non-logged-in patient (phone/email match)
CREATE OR REPLACE FUNCTION public.reschedule_appointment_by_contact(_id uuid, _contact text, _new_date date, _new_slot text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_blocked boolean := false;
  v_new_token int;
  v_match boolean;
BEGIN
  IF _contact IS NULL OR length(btrim(_contact)) < 3 THEN
    RAISE EXCEPTION 'Contact required';
  END IF;
  IF _new_date < (now() AT TIME ZONE 'Asia/Kolkata')::date THEN
    RAISE EXCEPTION 'Cannot reschedule to a past date.';
  END IF;
  IF _new_slot IS NULL OR length(btrim(_new_slot)) = 0 THEN
    RAISE EXCEPTION 'Please pick a new slot.';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.appointments
    WHERE id = _id
      AND status <> 'cancelled'
      AND (phone ILIKE btrim(_contact) OR (email IS NOT NULL AND email ILIKE btrim(_contact)))
  ) INTO v_match;
  IF NOT v_match THEN
    RAISE EXCEPTION 'Appointment not found for that contact.';
  END IF;

  PERFORM 1 FROM public.appointments WHERE id = _id FOR UPDATE;

  SELECT is_blocked INTO v_blocked
  FROM public.slots WHERE date = _new_date AND time_label = _new_slot LIMIT 1;
  IF v_blocked THEN
    RAISE EXCEPTION 'This slot is blocked. Please pick another slot.';
  END IF;

  SELECT COALESCE(MAX(token_number), 0) + 1 INTO v_new_token
  FROM public.appointments WHERE date = _new_date AND slot = _new_slot;

  UPDATE public.appointments
     SET date = _new_date,
         slot = _new_slot,
         token_number = v_new_token,
         status = CASE WHEN status IN ('cancelled') THEN status ELSE 'pending' END
   WHERE id = _id;

  RETURN v_new_token;
END;
$$;

GRANT EXECUTE ON FUNCTION public.reschedule_my_appointment(uuid, date, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reschedule_appointment_by_contact(uuid, text, date, text) TO anon, authenticated;
