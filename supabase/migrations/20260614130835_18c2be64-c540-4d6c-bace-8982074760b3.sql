
-- ─── site_content (key/value JSON store) ───────────────────────────────
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

-- ─── reviews ───────────────────────────────────────────────────────────
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

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can read approved only; admins see all
CREATE POLICY "Public read approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Admins read all reviews" ON public.reviews FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can submit a review" ON public.reviews FOR INSERT WITH CHECK (
  status = 'pending' AND admin_reply IS NULL
);
CREATE POLICY "Admins update reviews" ON public.reviews FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete reviews" ON public.reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS site_content_touch ON public.site_content;
CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS reviews_touch ON public.reviews;
CREATE TRIGGER reviews_touch BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Auto-draft reply trigger
CREATE OR REPLACE FUNCTION public.reviews_autodraft()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  v_phone TEXT;
  v_glink TEXT;
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
CREATE TRIGGER reviews_autodraft_trg BEFORE INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.reviews_autodraft();

-- ─── extend blog_posts ─────────────────────────────────────────────────
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image TEXT,
  ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- ─── extend gallery ────────────────────────────────────────────────────
ALTER TABLE public.gallery
  ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;

-- ─── realtime ──────────────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;

-- ─── SEED site_content with current hardcoded values ───────────────────
INSERT INTO public.site_content (key, value) VALUES
  ('hero', jsonb_build_object(
    'eyebrow', 'Jain ENT Hospital · Deesa, Gujarat',
    'title', 'Advanced ENT, Face Surgery & Head-Neck Cancer Care',
    'subtitle', 'Prof. Dr. Devendra M. Jain — ENT & Head Neck Surgeon with Cancer Care. 18+ years of experience. Patients welcomed from across India and worldwide via telemedicine.',
    'cta_primary_label', 'Book Appointment',
    'cta_primary_href', '/book',
    'cta_secondary_label', 'Telemedicine',
    'cta_secondary_href', '/telemedicine'
  )),
  ('doctor', jsonb_build_object(
    'name', 'Prof. Dr. Devendra M. Jain',
    'short', 'Dr. Devendra Jain',
    'creds', 'MBBS, MS (ENT)',
    'title', 'ENT & Head Neck Surgeon with Cancer Care',
    'experience', '18+ years of experience',
    'teaching', '15+ years of experience as a Teaching Professor',
    'bio', 'Senior ENT Specialist with 18+ years of experience in clinical and surgical practice, including 15+ years of experience as a Teaching Professor. Ex-BJ Medical College, Pune. Specializes in advanced ear, nose, throat, face surgery (cosmetic & reconstructive), head-neck and cancer care. Welcomes patients from across India and worldwide via telemedicine.'
  )),
  ('address', jsonb_build_object(
    'line1', 'First Floor, Iskcon Pride',
    'line2', 'Opp. JIO Petrol Pump, Deesa Highway',
    'city', 'Deesa', 'state', 'Gujarat', 'pin', '385535', 'country', 'India'
  )),
  ('contact_phones', jsonb_build_object(
    'primary', '+91 93257 69599',
    'secondary', '+91 63590 09719',
    'tertiary', '+91 82377 05457',
    'email', 'jainentdrdevendra@gmail.com'
  )),
  ('whatsapp', jsonb_build_object(
    'primary', '919325769599',
    'secondary', '918237705457',
    'tertiary', '916359009719'
  )),
  ('hours', jsonb_build_object(
    'weekdays', 'Mon – Sat · 10:00 AM – 7:00 PM',
    'sunday', 'Sunday Closed',
    'emergency', 'Emergency 24×7'
  )),
  ('social', jsonb_build_object(
    'facebook', 'https://share.google/nnGSfq03wLnaikGhn',
    'instagram', 'https://www.instagram.com/dr_devendra_jain/?utm_source=ig_web_button_share_sheet',
    'maps', 'https://maps.app.goo.gl/UGd5DbgeySUoC2wp6?g_st=ac'
  )),
  ('emergency', jsonb_build_object(
    'enabled', true,
    'message', '24×7 ENT Emergency — call any time'
  )),
  ('pharmacy', jsonb_build_object(
    'name', 'Yashvi Medical Store',
    'description', 'In-house pharmacy with all ENT, post-op and general medicines.',
    'hours', 'Mon – Sat · 10:00 AM – 8:00 PM',
    'phone', '+91 93257 69599'
  )),
  ('footer', jsonb_build_object(
    'tagline', 'Ear • Nose • Throat • Face Surgery • Head & Neck Cancer Care',
    'about', 'Senior ENT specialist clinic in Deesa, Gujarat — 18+ years of experience, 15+ years as a Teaching Professor.',
    'copyright', '© Jain ENT Hospital. All rights reserved.'
  )),
  ('seo_defaults', jsonb_build_object(
    'site_name', 'Jain ENT Hospital',
    'base_url', 'https://jainent.lovable.app',
    'default_og_image', '/og-default.jpg',
    'twitter_handle', ''
  )),
  ('seo_pages', jsonb_build_object(
    'home', jsonb_build_object('title','Best ENT Doctor in Deesa | Prof. Dr. Devendra M. Jain | Jain ENT Hospital','description','Prof. Dr. Devendra M. Jain — ENT & Head Neck Surgeon with Cancer Care in Deesa. 18+ years of experience. Book appointment or consult online.'),
    'about', jsonb_build_object('title','Prof. Dr. Devendra M. Jain - ENT & Head Neck Surgeon with Cancer Care | Deesa','description','Senior ENT, face surgery & head-neck cancer specialist in Deesa, Gujarat. 18+ years of experience, 15+ years as Teaching Professor.'),
    'services', jsonb_build_object('title','ENT Services in Deesa Gujarat | Jain ENT Hospital','description','Complete ENT, face surgery and head-neck cancer services in Deesa: sinus, ear, throat, vertigo, hearing, snoring, oncology and more.'),
    'blog', jsonb_build_object('title','ENT Health Tips & Articles | Jain ENT Hospital Deesa','description','Practical ENT health articles, post-op care guides, and patient education from Prof. Dr. Devendra M. Jain, Deesa.'),
    'book', jsonb_build_object('title','Book ENT Appointment in Deesa | Jain ENT Hospital','description','Book your ENT appointment online with Prof. Dr. Devendra M. Jain in Deesa. Clinic visit or telemedicine.'),
    'feedback', jsonb_build_object('title','Patient Reviews | Jain ENT Hospital Deesa','description','Read patient reviews of Jain ENT Hospital, Deesa, and share your own experience with Prof. Dr. Devendra M. Jain.')
  )),
  ('reviews_settings', jsonb_build_object(
    'google_review_link', 'https://g.page/r/CarLiO9V0KfzEBM/review',
    'google_place_url', 'https://g.page/r/CarLiO9V0KfzEBM'
  )),
  ('services_list', jsonb_build_array(
    jsonb_build_object('slug','ear','name','Ear Care & Microsurgery','desc','Ear infections, hearing loss, tinnitus, vertigo, microsurgery of the ear.','icon','Ear'),
    jsonb_build_object('slug','nose-sinus','name','Nose & Sinus','desc','Sinusitis, allergic rhinitis, polyps, deviated septum, endoscopic sinus surgery.','icon','Wind'),
    jsonb_build_object('slug','throat','name','Throat & Voice','desc','Tonsils, adenoids, snoring, voice disorders, swallowing.','icon','Mic'),
    jsonb_build_object('slug','head-neck-cancer','name','Head & Neck Cancer','desc','Oral, throat, laryngeal, thyroid and salivary cancer surgery with reconstruction.','icon','ShieldPlus'),
    jsonb_build_object('slug','face-surgery','name','Face Surgery','desc','Cosmetic & reconstructive facial surgery — rhinoplasty, otoplasty, scar revision, post-cancer reconstruction.','icon','Sparkles'),
    jsonb_build_object('slug','pediatric-ent','name','Pediatric ENT','desc','Child-friendly evaluation and surgery for ear, nose and throat conditions.','icon','Baby'),
    jsonb_build_object('slug','telemedicine','name','Telemedicine','desc','Secure video consultation for patients across India and abroad.','icon','Video')
  )),
  ('nav_links', jsonb_build_array(
    jsonb_build_object('to','/','label','Home'),
    jsonb_build_object('to','/about','label','About'),
    jsonb_build_object('to','/services','label','Services'),
    jsonb_build_object('to','/telemedicine','label','Telemedicine'),
    jsonb_build_object('to','/pharmacy','label','Pharmacy'),
    jsonb_build_object('to','/patient-info','label','Patient Info'),
    jsonb_build_object('to','/post-op-care','label','Post-Op Care'),
    jsonb_build_object('to','/blog','label','Blog'),
    jsonb_build_object('to','/gallery','label','Gallery'),
    jsonb_build_object('to','/feedback','label','Feedback'),
    jsonb_build_object('to','/contact','label','Contact')
  )),
  ('footer_links', jsonb_build_array(
    jsonb_build_object('to','/about','label','About'),
    jsonb_build_object('to','/services','label','Services'),
    jsonb_build_object('to','/book','label','Book Appointment'),
    jsonb_build_object('to','/contact','label','Contact'),
    jsonb_build_object('to','/feedback','label','Feedback'),
    jsonb_build_object('to','/blog','label','Blog')
  ))
ON CONFLICT (key) DO NOTHING;
