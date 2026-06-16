import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase, type Appointment } from "@/lib/supabase";
import { lovable } from "@/integrations/lovable/index";
import {
  Lock, Mail, Eye, EyeOff, Ticket, XCircle, CalendarCheck, LogOut, Search, Phone,
} from "lucide-react";

export const Route = createFileRoute("/my-appointments")({
  head: () => ({
    meta: [
      { title: "My Appointments — Jain ENT Hospital" },
      { name: "description", content: "View and manage your ENT appointments at Jain ENT Hospital." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MyAppointmentsPage,
});

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  visited: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-600",
  "no-show": "bg-slate-200 text-slate-700",
};

type LookupSession =
  | { kind: "none" }
  | { kind: "user"; user: { id: string; email: string } }
  | { kind: "contact"; contact: string; appts: Appointment[] };

function MyAppointmentsPage() {
  const [session, setSession] = useState<LookupSession>({ kind: "none" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setSession({ kind: "user", user: { id: data.user.id, email: data.user.email ?? "" } });
      }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s?.user) {
        setSession({ kind: "user", user: { id: s.user.id, email: s.user.email ?? "" } });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <SiteLayout><div className="py-20 text-center text-muted-foreground">Loading…</div></SiteLayout>;
  }
  if (session.kind === "user") {
    return <PatientDashboard
      heading={`Signed in as ${session.user.email}`}
      authedUser={session.user}
      onExit={async () => { await supabase.auth.signOut(); setSession({ kind: "none" }); }}
    />;
  }
  if (session.kind === "contact") {
    return <PatientDashboard
      heading={`Showing appointments for ${session.contact}`}
      contactAppts={session.appts}
      contact={session.contact}
      onExit={() => setSession({ kind: "none" })}
    />;
  }
  return <PatientLogin onContactFound={(c, a) => setSession({ kind: "contact", contact: c, appts: a })} />;
}

// ─────────────────────────────────────────────────────────────────────────────

function PatientLogin({ onContactFound }: { onContactFound: (contact: string, appts: Appointment[]) => void }) {
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function googleSignIn() {
    setErr("");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/my-appointments",
    });
    if (result.error) setErr((result.error as Error).message ?? "Google sign-in failed");
  }

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setNotFound(false); setBusy(true);
    try {
      const trimmed = contact.trim();
      if (trimmed.length < 3) { setErr("Please enter a valid phone or email."); return; }
      const { data, error } = await supabase.rpc("find_appointments_by_contact", { _contact: trimmed });
      if (error) throw error;
      const appts = (data ?? []) as Appointment[];
      if (appts.length === 0) { setNotFound(true); return; }
      onContactFound(trimmed, appts);
    } catch (e: any) {
      setErr(e.message ?? "Lookup failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Patient Portal" title="My Appointments" subtitle="Look up your booking instantly with the phone or email you used — no password required." />
      <section className="py-14">
        <div className="container-tight max-w-md mx-auto space-y-5">

          {/* Google */}
          <div className="rounded-2xl bg-white ring-1 ring-border p-6 shadow-soft">
            <button onClick={googleSignIn}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-white ring-1 ring-border py-3 text-sm font-semibold text-foreground hover:bg-secondary transition">
              <GoogleIcon />
              Continue with Google
            </button>
            <p className="mt-2 text-[11px] text-muted-foreground text-center">
              We'll match your Google email to your bookings automatically.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or <div className="flex-1 h-px bg-border" />
          </div>

          {/* Phone or email lookup */}
          <form onSubmit={lookup} className="rounded-2xl bg-white ring-1 ring-border p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-primary">Continue with phone or email</h2>
                <p className="text-xs text-muted-foreground">Use the phone number or email you used when booking.</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={contact} onChange={e => { setContact(e.target.value); setNotFound(false); }}
                placeholder="Phone number OR email"
                className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
            {err && <p className="mt-3 text-xs text-red-500">{err}</p>}
            {notFound && (
              <div className="mt-4 rounded-xl bg-amber-50 ring-1 ring-amber-200 p-4 text-sm text-amber-800">
                No appointments found with this phone or email. Have you booked before?
                <Link to="/book" className="ml-2 inline-flex items-center gap-1 font-semibold underline">Book now →</Link>
              </div>
            )}
            <button type="submit" disabled={busy}
              className="mt-4 w-full rounded-xl bg-crimson text-crimson-foreground py-3 text-sm font-semibold disabled:opacity-50">
              {busy ? "Searching…" : "Find my appointments"}
            </button>
          </form>

          {/* Advanced: password */}
          <details className="rounded-2xl bg-white ring-1 ring-border p-5">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-primary">
              Advanced: sign in with email & password →
            </summary>
            <div className="mt-4">
              <PasswordSignIn show={showPassword} onToggleShow={() => setShowPassword(s => !s)} />
            </div>
          </details>
        </div>
      </section>
    </SiteLayout>
  );
}

function PasswordSignIn({ show, onToggleShow }: { show: boolean; onToggleShow: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) throw error;
    } catch (e: any) { setErr(e.message ?? "Sign-in failed"); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
          className="w-full border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type={show ? "text" : "password"} required minLength={6} value={pw} onChange={e => setPw(e.target.value)} placeholder="Password"
          className="w-full border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <button type="button" onClick={onToggleShow} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {err && <p className="text-xs text-red-500">{err}</p>}
      <button type="submit" disabled={busy}
        className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold disabled:opacity-50">
        {busy ? "Please wait…" : "Sign In"}
      </button>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.2-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c11 0 19.5-8 19.5-19.5 0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5c-7.3 0-13.6 4.1-16.7 10.2z"/>
      <path fill="#4CAF50" d="M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.5 2.2-7.1 2.2-5.2 0-9.7-3-11.5-7.4l-6.5 5C9.3 39.3 16 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.8l6.1 5c4.3-3.9 6.8-9.7 6.8-16.3 0-1.3-.1-2.3-.4-3z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function PatientDashboard(props: {
  heading: string;
  authedUser?: { id: string; email: string };
  contactAppts?: Appointment[];
  contact?: string;
  onExit: () => void;
}) {
  const { heading, authedUser, contactAppts, contact, onExit } = props;
  const [appts, setAppts] = useState<Appointment[]>(contactAppts ?? []);
  const [loading, setLoading] = useState(!contactAppts);

  async function load() {
    if (contact) {
      setLoading(true);
      const { data } = await supabase.rpc("find_appointments_by_contact", { _contact: contact });
      setAppts((data ?? []) as Appointment[]);
      setLoading(false);
      return;
    }
    if (authedUser) {
      setLoading(true);
      // Try user_id match first; if no rows, fall back to email match (e.g. Google sign-in after phone booking)
      const { data: byUid } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", authedUser.id)
        .order("date", { ascending: false });
      let rows = (byUid ?? []) as Appointment[];
      if (rows.length === 0 && authedUser.email) {
        const { data } = await supabase.rpc("find_appointments_by_contact", { _contact: authedUser.email });
        rows = (data ?? []) as Appointment[];
      }
      setAppts(rows);
      setLoading(false);
    }
  }
  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [authedUser?.id, contact]);

  async function cancel(a: Appointment) {
    if (!confirm("Cancel this appointment?")) return;
    if (contact) {
      await supabase.rpc("cancel_appointment_by_contact", { _id: a.id, _contact: contact });
    } else {
      await supabase.rpc("cancel_my_appointment", { _id: a.id });
    }
    load();
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <SiteLayout>
      <PageHero eyebrow="Patient Portal" title="My Appointments" subtitle={heading} />
      <section className="py-14">
        <div className="container-tight">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display text-xl font-bold text-primary">Your bookings</h2>
            <div className="flex gap-2">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-4 py-2 text-sm font-semibold">
                + New booking
              </Link>
              <button onClick={onExit} className="inline-flex items-center gap-2 rounded-full ring-1 ring-border px-4 py-2 text-sm font-semibold">
                <LogOut className="h-4 w-4" /> {authedUser ? "Sign out" : "Search again"}
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading appointments…</p>
          ) : appts.length === 0 ? (
            <div className="rounded-2xl ring-1 ring-border bg-white p-12 text-center">
              <CalendarCheck className="h-10 w-10 text-muted-foreground/30 mx-auto" />
              <p className="text-sm text-muted-foreground mt-3">No appointments yet.</p>
              <Link to="/book" className="mt-4 inline-block rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold">Book one now</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {appts.map(a => {
                const upcoming = a.date >= today && a.status !== "cancelled";
                return (
                  <div key={a.id} className="rounded-2xl bg-white ring-1 ring-border p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {a.token_number != null && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-bold">
                              <Ticket className="h-3 w-3" /> #{a.token_number}
                            </span>
                          )}
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOR[a.status] ?? "bg-slate-100 text-slate-600"}`}>{a.status}</span>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            a.payment_status === "paid" || a.payment_status === "verified"
                              ? "bg-emerald-100 text-emerald-700"
                              : a.payment_status === "pending_verification"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {a.payment_status === "pending_verification" ? "pending verification" : a.payment_status}
                          </span>
                        </div>
                        <div className="mt-2 font-semibold text-primary">{a.date} at {a.slot}</div>
                        <div className="text-sm text-muted-foreground">{a.mode}</div>
                        <div className="mt-1.5 text-sm text-foreground italic">"{a.concern}"</div>
                      </div>
                      {upcoming && (
                        <button onClick={() => cancel(a)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 ring-1 ring-red-200 px-3 py-1.5 text-xs font-semibold">
                          <XCircle className="h-3.5 w-3.5" /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
