import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout, P as PageHero } from "./router-BdWqalL7.mjs";
import { ah as Video, a5 as ShieldCheck, ai as Wifi, r as Clock, G as Globe, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
function Telemed() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Telemedicine", title: "See the specialist — without the travel.", subtitle: "Secure video consultations for patients anywhere in India and abroad — follow-ups, second opinions, NRI consultations. Convenient, private, doctor-led." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid md:grid-cols-3 gap-5", children: [{
        icon: Video,
        t: "Doctor-led video call",
        d: "You speak directly to Dr. Jain — never a junior or a chatbot."
      }, {
        icon: ShieldCheck,
        t: "Private & encrypted",
        d: "Your visit is one-on-one and confidential. Records stay with the clinic."
      }, {
        icon: Wifi,
        t: "Works on basic 4G",
        d: "All you need is a phone and a stable connection — we'll guide you."
      }, {
        icon: Clock,
        t: "Same-day slots",
        d: "Most requests are accommodated within the same working day."
      }, {
        icon: Globe,
        t: "Available worldwide",
        d: "Patients from any state or country can consult Dr. Jain via video. Hindi, English, Gujarati and Marathi spoken."
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-7 w-7 text-crimson" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mt-3 text-primary", children: b.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: b.d })
      ] }, b.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight mt-12 grid lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary text-primary-foreground p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: "Best suited for" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm opacity-95", children: ["Follow-up after surgery or treatment", "Review of test/scan reports", "Second opinion on an ENT diagnosis", "Recurrent allergy / sinus / throat issues", "Prescription refill consultations", "NRI and international patients seeking a specialist second opinion", "Patients across India unable to travel to Deesa"].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-crimson-foreground bg-crimson rounded-full h-5 w-5 inline-flex items-center justify-center text-xs shrink-0", children: "✓" }),
            x
          ] }, x)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-primary", children: "When you should visit in person" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: ["Acute hearing loss or severe pain", "Active bleeding from ear / nose / throat", "Suspicious neck or oral lump", "Children needing physical examination", "Anything requiring an endoscopy or audiometry"].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson shrink-0" }),
            x
          ] }, x)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", className: "mt-6 inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold", children: [
            "Book in-clinic visit ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-primary p-10 text-primary-foreground text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-bold", children: "Ready for a video consult?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 opacity-90", children: "Choose your language and slot — book your video consult from anywhere." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", className: "mt-5 inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold", children: [
          "Book telemedicine slot ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Telemed as component
};
