import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout, P as PageHero, w as waLink } from "./router-BdWqalL7.mjs";
import { q as ClipboardList, e as BadgeIndianRupee, w as FileText, a5 as ShieldCheck, Q as MapPin, L as Languages, H as HeartPulse, D as Download, S as MessageCircle } from "../_libs/lucide-react.mjs";
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
const FAQS = [{
  q: "Do I need an appointment?",
  a: "Walk-ins are accepted but appointments are strongly recommended to minimise waiting. Book online or call the front desk."
}, {
  q: "What should I bring on my first visit?",
  a: "Government photo ID, any previous prescriptions, reports (audiograms, CT/MRI scans, lab work), and the list of medicines you currently take."
}, {
  q: "How much is the consultation fee?",
  a: "Our consultation fee is shown only at the secure payment step after slot confirmation — never advertised before."
}, {
  q: "Do you accept cash and UPI?",
  a: "Yes — cash, UPI, debit/credit cards and online payments are all accepted."
}, {
  q: "Will the doctor see my child?",
  a: "Yes. Dr. Jain regularly cares for paediatric ENT patients including infants."
}, {
  q: "Is parking available?",
  a: "Yes — street parking and a JIO petrol-pump landmark right opposite the clinic make it easy to find."
}, {
  q: "What languages can I consult in?",
  a: "English, Hindi, Gujarati, and Marathi."
}];
function Info() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Patient Info", title: "Plan a smooth visit.", subtitle: "A few minutes of preparation makes your consultation far more productive. Here's everything we'd want you to know." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid lg:grid-cols-3 gap-5", children: [{
        icon: ClipboardList,
        t: "What to bring",
        d: "Photo ID, prior prescriptions, scans/reports, list of current medicines."
      }, {
        icon: BadgeIndianRupee,
        t: "Payments",
        d: "Cash, UPI, debit/credit cards, online payment links. Fee shown at payment step."
      }, {
        icon: FileText,
        t: "Reports & follow-up",
        d: "Most diagnostics produce a same-day report. Follow-ups can be done via telemedicine."
      }, {
        icon: ShieldCheck,
        t: "Privacy",
        d: "Records are kept strictly confidential and shared only with you."
      }, {
        icon: MapPin,
        t: "Finding us",
        d: "First Floor, Iskcon Pride, opp. JIO Petrol Pump, Deesa Highway — easy to spot from the highway."
      }, {
        icon: Languages,
        t: "Languages",
        d: "Consultations in English, Hindi, Gujarati, and Marathi."
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-7 w-7 text-crimson" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mt-3 text-primary", children: b.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: b.d })
      ] }, b.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-gradient-to-br from-crimson/5 to-primary/5 ring-1 ring-crimson/20 p-6 sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 h-12 w-12 rounded-2xl bg-crimson/10 text-crimson inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl sm:text-2xl font-bold text-primary", children: "After surgery? Use our recovery checklist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "A printable post-operative care checklist for ENT and head & neck cancer surgery patients — covers the first 24 hours, the first week, warning signs and long-term recovery." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/downloads/post-operative-care-checklist.pdf", download: true, className: "inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
              " Download checklist (PDF)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink("Hello Dr. Jain, I have a question about my post-operative care."), target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
              " Chat post-op care on WhatsApp"
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-primary", children: "Frequently asked" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 divide-y divide-border rounded-2xl ring-1 ring-border bg-white", children: FAQS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "group p-6 [&_summary::-webkit-details-marker]:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex items-center justify-between cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: f.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-4 text-crimson group-open:rotate-45 transition text-xl leading-none", children: "+" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: f.a })
        ] }, f.q)) })
      ] })
    ] })
  ] });
}
export {
  Info as component
};
