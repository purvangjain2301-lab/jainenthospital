import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, MessageSquare, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface PublicReview {
  id: string;
  patient_name: string;
  rating: number;
  body: string;
  visit_date: string | null;
  admin_reply: string | null;
  created_at: string;
}

export function useApprovedReviews() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, patient_name, rating, body, visit_date, admin_reply, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!cancelled) {
        setReviews((data as PublicReview[]) ?? []);
        setLoading(false);
      }
    })();
    const channel = supabase
      .channel("reviews_public")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => {
          supabase
            .from("reviews")
            .select("id, patient_name, rating, body, visit_date, admin_reply, created_at")
            .eq("status", "approved")
            .order("created_at", { ascending: false })
            .limit(50)
            .then(({ data }) => setReviews((data as PublicReview[]) ?? []));
        },
      )
      .subscribe();
    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const count = reviews.length;
  const avg = count > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { reviews, loading, count, avg };
}

export function Stars({ value, size = 4 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex gap-0.5" aria-label={`${value} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-${size} w-${size} ${i < Math.round(value) ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ limit = 6 }: { limit?: number }) {
  const { reviews, count, avg } = useApprovedReviews();
  const visible = reviews.slice(0, limit);

  return (
    <section className="py-20 bg-[oklch(0.98_0.01_268)]">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-crimson font-semibold">
              Patient Feedback
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-primary">
              What our patients say
            </h2>
            {count > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Stars value={avg} />
                <span>
                  <b className="text-foreground">{avg.toFixed(1)}★</b> based on {count}{" "}
                  {count === 1 ? "review" : "reviews"}
                </span>
              </div>
            )}
          </div>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold"
          >
            <MessageSquare className="h-4 w-4" /> Share your experience
          </Link>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl bg-white ring-1 ring-border p-10 text-center">
            <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">
              Be the first to share your experience.
            </p>
            <Link
              to="/feedback"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold"
            >
              Write a review <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl bg-white ring-1 ring-border p-6 flex flex-col"
              >
                <Stars value={r.rating} />
                <p className="mt-3 text-sm text-foreground leading-relaxed flex-1">"{r.body}"</p>
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="font-semibold text-primary text-sm">{r.patient_name}</div>
                  {r.visit_date && (
                    <div className="text-xs text-muted-foreground">
                      Visited {new Date(r.visit_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </div>
                  )}
                </div>
                {r.admin_reply && (
                  <div className="mt-3 rounded-xl bg-primary/5 ring-1 ring-primary/15 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                      Reply from the clinic
                    </div>
                    <p className="mt-1 text-xs text-foreground leading-relaxed">{r.admin_reply}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function aggregateRatingJsonLd(count: number, avg: number) {
  if (count === 0) return null;
  return {
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    reviewCount: count,
    bestRating: "5",
    worstRating: "1",
  };
}
