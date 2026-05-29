
-- Look up appointments by phone OR email (case-insensitive). SECURITY DEFINER so anon can use it without exposing the whole table via RLS.
CREATE OR REPLACE FUNCTION public.find_appointments_by_contact(_contact text)
RETURNS SETOF public.appointments
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.appointments
  WHERE _contact IS NOT NULL
    AND length(btrim(_contact)) >= 3
    AND (
      phone ILIKE btrim(_contact)
      OR (email IS NOT NULL AND email ILIKE btrim(_contact))
    )
  ORDER BY date DESC, created_at DESC
$$;

GRANT EXECUTE ON FUNCTION public.find_appointments_by_contact(text) TO anon, authenticated;

-- Cancel by id + matching contact (phone or email used at booking).
CREATE OR REPLACE FUNCTION public.cancel_appointment_by_contact(_id uuid, _contact text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _contact IS NULL OR length(btrim(_contact)) < 3 THEN
    RAISE EXCEPTION 'Contact required';
  END IF;
  UPDATE public.appointments
     SET status = 'cancelled'
   WHERE id = _id
     AND status <> 'cancelled'
     AND (
       phone ILIKE btrim(_contact)
       OR (email IS NOT NULL AND email ILIKE btrim(_contact))
     );
END;
$$;

GRANT EXECUTE ON FUNCTION public.cancel_appointment_by_contact(uuid, text) TO anon, authenticated;
