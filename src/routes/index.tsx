import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Stethoscope, Ear, Award, Sparkles, ArrowRight,
  Calendar, MapPin, Phone, Star, HeartPulse, Microscope,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ReviewsSection } from "@/components/site/Reviews";
import logo from "@/assets/logo.jpg";
import { CLINIC, telPrimary } from "@/lib/clinic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best ENT Doctor in Deesa | Prof. Dr. Devendra M. Jain | Jain ENT Hospital" },
      { name: "description", content: "ENT & Head Neck Surgeon with Cancer Care in Deesa, Gujarat. Prof. Dr. Devendra M. Jain — 18+ years of experience. Face surgery, head-neck cancer care & worldwide telemedicine." },
      { property: "og:title", content: "Best ENT Doctor in Deesa | Prof. Dr. Devendra M. Jain" },
      { property: "og:description", content: "ENT & Head Neck Surgeon with Cancer Care. 18+ years of experience. Face surgery, head-neck cancer care & worldwide telemedicine." },
      { property: "og:url", content: "https://jainent.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://jainent.lovable.app/" }],
  }),
  component: HomePage,
});

const SERVICES = [
  { icon: Ear, title: "Ear Care", desc: "Hearing loss, infections, tinnitus, vertigo, microsurgery." },
  { icon: HeartPulse, title: "Nose & Sinus", desc: "Sinusitis, allergies, deviated septum, endoscopic surgery." },
  { icon: Stethoscope, title: "Throat & Voice", desc: "Tonsils, adenoids, hoarseness, snoring, sleep apnoea." },
  { icon: Sparkles, title: "Face Surgery", desc: "Rhinoplasty, otoplasty, facial trauma repair & post-cancer reconstruction." },
  { icon: Microscope, title: "Head-Neck Surgery and Cancer Care", desc: "ENT-led head-neck surgery and cancer care for oral, throat, laryngeal and thyroid conditions — part of our ENT practice, not a separate oncology specialty." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-tight pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/70 ring-1 ring-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Sparkles className="h-3.5 w-3.5 text-crimson" />
              ENT & Head Neck Surgeon with Cancer Care · 18+ years of experience · Worldwide Telemedicine
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary text-balance leading-[1.05]"
            >
              <span className="text-crimson">ENT Surgeries</span> + Face Surgeries + Cancer Care
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
            >
              Led by <strong className="text-foreground">{CLINIC.doctor.name}</strong>, MBBS, MS (ENT) —
              Face Surgeon & Head-Neck Cancer Surgeon. Compassionate, modern, evidence-based care for
              patients across India and worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3.5 text-sm font-semibold text-crimson-foreground shadow-soft hover:scale-[1.02] transition">
                <Calendar className="h-4 w-4" /> Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${telPrimary}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition">
                <Phone className="h-4 w-4" /> {CLINIC.phones.primary}
              </a>
            </motion.div>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {[
                { k: "18+", v: "Years Exp." },
                { k: "MS ENT", v: "Specialist" },
                { k: "ENT · Face · Cancer", v: "Surgery" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl bg-white/70 ring-1 ring-border p-3 text-center">
                  <div className="font-display text-2xl font-bold text-primary">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 bg-gradient-primary rounded-[2rem] blur-2xl opacity-20" />
              <div className="relative rounded-[2rem] bg-white shadow-elevated ring-1 ring-border overflow-hidden">
                <div className="bg-gradient-primary p-6 text-primary-foreground">
                  <div className="flex items-center gap-4">
                    <img src={logo} alt="" className="h-16 w-16 rounded-xl bg-white p-1.5" />
                    <div>
                      <div className="text-xs uppercase tracking-wider opacity-80">Consult with</div>
                      <div className="font-display text-2xl font-bold leading-tight">{CLINIC.doctor.name}</div>
                      <div className="text-sm opacity-90">{CLINIC.doctor.creds}</div>
                      <div className="text-sm font-semibold text-crimson-foreground/90">ENT Surgeon · Face Surgeon · Cancer Surgeon</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-crimson" />
                    <span>Ex-BJ Medical College, Pune</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-crimson mt-0.5" />
                    <span>{CLINIC.address.line1}, {CLINIC.address.line2}, {CLINIC.address.city}</span>
                  </div>
                  <div className="flex gap-1 pt-1" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">Patient-rated care</span>
                  </div>
                  <Link to="/book"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson py-3 text-sm font-semibold text-crimson-foreground">
                    Book Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-wider text-crimson font-semibold">What we treat</div>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-primary">Comprehensive ENT & face surgery, one roof.</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary hover:text-crimson inline-flex items-center gap-1">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative rounded-2xl bg-white ring-1 ring-border p-6 hover:ring-primary hover:shadow-soft transition">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-crimson group-hover:text-crimson-foreground transition">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR STRIP */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-tight py-16 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-wider text-crimson-foreground/90 bg-crimson inline-block px-2 py-1 rounded">
              About the Doctor
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">{CLINIC.doctor.name}</h2>
            <p className="text-sm opacity-80 mt-1">{CLINIC.doctor.creds} · {CLINIC.doctor.title}</p>
            <p className="mt-5 leading-relaxed opacity-90 max-w-2xl">{CLINIC.doctor.bio}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about" className="rounded-full bg-white text-primary px-5 py-2.5 text-sm font-semibold hover:bg-white/90">
                Full profile
              </Link>
              <Link to="/services" className="rounded-full ring-1 ring-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                Procedures performed
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "MBBS", v: "Foundational" },
                { k: "MS (ENT)", v: "Specialist" },
                { k: "Face Surgeon", v: "Cosmetic & Reconstructive" },
                { k: "Cancer Surgeon", v: "Head-Neck Oncology" },
              ].map((b) => (
                <div key={b.k} className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-5">
                  <div className="font-display text-2xl font-bold">{b.k}</div>
                  <div className="text-xs opacity-80 mt-1">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT REVIEWS */}
      <ReviewsSection />

      {/* CTA */}
      <section className="py-20">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary text-primary-foreground p-10 md:p-14 shadow-elevated">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-crimson/30 blur-3xl" />
            <div className="relative grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-balance">
                  Worried about an ENT or facial symptom? Don't wait.
                </h2>
                <p className="mt-3 opacity-90 max-w-xl">
                  Most ENT and facial issues are easier to treat early. Reserve a consultation with
                  Dr. Devendra Jain today — in clinic or via telemedicine. Patients across India and
                  worldwide welcome.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold">
                  Book now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/telemedicine" className="inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 font-semibold">
                  Try Telemedicine
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
