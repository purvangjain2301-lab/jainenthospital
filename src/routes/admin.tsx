import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Image as ImageIcon, BookOpen, CalendarCheck, LogOut,
  Plus, Trash2, Eye, EyeOff, Upload, CheckCircle2, XCircle,
  Clock, Users, TrendingUp, FileText, Lock, Mail, ShieldAlert,
  Settings, MessageSquare, Search, Download, ArrowUpDown,
} from "lucide-react";
import { supabase, type GalleryItem, type BlogPost, type BlogPostDraft, type Appointment } from "@/lib/supabase";
import { ContentTab } from "@/components/admin/ContentTab";
import { ReviewsTab } from "@/components/admin/ReviewsTab";

// ── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Admin — Jain ENT Hospital" },
    ],
  }),
  component: AdminPage,
});

// ── Auth state ────────────────────────────────────────────────────────────────
type AuthState =
  | { stage: "loading" }
  | { stage: "signed-out" }
  | { stage: "signed-in"; userId: string; email: string; isAdmin: boolean };

function AdminPage() {
  const [auth, setAuth] = useState<AuthState>({ stage: "loading" });

  async function refresh() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setAuth({ stage: "signed-out" }); return; }
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    setAuth({ stage: "signed-in", userId: user.id, email: user.email ?? "", isAdmin: !!roleRow });
  }

  useEffect(() => {
    refresh();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { refresh(); });
    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setAuth({ stage: "signed-out" });
  }

  if (auth.stage === "loading") {
    return <div className="min-h-dvh flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (auth.stage === "signed-out") return <LoginScreen />;
  if (!auth.isAdmin) return <NotAuthorized email={auth.email} onLogout={logout} />;
  return <AdminShell email={auth.email} onLogout={logout} />;
}

// ── Login ─────────────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) throw error;
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[oklch(0.97_0.01_268)] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white ring-1 ring-border p-8 shadow-xl">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary text-primary-foreground mb-5">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="font-display text-2xl font-bold text-primary">Admin Panel</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Jain ENT Hospital — for Prof. Dr. Devendra M. Jain only.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="doctor@example.com"
                className="w-full border border-border rounded-xl px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
            <div className="relative mt-1.5">
              <input type={show ? "text" : "password"} required minLength={6} value={pw} onChange={e => setPw(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full border border-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button type="submit" disabled={busy}
            className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold disabled:opacity-50">
            {busy ? "Please wait…" : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-xs text-muted-foreground text-center">
          This page is not linked from anywhere on the public site.
        </p>
      </div>
    </div>
  );
}

function NotAuthorized({ email, onLogout }: { email: string; onLogout: () => void }) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[oklch(0.97_0.01_268)] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white ring-1 ring-border p-8 text-center shadow-xl">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-xl bg-red-100 text-red-600 mb-4">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <h1 className="font-display text-xl font-bold text-primary">Access denied</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Signed in as <b>{email}</b>, but this account does not have admin permission.
          Only Prof. Dr. Devendra M. Jain can access this panel.
        </p>
        <button onClick={onLogout}
          className="mt-5 inline-flex items-center gap-2 rounded-xl ring-1 ring-border px-5 py-2.5 text-sm font-semibold">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
type Tab = "dashboard" | "content" | "reviews" | "gallery" | "blog" | "appointments";

function AdminShell({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("dashboard");

  const nav: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
    { id: "content",      label: "Content (CMS)", icon: Settings },
    { id: "reviews",      label: "Reviews",      icon: MessageSquare },
    { id: "gallery",      label: "Gallery",      icon: ImageIcon },
    { id: "blog",         label: "Blog",         icon: BookOpen },
    { id: "appointments", label: "Appointments", icon: CalendarCheck },
  ];

  return (
    <div className="min-h-dvh flex bg-[oklch(0.97_0.01_268)]">
      <aside className="hidden md:flex w-56 flex-col bg-primary text-primary-foreground shrink-0">
        <div className="px-5 py-6 border-b border-white/10">
          <div className="text-xs uppercase tracking-widest opacity-60 mb-1">Jain ENT</div>
          <div className="font-display text-lg font-bold">Admin Panel</div>
          <div className="text-[10px] opacity-60 mt-2 truncate">{email}</div>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3">
          {nav.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${tab === n.id ? "bg-white/20" : "hover:bg-white/10 opacity-80"}`}>
              <n.icon className="h-4 w-4" />{n.label}
            </button>
          ))}
        </nav>
        <button onClick={onLogout}
          className="m-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 opacity-70">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </aside>

      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-primary text-primary-foreground flex items-center gap-2 px-4 py-3 border-b border-white/10 overflow-x-auto">
        {nav.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${tab === n.id ? "bg-white/20" : "opacity-70"}`}>
            <n.icon className="h-3.5 w-3.5" />{n.label}
          </button>
        ))}
        <button onClick={onLogout} className="ml-auto opacity-70 shrink-0"><LogOut className="h-4 w-4" /></button>
      </div>

      <main className="flex-1 overflow-auto pt-[52px] md:pt-0">
        <div className="p-6 max-w-5xl mx-auto">
          {tab === "dashboard"    && <DashboardTab />}
          {tab === "content"      && <ContentTab />}
          {tab === "reviews"      && <ReviewsTab />}
          {tab === "gallery"      && <GalleryTab />}
          {tab === "blog"         && <BlogTab />}
          {tab === "appointments" && <AppointmentsTab />}
        </div>
      </main>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function DashboardTab() {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, paid: 0 });

  useEffect(() => {
    supabase.from("appointments").select("status, payment_status").then(({ data }) => {
      if (!data) return;
      setStats({
        total:     data.length,
        pending:   data.filter(d => d.status === "pending").length,
        confirmed: data.filter(d => d.status === "confirmed").length,
        paid:      data.filter(d => d.payment_status === "paid").length,
      });
    });
  }, []);

  const cards = [
    { label: "Total Appointments", value: stats.total,     icon: Users,        color: "bg-primary" },
    { label: "Pending",            value: stats.pending,   icon: Clock,        color: "bg-amber-500" },
    { label: "Confirmed",          value: stats.confirmed, icon: CheckCircle2, color: "bg-emerald-600" },
    { label: "Paid",               value: stats.paid,      icon: TrendingUp,   color: "bg-crimson" },
  ];

  return (
    <div>
      <Heading>Dashboard</Heading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {cards.map(c => (
          <div key={c.label} className="rounded-2xl bg-white ring-1 ring-border p-5 flex items-center gap-4">
            <div className={`${c.color} text-white h-11 w-11 rounded-xl flex items-center justify-center shrink-0`}>
              <c.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{c.value}</div>
              <div className="text-xs text-muted-foreground">{c.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-white ring-1 ring-border p-6">
        <div className="font-display text-lg font-bold text-primary mb-2">Quick links</div>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Go to <b>Gallery</b> to upload clinic photos — they appear on the site instantly.</li>
          <li>Go to <b>Blog</b> to write, edit, publish or unpublish articles any time.</li>
          <li>Go to <b>Appointments</b> to confirm / cancel bookings and mark payments.</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function GalleryTab() {
  const [items, setItems]   = useState<GalleryItem[]>([]);
  const [label, setLabel]   = useState("");
  const [file, setFile]     = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg]       = useState("");
  const fileRef             = useRef<HTMLInputElement>(null);

  async function load() {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  }
  useEffect(() => { load(); }, []);

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function upload() {
    if (!file || !label.trim()) { setMsg("Please add a label and select an image."); return; }
    setUploading(true); setMsg("");
    const ext  = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (upErr) { setMsg("Upload failed: " + upErr.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    const { error: dbErr } = await supabase.from("gallery").insert({ label: label.trim(), url: publicUrl });
    if (dbErr) { setMsg("DB error: " + dbErr.message); } else { setMsg("✓ Photo added!"); setLabel(""); setFile(null); setPreview(""); load(); }
    setUploading(false);
  }

  async function remove(item: GalleryItem) {
    if (!confirm(`Delete "${item.label}"?`)) return;
    await supabase.from("gallery").delete().eq("id", item.id);
    load();
  }

  return (
    <div>
      <Heading>Gallery</Heading>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        Photos uploaded here appear on the public Gallery page immediately — no redeploy needed.
      </p>

      <div className="rounded-2xl bg-white ring-1 ring-border p-6 mb-8">
        <div className="font-semibold text-primary mb-4 flex items-center gap-2"><Upload className="h-4 w-4" /> Add new photo</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Photo label</Label>
            <input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Consultation Room"
              className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <Label>Image file</Label>
            <button onClick={() => fileRef.current?.click()}
              className="mt-1.5 w-full border border-dashed border-border rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:border-primary transition text-left">
              {file ? file.name : "Click to choose image…"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pickFile} />
          </div>
        </div>
        {preview && <img src={preview} className="mt-4 h-40 rounded-xl object-cover ring-1 ring-border" alt="preview" />}
        {msg && <p className="mt-3 text-sm text-emerald-600">{msg}</p>}
        <button onClick={upload} disabled={uploading}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50">
          {uploading ? "Uploading…" : <><Plus className="h-4 w-4" /> Add Photo</>}
        </button>
      </div>

      {items.length === 0
        ? <EmptyState icon={ImageIcon} text="No photos yet. Upload the first one above." />
        : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden ring-1 ring-border bg-white aspect-[4/3]">
                <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-end justify-between">
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                  <button onClick={() => remove(item)} className="text-white/80 hover:text-red-400 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

// ─── Blog ────────────────────────────────────────────────────────────────────
const CATS = ["Ear","Nose","Throat","Sleep","Oncology","Paediatrics","General"];

const emptyPost = (): BlogPostDraft => ({
  slug: "", title: "", category: "Ear", excerpt: "", content: "", published: false,
});

type EditState = { id?: string; draft: BlogPostDraft };

function BlogTab() {
  const [posts, setPosts]   = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState("");

  async function load() {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data as BlogPost[]);
  }
  useEffect(() => { load(); }, []);

  function newPost() { setEditing({ draft: emptyPost() }); setMsg(""); }

  function editPost(p: BlogPost) {
    setEditing({
      id: p.id,
      draft: { slug: p.slug, title: p.title, category: p.category, excerpt: p.excerpt ?? "", content: p.content ?? "", published: p.published },
    });
    setMsg("");
  }

  async function save() {
    if (!editing) return;
    const d = editing.draft;
    if (!d.title.trim() || !d.slug.trim()) { setMsg("Title and slug are required."); return; }
    setSaving(true); setMsg("");
    const { error } = editing.id
      ? await supabase.from("blog_posts").update(d).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(d);
    if (error) setMsg("Error: " + error.message);
    else { setMsg("✓ Saved!"); setEditing(null); load(); }
    setSaving(false);
  }

  async function togglePublish(post: BlogPost) {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
    load();
  }

  async function del(post: BlogPost) {
    if (!confirm(`Delete "${post.title}"?`)) return;
    await supabase.from("blog_posts").delete().eq("id", post.id);
    load();
  }

  function slugify(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  }

  function patch(p: Partial<BlogPostDraft>) {
    if (!editing) return;
    setEditing({ ...editing, draft: { ...editing.draft, ...p } });
  }

  if (editing !== null) {
    const d = editing.draft;
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setEditing(null)} className="text-sm text-muted-foreground hover:text-primary">← Back</button>
          <Heading>{editing.id ? "Edit Blog Post" : "New Blog Post"}</Heading>
        </div>
        <div className="rounded-2xl bg-white ring-1 ring-border p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Title *</Label>
              <input value={d.title}
                onChange={e => patch({ title: e.target.value, slug: editing.id ? d.slug : slugify(e.target.value) })}
                className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Post title" />
            </div>
            <div>
              <Label>Slug (URL) *</Label>
              <input value={d.slug} onChange={e => patch({ slug: e.target.value })}
                className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="post-url-slug" />
            </div>
            <div>
              <Label>Category</Label>
              <select value={d.category} onChange={e => patch({ category: e.target.value })}
                className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={d.published}
                  onChange={e => patch({ published: e.target.checked })}
                  className="accent-primary h-4 w-4" />
                Published
              </label>
            </div>
          </div>
          <div>
            <Label>Short excerpt (shown in card)</Label>
            <textarea rows={2} value={d.excerpt ?? ""} onChange={e => patch({ excerpt: e.target.value })}
              className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/30"
              placeholder="One or two sentence summary…" />
          </div>
          <div>
            <Label>Full article content</Label>
            <textarea rows={12} value={d.content ?? ""} onChange={e => patch({ content: e.target.value })}
              className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none resize-y focus:ring-2 focus:ring-primary/30 font-mono"
              placeholder="Write the full article here…" />
          </div>
          {msg && <p className="text-sm text-emerald-600">{msg}</p>}
          <div className="flex gap-3">
            <button onClick={save} disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50">
              {saving ? "Saving…" : <><FileText className="h-4 w-4" /> Save Post</>}
            </button>
            <button onClick={() => setEditing(null)}
              className="rounded-xl ring-1 ring-border px-5 py-2.5 text-sm font-semibold">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading>Blog Posts</Heading>
        <button onClick={newPost}
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>
      {posts.length === 0
        ? <EmptyState icon={BookOpen} text="No blog posts yet. Create your first one." />
        : (
          <div className="space-y-3">
            {posts.map(p => (
              <div key={p.id} className="rounded-2xl bg-white ring-1 ring-border p-5 flex items-center gap-4">
                <button onClick={() => editPost(p)} className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-full bg-crimson/10 text-crimson px-2 py-0.5 text-xs font-semibold">{p.category}</span>
                    {p.published
                      ? <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs font-semibold">Published</span>
                      : <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-semibold">Draft</span>}
                  </div>
                  <div className="font-semibold text-primary mt-1 truncate">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString("en-IN")}</div>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => togglePublish(p)} title={p.published ? "Unpublish" : "Publish"}
                    className="text-muted-foreground hover:text-primary">
                    {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button onClick={() => del(p)} className="text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

// ─── Appointments ────────────────────────────────────────────────────────────
const STATUS_COLOR: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};
const PAY_COLOR: Record<string, string> = {
  unpaid:                "bg-slate-100 text-slate-600",
  pending_verification:  "bg-amber-100 text-amber-700",
  paid:                  "bg-emerald-100 text-emerald-700",
  verified:              "bg-emerald-100 text-emerald-700",
  rejected:              "bg-red-100 text-red-600",
};
const PAY_LABEL: Record<string, string> = {
  unpaid: "unpaid",
  pending_verification: "pending verification",
  paid: "paid",
  verified: "verified",
  rejected: "rejected",
};

const STATUS_OPTIONS: Appointment["status"][] = ["pending", "confirmed", "cancelled", "visited", "no-show"] as any;
type SortKey = "date" | "created_at" | "token_number" | "name";

function AppointmentsTab() {
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payFilter, setPayFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [rejectFor, setRejectFor] = useState<Appointment | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (data) setAppts(data as Appointment[]);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: Appointment["status"]) {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) { setActionMsg(error.message); return; }
    setActionMsg("✓ Status updated.");
    load();
  }

  async function approvePayment(a: Appointment) {
    setActionMsg("");
    if (a.payment_status === "verified") { setActionMsg("This payment is already verified."); return; }
    if (!a.payment_method || !a.payment_reference || a.payment_reference.trim().length < 3) {
      setActionMsg("Cannot approve: transaction / payment details are missing. Ask the patient to resubmit.");
      return;
    }
    setBusyId(a.id);
    const { error } = await supabase.rpc("admin_verify_payment", { _id: a.id });
    setBusyId(null);
    if (error) { setActionMsg(error.message); return; }
    setActionMsg("✓ Payment verified.");
    load();
  }

  function openReject(a: Appointment) { setRejectFor(a); setRejectReason(""); setActionMsg(""); }

  async function confirmReject() {
    if (!rejectFor) return;
    if (rejectReason.trim().length < 3) { setActionMsg("Please write a reason (at least 3 characters)."); return; }
    setBusyId(rejectFor.id);
    const { error } = await supabase.rpc("admin_reject_payment", { _id: rejectFor.id, _reason: rejectReason.trim() });
    setBusyId(null);
    if (error) { setActionMsg(error.message); return; }
    setRejectFor(null); setRejectReason("");
    setActionMsg("Payment rejected. The patient will see your reason.");
    load();
  }

  function fmt(d?: string | null) { return d ? new Date(d).toLocaleString("en-IN") : "—"; }

  // ── filter + sort ────────────────────────────────────────────────────────
  const q = search.trim().toLowerCase();
  const filtered = appts.filter(a => {
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
  const sorted = [...filtered].sort((a: any, b: any) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir(k === "name" ? "asc" : "desc"); }
  }

  const pendingPayCount = appts.filter(a => a.payment_status === "pending_verification").length;

  function exportCSV() {
    const headers = ["Date","Slot","Token","Name","Age","Phone","Email","Mode","Concern","Status","Payment Status","Payment Method","Payment Reference","Created At"];
    const rows = sorted.map(a => [
      a.date, a.slot, a.token_number ?? "", a.name ?? "", a.age ?? "", a.phone ?? "", a.email ?? "",
      a.mode ?? "", a.concern ?? "", a.status, a.payment_status,
      a.payment_method ?? "", a.payment_reference ?? "", a.created_at ?? "",
    ]);
    const esc = (v: any) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [headers, ...rows].map(r => r.map(esc).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Heading>Appointments</Heading>
      {pendingPayCount > 0 && (
        <div className="mt-4 rounded-2xl bg-amber-50 ring-1 ring-amber-200 p-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-sm text-amber-800">
            <b>{pendingPayCount}</b> payment{pendingPayCount > 1 ? "s" : ""} awaiting your verification.
          </div>
          <button onClick={() => setPayFilter("pending_verification")}
            className="rounded-full bg-amber-600 text-white px-4 py-1.5 text-xs font-semibold">
            Review pending payments
          </button>
        </div>
      )}
      {actionMsg && <p className="mt-3 text-sm text-primary">{actionMsg}</p>}

      {/* Filters */}
      <div className="mt-4 rounded-2xl bg-white ring-1 ring-border p-4 space-y-3">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <Label>Status</Label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label>Payment</Label>
            <select value={payFilter} onChange={e => setPayFilter(e.target.value)}
              className="mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
              <option value="all">All payments</option>
              <option value="unpaid">Unpaid</option>
              <option value="pending_verification">Pending verification</option>
              <option value="verified">Verified</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <Label>From date</Label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
              className="mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <Label>To date</Label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
              className="mt-1.5 w-full border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div className="flex gap-3 flex-wrap items-end">
          <div className="flex-1 min-w-[200px]">
            <Label>Search (name / phone / email / concern)</Label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to filter…"
                className="w-full border border-border rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <button onClick={() => { setStatusFilter("all"); setPayFilter("all"); setFromDate(""); setToDate(""); setSearch(""); }}
            className="rounded-xl ring-1 ring-border px-4 py-2 text-sm font-semibold">Clear</button>
          <button onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
        <div className="flex gap-3 flex-wrap items-center text-xs text-muted-foreground">
          <span><b className="text-primary">{sorted.length}</b> shown</span>
          <span>·</span>
          <span>{appts.length} total</span>
          <span className="ml-auto flex gap-1">
            Sort:
            {(["date","created_at","token_number","name"] as SortKey[]).map(k => (
              <button key={k} onClick={() => toggleSort(k)}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 ${sortKey === k ? "bg-primary text-primary-foreground" : "ring-1 ring-border"}`}>
                {k === "created_at" ? "created" : k === "token_number" ? "token" : k}
                {sortKey === k && <ArrowUpDown className="h-3 w-3" />}
              </button>
            ))}
          </span>
        </div>
      </div>

      {sorted.length === 0
        ? <div className="mt-6"><EmptyState icon={CalendarCheck} text="No appointments match these filters." /></div>
        : (
          <div className="space-y-3 mt-6">
            {sorted.map(a => (
              <div key={a.id} className="rounded-2xl bg-white ring-1 ring-border p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="font-semibold text-primary">
                      {a.name} · Age {a.age || "—"}
                      {a.token_number != null && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-bold">#{a.token_number}</span>}
                    </div>
                    <div className="text-sm text-muted-foreground">{a.phone}{a.email ? ` · ${a.email}` : ""} · {a.mode}</div>
                    <div className="text-sm text-muted-foreground">{a.date} at {a.slot}</div>
                    <div className="mt-1.5 text-sm text-foreground italic">"{a.concern}"</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <select value={a.status}
                      onChange={e => updateStatus(a.id, e.target.value as Appointment["status"])}
                      className={`rounded-full border-0 ring-1 ring-border px-2.5 py-1 text-xs font-semibold cursor-pointer ${STATUS_COLOR[a.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PAY_COLOR[a.payment_status] ?? "bg-slate-100 text-slate-600"}`}>
                      {PAY_LABEL[a.payment_status] ?? a.payment_status}
                    </span>
                  </div>
                </div>

                {(a.payment_method || a.payment_reference || a.payment_submitted_at) && (
                  <div className="mt-3 rounded-xl bg-[oklch(0.98_0.005_268)] ring-1 ring-border p-3 text-xs text-muted-foreground space-y-1">
                    <div><b>Payment method:</b> <span className="capitalize">{a.payment_method ?? "—"}</span></div>
                    <div><b>Reference / Txn:</b> {a.payment_reference ?? "—"}</div>
                    <div><b>Submitted:</b> {fmt(a.payment_submitted_at)}</div>
                    {a.payment_verified_at && <div className="text-emerald-700"><b>Verified:</b> {fmt(a.payment_verified_at)}</div>}
                    {a.payment_rejected_at && <div className="text-red-600"><b>Rejected:</b> {fmt(a.payment_rejected_at)} — {a.payment_rejection_reason}</div>}
                  </div>
                )}

                {a.payment_status === "pending_verification" && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <ActionBtn color="emerald" onClick={() => approvePayment(a)} icon={CheckCircle2}>
                      {busyId === a.id ? "…" : "Approve payment"}
                    </ActionBtn>
                    <ActionBtn color="red" onClick={() => openReject(a)} icon={XCircle}>Reject payment</ActionBtn>
                  </div>
                )}
                {a.payment_status === "verified" && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-3 py-1.5 text-xs font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified — locked
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }

      {rejectFor && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setRejectFor(null)}>
          <div className="bg-white rounded-2xl ring-1 ring-border p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-lg font-bold text-primary">Reject payment</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tell the patient why their payment couldn't be verified. They will see this on My Appointments.
            </p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={4}
              placeholder="e.g. Transaction ID not found in our Razorpay dashboard. Please share a screenshot."
              className="mt-3 w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            {actionMsg && <p className="mt-2 text-xs text-red-500">{actionMsg}</p>}
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={() => setRejectFor(null)} className="rounded-lg ring-1 ring-border px-4 py-2 text-sm font-semibold">Cancel</button>
              <button onClick={confirmReject} disabled={busyId === rejectFor.id}
                className="rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50">
                {busyId === rejectFor.id ? "Rejecting…" : "Reject payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="font-display text-2xl font-bold text-primary">{children}</h1>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{children}</div>;
}
function EmptyState({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="rounded-2xl ring-1 ring-border bg-white p-12 flex flex-col items-center gap-3 text-center">
      <Icon className="h-10 w-10 text-muted-foreground/30" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
function ActionBtn({ children, color, onClick, icon: Icon }: { children: React.ReactNode; color: "emerald"|"red"; onClick: () => void; icon: React.ElementType }) {
  const cls = color === "emerald"
    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ring-emerald-200"
    : "bg-red-50 text-red-600 hover:bg-red-100 ring-red-200";
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg ring-1 px-3 py-1.5 text-xs font-semibold transition ${cls}`}>
      <Icon className="h-3.5 w-3.5" />{children}
    </button>
  );
}
