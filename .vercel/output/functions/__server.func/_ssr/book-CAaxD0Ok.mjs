import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout, P as PageHero, C as CLINIC, t as telPrimary, w as waLink } from "./router-BdWqalL7.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import { L as Languages, af as Users, S as MessageCircle, s as CreditCard, a9 as Ticket, z as IndianRupee, t as ExternalLink, n as CircleCheck, a as ArrowLeft, r as Clock, Y as Phone, C as Calendar } from "../_libs/lucide-react.mjs";
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
const DEFAULT_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];
const RAZORPAY_PAYMENT_LINK = "https://rzp.io/rzp/WDAOAmmE";
const LANGUAGES = ["Hindi", "English", "Gujarati", "Marathi"];
const PUBLIC_FEE = 500;
const FINAL_FEE = 518;
const emptyForm = () => ({
  name: "",
  age: "",
  phone: "",
  email: "",
  date: "",
  slot: "",
  concern: "",
  mode: "Clinic Visit",
  consultLang: "Hindi"
});
function Book() {
  const [step, setStep] = reactExports.useState("form");
  const [form, setForm] = reactExports.useState(emptyForm());
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [apptId, setApptId] = reactExports.useState(null);
  const [token, setToken] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [slotInfo, setSlotInfo] = reactExports.useState([]);
  const [loadingSlots, setLoadingSlots] = reactExports.useState(false);
  const [payMethod, setPayMethod] = reactExports.useState("");
  const [txnId, setTxnId] = reactExports.useState("");
  const [cashDate, setCashDate] = reactExports.useState("");
  const [cashAmount, setCashAmount] = reactExports.useState("");
  const isTelemed = form.mode === "Telemedicine (Video)";
  const valid = form.name && form.phone && form.date && form.slot && form.concern;
  reactExports.useEffect(() => {
    if (!form.date) {
      setSlotInfo([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoadingSlots(true);
      const [{
        data: customSlots
      }, {
        data: appts
      }] = await Promise.all([supabase.from("slots").select("time_label, is_blocked").eq("date", form.date), supabase.from("appointments").select("slot").eq("date", form.date).neq("status", "cancelled")]);
      if (cancelled) return;
      const labels = customSlots && customSlots.length > 0 ? customSlots.map((s) => s.time_label) : DEFAULT_SLOTS;
      const info = labels.map((label) => {
        const custom = customSlots?.find((s) => s.time_label === label);
        const booked = (appts ?? []).filter((a) => a.slot === label).length;
        return {
          time_label: label,
          is_blocked: custom?.is_blocked ?? false,
          booked
        };
      });
      setSlotInfo(info);
      setLoadingSlots(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [form.date]);
  async function submitForm(e) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setError("");
    const {
      data: tokenData,
      error: tokenErr
    } = await supabase.rpc("allocate_token", {
      _date: form.date,
      _slot: form.slot
    });
    if (tokenErr) {
      setError(tokenErr.message);
      setSubmitting(false);
      setForm({
        ...form,
        slot: ""
      });
      return;
    }
    const newToken = tokenData;
    let authedUserId = null;
    const {
      data: userData
    } = await supabase.auth.getUser();
    if (userData.user) {
      authedUserId = userData.user.id;
    } else {
      const {
        data: anonData
      } = await supabase.auth.signInAnonymously();
      const {
        data: verified
      } = await supabase.auth.getUser();
      authedUserId = verified.user?.id ?? anonData.user?.id ?? null;
    }
    const modeWithLang = isTelemed ? `Telemedicine (Video) — ${form.consultLang}` : form.mode;
    const {
      data,
      error: dbErr
    } = await supabase.from("appointments").insert({
      user_id: authedUserId,
      name: form.name,
      age: form.age || null,
      phone: form.phone,
      email: form.email || null,
      mode: modeWithLang,
      date: form.date,
      slot: form.slot,
      concern: form.concern,
      status: "pending",
      payment_status: "unpaid",
      token_number: newToken
    }).select("id").single();
    setSubmitting(false);
    if (dbErr) {
      setError(dbErr.message);
      return;
    }
    if (data) {
      setApptId(data.id);
      setToken(newToken);
    }
    setStep("payment");
  }
  function payNow() {
    window.open(RAZORPAY_PAYMENT_LINK, "_blank", "noopener,noreferrer");
  }
  function iHavePaid() {
    setError("");
    setPayMethod("");
    setTxnId("");
    setCashDate("");
    setCashAmount("");
    setStep("confirm");
  }
  async function submitPaymentConfirmation() {
    setError("");
    if (!payMethod) {
      setError("Please select how you paid.");
      return;
    }
    if (payMethod === "online" && txnId.trim().length < 4) {
      setError("Please enter a valid transaction / UPI reference ID.");
      return;
    }
    if (payMethod === "cash") {
      if (!cashDate) {
        setError("Please enter the payment date.");
        return;
      }
      if (!cashAmount || Number(cashAmount) <= 0) {
        setError("Please enter the amount paid.");
        return;
      }
    }
    if (apptId) {
      const reference = payMethod === "online" ? txnId.trim() : `Cash on ${cashDate} · ₹${cashAmount}`;
      const {
        error: rpcErr
      } = await supabase.rpc("mark_payment_pending_verification", {
        _id: apptId,
        _method: payMethod,
        _reference: reference
      });
      if (rpcErr) {
        setError(rpcErr.message);
        return;
      }
    }
    const paymentLine = payMethod === "online" ? `Payment: ₹${PUBLIC_FEE} - Online · Txn ID: ${txnId.trim()} (pending verification)` : `Payment: ₹${cashAmount} - Cash · Paid on ${cashDate} (pending verification)`;
    const msg = [`*Appointment request — Jain ENT Hospital*`, `Name: ${form.name}`, `Phone: ${form.phone}`, `Mode: ${form.mode}`, isTelemed ? `Language: ${form.consultLang}` : "", `Date: ${form.date}  Slot: ${form.slot}`, token ? `Token Number: ${token}` : "", `Concern: ${form.concern}`, `${paymentLine}${apptId ? `  (Ref: ${apptId.slice(0, 8)})` : ""}`].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setStep("done");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Appointments", title: "Book your ENT or face-surgery consultation.", subtitle: "Tell us when you'd like to visit. The ₹500 consultation fee appears only at the secure payment step — never before." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight grid lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
        step === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitForm, className: "rounded-2xl bg-white ring-1 ring-border p-6 sm:p-8 shadow-soft space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }), className: "input", placeholder: "e.g. Ramesh Patel" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Age", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.age, onChange: (e) => setForm({
              ...form,
              age: e.target.value
            }), className: "input", placeholder: "e.g. 34", inputMode: "numeric" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone / WhatsApp", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.phone, onChange: (e) => setForm({
              ...form,
              phone: e.target.value
            }), className: "input", placeholder: "+91", type: "tel" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), className: "input", placeholder: "you@example.com", type: "email" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Consultation mode", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.mode, onChange: (e) => setForm({
              ...form,
              mode: e.target.value
            }), className: "input", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Clinic Visit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Telemedicine (Video)" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preferred date", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "date", value: form.date, min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), onChange: (e) => setForm({
              ...form,
              date: e.target.value,
              slot: ""
            }), className: "input" }) })
          ] }),
          isTelemed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/5 ring-1 ring-primary/20 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-primary mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-4 w-4" }),
              " Preferred consultation language"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${form.consultLang === l ? "bg-crimson text-crimson-foreground ring-crimson" : "bg-white ring-border text-foreground hover:ring-primary"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "consultLang", value: l, checked: form.consultLang === l, onChange: () => setForm({
                ...form,
                consultLang: l
              }), className: "sr-only" }),
              l
            ] }, l)) })
          ] }),
          form.date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
              "Preferred slot ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-crimson", children: "*" })
            ] }),
            loadingSlots ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Loading slot availability…" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2", children: slotInfo.map((s) => {
              const disabled = s.is_blocked;
              const selected = form.slot === s.time_label;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled, onClick: () => setForm({
                ...form,
                slot: s.time_label
              }), className: `rounded-xl border px-3 py-2.5 text-left transition ${selected ? "border-crimson bg-crimson/5 ring-1 ring-crimson" : disabled ? "border-border bg-muted/40 opacity-50 cursor-not-allowed" : "border-border bg-white hover:border-primary"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary", children: s.time_label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                  s.is_blocked ? "Blocked" : `${s.booked} booked`
                ] })
              ] }, s.time_label);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Briefly describe your concern", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 4, value: form.concern, onChange: (e) => setForm({
            ...form,
            concern: e.target.value
          }), className: "input resize-none", placeholder: "e.g. Right ear has been blocked for 2 weeks with mild pain." }) }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !valid || submitting, className: "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-sm font-semibold text-crimson-foreground disabled:opacity-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
            " ",
            submitting ? "Reserving…" : "Continue to payment"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Sunday closed. Emergencies: call ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline", href: `tel:${telPrimary}`, children: CLINIC.phones.primary }),
            " (24×7)."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Prefer to call if slot not available / found — ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline", href: `tel:${telPrimary}`, children: CLINIC.phones.primary }),
            " (24×7)."
          ] })
        ] }),
        step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-8 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-crimson/10 text-crimson mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary", children: "Secure payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Your slot will be reserved once the payment is complete." }),
          token !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-4 py-2 text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-4 w-4" }),
            " Your token number: ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg", children: [
              "#",
              token
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-[oklch(0.97_0.01_268)] ring-1 ring-border p-5 space-y-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Patient", v: form.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Date", v: `${form.date} · ${form.slot}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Mode", v: form.mode }),
            isTelemed && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Language", v: form.consultLang }),
            token !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Token #", v: String(token) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 mt-2 flex justify-between font-bold text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Consultation fee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-crimson text-lg", children: [
                "₹",
                PUBLIC_FEE
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
            "Secured by Razorpay. UPI, cards, net banking, wallets accepted."
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-red-500", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: payNow, className: "inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-7 py-3.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
              " Pay ₹",
              PUBLIC_FEE,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-80" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: iHavePaid, className: "inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-3.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              " I've paid — notify clinic"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep("form"), className: "inline-flex items-center gap-2 rounded-full ring-1 ring-border px-5 py-3.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              " Edit details"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
            "After completing payment in the Razorpay window, tap ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: `"I've paid"` }),
            " so the clinic receives your confirmation on WhatsApp instantly."
          ] })
        ] }),
        step === "confirm" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-8 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary", children: "Confirm your payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Please tell us how you paid so our team can verify and confirm your slot." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
              "Payment method ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-crimson", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 gap-2 max-w-md", children: [{
              v: "online",
              label: "Online (UPI / Card / Razorpay)"
            }, {
              v: "cash",
              label: "Cash / Offline"
            }].map((opt) => {
              const selected = payMethod === opt.v;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setPayMethod(opt.v), className: `rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${selected ? "border-crimson bg-crimson/5 ring-1 ring-crimson text-primary" : "border-border bg-white hover:border-primary text-foreground"}`, children: opt.label }, opt.v);
            }) })
          ] }),
          payMethod === "online" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Transaction / UPI reference ID", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: txnId, onChange: (e) => setTxnId(e.target.value), className: "input", placeholder: "e.g. 4296531238XXX or UPI ref" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "You can find this in your UPI app, bank SMS or Razorpay receipt." })
          ] }),
          payMethod === "cash" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid sm:grid-cols-2 gap-4 max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date of payment", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: cashDate, max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), onChange: (e) => setCashDate(e.target.value), className: "input" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Amount paid (₹)", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cashAmount, inputMode: "numeric", onChange: (e) => setCashAmount(e.target.value.replace(/[^\d]/g, "")), className: "input", placeholder: "e.g. 500" }) })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-red-500", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: submitPaymentConfirmation, className: "inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-7 py-3.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              " Send confirmation on WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep("payment"), className: "inline-flex items-center gap-2 rounded-full ring-1 ring-border px-5 py-3.5 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              " Back"
            ] })
          ] })
        ] }),
        step === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-8 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary mt-3", children: "Appointment confirmed!" }),
          token !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-base text-primary", children: [
            "Your token: ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
              "#",
              token
            ] }),
            " · ",
            form.date,
            " · ",
            form.slot
          ] }),
          isTelemed && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            "Telemedicine (Video) · Language: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: form.consultLang })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2 text-sm", children: [
            "Payment received · ₹",
            FINAL_FEE,
            " (incl. all charges). We've sent a WhatsApp confirmation. Our team will reach you within clinic hours (",
            CLINIC.hours.weekdays,
            ")."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 ring-1 ring-amber-200 px-3 py-1.5 text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
            " Payment status: Pending verification"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl ring-1 ring-border bg-[oklch(0.98_0.005_268)] p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Payment timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "relative border-l-2 border-amber-300/60 ml-2 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary", children: "Submitted by you" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: (/* @__PURE__ */ new Date()).toLocaleString("en-IN") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "Method: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "capitalize", children: payMethod }),
                  payMethod === "online" && txnId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    " · Ref: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: txnId })
                  ] }),
                  payMethod === "cash" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    " · ₹",
                    cashAmount,
                    " on ",
                    cashDate
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-amber-400 ring-2 ring-white animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-amber-700", children: "Pending verification" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Our team reviews payments within clinic hours." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-4 opacity-60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-slate-300 ring-2 ring-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-slate-500", children: "Verified / Rejected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  "You'll see the final status on ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "My Appointments" }),
                  "."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-appointments", className: "inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold", children: "View My Appointments →" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${telPrimary}`, className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
              " Call ",
              CLINIC.phones.primary
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setStep("form");
              setToken(null);
              setApptId(null);
              setForm(emptyForm());
            }, className: "inline-flex items-center gap-2 rounded-full ring-1 ring-border px-5 py-2.5 text-sm font-semibold", children: "New booking" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:col-span-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary text-primary-foreground p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-4 space-y-3 text-sm opacity-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: 1 }),
              " Fill in your details and pick an available slot."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: 2 }),
              " Get an instant token number."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: 3 }),
              " Pay ₹",
              PUBLIC_FEE,
              " securely via Razorpay — slot locked instantly."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: 4 }),
              " Visit clinic or connect via video on the day."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-6 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-crimson" }),
            " ",
            CLINIC.hours.weekdays
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-crimson" }),
            " ",
            CLINIC.hours.sunday
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4 text-crimson" }),
            " ₹",
            PUBLIC_FEE,
            " — shown only at payment step"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-4 w-4 text-crimson" }),
            " Token issued instantly on booking"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${telPrimary}`, className: "block rounded-2xl bg-crimson text-crimson-foreground p-5 text-center font-semibold", children: [
          "Prefer to call? ",
          CLINIC.phones.primary
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .input{width:100%;border:1px solid var(--color-border);border-radius:.625rem;padding:.7rem .85rem;font-size:.95rem;background:white}
        .input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent)}
      ` })
  ] });
}
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-crimson", children: " *" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children })
  ] });
}
function Step({
  n
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 h-6 w-6 rounded-full bg-crimson text-crimson-foreground text-xs font-bold inline-flex items-center justify-center", children: n });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: v })
  ] });
}
export {
  Book as component
};
