import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import { s as saveSiteContent } from "./router-BdWqalL7.mjs";
import { N as Lock, P as Mail, v as EyeOff, u as Eye, a4 as ShieldAlert, O as LogOut, K as LayoutDashboard, a2 as Settings, T as MessageSquare, I as Image, g as BookOpen, i as CalendarCheck, af as Users, r as Clock, n as CircleCheck, ab as TrendingUp, M as LoaderCircle, a3 as Settings2, $ as Save, a7 as Star, p as CircleX, a1 as Send, ae as Upload, _ as Plus, aa as Trash2, w as FileText, a0 as Search, D as Download, c as ArrowUpDown } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
const SECTIONS = [
  { key: "hero", title: "Hero Section", description: "Homepage headline, subtitle and CTAs." },
  { key: "doctor", title: "About the Doctor", description: "Name, title, credentials, experience, bio." },
  { key: "address", title: "Address", description: "Clinic address (line1, line2, city, state, pin, country)." },
  { key: "contact_phones", title: "Contact Phones & Email", description: "Primary/secondary/tertiary phone numbers and email." },
  { key: "whatsapp", title: "WhatsApp Numbers", description: "Digits-only numbers used for wa.me links." },
  { key: "hours", title: "Opening Hours", description: "Weekdays, Sunday, emergency hours." },
  { key: "social", title: "Social Media URLs", description: "Facebook, Instagram and Google Maps URLs." },
  { key: "emergency", title: "Emergency Bar", description: "Enable/disable top emergency banner and edit message." },
  { key: "pharmacy", title: "Pharmacy — Yashvi Medical Store", description: "Pharmacy name, description, hours, phone." },
  { key: "footer", title: "Footer", description: "Tagline, about paragraph, copyright text." },
  { key: "seo_defaults", title: "SEO — Defaults", description: "Site name, base URL, default OG image, twitter handle." },
  { key: "seo_pages", title: "SEO — Per-page meta", description: "Title and description for each main page (home, about, services, blog, book, feedback)." },
  { key: "reviews_settings", title: "Reviews — Google Link", description: "Google Business Profile review link used in auto-replies." },
  { key: "services_list", title: "Services (list)", description: "Array of services shown on Services page." },
  { key: "nav_links", title: "Navigation Links", description: "Top navigation items (label + to path)." },
  { key: "footer_links", title: "Footer Links", description: "Footer navigation items." }
];
function ContentTab() {
  const [rows, setRows] = reactExports.useState({});
  const [drafts, setDrafts] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(null);
  const [msg, setMsg] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from("site_content").select("key, value");
    const map = {};
    const draftMap = {};
    (data ?? []).forEach((r) => {
      map[r.key] = r.value;
      draftMap[r.key] = JSON.stringify(r.value, null, 2);
    });
    setRows(map);
    setDrafts(draftMap);
    setLoading(false);
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  async function save(key) {
    setMsg((m) => ({ ...m, [key]: "" }));
    let parsed;
    try {
      parsed = JSON.parse(drafts[key] ?? "{}");
    } catch (e) {
      setMsg((m) => ({ ...m, [key]: "✗ Invalid JSON: " + e.message }));
      return;
    }
    setSaving(key);
    try {
      await saveSiteContent(key, parsed);
      setRows((r) => ({ ...r, [key]: parsed }));
      setMsg((m) => ({ ...m, [key]: "✓ Saved & published live" }));
    } catch (e) {
      setMsg((m) => ({ ...m, [key]: "✗ " + (e.message || "Save failed") }));
    } finally {
      setSaving(null);
    }
  }
  if (loading)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Loading content…"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-primary", children: "Website Content (CMS)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        "Edit any section below. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Save & Publish" }),
        " pushes the change live instantly via realtime — no redeploy needed."
      ] })
    ] }),
    SECTIONS.map((s) => {
      const empty = rows[s.key] === void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-4 w-4 text-crimson" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-primary", children: s.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "text-[10px] text-muted-foreground/60", children: [
              "key: ",
              s.key
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => save(s.key),
              disabled: saving === s.key,
              className: "inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50 shrink-0",
              children: [
                saving === s.key ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                "Save & Publish"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: drafts[s.key] ?? (empty ? "{}" : ""),
            onChange: (e) => setDrafts((d) => ({ ...d, [s.key]: e.target.value })),
            rows: Math.min(Math.max((drafts[s.key] ?? "").split("\n").length, 6), 22),
            className: "mt-4 w-full border border-border rounded-xl px-4 py-3 text-xs font-mono outline-none focus:ring-2 focus:ring-primary/30 resize-y",
            spellCheck: false
          }
        ),
        msg[s.key] && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `mt-2 text-xs ${msg[s.key].startsWith("✓") ? "text-emerald-600" : "text-red-500"}`,
            children: msg[s.key]
          }
        )
      ] }, s.key);
    })
  ] });
}
const STATUS_COLOR$1 = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-slate-100 text-slate-500"
};
function ReviewsTab() {
  const [reviews, setReviews] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("pending");
  const [loading, setLoading] = reactExports.useState(true);
  const [drafts, setDrafts] = reactExports.useState({});
  const [busy, setBusy] = reactExports.useState(null);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews(data ?? []);
    setLoading(false);
  }
  reactExports.useEffect(() => {
    load();
    const channel = supabase.channel("reviews_admin").on(
      "postgres_changes",
      { event: "*", schema: "public", table: "reviews" },
      () => load()
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  async function updateStatus(id, status) {
    setBusy(id);
    await supabase.from("reviews").update({ status }).eq("id", id);
    setBusy(null);
  }
  async function sendReply(r) {
    const text = drafts[r.id] ?? r.reply_draft ?? "";
    if (!text.trim()) return;
    setBusy(r.id);
    await supabase.from("reviews").update({ admin_reply: text, status: r.status === "pending" ? "approved" : r.status }).eq("id", r.id);
    setBusy(null);
  }
  async function del(id) {
    if (!confirm("Delete this review permanently?")) return;
    setBusy(id);
    await supabase.from("reviews").delete().eq("id", id);
    setBusy(null);
  }
  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length
  };
  const visible = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);
  if (loading)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Loading reviews…"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-primary", children: "Patient Reviews" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
        "Reviews are ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "not visible" }),
        ' on the website until you approve them. Patients only see a "thank you" message after submitting.'
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap mb-6", children: ["pending", "approved", "rejected", "all"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setFilter(f),
        className: `rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${filter === f ? "bg-primary text-primary-foreground" : "ring-1 ring-border text-muted-foreground hover:bg-white"}`,
        children: [
          f,
          " (",
          counts[f],
          ")"
        ]
      },
      f
    )) }),
    visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-12 text-center text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-10 w-10 text-muted-foreground/30 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3", children: "No reviews here." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: visible.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-primary", children: r.patient_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            new Date(r.created_at).toLocaleString("en-IN"),
            r.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "· ",
              r.phone
            ] }),
            r.visit_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "· visit ",
              r.visit_date
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-0.5", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: `h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOR$1[r.status]}`,
            children: r.status
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground bg-muted/30 rounded-xl p-3", children: [
        '"',
        r.body,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-wider font-semibold text-muted-foreground", children: "Reply (auto-drafted from rating; edit before sending)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: drafts[r.id] ?? r.admin_reply ?? r.reply_draft ?? "",
            onChange: (e) => setDrafts((d) => ({ ...d, [r.id]: e.target.value })),
            rows: 4,
            className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-y"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        r.status !== "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => updateStatus(r.id, "approved"),
            disabled: busy === r.id,
            className: "inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-3 py-1.5 text-xs font-semibold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
              " Approve & show on site"
            ]
          }
        ),
        r.status !== "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => updateStatus(r.id, "rejected"),
            disabled: busy === r.id,
            className: "inline-flex items-center gap-1.5 rounded-lg bg-slate-50 text-slate-700 ring-1 ring-slate-200 px-3 py-1.5 text-xs font-semibold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
              " Reject (silent)"
            ]
          }
        ),
        r.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => updateStatus(r.id, "pending"),
            disabled: busy === r.id,
            className: "inline-flex items-center gap-1.5 rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-200 px-3 py-1.5 text-xs font-semibold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
              " Move back to pending"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => sendReply(r),
            disabled: busy === r.id,
            className: "inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
              r.admin_reply ? "Update reply" : "Save reply & approve"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => del(r.id),
            disabled: busy === r.id,
            className: "ml-auto inline-flex items-center gap-1.5 rounded-lg text-red-500 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold",
            children: "Delete"
          }
        )
      ] })
    ] }, r.id)) })
  ] });
}
function AdminPage() {
  const [auth, setAuth] = reactExports.useState({
    stage: "loading"
  });
  async function refresh() {
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    if (!user) {
      setAuth({
        stage: "signed-out"
      });
      return;
    }
    const {
      data: roleRow
    } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    setAuth({
      stage: "signed-in",
      userId: user.id,
      email: user.email ?? "",
      isAdmin: !!roleRow
    });
  }
  reactExports.useEffect(() => {
    refresh();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(() => {
      refresh();
    });
    return () => subscription.unsubscribe();
  }, []);
  async function logout() {
    await supabase.auth.signOut();
    setAuth({
      stage: "signed-out"
    });
  }
  if (auth.stage === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh flex items-center justify-center text-sm text-muted-foreground", children: "Loading…" });
  }
  if (auth.stage === "signed-out") return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginScreen, {});
  if (!auth.isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotAuthorized, { email: auth.email, onLogout: logout });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { email: auth.email, onLogout: logout });
}
function LoginScreen() {
  const [email, setEmail] = reactExports.useState("");
  const [pw, setPw] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password: pw
      });
      if (error) throw error;
    } catch (e2) {
      setErr(e2.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh flex items-center justify-center bg-[oklch(0.97_0.01_268)] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-2xl bg-white ring-1 ring-border p-8 shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-12 w-12 rounded-xl bg-primary text-primary-foreground mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-primary", children: "Admin Panel" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Jain ENT Hospital — for Prof. Dr. Devendra M. Jain only." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "doctor@example.com", className: "w-full border border-border rounded-xl px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/30" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: show ? "text" : "password", required: true, minLength: 6, value: pw, onChange: (e) => setPw(e.target.value), placeholder: "At least 6 characters", className: "w-full border border-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-primary/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => !s), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] })
      ] }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: err }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold disabled:opacity-50", children: busy ? "Please wait…" : "Sign In" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-muted-foreground text-center", children: "This page is not linked from anywhere on the public site." })
  ] }) });
}
function NotAuthorized({
  email,
  onLogout
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh flex items-center justify-center bg-[oklch(0.97_0.01_268)] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl bg-white ring-1 ring-border p-8 text-center shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex items-center justify-center h-12 w-12 rounded-xl bg-red-100 text-red-600 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-primary", children: "Access denied" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
      "Signed in as ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: email }),
      ", but this account does not have admin permission. Only Prof. Dr. Devendra M. Jain can access this panel."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLogout, className: "mt-5 inline-flex items-center gap-2 rounded-xl ring-1 ring-border px-5 py-2.5 text-sm font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
      " Sign out"
    ] })
  ] }) });
}
function AdminShell({
  email,
  onLogout
}) {
  const [tab, setTab] = reactExports.useState("dashboard");
  const nav = [{
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  }, {
    id: "content",
    label: "Content (CMS)",
    icon: Settings
  }, {
    id: "reviews",
    label: "Reviews",
    icon: MessageSquare
  }, {
    id: "gallery",
    label: "Gallery",
    icon: Image
  }, {
    id: "blog",
    label: "Blog",
    icon: BookOpen
  }, {
    id: "appointments",
    label: "Appointments",
    icon: CalendarCheck
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh flex bg-[oklch(0.97_0.01_268)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-56 flex-col bg-primary text-primary-foreground shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-6 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest opacity-60 mb-1", children: "Jain ENT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] opacity-60 mt-2 truncate", children: email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 py-4 space-y-1 px-3", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(n.id), className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${tab === n.id ? "bg-white/20" : "hover:bg-white/10 opacity-80"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
        n.label
      ] }, n.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLogout, className: "m-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 opacity-70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sign Out"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden fixed top-0 inset-x-0 z-40 bg-primary text-primary-foreground flex items-center gap-2 px-4 py-3 border-b border-white/10 overflow-x-auto", children: [
      nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(n.id), className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${tab === n.id ? "bg-white/20" : "opacity-70"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-3.5 w-3.5" }),
        n.label
      ] }, n.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onLogout, className: "ml-auto opacity-70 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto pt-[52px] md:pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
      tab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardTab, {}),
      tab === "content" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContentTab, {}),
      tab === "reviews" && /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsTab, {}),
      tab === "gallery" && /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryTab, {}),
      tab === "blog" && /* @__PURE__ */ jsxRuntimeExports.jsx(BlogTab, {}),
      tab === "appointments" && /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentsTab, {})
    ] }) })
  ] });
}
function DashboardTab() {
  const [stats, setStats] = reactExports.useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    paid: 0
  });
  reactExports.useEffect(() => {
    supabase.from("appointments").select("status, payment_status").then(({
      data
    }) => {
      if (!data) return;
      setStats({
        total: data.length,
        pending: data.filter((d) => d.status === "pending").length,
        confirmed: data.filter((d) => d.status === "confirmed").length,
        paid: data.filter((d) => d.payment_status === "paid").length
      });
    });
  }, []);
  const cards = [{
    label: "Total Appointments",
    value: stats.total,
    icon: Users,
    color: "bg-primary"
  }, {
    label: "Pending",
    value: stats.pending,
    icon: Clock,
    color: "bg-amber-500"
  }, {
    label: "Confirmed",
    value: stats.confirmed,
    icon: CircleCheck,
    color: "bg-emerald-600"
  }, {
    label: "Paid",
    value: stats.paid,
    icon: TrendingUp,
    color: "bg-crimson"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { children: "Dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-5 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${c.color} text-white h-11 w-11 rounded-xl flex items-center justify-center shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary", children: c.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.label })
      ] })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl bg-white ring-1 ring-border p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-primary mb-2", children: "Quick links" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-disc list-inside", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Go to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Gallery" }),
          " to upload clinic photos — they appear on the site instantly."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Go to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Blog" }),
          " to write, edit, publish or unpublish articles any time."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Go to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Appointments" }),
          " to confirm / cancel bookings and mark payments."
        ] })
      ] })
    ] })
  ] });
}
function GalleryTab() {
  const [items, setItems] = reactExports.useState([]);
  const [label, setLabel] = reactExports.useState("");
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState("");
  const fileRef = reactExports.useRef(null);
  async function load() {
    const {
      data
    } = await supabase.from("gallery").select("*").order("created_at", {
      ascending: false
    });
    if (data) setItems(data);
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  function pickFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }
  async function upload() {
    if (!file || !label.trim()) {
      setMsg("Please add a label and select an image.");
      return;
    }
    setUploading(true);
    setMsg("");
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const {
      error: upErr
    } = await supabase.storage.from("media").upload(path, file, {
      upsert: true
    });
    if (upErr) {
      setMsg("Upload failed: " + upErr.message);
      setUploading(false);
      return;
    }
    const {
      data: {
        publicUrl
      }
    } = supabase.storage.from("media").getPublicUrl(path);
    const {
      error: dbErr
    } = await supabase.from("gallery").insert({
      label: label.trim(),
      url: publicUrl
    });
    if (dbErr) {
      setMsg("DB error: " + dbErr.message);
    } else {
      setMsg("✓ Photo added!");
      setLabel("");
      setFile(null);
      setPreview("");
      load();
    }
    setUploading(false);
  }
  async function remove(item) {
    if (!confirm(`Delete "${item.label}"?`)) return;
    await supabase.from("gallery").delete().eq("id", item.id);
    load();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { children: "Gallery" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-6", children: "Photos uploaded here appear on the public Gallery page immediately — no redeploy needed." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-primary mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
        " Add new photo"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Photo label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: label, onChange: (e) => setLabel(e.target.value), placeholder: "e.g. Consultation Room", className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image file" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => fileRef.current?.click(), className: "mt-1.5 w-full border border-dashed border-border rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:border-primary transition text-left", children: file ? file.name : "Click to choose image…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: pickFile })
        ] })
      ] }),
      preview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, className: "mt-4 h-40 rounded-xl object-cover ring-1 ring-border", alt: "preview" }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-emerald-600", children: msg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: upload, disabled: uploading, className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50", children: uploading ? "Uploading…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add Photo"
      ] }) })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: Image, text: "No photos yet. Upload the first one above." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-2xl overflow-hidden ring-1 ring-border bg-white aspect-[4/3]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: item.label, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-sm font-semibold", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(item), className: "text-white/80 hover:text-red-400 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, item.id)) })
  ] });
}
const CATS = ["Ear", "Nose", "Throat", "Sleep", "Oncology", "Paediatrics", "General"];
const emptyPost = () => ({
  slug: "",
  title: "",
  category: "Ear",
  excerpt: "",
  content: "",
  published: false
});
function BlogTab() {
  const [posts, setPosts] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState("");
  async function load() {
    const {
      data
    } = await supabase.from("blog_posts").select("*").order("created_at", {
      ascending: false
    });
    if (data) setPosts(data);
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  function newPost() {
    setEditing({
      draft: emptyPost()
    });
    setMsg("");
  }
  function editPost(p) {
    setEditing({
      id: p.id,
      draft: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        excerpt: p.excerpt ?? "",
        content: p.content ?? "",
        published: p.published
      }
    });
    setMsg("");
  }
  async function save() {
    if (!editing) return;
    const d = editing.draft;
    if (!d.title.trim() || !d.slug.trim()) {
      setMsg("Title and slug are required.");
      return;
    }
    setSaving(true);
    setMsg("");
    const {
      error
    } = editing.id ? await supabase.from("blog_posts").update(d).eq("id", editing.id) : await supabase.from("blog_posts").insert(d);
    if (error) setMsg("Error: " + error.message);
    else {
      setMsg("✓ Saved!");
      setEditing(null);
      load();
    }
    setSaving(false);
  }
  async function togglePublish(post) {
    await supabase.from("blog_posts").update({
      published: !post.published
    }).eq("id", post.id);
    load();
  }
  async function del(post) {
    if (!confirm(`Delete "${post.title}"?`)) return;
    await supabase.from("blog_posts").delete().eq("id", post.id);
    load();
  }
  function slugify(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  function patch(p) {
    if (!editing) return;
    setEditing({
      ...editing,
      draft: {
        ...editing.draft,
        ...p
      }
    });
  }
  if (editing !== null) {
    const d = editing.draft;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "text-sm text-muted-foreground hover:text-primary", children: "← Back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { children: editing.id ? "Edit Blog Post" : "New Blog Post" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.title, onChange: (e) => patch({
              title: e.target.value,
              slug: editing.id ? d.slug : slugify(e.target.value)
            }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30", placeholder: "Post title" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Slug (URL) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.slug, onChange: (e) => patch({
              slug: e.target.value
            }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30", placeholder: "post-url-slug" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: d.category, onChange: (e) => patch({
              category: e.target.value
            }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none", children: CATS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: d.published, onChange: (e) => patch({
              published: e.target.checked
            }), className: "accent-primary h-4 w-4" }),
            "Published"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Short excerpt (shown in card)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: d.excerpt ?? "", onChange: (e) => patch({
            excerpt: e.target.value
          }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/30", placeholder: "One or two sentence summary…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full article content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 12, value: d.content ?? "", onChange: (e) => patch({
            content: e.target.value
          }), className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none resize-y focus:ring-2 focus:ring-primary/30 font-mono", placeholder: "Write the full article here…" })
        ] }),
        msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-emerald-600", children: msg }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, disabled: saving, className: "inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50", children: saving ? "Saving…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
            " Save Post"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "rounded-xl ring-1 ring-border px-5 py-2.5 text-sm font-semibold", children: "Cancel" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { children: "Blog Posts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: newPost, className: "inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New Post"
      ] })
    ] }),
    posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: BookOpen, text: "No blog posts yet. Create your first one." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-5 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => editPost(p), className: "flex-1 min-w-0 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-crimson/10 text-crimson px-2 py-0.5 text-xs font-semibold", children: p.category }),
          p.published ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs font-semibold", children: "Published" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-semibold", children: "Draft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-primary mt-1 truncate", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(p.created_at).toLocaleDateString("en-IN") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => togglePublish(p), title: p.published ? "Unpublish" : "Publish", className: "text-muted-foreground hover:text-primary", children: p.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(p), className: "text-muted-foreground hover:text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, p.id)) })
  ] });
}
const STATUS_COLOR = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600"
};
const PAY_COLOR = {
  unpaid: "bg-slate-100 text-slate-600",
  pending_verification: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  verified: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-600"
};
const PAY_LABEL = {
  unpaid: "unpaid",
  pending_verification: "pending verification",
  paid: "paid",
  verified: "verified",
  rejected: "rejected"
};
const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "visited", "no-show"];
function AppointmentsTab() {
  const [appts, setAppts] = reactExports.useState([]);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [payFilter, setPayFilter] = reactExports.useState("all");
  const [fromDate, setFromDate] = reactExports.useState("");
  const [toDate, setToDate] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [sortKey, setSortKey] = reactExports.useState("created_at");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [rejectFor, setRejectFor] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [actionMsg, setActionMsg] = reactExports.useState("");
  const [busyId, setBusyId] = reactExports.useState(null);
  async function load() {
    const {
      data
    } = await supabase.from("appointments").select("*").order("created_at", {
      ascending: false
    });
    if (data) setAppts(data);
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  async function updateStatus(id, status) {
    const {
      error
    } = await supabase.from("appointments").update({
      status
    }).eq("id", id);
    if (error) {
      setActionMsg(error.message);
      return;
    }
    setActionMsg("✓ Status updated.");
    load();
  }
  async function approvePayment(a) {
    setActionMsg("");
    if (a.payment_status === "verified") {
      setActionMsg("This payment is already verified.");
      return;
    }
    if (!a.payment_method || !a.payment_reference || a.payment_reference.trim().length < 3) {
      setActionMsg("Cannot approve: transaction / payment details are missing. Ask the patient to resubmit.");
      return;
    }
    setBusyId(a.id);
    const {
      error
    } = await supabase.rpc("admin_verify_payment", {
      _id: a.id
    });
    setBusyId(null);
    if (error) {
      setActionMsg(error.message);
      return;
    }
    setActionMsg("✓ Payment verified.");
    load();
  }
  function openReject(a) {
    setRejectFor(a);
    setRejectReason("");
    setActionMsg("");
  }
  async function confirmReject() {
    if (!rejectFor) return;
    if (rejectReason.trim().length < 3) {
      setActionMsg("Please write a reason (at least 3 characters).");
      return;
    }
    setBusyId(rejectFor.id);
    const {
      error
    } = await supabase.rpc("admin_reject_payment", {
      _id: rejectFor.id,
      _reason: rejectReason.trim()
    });
    setBusyId(null);
    if (error) {
      setActionMsg(error.message);
      return;
    }
    setRejectFor(null);
    setRejectReason("");
    setActionMsg("Payment rejected. The patient will see your reason.");
    load();
  }
  function fmt(d) {
    return d ? new Date(d).toLocaleString("en-IN") : "—";
  }
  const q = search.trim().toLowerCase();
  const filtered = appts.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (payFilter !== "all" && a.payment_status !== payFilter) return false;
    if (fromDate && a.date < fromDate) return false;
    if (toDate && a.date > toDate) return false;
    if (q) {
      const hay = `${a.name ?? ""} ${a.phone ?? ""} ${a.email ?? ""} ${a.concern ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  function toggleSort(k) {
    if (sortKey === k) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir(k === "name" ? "asc" : "desc");
    }
  }
  const pendingPayCount = appts.filter((a) => a.payment_status === "pending_verification").length;
  function exportCSV() {
    const headers = ["Date", "Slot", "Token", "Name", "Age", "Phone", "Email", "Mode", "Concern", "Status", "Payment Status", "Payment Method", "Payment Reference", "Created At"];
    const rows = sorted.map((a2) => [a2.date, a2.slot, a2.token_number ?? "", a2.name ?? "", a2.age ?? "", a2.phone ?? "", a2.email ?? "", a2.mode ?? "", a2.concern ?? "", a2.status, a2.payment_status, a2.payment_method ?? "", a2.payment_reference ?? "", a2.created_at ?? ""]);
    const esc = (v) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [headers, ...rows].map((r) => r.map(esc).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { children: "Appointments" }),
    pendingPayCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-amber-50 ring-1 ring-amber-200 p-4 flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-amber-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: pendingPayCount }),
        " payment",
        pendingPayCount > 1 ? "s" : "",
        " awaiting your verification."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPayFilter("pending_verification"), className: "rounded-full bg-amber-600 text-white px-4 py-1.5 text-xs font-semibold", children: "Review pending payments" })
    ] }),
    actionMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-primary", children: actionMsg }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-white ring-1 ring-border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All statuses" }),
            STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: payFilter, onChange: (e) => setPayFilter(e.target.value), className: "mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All payments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unpaid", children: "Unpaid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending_verification", children: "Pending verification" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "verified", children: "Verified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "paid", children: "Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rejected", children: "Rejected" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "From date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: fromDate, onChange: (e) => setFromDate(e.target.value), className: "mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "To date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: toDate, onChange: (e) => setToDate(e.target.value), className: "mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search (name / phone / email / concern)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Type to filter…", className: "w-full border border-border rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setStatusFilter("all");
          setPayFilter("all");
          setFromDate("");
          setToDate("");
          setSearch("");
        }, className: "rounded-xl ring-1 ring-border px-4 py-2 text-sm font-semibold", children: "Clear" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportCSV, className: "inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Export CSV"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap items-center text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-primary", children: sorted.length }),
          " shown"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          appts.length,
          " total"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex gap-1", children: [
          "Sort:",
          ["date", "created_at", "token_number", "name"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleSort(k), className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 ${sortKey === k ? "bg-primary text-primary-foreground" : "ring-1 ring-border"}`, children: [
            k === "created_at" ? "created" : k === "token_number" ? "token" : k,
            sortKey === k && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3" })
          ] }, k))
        ] })
      ] })
    ] }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: CalendarCheck, text: "No appointments match these filters." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mt-6", children: sorted.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-primary", children: [
            a.name,
            " · Age ",
            a.age || "—",
            a.token_number != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-bold", children: [
              "#",
              a.token_number
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            a.phone,
            a.email ? ` · ${a.email}` : "",
            " · ",
            a.mode
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            a.date,
            " at ",
            a.slot
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 text-sm text-foreground italic", children: [
            '"',
            a.concern,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: a.status, onChange: (e) => updateStatus(a.id, e.target.value), className: `rounded-full border-0 ring-1 ring-border px-2.5 py-1 text-xs font-semibold cursor-pointer ${STATUS_COLOR[a.status] ?? "bg-slate-100 text-slate-600"}`, children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-xs font-semibold ${PAY_COLOR[a.payment_status] ?? "bg-slate-100 text-slate-600"}`, children: PAY_LABEL[a.payment_status] ?? a.payment_status })
        ] })
      ] }),
      (a.payment_method || a.payment_reference || a.payment_submitted_at) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl bg-[oklch(0.98_0.005_268)] ring-1 ring-border p-3 text-xs text-muted-foreground space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Payment method:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: a.payment_method ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Reference / Txn:" }),
          " ",
          a.payment_reference ?? "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Submitted:" }),
          " ",
          fmt(a.payment_submitted_at)
        ] }),
        a.payment_verified_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-emerald-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Verified:" }),
          " ",
          fmt(a.payment_verified_at)
        ] }),
        a.payment_rejected_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-red-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Rejected:" }),
          " ",
          fmt(a.payment_rejected_at),
          " — ",
          a.payment_rejection_reason
        ] })
      ] }),
      a.payment_status === "pending_verification" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { color: "emerald", onClick: () => approvePayment(a), icon: CircleCheck, children: busyId === a.id ? "…" : "Approve payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { color: "red", onClick: () => openReject(a), icon: CircleX, children: "Reject payment" })
      ] }),
      a.payment_status === "verified" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-3 py-1.5 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
        " Verified — locked"
      ] }) })
    ] }, a.id)) }),
    rejectFor && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4", onClick: () => setRejectFor(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-border p-6 w-full max-w-md shadow-xl", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-primary", children: "Reject payment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tell the patient why their payment couldn't be verified. They will see this on My Appointments." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: rejectReason, onChange: (e) => setRejectReason(e.target.value), rows: 4, placeholder: "e.g. Transaction ID not found in our Razorpay dashboard. Please share a screenshot.", className: "mt-3 w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" }),
      actionMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-red-500", children: actionMsg }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRejectFor(null), className: "rounded-lg ring-1 ring-border px-4 py-2 text-sm font-semibold", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: confirmReject, disabled: busyId === rejectFor.id, className: "rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50", children: busyId === rejectFor.id ? "Rejecting…" : "Reject payment" })
      ] })
    ] }) })
  ] });
}
function Heading({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-primary", children });
}
function Label({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children });
}
function EmptyState({
  icon: Icon,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-12 flex flex-col items-center gap-3 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-10 w-10 text-muted-foreground/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: text })
  ] });
}
function ActionBtn({
  children,
  color,
  onClick,
  icon: Icon
}) {
  const cls = color === "emerald" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ring-emerald-200" : "bg-red-50 text-red-600 hover:bg-red-100 ring-red-200";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `inline-flex items-center gap-1.5 rounded-lg ring-1 px-3 py-1.5 text-xs font-semibold transition ${cls}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
    children
  ] });
}
export {
  AdminPage as component
};
