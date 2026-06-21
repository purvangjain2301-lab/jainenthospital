import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout, P as PageHero, l as logo, C as CLINIC } from "./router-BdWqalL7.mjs";
import { d as Award, x as GraduationCap, a6 as Sparkles, h as Building2, af as Users, V as Microscope, a8 as Stethoscope } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "About", title: "Decades of ENT expertise, delivered with compassion.", subtitle: `Prof. Dr. Devendra M. Jain has spent 18+ years of experience advancing ear, nose, throat, face surgery and head-neck cancer care — alongside surgical and community practice, and worldwide telemedicine.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight grid lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-32 rounded-2xl ring-1 ring-border p-6 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "", className: "h-16 w-16 rounded-xl bg-white p-1 ring-1 ring-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-bold text-primary", children: CLINIC.doctor.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: CLINIC.doctor.creds }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: CLINIC.doctor.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 font-semibold text-crimson", children: "Head-Neck Cancer Surgeon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-crimson", children: "Face Surgeon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-crimson" }),
            " 18+ years of experience"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-crimson" }),
            " MBBS, MS — ENT"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-crimson" }),
            " Face & Reconstructive Surgery"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-crimson" }),
            " Ex-BJ Medical College, Pune"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-crimson" }),
            " Patients welcomed from across India & worldwide"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "prose-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-primary", children: "A specialist you can trust" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: CLINIC.doctor.bio }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: [
            "As a practising ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Head-Neck Cancer Surgeon" }),
            " and ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Face Surgeon" }),
            ", Dr. Jain has built deep experience in the diagnosis, surgical treatment, and long-term follow-up of oral, throat, laryngeal, thyroid, and salivary gland cancers — alongside facial cosmetic and reconstructive surgery. From early-stage detection through complex resections, reconstructive procedures, and coordinated chemo-radiation planning, patients receive end-to-end care under one roof."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: [{
          icon: GraduationCap,
          t: "Academic excellence",
          d: "MBBS followed by MS in ENT, with continuing academic engagement in mentoring postgraduates."
        }, {
          icon: Microscope,
          t: "Cancer surgery experience",
          d: "Years of focused practice in head-neck oncology — oral, throat, laryngeal, thyroid and salivary gland cancers, including reconstructive procedures."
        }, {
          icon: Sparkles,
          t: "Facial surgery expertise",
          d: "Rhinoplasty, otoplasty, post-cancer reconstruction, facial trauma repair and scar management alongside comprehensive ENT care."
        }, {
          icon: Stethoscope,
          t: "Surgical expertise",
          d: "Endoscopic sinus surgery, ear microsurgery, advanced airway care, and complex referral cases."
        }, {
          icon: Users,
          t: "Community-first",
          d: "Rooted in Deesa with a clinic that welcomes patients from across India and abroad — in person or via secure video consultation."
        }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border p-6 bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-7 w-7 text-crimson" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg font-semibold text-primary mt-3", children: b.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: b.d })
        ] }, b.t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary text-primary-foreground p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: "Why patients choose Jain ENT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid sm:grid-cols-2 gap-3 text-sm", children: ["Single-specialist clinic — direct access to the consultant.", "Modern endoscopic & microscopic ENT equipment.", "Facial cosmetic & reconstructive surgery under one specialist roof.", "Honest second-opinion culture; no over-treatment.", "Same-day reports for most diagnostic tests.", "Multilingual consultations (English, Hindi, Gujarati, Marathi).", "Patients welcomed from across India and worldwide via telemedicine.", "24×7 emergency phone access."].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 opacity-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-crimson-foreground bg-crimson rounded-full h-5 w-5 inline-flex items-center justify-center text-xs shrink-0", children: "✓" }),
            x
          ] }, x)) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  About as component
};
