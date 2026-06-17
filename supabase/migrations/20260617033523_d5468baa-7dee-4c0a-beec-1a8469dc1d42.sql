
-- 1. Remove capacity cap entirely (admins can still block individual slots)
CREATE OR REPLACE FUNCTION public.allocate_token(_date date, _slot text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_blocked BOOLEAN := FALSE;
  v_next INT;
BEGIN
  IF _date < (now() AT TIME ZONE 'Asia/Kolkata')::date THEN
    RAISE EXCEPTION 'Bookings for past dates are not allowed.';
  END IF;

  PERFORM 1 FROM public.appointments
    WHERE date = _date AND slot = _slot AND status <> 'cancelled'
    FOR UPDATE;

  SELECT is_blocked INTO v_blocked
    FROM public.slots
    WHERE date = _date AND time_label = _slot
    LIMIT 1;

  IF v_blocked THEN
    RAISE EXCEPTION 'This slot is blocked. Please pick another slot.';
  END IF;

  SELECT COALESCE(MAX(token_number), 0) + 1
    INTO v_next
    FROM public.appointments
    WHERE date = _date AND slot = _slot;

  RETURN v_next;
END;
$function$;

-- 2. Hide phone numbers from public reviews
DROP POLICY IF EXISTS "Public read approved reviews" ON public.reviews;

CREATE POLICY "Anon read approved reviews"
ON public.reviews FOR SELECT
TO anon
USING (status = 'approved');

REVOKE SELECT ON public.reviews FROM anon;
GRANT SELECT (id, patient_name, rating, body, visit_date, admin_reply, reply_draft, status, created_at, updated_at)
  ON public.reviews TO anon;
