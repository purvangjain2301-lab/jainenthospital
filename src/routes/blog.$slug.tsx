import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { abs, SITE_URL } from "@/lib/site-content";
import { Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    const post = loaderData as any;
    const title = post?.meta_title || post?.title || params.slug;
    const desc =
      post?.meta_description ||
      post?.excerpt ||
      "Read this article from Jain ENT Hospital, Deesa.";
    const url = abs(`/blog/${params.slug}`);
    return {
      meta: [
        { title: `${title} | Jain ENT Hospital Deesa` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(post?.og_image || post?.cover_image
          ? [
              { property: "og:image", content: post.og_image || post.cover_image },
              { name: "twitter:image", content: post.og_image || post.cover_image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post?.title,
            description: desc,
            datePublished: post?.created_at,
            author: { "@type": "Person", name: "Prof. Dr. Devendra M. Jain" },
            publisher: {
              "@type": "Organization",
              name: "Jain ENT Hospital",
              url: SITE_URL,
            },
            mainEntityOfPage: url,
            ...(post?.cover_image ? { image: post.cover_image } : {}),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd(
              [
                { label: "Blog", to: "/blog" },
                { label: post?.title || params.slug, to: `/blog/${params.slug}` },
              ],
              SITE_URL,
            ),
          ),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-tight py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Article not found</h1>
        <p className="mt-2 text-muted-foreground">
          The article you're looking for doesn't exist or has been unpublished.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="container-tight py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-primary">Couldn't load article</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary underline">
          Back to blog
        </Link>
      </div>
    </SiteLayout>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData() as any;
  return (
    <SiteLayout>
      <Breadcrumbs
        items={[
          { label: "Blog", to: "/blog" },
          { label: post.title, to: `/blog/${post.slug}` },
        ]}
      />
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.excerpt ?? undefined} />
      <article className="py-14">
        <div className="container-tight max-w-3xl">
          <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {new Date(post.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              className="mt-6 w-full rounded-2xl ring-1 ring-border object-cover aspect-[16/9]"
            />
          )}
          <div className="prose-block mt-8 text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
          <div className="mt-10 pt-6 border-t border-border">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
