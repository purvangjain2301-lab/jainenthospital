import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { LANDING_SLUGS } from "@/lib/landing-pages";

const BASE_URL = "https://jainent.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);

        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/services", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/book", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/telemedicine", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/pharmacy", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/patient-info", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/post-op-care", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/blog", changefreq: "weekly", priority: "0.7", lastmod: today },
          { path: "/gallery", changefreq: "monthly", priority: "0.5", lastmod: today },
          { path: "/feedback", changefreq: "weekly", priority: "0.7", lastmod: today },
          { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod: today },
        ];

        const landingEntries: SitemapEntry[] = LANDING_SLUGS.map((slug) => ({
          path: `/${slug}`,
          changefreq: "monthly",
          priority: "0.8",
          lastmod: today,
        }));

        let blogEntries: SitemapEntry[] = [];
        try {
          const { data } = await supabase
            .from("blog_posts")
            .select("slug, created_at")
            .eq("published", true);
          if (data) {
            blogEntries = data.map((p: any) => ({
              path: `/blog/${p.slug}`,
              changefreq: "monthly",
              priority: "0.6",
              lastmod: (p.created_at ?? today).slice(0, 10),
            }));
          }
        } catch {
          // ignore — sitemap still serves static + landing pages
        }

        const entries = [...staticEntries, ...landingEntries, ...blogEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
