import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import { T as MessageSquare, b as ArrowRight, a7 as Star } from "../_libs/lucide-react.mjs";
function useApprovedReviews() {
  const [reviews, setReviews] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("reviews").select("id, patient_name, rating, body, visit_date, admin_reply, created_at").eq("status", "approved").order("created_at", { ascending: false }).limit(50);
      if (!cancelled) {
        setReviews(data ?? []);
        setLoading(false);
      }
    })();
    const channel = supabase.channel("reviews_public").on(
      "postgres_changes",
      { event: "*", schema: "public", table: "reviews" },
      () => {
        supabase.from("reviews").select("id, patient_name, rating, body, visit_date, admin_reply, created_at").eq("status", "approved").order("created_at", { ascending: false }).limit(50).then(({ data }) => setReviews(data ?? []));
      }
    ).subscribe();
    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);
  const count = reviews.length;
  const avg = count > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { reviews, loading, count, avg };
}
function Stars({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex gap-0.5", "aria-label": `${value} star rating`, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `h-4 w-4 ${i < Math.round(value) ? "fill-gold text-gold" : "text-muted-foreground/30"}`
    },
    i
  )) });
}
function ReviewsSection({ limit = 6 }) {
  const { reviews, count, avg } = useApprovedReviews();
  const visible = reviews.slice(0, limit);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-[oklch(0.98_0.01_268)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-crimson font-semibold", children: "Patient Feedback" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl md:text-4xl font-bold text-primary", children: "What our patients say" }),
        count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { value: avg }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { className: "text-foreground", children: [
              avg.toFixed(1),
              "★"
            ] }),
            " based on ",
            count,
            " ",
            count === 1 ? "review" : "reviews"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/feedback",
          className: "inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
            " Share your experience"
          ]
        }
      )
    ] }),
    visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-10 w-10 mx-auto text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Be the first to share your experience." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/feedback",
          className: "mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold",
          children: [
            "Write a review ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: visible.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "rounded-2xl bg-white ring-1 ring-border p-6 flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { value: r.rating }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-foreground leading-relaxed flex-1", children: [
            '"',
            r.body,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-primary text-sm", children: r.patient_name }),
            r.visit_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Visited ",
              new Date(r.visit_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
            ] })
          ] }),
          r.admin_reply && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl bg-primary/5 ring-1 ring-primary/15 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-primary font-semibold", children: "Reply from the clinic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-foreground leading-relaxed", children: r.admin_reply })
          ] })
        ]
      },
      r.id
    )) })
  ] }) });
}
export {
  ReviewsSection as R
};
