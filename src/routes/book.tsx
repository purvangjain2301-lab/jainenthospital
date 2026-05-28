import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CLINIC, telPrimary, waLink } from "@/lib/clinic";
import {
  CheckCircle2, MessageCircle, Phone, Calendar, Clock, IndianRupee,
  CreditCard, ArrowLeft, ExternalLink, Ticket, Users,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Appointment — Jain ENT Hospital, Deesa" },
      { name: "description", content: "Reserve an ENT consultation with Prof. Dr. Devendra M. Jain in Deesa. Mon–Sat 10 AM–7 PM. Pay only when confirmed." },
      { property: "og:title", content: "Book Appointment — Jain ENT Hospital" },
      { property: "og:description", content: "Reserve your ENT consult in Deesa." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: Book,
});

const DEFAULT_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];
const RAZORPAY_PAYMENT_LINK = "https://rzp.io/rzp/3hpqLFJU";
const MAX_CAPACITY = 12;

type Step = "form" | "payment" | "done";
type SlotInfo = { time_label: string; max_capacity: number; is_blocked: boolean; booked: number };

function Book() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({
    name: "", age: "", phone: "", email: "", date: "", slot: "", concern: "", mode: "Clinic Visit",
  });
  const [submitting, setSubmitting] = useState(false);
  const [apptId, setApptId] = useState<string | null>(null);
  const [token, setToken] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [slotInfo, setSlotInfo] = useState<SlotInfo[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const valid = form.name && form.phone && form.date && form.slot && form.concern;

  // Load slots whenever date changes
  useEffect(() => {
    if (!form.date) { setSlotInfo([]); return; }
    let cancelled = false;
    (async () => {
      setLoadingSlots(true);
      const [{ data: customSlots }, { data: appts }] = await Promise.all([
        supabase.from("slots").select("time_label, max_capacity, is_blocked").eq("date", form.date),
        supabase
          .from("appointments")
          .select("slot")
          .eq("date", form.date)
          .neq("status", "cancelled"),
      ]);
      if (cancelled) return;

      const labels = customSlots && customSlots.length > 0
        ? customSlots.map((s: any) => s.time_label)
        : DEFAULT_SLOTS;

      const info: SlotInfo[] = labels.map((label) => {
        const custom = customSlots?.find((s: any) => s.time_label === label);
        const booked = (appts ?? []).filter((a: any) => a.slot === label).length;
        return {
          time_label: label,
          max_capacity: custom?.max_capacity ?? MAX_CAPACITY,
          is_blocked: custom?.is_blocked ?? false,
          booked,
        };
      });
      setSlotInfo(info);
      setLoadingSlots(false);
    })();
    return () => { cancelled = true; };
  }, [form.date]);

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setError("");

    // Allocate token using DB function
    const { data: tokenData, error: tokenErr } = await supabase
      .rpc("allocate_token", { _date: form.date, _slot: form.slot });
    if (tokenErr) {
      setError(tokenErr.message); setSubmitting(false); return;
    }
    const newToken = tokenData as number;

    // Ensure we have a session (anon or real) so RLS insert policy is satisfied.
    // If anonymous sign-in is disabled or the session isn't ready, fall back to null user_id (policy allows it).
    let authedUserId: string | null = null;
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      authedUserId = userData.user.id;
    } else {
      const { data: anonData } = await supabase.auth.signInAnonymously();
      // Re-read to confirm the session is active before we send user_id
      const { data: verified } = await supabase.auth.getUser();
      authedUserId = verified.user?.id ?? anonData.user?.id ?? null;
    }

const { data, error: dbErr } = await supabase
  .from("appointments")
  .insert({
    user_id: authedUserId,

        name:           form.name,
        age:            form.age || null,
        phone:          form.phone,
        email:          form.email || null,
        mode:           form.mode,
        date:           form.date,
        slot:           form.slot,
        concern:        form.concern,
        status:         "pending",
        payment_status: "unpaid",
        token_number:   newToken,
      })
      .select("id")
      .single();

    setSubmitting(false);
    if (dbErr) { setError(dbErr.message); return; }
    if (data) {
      setApptId((data as { id: string }).id);
      setToken(newToken);
    }
    setStep("payment");
  }

  function payNow() {
    window.open(RAZORPAY_PAYMENT_LINK, "_blank", "noopener,noreferrer");
  }

  async function iHavePaid() {
    if (apptId) {
      await supabase.rpc("mark_payment_pending_verification", { _id: apptId });
    }
    const msg = [
      `*Appointment request — Jain ENT Hospital*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Mode: ${form.mode}`,
      `Date: ${form.date}  Slot: ${form.slot}`,
      token ? `Token Number: ${token}` : "",
      `Concern: ${form.concern}`,
      `Payment: ₹500 - Payment confirmation pending. Please verify before appointment.${apptId ? `  (Ref: ${apptId.slice(0,8)})` : ""}`,
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setStep("done");
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Appointments"
        title="Book your ENT consultation."
        subtitle="Tell us when you'd like to visit. The ₹500 consultation fee appears only at the secure payment step — never before."
      />

      <section className="py-14">
        <div className="container-tight grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">

            {step === "form" && (
              <form onSubmit={submitForm} className="rounded-2xl bg-white ring-1 ring-border p-6 sm:p-8 shadow-soft space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" required>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="input" placeholder="e.g. Ramesh Patel" />
                  </Field>
                  <Field label="Age">
                    <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
                      className="input" placeholder="e.g. 34" inputMode="numeric" />
                  </Field>
                  <Field label="Phone / WhatsApp" required>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="input" placeholder="+91" type="tel" />
                  </Field>
                  <Field label="Email (optional)">
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="input" placeholder="you@example.com" type="email" />
                  </Field>
                  <Field label="Consultation mode">
                    <select value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })} className="input">
                      <option>Clinic Visit</option>
                      <option>Telemedicine (Video)</option>
                    </select>
                  </Field>
                  <Field label="Preferred date" required>
                    <input required type="date" value={form.date} min={new Date().toISOString().slice(0, 10)}
                      onChange={e => setForm({ ...form, date: e.target.value, slot: "" })} className="input" />
                  </Field>
                </div>

                {form.date && (
                  <div>
                    <span className="text-sm font-medium text-foreground">Preferred slot <span className="text-crimson">*</span></span>
                    {loadingSlots ? (
                      <p className="text-xs text-muted-foreground mt-2">Loading slot availability…</p>
                    ) : (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {slotInfo.map(s => {
                          const full = s.booked >= s.max_capacity;
                          const disabled = full || s.is_blocked;
                          const selected = form.slot === s.time_label;
                          return (
                            <button
                              key={s.time_label}
                              type="button"
                              disabled={disabled}
                              onClick={() => setForm({ ...form, slot: s.time_label })}
                              className={`rounded-xl border px-3 py-2.5 text-left transition ${
                                selected ? "border-crimson bg-crimson/5 ring-1 ring-crimson"
                                : disabled ? "border-border bg-muted/40 opacity-50 cursor-not-allowed"
                                : "border-border bg-white hover:border-primary"
                              }`}
                            >
                              <div className="text-sm font-semibold text-primary">{s.time_label}</div>
                              <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {s.is_blocked ? "Blocked" : full ? "Full" : `${s.booked}/${s.max_capacity}`}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <Field label="Briefly describe your concern" required>
                  <textarea required rows={4} value={form.concern} onChange={e => setForm({ ...form, concern: e.target.value })}
                    className="input resize-none" placeholder="e.g. Right ear has been blocked for 2 weeks with mild pain." />
                </Field>

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button type="submit" disabled={!valid || submitting}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-sm font-semibold text-crimson-foreground disabled:opacity-50">
                  <MessageCircle className="h-4 w-4" /> {submitting ? "Reserving…" : "Continue to payment"}
                </button>
                <p className="text-xs text-muted-foreground">Sunday closed. Emergencies: call {CLINIC.phones.primary} (24×7).</p>
               <p className="text-xs text-muted-foreground"> Prefer to Call if slot not AVAILABLE / FOUND  {CLINIC.phones.primary} (24×7).</p>
              </form>
            )}

            {step === "payment" && (
              <div className="rounded-2xl bg-white ring-1 ring-border p-8 shadow-soft">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-crimson/10 text-crimson mb-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-primary">Secure payment</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Your slot will be reserved once the payment is complete.
                </p>

                {token !== null && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-4 py-2 text-sm font-semibold">
                    <Ticket className="h-4 w-4" /> Your token number: <span className="text-lg">#{token}</span>
                  </div>
                )}

                <div className="mt-5 rounded-xl bg-[oklch(0.97_0.01_268)] ring-1 ring-border p-5 space-y-1.5 text-sm">
                  <Row k="Patient"  v={form.name} />
                  <Row k="Date"     v={`${form.date} · ${form.slot}`} />
                  <Row k="Mode"     v={form.mode} />
                  {token !== null && <Row k="Token #"  v={String(token)} />}
                  <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-primary">
                    <span>Consultation fee</span>
                    <span className="text-crimson text-lg">₹500</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
                  <IndianRupee className="h-3.5 w-3.5" />
                  Secured by Razorpay. UPI, cards, net banking, wallets accepted.
                </p>

                {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={payNow}
                    className="inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-7 py-3.5 text-sm font-semibold">
                    <CreditCard className="h-4 w-4" /> Pay ₹500 <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                  </button>
                  <button onClick={iHavePaid}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-3.5 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> I've paid — notify clinic
                  </button>
                  <button onClick={() => setStep("form")}
                    className="inline-flex items-center gap-2 rounded-full ring-1 ring-border px-5 py-3.5 text-sm font-semibold">
                    <ArrowLeft className="h-4 w-4" /> Edit details
                  </button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  After completing payment in the Razorpay window, tap <b>"I've paid"</b> so the clinic receives your confirmation on WhatsApp instantly.
                </p>
              </div>
            )}

            {step === "done" && (
              <div className="rounded-2xl bg-white ring-1 ring-border p-8 shadow-soft">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                <h2 className="font-display text-2xl font-bold text-primary mt-3">Appointment confirmed!</h2>
                {token !== null && (
                  <p className="mt-2 text-base text-primary">
                    Your token: <b>#{token}</b> · {form.date} · {form.slot}
                  </p>
                )}
                <p className="text-muted-foreground mt-2 text-sm">
                  Payment received · ₹500. We've sent a WhatsApp confirmation. Our team will reach you
                  within clinic hours ({CLINIC.hours.weekdays}).
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`tel:${telPrimary}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                    <Phone className="h-4 w-4" /> Call {CLINIC.phones.primary}
                  </a>
                  <Link to="/my-appointments"
                    className="inline-flex items-center gap-2 rounded-full ring-1 ring-border px-5 py-2.5 text-sm font-semibold">
                    My Appointments
                  </Link>
                  <button onClick={() => { setStep("form"); setToken(null); setApptId(null); setForm({ name:"", age:"", phone:"", email:"", date:"", slot:"", concern:"", mode:"Clinic Visit" }); }}
                    className="inline-flex items-center gap-2 rounded-full ring-1 ring-border px-5 py-2.5 text-sm font-semibold">
                    New booking
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl bg-primary text-primary-foreground p-6">
              <h3 className="font-display text-xl font-bold">How it works</h3>
              <ol className="mt-4 space-y-3 text-sm opacity-95">
                <li className="flex gap-3"><Step n={1} /> Fill in your details and pick an available slot.</li>
                <li className="flex gap-3"><Step n={2} /> Get an instant token number.</li>
                <li className="flex gap-3"><Step n={3} /> Pay ₹500 securely via Razorpay — slot locked instantly.</li>
                <li className="flex gap-3"><Step n={4} /> Visit clinic or connect via video on the day.</li>
              </ol>
            </div>
            <div className="rounded-2xl ring-1 ring-border bg-white p-6 space-y-3 text-sm">
              <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-crimson" /> {CLINIC.hours.weekdays}</div>
              <div className="flex items-center gap-3"><Clock    className="h-4 w-4 text-crimson" /> {CLINIC.hours.sunday}</div>
              <div className="flex items-center gap-3"><IndianRupee className="h-4 w-4 text-crimson" /> ₹500 — shown only at payment step</div>
              <div className="flex items-center gap-3"><Ticket className="h-4 w-4 text-crimson" /> Token issued instantly on booking</div>
            </div>
            <a href={`tel:${telPrimary}`}
              className="block rounded-2xl bg-crimson text-crimson-foreground p-5 text-center font-semibold">
              Prefer to call? /  {CLINIC.phones.primary}
            </a>
          </aside>
        </div>
      </section>

      <style>{`
        .input{width:100%;border:1px solid var(--color-border);border-radius:.625rem;padding:.7rem .85rem;font-size:.95rem;background:white}
        .input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent)}
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}{required && <span className="text-crimson"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
function Step({ n }: { n: number }) {
  return <span className="shrink-0 h-6 w-6 rounded-full bg-crimson text-crimson-foreground text-xs font-bold inline-flex items-center justify-center">{n}</span>;
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
