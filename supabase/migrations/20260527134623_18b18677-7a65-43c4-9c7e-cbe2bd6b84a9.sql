
-- 1) Appointments INSERT: bind user_id
DROP POLICY IF EXISTS "Anyone can request appointment" ON public.appointments;
CREATE POLICY "Anyone can request appointment"
  ON public.appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (user_id IS NULL OR user_id = auth.uid())
    AND length(btrim(name)) BETWEEN 1 AND 200
    AND length(btrim(phone)) BETWEEN 1 AND 30
    AND length(btrim(concern)) BETWEEN 1 AND 5000
  );

-- 2) Replace permissive patient UPDATE with a SECURITY DEFINER cancel function
DROP POLICY IF EXISTS "Patient cancels own appointment" ON public.appointments;

CREATE OR REPLACE FUNCTION public.cancel_my_appointment(_id uuid)
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
     SET status = 'cancelled'
   WHERE id = _id
     AND user_id = auth.uid()
     AND status <> 'cancelled';
END;
$$;

REVOKE ALL ON FUNCTION public.cancel_my_appointment(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cancel_my_appointment(uuid) TO authenticated;

-- 3) Contact messages: replace WITH CHECK true with input limits
DROP POLICY IF EXISTS "Anyone can send message" ON public.contact_messages;
CREATE POLICY "Anyone can send message"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 200
    AND length(btrim(message)) BETWEEN 1 AND 5000
    AND (phone IS NULL OR length(phone) <= 30)
    AND (email IS NULL OR length(email) <= 255)
  );

-- 4) Remove broad SELECT/listing policy on public media bucket.
-- Public buckets still serve files via direct URL without a SELECT policy.
DROP POLICY IF EXISTS "Public reads media" ON storage.objects;
