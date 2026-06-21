import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout, P as PageHero, C as CLINIC, t as telPrimary, w as waLink } from "./router-BdWqalL7.mjs";
import { Q as MapPin, X as Navigation, Y as Phone, P as Mail, r as Clock, F as Facebook, J as Instagram, S as MessageCircle } from "../_libs/lucide-react.mjs";
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
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Contact", title: "We're here — call, message, or visit.", subtitle: "The fastest way to reach us is WhatsApp. For emergencies, please call directly any time of day or night." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight grid lg:grid-cols-12 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { icon: MapPin, title: "Address", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            CLINIC.address.line1,
            ", ",
            CLINIC.address.line2,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            CLINIC.address.city,
            ", ",
            CLINIC.address.state,
            " ",
            CLINIC.address.pin,
            ", ",
            CLINIC.address.country
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: CLINIC.social.maps, target: "_blank", rel: "noreferrer", className: "mt-3 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4" }),
            " Open in Google Maps"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Phone, title: "Phone (24×7 for emergencies)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "hover:text-primary", href: `tel:${telPrimary}`, children: [
            CLINIC.phones.primary,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(primary)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-primary", href: `tel:${CLINIC.phones.secondary.replace(/\s/g, "")}`, children: CLINIC.phones.secondary }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-primary", href: `tel:${CLINIC.phones.tertiary.replace(/\s/g, "")}`, children: CLINIC.phones.tertiary }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Mail, title: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-primary break-all", href: `mailto:${CLINIC.email}`, children: CLINIC.email }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Clock, title: "Hours", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          CLINIC.hours.weekdays,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          CLINIC.hours.sunday,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-crimson", children: CLINIC.hours.emergency })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: CLINIC.social.facebook, target: "_blank", rel: "noreferrer", className: "inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground", "aria-label": "Facebook", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: CLINIC.social.instagram, target: "_blank", rel: "noreferrer", className: "inline-flex h-11 w-11 items-center justify-center rounded-full bg-crimson text-crimson-foreground", "aria-label": "Instagram", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-5 w-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:col-span-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink("Hello Jain ENT Hospital, I have a question."), target: "_blank", rel: "noreferrer", className: "block rounded-2xl bg-[#25D366] text-white p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider opacity-90", children: "Fastest reply" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold", children: "WhatsApp us" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm opacity-95", children: CLINIC.whatsapp.primary.replace(/^91/, "+91 ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden ring-1 ring-border bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Jain ENT Hospital Deesa location", src: "https://www.google.com/maps?q=24.2724378,72.1794694&output=embed", className: "w-full h-80 border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) })
      ] })
    ] }) })
  ] });
}
function Card({
  icon: Icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/10 text-crimson", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-primary", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm text-muted-foreground", children })
  ] });
}
export {
  Contact as component
};
