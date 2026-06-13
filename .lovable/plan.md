This request is very large (full CMS + reviews system + 11 landing pages + full schema/SEO overhaul + multi-host deploy configs). Doing it all in one generation would burn a lot of credits and almost certainly break mid-way. I'll split it into 4 phases and start with Phase 1 once you confirm.

## Phase 1 — Quick wins (do now)
1. **Content corrections** across all pages, meta tags, schema, footer:
   - Remove "Banas Medical College" / "Professor at Banas Medical College" everywhere
   - Doctor title → "ENT & Head Neck Surgeon with Cancer Care"
   - Experience → "18+ years of experience"
   - Add line "15+ years of experience as a Teaching Professor"
   - Name normalized to "Prof. Dr. Devendra M. Jain"
2. **Face Surgeries** added to services page, homepage services grid, header/footer nav, with the exact description provided.
3. **Mobile hamburger menu**: make scrollable (`max-h-[80vh] overflow-y-auto`) + smooth scroll for anchor links.
4. **Hide Lovable badge** via global CSS `display:none`.
5. **Deploy configs**: add `vercel.json`, `netlify.toml`, keep existing `wrangler.jsonc`, add `.env.example`.

## Phase 2 — SEO foundation
1. Unique `<title>`, meta description, canonical, OG, Twitter on every existing route using the exact titles you specified.
2. LocalBusiness + Physician + BreadcrumbList JSON-LD (in `__root.tsx` for org, per-route for page-specific).
3. Update `src/routes/sitemap[.]xml.ts` with all routes + blog posts + landing pages, proper lastmod/priority, BASE_URL = `https://jainent.lovable.app`.
4. Add `public/robots.txt` referencing sitemap.
5. Breadcrumb component on inner pages, lazy-loaded images with descriptive alt.
6. Real `/blog/$slug` route with unique meta + H1 + content (currently blog appears to be a single page).

## Phase 3 — 11 SEO landing pages
One route file per location/condition (`/ent-doctor-deesa`, `/sinusitis-treatment-deesa`, etc.), each with 300+ words unique copy, internal links to `/services` and `/book`, MedicalCondition or LocalBusiness schema, breadcrumbs. Added to sitemap.

## Phase 4 — CMS + Reviews (the heavy lift)
**Database (one migration):**
- `site_content` (key/value JSON for hero, contact, footer, emergency, pharmacy, SEO defaults, google_review_link)
- `services` (name, slug, description, icon, sort_order, active)
- `nav_links`, `footer_links`
- `blog_posts` (already exists — extend with meta_title, meta_description, og_image, published)
- `gallery` (already exists — add sort_order)
- `reviews` (patient_name, phone, rating, body, visit_date, status [pending/approved/rejected], admin_reply, reply_draft, created_at)
- RLS: public can SELECT approved reviews + active content; INSERT review allowed for anon; admin (via `has_role`) full access. GRANTs included.
- Trigger on `reviews` insert: if rating ≤3 generate low-rating draft reply, if ≥4 generate high-rating draft reply (using google_review_link from `site_content`).

**Frontend:**
- Replace hardcoded `src/lib/clinic.ts` consumers with hooks reading from `site_content` (with the current values seeded so nothing is lost; `clinic.ts` becomes fallback only).
- Realtime subscription so admin edits appear instantly.
- `/feedback` page with submit form → shows only "Thank you for your feedback!"
- Homepage feedback section showing approved reviews + AggregateRating schema ("X.X ★ based on N reviews").
- Admin panel: tabs for Hero, About, Services CRUD, Blog CRUD, Gallery upload/reorder, Contact, Nav, Footer, Emergency, Pharmacy, SEO, Reviews moderation (view/approve/reject/edit-reply/send). Auto-draft pre-filled on open.

---

### Notes / questions
- **Lovable badge**: I can hide it with CSS, but the official method is the publish-settings toggle (requires Pro). I'll do both — CSS hide + flag the setting.
- **`wrangler.toml` vs `wrangler.jsonc`**: project already has `wrangler.jsonc` for Cloudflare Workers. Cloudflare Pages uses a different config. I'll keep `wrangler.jsonc` and add a Pages-compatible `_redirects` file.
- **Google review link**: I'll use `https://g.page/r/CarLiO9V0KfzEBM/review` (the working short link you provided) as the seed value, editable from admin.
- **Real-time CMS**: requires the site to fetch content client-side, which trades some SSR/SEO benefit. I'll keep SEO-critical fields (titles, meta) server-rendered via loaders and use realtime only for dynamic UI sections.

**Approve and I'll start Phase 1 immediately.** Reply "go" or tell me to reorder/skip phases.