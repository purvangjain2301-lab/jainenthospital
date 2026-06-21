-- Payment verification functions
CREATE OR REPLACE FUNCTION public.mark_payment_pending_verification(_id uuid, _method text DEFAULT NULL, _reference text DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF _method IS NOT NULL AND _method NOT IN ('online','cash') THEN RAISE EXCEPTION 'Invalid payment method'; END IF;
  UPDATE public.appointments
     SET payment_status = 'pending_verification',
         payment_method = COALESCE(_method, payment_method),
         payment_reference = COALESCE(NULLIF(btrim(_reference), ''), payment_reference),
         payment_submitted_at = COALESCE(payment_submitted_at, now()),
         payment_rejected_at = NULL,
         payment_rejection_reason = NULL
   WHERE id = _id AND user_id = auth.uid() AND payment_status IN ('unpaid','rejected','pending_verification');
END;
$$;
GRANT EXECUTE ON FUNCTION public.mark_payment_pending_verification(uuid, text, text) TO authenticated, anon;

CREATE OR REPLACE FUNCTION public.admin_verify_payment(_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_appt public.appointments%ROWTYPE;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  SELECT * INTO v_appt FROM public.appointments WHERE id = _id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Appointment not found'; END IF;
  IF v_appt.payment_status = 'verified' THEN RAISE EXCEPTION 'This payment is already verified.'; END IF;
  IF v_appt.payment_status <> 'pending_verification' THEN RAISE EXCEPTION 'Only pending payments can be verified.'; END IF;
  IF v_appt.payment_method IS NULL OR v_appt.payment_reference IS NULL OR length(btrim(v_appt.payment_reference)) < 3 THEN
    RAISE EXCEPTION 'Cannot verify: transaction / payment details are missing.';
  END IF;
  UPDATE public.appointments
     SET payment_status = 'verified', payment_verified_at = now(), payment_verified_by = auth.uid(),
         payment_rejected_at = NULL, payment_rejection_reason = NULL
   WHERE id = _id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.admin_verify_payment(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_reject_payment(_id uuid, _reason text)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_appt public.appointments%ROWTYPE;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  IF _reason IS NULL OR length(btrim(_reason)) < 3 THEN RAISE EXCEPTION 'A rejection reason (min 3 chars) is required.'; END IF;
  SELECT * INTO v_appt FROM public.appointments WHERE id = _id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Appointment not found'; END IF;
  IF v_appt.payment_status = 'verified' THEN RAISE EXCEPTION 'A verified payment cannot be rejected.'; END IF;
  UPDATE public.appointments
     SET payment_status = 'rejected', payment_rejected_at = now(), payment_rejection_reason = btrim(_reason),
         payment_verified_at = NULL, payment_verified_by = NULL
   WHERE id = _id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.admin_reject_payment(uuid, text) TO authenticated;