-- Update appointments INSERT policy with validation
DROP POLICY IF EXISTS "Anyone can request appointment" ON public.appointments;
CREATE POLICY "Anyone can request appointment" ON public.appointments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (user_id IS NULL OR user_id = auth.uid())
    AND length(btrim(name)) BETWEEN 1 AND 200
    AND length(btrim(phone)) BETWEEN 1 AND 30
    AND length(btrim(concern)) BETWEEN 1 AND 5000
  );

-- Update contact messages INSERT policy with validation
DROP POLICY IF EXISTS "Anyone can send message" ON public.contact_messages;
CREATE POLICY "Anyone can send message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 200
    AND length(btrim(message)) BETWEEN 1 AND 5000
    AND (phone IS NULL OR length(phone) <= 30)
    AND (email IS NULL OR length(email) <= 255)
  );

-- Storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "Public reads media" ON storage.objects;
CREATE POLICY "Public reads media" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'media');
DROP POLICY IF EXISTS "Admin uploads media" ON storage.objects;
CREATE POLICY "Admin uploads media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admin updates media" ON storage.objects;
CREATE POLICY "Admin updates media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admin deletes media" ON storage.objects;
CREATE POLICY "Admin deletes media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));