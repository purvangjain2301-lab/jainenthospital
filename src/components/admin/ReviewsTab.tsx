import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Star,
  CheckCircle2,
  XCircle,
  Loader2,
  Send,
  MessageSquare,
  Clock,
  Eye,
} from "lucide-react";

interface Review {
  id: string;
  patient_name: string;
  phone: string | null;
  rating: number;
  body: string;
  visit_date: string | null;
  status: "pending" | "approved" | "rejected";
  admin_reply: string | null;
  reply_draft: string | null;
  created_at: string;
}

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-slate-100 text-slate-500",
};

export function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews((data as Review[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const channel = supabase
      .channel("reviews_admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(id: string, status: Review["status"]) {
    setBusy(id);
    await supabase.from("reviews").update({ status }).eq("id", id);
    setBusy(null);
  }
  async function sendReply(r: Review) {
    const text = drafts[r.id] ?? r.reply_draft ?? "";
    if (!text.trim()) return;
    setBusy(r.id);
    await supabase
      .from("reviews")
      .update({ admin_reply: text, status: r.status === "pending" ? "approved" : r.status })
      .eq("id", r.id);
    setBusy(null);
  }
  async function del(id: string) {
    if (!confirm("Delete this review permanently?")) return;
    setBusy(id);
    await supabase.from("reviews").delete().eq("id", id);
    setBusy(null);
  }

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };
  const visible = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  if (loading)
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading reviews…
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Patient Reviews</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Reviews are <b>not visible</b> on the website until you approve them. Patients only see
            a "thank you" message after submitting.
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "ring-1 ring-border text-muted-foreground hover:bg-white"
            }`}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl ring-1 ring-border bg-white p-12 text-center text-sm text-muted-foreground">
          <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="mt-3">No reviews here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white ring-1 ring-border p-5 space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="font-semibold text-primary">{r.patient_name}</div>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {new Date(r.created_at).toLocaleString("en-IN")}
                    {r.phone && <span>· {r.phone}</span>}
                    {r.visit_date && <span>· visit {r.visit_date}</span>}
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOR[r.status]}`}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-sm text-foreground bg-muted/30 rounded-xl p-3">"{r.body}"</p>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Reply (auto-drafted from rating; edit before sending)
                </label>
                <textarea
                  value={drafts[r.id] ?? r.admin_reply ?? r.reply_draft ?? ""}
                  onChange={(e) => setDrafts((d) => ({ ...d, [r.id]: e.target.value }))}
                  rows={4}
                  className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {r.status !== "approved" && (
                  <button
                    onClick={() => updateStatus(r.id, "approved")}
                    disabled={busy === r.id}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-3 py-1.5 text-xs font-semibold"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve & show on site
                  </button>
                )}
                {r.status !== "rejected" && (
                  <button
                    onClick={() => updateStatus(r.id, "rejected")}
                    disabled={busy === r.id}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 text-slate-700 ring-1 ring-slate-200 px-3 py-1.5 text-xs font-semibold"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Reject (silent)
                  </button>
                )}
                {r.status === "rejected" && (
                  <button
                    onClick={() => updateStatus(r.id, "pending")}
                    disabled={busy === r.id}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-200 px-3 py-1.5 text-xs font-semibold"
                  >
                    <Eye className="h-3.5 w-3.5" /> Move back to pending
                  </button>
                )}
                <button
                  onClick={() => sendReply(r)}
                  disabled={busy === r.id}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold"
                >
                  <Send className="h-3.5 w-3.5" />
                  {r.admin_reply ? "Update reply" : "Save reply & approve"}
                </button>
                <button
                  onClick={() => del(r.id)}
                  disabled={busy === r.id}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg text-red-500 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
