import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout, B as Breadcrumbs, P as PageHero } from "./router-BdWqalL7.mjs";
import { R as ReviewsSection } from "./Reviews-TCv7W2ko.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import { n as CircleCheck, a7 as Star } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, l as literalType, n as numberType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const schema = objectType({
  patient_name: stringType().trim().min(2, "Please enter your name").max(80),
  phone: stringType().trim().max(20).optional().or(literalType("")),
  rating: numberType().int().min(1).max(5),
  body: stringType().trim().min(10, "Please write at least a sentence").max(2e3),
  visit_date: stringType().optional().or(literalType(""))
});
function FeedbackPage() {
  const [form, setForm] = reactExports.useState({
    patient_name: "",
    phone: "",
    rating: 5,
    body: "",
    visit_date: ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  async function submit(e) {
    e.preventDefault();
    setErr("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.from("reviews").insert({
      patient_name: parsed.data.patient_name,
      phone: parsed.data.phone || null,
      rating: parsed.data.rating,
      body: parsed.data.body,
      visit_date: parsed.data.visit_date || null,
      status: "pending"
    });
    setSubmitting(false);
    if (error) {
      setErr("Could not submit. Please try again later.");
      return;
    }
    setDone(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{
      label: "Patient Reviews",
      to: "/feedback"
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Patient Feedback", title: "Share your experience", subtitle: "Your feedback helps other patients find the right ENT care. It takes less than a minute." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight max-w-2xl", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-10 text-center shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-emerald-500 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-bold text-primary", children: "Thank you for your feedback!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "rounded-2xl bg-white ring-1 ring-border p-6 sm:p-8 shadow-soft space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Your name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, maxLength: 80, value: form.patient_name, onChange: (e) => setForm({
          ...form,
          patient_name: e.target.value
        }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30", placeholder: "Ramesh Patel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Phone (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", maxLength: 20, value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value
        }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30", placeholder: "+91" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] text-muted-foreground", children: "Your phone number will not be displayed publicly with your review. It is only used by the clinic to follow up if needed." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Your rating *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-1", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm({
          ...form,
          rating: n
        }), "aria-label": `${n} star`, className: "p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-8 w-8 ${n <= form.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}` }) }, n)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Date of visit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: form.visit_date, max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), onChange: (e) => setForm({
          ...form,
          visit_date: e.target.value
        }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Your review *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 5, maxLength: 2e3, value: form.body, onChange: (e) => setForm({
          ...form,
          body: e.target.value
        }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none", placeholder: "Tell us about your experience at Jain ENT Hospital…" })
      ] }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: err }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "w-full rounded-full bg-crimson text-crimson-foreground py-3.5 text-sm font-semibold disabled:opacity-50", children: submitting ? "Sending…" : "Submit feedback" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsSection, {})
  ] });
}
export {
  FeedbackPage as component
};
