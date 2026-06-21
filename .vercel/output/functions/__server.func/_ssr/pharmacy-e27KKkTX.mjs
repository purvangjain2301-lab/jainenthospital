import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout, P as PageHero, w as waLink } from "./router-BdWqalL7.mjs";
import { Z as Pill, a5 as ShieldCheck, q as ClipboardList, ad as Truck, S as MessageCircle } from "../_libs/lucide-react.mjs";
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
function Pharmacy() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Pharmacy", title: "The right ENT medicines — under the doctor's eye.", subtitle: "Skip the guesswork at outside chemists. Our in-house pharmacy stocks the exact ear drops, nasal sprays, antibiotics, antihistamines, and post-op medications prescribed by Dr. Jain." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: [{
        icon: Pill,
        t: "Specialist stock",
        d: "ENT-specific drops, sprays and tablets — not just general items."
      }, {
        icon: ShieldCheck,
        t: "Genuine only",
        d: "Sourced from authorised distributors. Strict batch & expiry checks."
      }, {
        icon: ClipboardList,
        t: "Matches your Rx",
        d: "Dispensed against the exact prescription written by Dr. Jain."
      }, {
        icon: Truck,
        t: "Refill on WhatsApp",
        d: "Send a photo of your prescription. We'll prepare it for pickup."
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-7 w-7 text-crimson" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mt-3 text-primary", children: b.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: b.d })
      ] }, b.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight mt-10 rounded-2xl bg-primary text-primary-foreground p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: "Need a refill?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-90 mt-1 text-sm", children: "WhatsApp a clear photo of your prescription and your name." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink("Hi, I'd like to refill my ENT prescription. My name is ____. (Please attach a photo of your prescription.)"), target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Request refill"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "container-tight mt-6 text-xs text-muted-foreground", children: "Medicines are dispensed strictly against a valid prescription. Please do not self-medicate based on past prescriptions." })
    ] })
  ] });
}
export {
  Pharmacy as component
};
