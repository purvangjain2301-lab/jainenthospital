import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase, type BlogPost } from "@/lib/supabase";
import { abs } from "@/lib/site-content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "ENT Health Tips & Articles | Jain ENT Hospital Deesa" },
      { name: "description", content: "Practical ENT health articles, post-op care guides, and patient education from Prof. Dr. Devendra M. Jain, Deesa." },
      { property: "og:title", content: "ENT Health Tips & Articles | Jain ENT Hospital Deesa" },
      { property: "og:description", content: "ENT awareness articles for patients from Jain ENT Hospital, Deesa." },
      { property: "og:url", content: abs("/blog") },
    ],
    links: [{ rel: "canonical", href: abs("/blog") }],
  }),
  component: Blog,
});

// Hardcoded seed posts — shown only if no Supabase posts exist yet
const SEED_POSTS = [
  { id: "seed-1", slug: "ear-pain-when-to-worry", title: "Ear pain: when is it something to worry about?", created_at: "2026-05-12", category: "Ear", excerpt: "Most ear pain is harmless and short-lived. But certain warning signs mean you should see an ENT specialist the same day.", content: "", published: true },
  { id: "seed-2", slug: "sinusitis-myths", title: "5 sinusitis myths Indian patients still believe", created_at: "2026-04-28", category: "Nose", excerpt: "Chronic sinus problems are surrounded by misinformation. Let's separate the science from the WhatsApp forwards.", content: "", published: true },
  { id: "seed-3", slug: "snoring-and-sleep-apnoea", title: "Snoring versus obstructive sleep apnoea — what's the difference?", created_at: "2026-04-10", category: "Sleep", excerpt: "All sleep apnoea involves snoring, but not all snoring is sleep apnoea. Here's how to tell.", content: "", published: true },
  { id: "seed-4", slug: "oral-cancer-early-signs", title: "Early signs of oral cancer no one should ignore", created_at: "2026-03-22", category: "Oncology", excerpt: "Tobacco-related oral cancers are common in our region. Catching them early changes everything.", content: "", published: true },
  { id: "seed-5", slug: "kids-tonsils-when-surgery", title: "Tonsils in children — when is surgery actually needed?", created_at: "2026-03-04", category: "Paediatrics", excerpt: "A practical guide for parents asking 'do my child's tonsils really need to come out?'.", content: "", published: true },
  { id: "seed-6", slug: "hearing-loss-prevention", title: "Protecting your hearing in a louder world", created_at: "2026-02-18", category: "Ear", excerpt: "Earphones, machinery, festivals — modern noise exposure adds up. Here's how to protect your hearing for life.", content: "", published: true },
] satisfies BlogPost[];

function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  // Show seed posts while loading or if Supabase returns empty
  const display: BlogPost[] = posts === null
    ? SEED_POSTS
    : posts.length > 0 ? posts : SEED_POSTS;

  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: "Blog", to: "/blog" }]} />
      <PageHero
        eyebrow="Blog"
        title="ENT awareness, written by your doctor."
        subtitle="Plain-language articles to help you make better decisions about your ear, nose, throat and head-neck health."
      />
      <section className="py-14">
        <div className="container-tight grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((p) => {
            const isSeed = p.id.startsWith("seed-");
            const Card = (
              <>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-crimson/10 text-crimson px-2 py-0.5 font-semibold uppercase tracking-wider">
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold text-primary group-hover:text-crimson transition">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </>
            );
            return isSeed ? (
              <article key={p.id} className="rounded-2xl ring-1 ring-border bg-white p-6 flex flex-col opacity-70">
                {Card}
              </article>
            ) : (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group rounded-2xl ring-1 ring-border bg-white p-6 hover:ring-primary transition flex flex-col"
              >
                {Card}
              </Link>
            );
          })}
        </div>
        <p className="container-tight mt-10 text-sm text-muted-foreground text-center">
          New articles published monthly. Topic suggestions welcome — message us on WhatsApp.
        </p>
      </section>
    </SiteLayout>
  );
}
