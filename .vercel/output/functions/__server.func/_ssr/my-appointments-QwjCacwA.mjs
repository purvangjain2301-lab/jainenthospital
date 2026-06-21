import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout, P as PageHero } from "./router-BdWqalL7.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import { c as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { O as LogOut, i as CalendarCheck, a9 as Ticket, j as CalendarClock, p as CircleX, Y as Phone, a0 as Search, af as Users, P as Mail, N as Lock, v as EyeOff, u as Eye } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
const DEFAULT_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];
const STATUS_COLOR = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  visited: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-600",
  "no-show": "bg-slate-200 text-slate-700"
};
function MyAppointmentsPage() {
  const [session, setSession] = reactExports.useState({
    kind: "none"
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({
      data
    }) => {
      if (data.user) {
        setSession({
          kind: "user",
          user: {
            id: data.user.id,
            email: data.user.email ?? ""
          }
        });
      }
      setLoading(false);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s?.user) {
        setSession({
          kind: "user",
          user: {
            id: s.user.id,
            email: s.user.email ?? ""
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-muted-foreground", children: "Loading…" }) });
  }
  if (session.kind === "user") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PatientDashboard, { heading: `Signed in as ${session.user.email}`, authedUser: session.user, onExit: async () => {
      await supabase.auth.signOut();
      setSession({
        kind: "none"
      });
    } });
  }
  if (session.kind === "contact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PatientDashboard, { heading: `Showing appointments for ${session.contact}`, contactAppts: session.appts, contact: session.contact, onExit: () => setSession({
      kind: "none"
    }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PatientLogin, { onContactFound: (c, a) => setSession({
    kind: "contact",
    contact: c,
    appts: a
  }) });
}
function PatientLogin({
  onContactFound
}) {
  const [contact, setContact] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  const [notFound, setNotFound] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  async function googleSignIn() {
    setErr("");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/my-appointments"
    });
    if (result.error) setErr(result.error.message ?? "Google sign-in failed");
  }
  async function lookup(e) {
    e.preventDefault();
    setErr("");
    setNotFound(false);
    setBusy(true);
    try {
      const trimmed = contact.trim();
      if (trimmed.length < 3) {
        setErr("Please enter a valid phone or email.");
        return;
      }
      const {
        data,
        error
      } = await supabase.rpc("find_appointments_by_contact", {
        _contact: trimmed
      });
      if (error) throw error;
      const appts = data ?? [];
      if (appts.length === 0) {
        setNotFound(true);
        return;
      }
      onContactFound(trimmed, appts);
    } catch (e2) {
      setErr(e2.message ?? "Lookup failed");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Patient Portal", title: "My Appointments", subtitle: "Look up your booking instantly with the phone or email you used — no password required." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight max-w-md mx-auto space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: googleSignIn, className: "w-full inline-flex items-center justify-center gap-3 rounded-xl bg-white ring-1 ring-border py-3 text-sm font-semibold text-foreground hover:bg-secondary transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
          "Continue with Google"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] text-muted-foreground text-center", children: "We'll match your Google email to your bookings automatically." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: lookup, className: "rounded-2xl bg-white ring-1 ring-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/10 text-crimson", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-primary", children: "Continue with phone or email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Use the phone number or email you used when booking." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: contact, onChange: (e) => {
            setContact(e.target.value);
            setNotFound(false);
          }, placeholder: "Phone number OR email", className: "w-full border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30", required: true })
        ] }),
        err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-red-500", children: err }),
        notFound && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl bg-amber-50 ring-1 ring-amber-200 p-4 text-sm text-amber-800", children: [
          "No appointments found with this phone or email. Have you booked before?",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "ml-2 inline-flex items-center gap-1 font-semibold underline", children: "Book now →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "mt-4 w-full rounded-xl bg-crimson text-crimson-foreground py-3 text-sm font-semibold disabled:opacity-50", children: busy ? "Searching…" : "Find my appointments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-2xl bg-white ring-1 ring-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-xs text-muted-foreground hover:text-primary", children: "Advanced: sign in with email & password →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordSignIn, { show: showPassword, onToggleShow: () => setShowPassword((s) => !s) }) })
      ] })
    ] }) })
  ] });
}
function PasswordSignIn({
  show,
  onToggleShow
}) {
  const [email, setEmail] = reactExports.useState("");
  const [pw, setPw] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
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
      setErr(e2.message ?? "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", className: "w-full border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: show ? "text" : "password", required: true, minLength: 6, value: pw, onChange: (e) => setPw(e.target.value), placeholder: "Password", className: "w-full border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onToggleShow, className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold disabled:opacity-50", children: busy ? "Please wait…" : "Sign In" })
  ] });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 48 48", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FFC107", d: "M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.2-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c11 0 19.5-8 19.5-19.5 0-1.3-.1-2.3-.4-3.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FF3D00", d: "M6.3 14.7l6.6 4.8C14.7 16.1 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5c-7.3 0-13.6 4.1-16.7 10.2z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4CAF50", d: "M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.5 2.2-7.1 2.2-5.2 0-9.7-3-11.5-7.4l-6.5 5C9.3 39.3 16 43.5 24 43.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#1976D2", d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.8l6.1 5c4.3-3.9 6.8-9.7 6.8-16.3 0-1.3-.1-2.3-.4-3z" })
  ] });
}
function PatientDashboard(props) {
  const {
    heading,
    authedUser,
    contactAppts,
    contact,
    onExit
  } = props;
  const [appts, setAppts] = reactExports.useState(contactAppts ?? []);
  const [loading, setLoading] = reactExports.useState(!contactAppts);
  async function load() {
    if (contact) {
      setLoading(true);
      const {
        data
      } = await supabase.rpc("find_appointments_by_contact", {
        _contact: contact
      });
      setAppts(data ?? []);
      setLoading(false);
      return;
    }
    if (authedUser) {
      setLoading(true);
      const {
        data: byUid
      } = await supabase.from("appointments").select("*").eq("user_id", authedUser.id).order("date", {
        ascending: false
      });
      let rows = byUid ?? [];
      if (rows.length === 0 && authedUser.email) {
        const {
          data
        } = await supabase.rpc("find_appointments_by_contact", {
          _contact: authedUser.email
        });
        rows = data ?? [];
      }
      setAppts(rows);
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, [authedUser?.id, contact]);
  const [rescheduleFor, setRescheduleFor] = reactExports.useState(null);
  async function cancel(a) {
    if (!confirm("Cancel this appointment?")) return;
    if (contact) {
      await supabase.rpc("cancel_appointment_by_contact", {
        _id: a.id,
        _contact: contact
      });
    } else {
      await supabase.rpc("cancel_my_appointment", {
        _id: a.id
      });
    }
    load();
  }
  async function doReschedule(a, newDate, newSlot) {
    const {
      data,
      error
    } = contact ? await supabase.rpc("reschedule_appointment_by_contact", {
      _id: a.id,
      _contact: contact,
      _new_date: newDate,
      _new_slot: newSlot
    }) : await supabase.rpc("reschedule_my_appointment", {
      _id: a.id,
      _new_date: newDate,
      _new_slot: newSlot
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Rescheduled to ${newDate} at ${newSlot}${data ? ` · Token #${data}` : ""}`);
    setRescheduleFor(null);
    load();
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Patient Portal", title: "My Appointments", subtitle: heading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-primary", children: "Your bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-4 py-2 text-sm font-semibold", children: "+ New booking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onExit, className: "inline-flex items-center gap-2 rounded-full ring-1 ring-border px-4 py-2 text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            " ",
            authedUser ? "Sign out" : "Search again"
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading appointments…" }) : appts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-10 w-10 text-muted-foreground/30 mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: "No appointments yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "mt-4 inline-block rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold", children: "Book one now" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: appts.map((a) => {
        const upcoming = a.date >= today && a.status !== "cancelled";
        const fmt = (d) => d ? new Date(d).toLocaleString("en-IN") : null;
        const hasTimeline = a.payment_submitted_at || a.payment_verified_at || a.payment_rejected_at;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                a.token_number != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-bold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-3 w-3" }),
                  " #",
                  a.token_number
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOR[a.status] ?? "bg-slate-100 text-slate-600"}`, children: a.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.payment_status === "paid" || a.payment_status === "verified" ? "bg-emerald-100 text-emerald-700" : a.payment_status === "pending_verification" ? "bg-amber-100 text-amber-700" : a.payment_status === "rejected" ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"}`, children: a.payment_status === "pending_verification" ? "pending verification" : a.payment_status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-semibold text-primary", children: [
                a.date,
                " at ",
                a.slot
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: a.mode }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 text-sm text-foreground italic", children: [
                '"',
                a.concern,
                '"'
              ] })
            ] }),
            upcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRescheduleFor(a), className: "inline-flex items-center gap-1.5 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 ring-1 ring-primary/20 px-3 py-1.5 text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-3.5 w-3.5" }),
                " Reschedule"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => cancel(a), className: "inline-flex items-center gap-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 ring-1 ring-red-200 px-3 py-1.5 text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                " Cancel"
              ] })
            ] })
          ] }),
          a.payment_status === "rejected" && a.payment_rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl bg-red-50 ring-1 ring-red-200 p-3 text-sm text-red-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Payment rejected by clinic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs", children: [
              "Reason: ",
              a.payment_rejection_reason
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "mt-2 inline-block text-xs font-semibold underline", children: "Resubmit / book again →" })
          ] }),
          hasTimeline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl ring-1 ring-border bg-[oklch(0.98_0.005_268)] p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Payment timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "relative border-l-2 border-border ml-2 space-y-2", children: [
              a.payment_submitted_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-3 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary", children: "Submitted by you" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                  fmt(a.payment_submitted_at),
                  " · ",
                  a.payment_method ?? "—",
                  a.payment_reference ? ` · ${a.payment_reference}` : ""
                ] })
              ] }),
              a.payment_status === "pending_verification" && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-3 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-amber-700", children: "Pending clinic verification" })
              ] }),
              a.payment_verified_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-3 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-emerald-600 ring-2 ring-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-emerald-700", children: "Verified by clinic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: fmt(a.payment_verified_at) })
              ] }),
              a.payment_rejected_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-3 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-red-600", children: "Rejected by clinic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: fmt(a.payment_rejected_at) })
              ] })
            ] })
          ] })
        ] }, a.id);
      }) })
    ] }) }),
    rescheduleFor && /* @__PURE__ */ jsxRuntimeExports.jsx(RescheduleDialog, { appt: rescheduleFor, onClose: () => setRescheduleFor(null), onConfirm: (d, s) => doReschedule(rescheduleFor, d, s) })
  ] });
}
function RescheduleDialog({
  appt,
  onClose,
  onConfirm
}) {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const [date, setDate] = reactExports.useState(appt.date >= today ? appt.date : today);
  const [slot, setSlot] = reactExports.useState("");
  const [slotInfo, setSlotInfo] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!date) {
      setSlotInfo([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{
        data: customSlots
      }, {
        data: appts
      }] = await Promise.all([supabase.from("slots").select("time_label, is_blocked").eq("date", date), supabase.from("appointments").select("slot").eq("date", date).neq("status", "cancelled")]);
      if (cancelled) return;
      const labels = customSlots && customSlots.length > 0 ? customSlots.map((s) => s.time_label) : DEFAULT_SLOTS;
      setSlotInfo(labels.map((label) => {
        const custom = customSlots?.find((s) => s.time_label === label);
        const booked = (appts ?? []).filter((a) => a.slot === label).length;
        return {
          time_label: label,
          is_blocked: custom?.is_blocked ?? false,
          booked
        };
      }));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [date]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-border p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-auto", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-primary", children: "Reschedule appointment" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
      "Currently ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: appt.date }),
      " at ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: appt.slot }),
      ". Pick a new date and slot below."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "New date" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: date, min: today, onChange: (e) => {
      setDate(e.target.value);
      setSlot("");
    }, className: "mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "New slot" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Loading slot availability…" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2", children: slotInfo.map((s) => {
        const disabled = s.is_blocked;
        const selected = slot === s.time_label;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled, onClick: () => setSlot(s.time_label), className: `rounded-xl border px-3 py-2.5 text-left transition ${selected ? "border-crimson bg-crimson/5 ring-1 ring-crimson" : disabled ? "border-border bg-muted/40 opacity-50 cursor-not-allowed" : "border-border bg-white hover:border-primary"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary", children: s.time_label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
            s.is_blocked ? "Blocked" : `${s.booked} booked`
          ] })
        ] }, s.time_label);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2 justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-lg ring-1 ring-border px-4 py-2 text-sm font-semibold", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !slot || busy || date === appt.date && slot === appt.slot, onClick: async () => {
        setBusy(true);
        await onConfirm(date, slot);
        setBusy(false);
      }, className: "rounded-lg bg-crimson text-crimson-foreground px-5 py-2 text-sm font-semibold disabled:opacity-50", children: busy ? "Rescheduling…" : "Confirm reschedule" })
    ] })
  ] }) });
}
export {
  MyAppointmentsPage as component
};
