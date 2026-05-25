import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase, type GalleryItem } from "@/lib/supabase";

// Fallback placeholders shown when no photos have been uploaded yet
const PLACEHOLDERS = [
  { label: "Reception",         hue: "from-[oklch(0.27_0.14_268)] to-[oklch(0.45_0.18_268)]" },
  { label: "Consultation room", hue: "from-[oklch(0.55_0.22_27)] to-[oklch(0.35_0.18_27)]" },
  { label: "Endoscopy suite",   hue: "from-[oklch(0.27_0.14_268)] to-[oklch(0.55_0.22_27)]" },
  { label: "Audiometry booth",  hue: "from-[oklch(0.78_0.13_78)] to-[oklch(0.55_0.22_27)]" },
  { label: "Procedure room",    hue: "from-[oklch(0.35_0.16_270)] to-[oklch(0.55_0.22_27)]" },
  { label: "Pharmacy",          hue: "from-[oklch(0.55_0.22_27)] to-[oklch(0.27_0.14_268)]" },
  { label: "Waiting area",      hue: "from-[oklch(0.6_0.12_200)] to-[oklch(0.27_0.14_268)]" },
  { label: "Front of building", hue: "from-[oklch(0.27_0.14_268)] to-[oklch(0.78_0.13_78)]" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Jain ENT Hospital, Deesa" },
      { name: "description", content: "A look inside Jain ENT Hospital, Deesa — clinic spaces, equipment and patient care moments." },
      { property: "og:title", content: "Gallery — Jain ENT Hospital" },
      { property: "og:description", content: "A look inside our clinic." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const [photos, setPhotos] = useState<GalleryItem[] | null>(null);

  useEffect(() => {
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setPhotos(data ?? []));
  }, []);

  const hasPhotos = photos && photos.length > 0;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gallery"
        title="Inside Jain ENT Hospital."
        subtitle={
          hasPhotos
            ? "Clean, modern, calm — designed so patients feel cared for from the moment they walk in."
            : "Clean, modern, calm — designed so patients feel cared for from the moment they walk in. (Photographs coming soon.)"
        }
      />
      <section className="py-14">
        {/* Loading skeleton */}
        {photos === null && (
          <div className="container-tight grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {/* Real photos from Supabase */}
        {hasPhotos && (
          <div className="container-tight grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((item) => (
              <div key={item.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-border bg-muted">
                <img
                  src={item.url}
                  alt={item.label}
                  className="w-full h-full object-cover transition group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/55 to-transparent text-white">
                  <div className="text-xs uppercase tracking-wider opacity-80">Jain ENT</div>
                  <div className="font-display text-lg font-semibold">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Placeholders when no photos uploaded yet */}
        {photos !== null && !hasPhotos && (
          <div className="container-tight grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLACEHOLDERS.map((i) => (
              <div key={i.label} className={`group relative aspect-[4/5] rounded-2xl bg-gradient-to-br ${i.hue} overflow-hidden ring-1 ring-border`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white/15,transparent_60%)]" />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/55 to-transparent text-white">
                  <div className="text-xs uppercase tracking-wider opacity-80">Jain ENT</div>
                  <div className="font-display text-lg font-semibold">{i.label}</div>
                </div>
              </div>
            ))}
            <p className="sm:col-span-2 lg:col-span-4 mt-2 text-sm text-muted-foreground text-center">
              Real photographs of our clinic will replace these placeholders shortly.
            </p>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
