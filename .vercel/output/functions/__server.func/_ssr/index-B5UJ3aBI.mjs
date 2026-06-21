import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout, C as CLINIC, t as telPrimary, l as logo } from "./router-BdWqalL7.mjs";
import { R as ReviewsSection } from "./Reviews-TCv7W2ko.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { a6 as Sparkles, C as Calendar, b as ArrowRight, Y as Phone, d as Award, Q as MapPin, a7 as Star, E as Ear, H as HeartPulse, a8 as Stethoscope, V as Microscope } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-CDTlM2pt.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const SERVICES = [{
  icon: Ear,
  title: "Ear Care",
  desc: "Hearing loss, infections, tinnitus, vertigo, microsurgery."
}, {
  icon: HeartPulse,
  title: "Nose & Sinus",
  desc: "Sinusitis, allergies, deviated septum, endoscopic surgery."
}, {
  icon: Stethoscope,
  title: "Throat & Voice",
  desc: "Tonsils, adenoids, hoarseness, snoring, sleep apnoea."
}, {
  icon: Sparkles,
  title: "Face Surgery",
  desc: "Rhinoplasty, otoplasty, facial trauma repair & post-cancer reconstruction."
}, {
  icon: Microscope,
  title: "Head-Neck Surgery and Cancer Care",
  desc: "ENT-led head-neck surgery and cancer care for oral, throat, laryngeal and thyroid conditions — part of our ENT practice, not a separate oncology specialty."
}];
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-gradient-hero", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: false, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, className: "inline-flex items-center gap-2 rounded-full bg-white/70 ring-1 ring-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-crimson" }),
          "ENT & Head Neck Surgeon with Cancer Care · 18+ years of experience · Worldwide Telemedicine"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: false, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.05
        }, className: "mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary text-balance leading-[1.05]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-crimson", children: "ENT Surgeries" }),
          " + Face Surgeries + Cancer Care"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: false, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.1
        }, className: "mt-5 max-w-xl text-base md:text-lg text-muted-foreground text-pretty", children: [
          "Led by ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: CLINIC.doctor.name }),
          ", MBBS, MS (ENT) — Face Surgeon & Head-Neck Cancer Surgeon. Compassionate, modern, evidence-based care for patients across India and worldwide."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: false, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.15
        }, className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", className: "inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3.5 text-sm font-semibold text-crimson-foreground shadow-soft hover:scale-[1.02] transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
            " Book Appointment ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${telPrimary}`, className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            " ",
            CLINIC.phones.primary
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-3 gap-3 max-w-md", children: [{
          k: "18+",
          v: "Years Exp."
        }, {
          k: "MS ENT",
          v: "Specialist"
        }, {
          k: "ENT · Face · Cancer",
          v: "Surgery"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-white/70 ring-1 ring-border p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-primary", children: s.k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: s.v })
        ] }, s.v)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: false, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.7
      }, className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 bg-gradient-primary rounded-[2rem] blur-2xl opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[2rem] bg-white shadow-elevated ring-1 ring-border overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-primary p-6 text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "", className: "h-16 w-16 rounded-xl bg-white p-1.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider opacity-80", children: "Consult with" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold leading-tight", children: CLINIC.doctor.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm opacity-90", children: CLINIC.doctor.creds }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-crimson-foreground/90", children: "ENT Surgeon · Face Surgeon · Cancer Surgeon" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-crimson" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ex-BJ Medical College, Pune" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-crimson mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                CLINIC.address.line1,
                ", ",
                CLINIC.address.line2,
                ", ",
                CLINIC.address.city
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 pt-1", "aria-label": "5 star rating", children: [
              Array.from({
                length: 5
              }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-gold text-gold" }, i)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: "Patient-rated care" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson py-3 text-sm font-semibold text-crimson-foreground", children: [
              "Book Consultation ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-crimson font-semibold", children: "What we treat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl md:text-4xl font-bold text-primary", children: "Comprehensive ENT & face surgery, one roof." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "text-sm font-semibold text-primary hover:text-crimson inline-flex items-center gap-1", children: [
          "View all services ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: SERVICES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: false, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.4,
        delay: i * 0.06
      }, className: "group relative rounded-2xl bg-white ring-1 ring-border p-6 hover:ring-primary hover:shadow-soft transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-crimson group-hover:text-crimson-foreground transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl font-semibold text-primary", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.desc })
      ] }, s.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight py-16 grid md:grid-cols-12 gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-crimson-foreground/90 bg-crimson inline-block px-2 py-1 rounded", children: "About the Doctor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl md:text-4xl font-bold", children: CLINIC.doctor.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-80 mt-1", children: [
          CLINIC.doctor.creds,
          " · ",
          CLINIC.doctor.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 leading-relaxed opacity-90 max-w-2xl", children: CLINIC.doctor.bio }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "rounded-full bg-white text-primary px-5 py-2.5 text-sm font-semibold hover:bg-white/90", children: "Full profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "rounded-full ring-1 ring-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10", children: "Procedures performed" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [{
        k: "MBBS",
        v: "Foundational"
      }, {
        k: "MS (ENT)",
        v: "Specialist"
      }, {
        k: "Face Surgeon",
        v: "Cosmetic & Reconstructive"
      }, {
        k: "Cancer Surgeon",
        v: "Head-Neck Oncology"
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white/10 ring-1 ring-white/15 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: b.k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80 mt-1", children: b.v })
      ] }, b.k)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-primary text-primary-foreground p-10 md:p-14 shadow-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-48 w-48 rounded-full bg-crimson/30 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-3 gap-6 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-balance", children: "Worried about an ENT or facial symptom? Don't wait." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 opacity-90 max-w-xl", children: "Most ENT and facial issues are easier to treat early. Reserve a consultation with Dr. Devendra Jain today — in clinic or via telemedicine. Patients across India and worldwide welcome." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", className: "inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold", children: [
            "Book now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/telemedicine", className: "inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 font-semibold", children: "Try Telemedicine" })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  HomePage as component
};
