
CREATE OR REPLACE FUNCTION public.mark_payment_pending_verification(_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  UPDATE public.appointments
     SET payment_status = 'pending_verification'
   WHERE id = _id
     AND user_id = auth.uid()
     AND payment_status = 'unpaid';
END;
$$;

REVOKE ALL ON FUNCTION public.mark_payment_pending_verification(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_payment_pending_verification(uuid) TO anon, authenticated;
