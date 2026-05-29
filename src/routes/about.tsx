import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CLINIC } from "@/lib/clinic";
import { Award, GraduationCap, Stethoscope, Users, Building2, Microscope, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Prof. Dr. Devendra M. Jain — Jain ENT Hospital, Deesa" },
      { name: "description", content: "Prof. Dr. Devendra M. Jain — ENT Specialist, Face Surgeon & Head-Neck Cancer Surgeon. 17+ years experience. Ex-BJ Medical Pune. Telemedicine for patients worldwide." },
      { property: "og:title", content: "About Prof. Dr. Devendra M. Jain" },
      { property: "og:description", content: "ENT, face surgery & head-neck cancer specialist in Deesa, Gujarat. Telemedicine worldwide." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title="Decades of ENT expertise, delivered with compassion."
        subtitle={`Prof. Dr. Devendra M. Jain has spent 17+ years advancing ear, nose, throat, face surgery and head-neck cancer care across academic, surgical, and community settings — and via telemedicine for patients worldwide.`}
      />

      <section className="py-16">
        <div className="container-tight grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="sticky top-32 rounded-2xl ring-1 ring-border p-6 bg-white">
              <img src={logo} alt="" className="h-16 w-16 rounded-xl bg-white p-1 ring-1 ring-border" />
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">{CLINIC.doctor.name}</h2>
              <p className="text-sm text-muted-foreground">{CLINIC.doctor.creds}</p>
              <p className="text-sm mt-1">{CLINIC.doctor.title}</p>
              <p className="text-sm mt-1 font-semibold text-crimson">Head-Neck Cancer Surgeon</p>
              <p className="text-sm font-semibold text-crimson">Face Surgeon</p>

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex items-center gap-2"><Award className="h-4 w-4 text-crimson" /> 17+ years experience</div>
                <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-crimson" /> MBBS, MS — ENT</div>
                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-crimson" /> Face & Reconstructive Surgery</div>
                <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-crimson" /> Ex-BJ Medical College, Pune</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-crimson" /> Professor, Banas Medical College</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <article className="prose-block">
              <h3 className="font-display text-2xl font-bold text-primary">A specialist you can trust</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {CLINIC.doctor.bio}
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                As a practising <strong>Head-Neck Cancer Surgeon</strong> and <strong>Face Surgeon</strong>, Dr. Jain has built deep experience in the diagnosis, surgical treatment, and long-term follow-up of oral, throat, laryngeal, thyroid, and salivary gland cancers — alongside facial cosmetic and reconstructive surgery. From early-stage detection through complex resections, reconstructive procedures, and coordinated chemo-radiation planning, patients receive end-to-end care under one roof.
              </p>
            </article>


            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: GraduationCap, t: "Academic excellence", d: "MBBS followed by MS in ENT. Continues to teach and mentor postgraduates at Banas Medical College." },
                { icon: Microscope, t: "Cancer surgery experience", d: "Years of focused practice in head-neck oncology — oral, throat, laryngeal, thyroid and salivary gland cancers, including reconstructive procedures." },
                { icon: Sparkles, t: "Facial surgery expertise", d: "Rhinoplasty, otoplasty, post-cancer reconstruction, facial trauma repair and scar management alongside comprehensive ENT care." },
                { icon: Stethoscope, t: "Surgical expertise", d: "Endoscopic sinus surgery, ear microsurgery, advanced airway care, and complex referral cases." },
                { icon: Users, t: "Community-first", d: "Rooted in Deesa with a clinic that welcomes patients from across India and abroad — in person or via secure video consultation." },

              ].map((b) => (
                <div key={b.t} className="rounded-2xl ring-1 ring-border p-6 bg-white">
                  <b.icon className="h-7 w-7 text-crimson" />
                  <h4 className="font-display text-lg font-semibold text-primary mt-3">{b.t}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-primary text-primary-foreground p-8">
              <h3 className="font-display text-2xl font-bold">Why patients choose Jain ENT</h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Single-specialist clinic — direct access to the consultant.",
                  "Modern endoscopic & microscopic ENT equipment.",
                  "Facial cosmetic & reconstructive surgery under one specialist roof.",
                  "Honest second-opinion culture; no over-treatment.",
                  "Same-day reports for most diagnostic tests.",
                  "Multilingual consultations (English, Hindi, Gujarati, Marathi).",
                  "Patients welcomed from across India and worldwide via telemedicine.",
                  "24×7 emergency phone access.",
                ].map((x) => (
                  <li key={x} className="flex gap-2 opacity-95"><span className="text-crimson-foreground bg-crimson rounded-full h-5 w-5 inline-flex items-center justify-center text-xs shrink-0">✓</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
