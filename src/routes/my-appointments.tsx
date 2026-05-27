import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase, type Appointment } from "@/lib/supabase";
import { Lock, Mail, Eye, EyeOff, Ticket, XCircle, CalendarCheck, LogOut } from "lucide-react";

export const Route = createFileRoute("/my-appointments")({
  head: () => ({
    meta: [
      { title: "My Appointments — Jain ENT Hospital" },
      { name: "description", content: "View and manage your ENT appointments at Jain ENT Hospital, Deesa." },
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

function MyAppointmentsPage() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { id: data.user.id, email: data.user.email ?? "" } : null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user ? { id: s.user.id, email: s.user.email ?? "" } : null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <SiteLayout><div className="py-20 text-center text-muted-foreground">Loading…</div></SiteLayout>;
  if (!user) return <PatientLogin />;
  return <PatientDashboard user={user} />;
}

function PatientLogin() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setInfo(""); setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email, password: pw,
          options: { emailRedirectTo: `${window.location.origin}/my-appointments` },
        });
        if (error) throw error;
        setInfo("Account created. If email confirmation is needed, check your inbox. Otherwise sign in below.");
        setMode("signin");
      }
    } catch (e: any) { setErr(e.message || "Something went wrong"); }
    finally { setBusy(false); }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Patient Login" title="My Appointments" subtitle="Sign in to view and manage your bookings." />
      <section className="py-14">
        <div className="container-tight max-w-md mx-auto">
          <div className="rounded-2xl bg-white ring-1 ring-border p-8 shadow-soft">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary text-primary-foreground mb-5">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold text-primary">{mode === "signin" ? "Sign in" : "Create account"}</h2>
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Email</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Password</label>
                <div className="relative mt-1.5">
                  <input type={show ? "text" : "password"} required minLength={6} value={pw} onChange={e => setPw(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {err && <p className="text-xs text-red-500">{err}</p>}
              {info && <p className="text-xs text-emerald-600">{info}</p>}
              <button type="submit" disabled={busy}
                className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold disabled:opacity-50">
                {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>
            <button onClick={() => { setMode(m => m === "signin" ? "signup" : "signin"); setErr(""); setInfo(""); }}
              className="mt-4 w-full text-xs text-muted-foreground hover:text-primary">
              {mode === "signin" ? "New patient? Create an account →" : "← Back to sign in"}
            </button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function PatientDashboard({ user }: { user: { id: string; email: string } }) {
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });
    setAppts((data ?? []) as Appointment[]);
    setLoading(false);
  }
  useEffect(() => { load(); }, [user.id]);

  async function cancel(a: Appointment) {
    if (!confirm("Cancel this appointment?")) return;
    await supabase.rpc("cancel_my_appointment", { _id: a.id });
    load();
  }

  async function logout() { await supabase.auth.signOut(); }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <SiteLayout>
      <PageHero eyebrow="Patient Portal" title="My Appointments" subtitle={`Signed in as ${user.email}`} />
      <section className="py-14">
        <div className="container-tight">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-primary">Your bookings</h2>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full ring-1 ring-border px-4 py-2 text-sm font-semibold">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading appointments…</p>
          ) : appts.length === 0 ? (
            <div className="rounded-2xl ring-1 ring-border bg-white p-12 text-center">
              <CalendarCheck className="h-10 w-10 text-muted-foreground/30 mx-auto" />
              <p className="text-sm text-muted-foreground mt-3">No appointments yet.</p>
              <a href="/book" className="mt-4 inline-block rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold">Book one now</a>
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
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.payment_status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                            {a.payment_status}
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
