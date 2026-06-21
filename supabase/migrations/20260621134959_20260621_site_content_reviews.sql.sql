
-- site_content (key/value JSON store)
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins insert site_content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update site_content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete site_content" ON public.site_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  phone TEXT,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body TEXT NOT NULL,
  visit_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_reply TEXT,
  reply_draft TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anon read approved reviews" ON public.reviews FOR SELECT TO anon USING (status = 'approved');
CREATE POLICY "Admins read all reviews" ON public.reviews FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can submit a review" ON public.reviews FOR INSERT WITH CHECK (status = 'pending' AND admin_reply IS NULL);
CREATE POLICY "Admins update reviews" ON public.reviews FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete reviews" ON public.reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
DROP TRIGGER IF EXISTS site_content_touch ON public.site_content;
CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
DROP TRIGGER IF EXISTS reviews_touch ON public.reviews;
CREATE TRIGGER reviews_touch BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Auto-draft reply trigger
CREATE OR REPLACE FUNCTION public.reviews_autodraft()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE v_phone TEXT; v_glink TEXT;
BEGIN
  SELECT value->>'primary' INTO v_phone FROM public.site_content WHERE key = 'contact_phones' LIMIT 1;
  IF v_phone IS NULL THEN v_phone := '+91 93257 69599'; END IF;
  SELECT value->>'google_review_link' INTO v_glink FROM public.site_content WHERE key = 'reviews_settings' LIMIT 1;
  IF v_glink IS NULL THEN v_glink := 'https://g.page/r/CarLiO9V0KfzEBM/review'; END IF;
  IF NEW.rating <= 3 THEN
    NEW.reply_draft := 'Dear ' || NEW.patient_name || ', thank you for sharing your experience. We sincerely apologize if your visit did not meet your expectations. We take all feedback seriously and would like to understand your concern better. Please contact us at ' || v_phone || ' so we can resolve this personally.';
  ELSE
    NEW.reply_draft := 'Dear ' || NEW.patient_name || ', thank you so much for your kind words! We are delighted you had a positive experience at Jain ENT Hospital. We would be grateful if you could share your experience on Google too — it helps other patients find us: ' || v_glink || '. Thank you for trusting Prof. Dr. Devendra M. Jain.';
  END IF;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS reviews_autodraft_trg ON public.reviews;
CREATE TRIGGER reviews_autodraft_trg BEFORE INSERT ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.reviews_autodraft();

-- extend blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- extend gallery
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;

-- realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
