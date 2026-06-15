import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { ReviewsSection, Stars } from "@/components/site/Reviews";
import { abs, SITE_URL } from "@/lib/site-content";
import { supabase } from "@/integrations/supabase/client";
import { Star, CheckCircle2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Patient Reviews | Jain ENT Hospital Deesa" },
      {
        name: "description",
        content:
          "Read patient reviews of Jain ENT Hospital, Deesa, and share your own experience with Prof. Dr. Devendra M. Jain.",
      },
      { property: "og:title", content: "Patient Reviews | Jain ENT Hospital Deesa" },
      {
        property: "og:description",
        content:
          "Genuine patient feedback for Jain ENT Hospital, Deesa. Share your visit with Prof. Dr. Devendra M. Jain.",
      },
      { property: "og:url", content: abs("/feedback") },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: abs("/feedback") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([{ label: "Patient Reviews", to: "/feedback" }], SITE_URL),
        ),
      },
    ],
  }),
  component: FeedbackPage,
});

const schema = z.object({
  patient_name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().min(10, "Please write at least a sentence").max(2000),
  visit_date: z.string().optional().or(z.literal("")),
});

function FeedbackPage() {
  const [form, setForm] = useState({
    patient_name: "",
    phone: "",
    rating: 5,
    body: "",
    visit_date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      patient_name: parsed.data.patient_name,
      phone: parsed.data.phone || null,
      rating: parsed.data.rating,
      body: parsed.data.body,
      visit_date: parsed.data.visit_date || null,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      setErr("Could not submit. Please try again later.");
      return;
    }
    setDone(true);
  }

  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: "Patient Reviews", to: "/feedback" }]} />
      <PageHero
        eyebrow="Patient Feedback"
        title="Share your experience"
        subtitle="Your feedback helps other patients find the right ENT care. It takes less than a minute."
      />

      <section className="py-14">
        <div className="container-tight max-w-2xl">
          {done ? (
            <div className="rounded-2xl bg-white ring-1 ring-border p-10 text-center shadow-soft">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">
                Thank you for your feedback!
              </h2>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-2xl bg-white ring-1 ring-border p-6 sm:p-8 shadow-soft space-y-5"
            >
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your name *
                </label>
                <input
                  required
                  maxLength={80}
                  value={form.patient_name}
                  onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                  className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Ramesh Patel"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="+91"
                />
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  Your phone number will not be displayed publicly with your review. It is only used by the clinic to follow up if needed.
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your rating *
                </label>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      aria-label={`${n} star`}
                      className="p-1"
                    >
                      <Star
                        className={`h-8 w-8 ${n <= form.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date of visit
                </label>
                <input
                  type="date"
                  value={form.visit_date}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setForm({ ...form, visit_date: e.target.value })}
                  className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your review *
                </label>
                <textarea
                  required
                  rows={5}
                  maxLength={2000}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Tell us about your experience at Jain ENT Hospital…"
                />
              </div>
              {err && <p className="text-xs text-red-500">{err}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-crimson text-crimson-foreground py-3.5 text-sm font-semibold disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Submit feedback"}
              </button>
            </form>
          )}
        </div>
      </section>

      <ReviewsSection />
    </SiteLayout>
  );
}
