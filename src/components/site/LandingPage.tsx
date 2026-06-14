import { Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "./SiteLayout";
import { Breadcrumbs, breadcrumbJsonLd } from "./Breadcrumbs";
import { CLINIC, telPrimary, waLink } from "@/lib/clinic";
import { abs, SITE_URL } from "@/lib/site-content";
import { Phone, MessageCircle, MapPin, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export interface LandingProps {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  paragraphs: string[];
  highlights: string[];
  faq?: { q: string; a: string }[];
  schemaType?: "MedicalCondition" | "MedicalProcedure" | "MedicalBusiness";
  conditionName?: string;
}

export function landingHead(p: LandingProps) {
  const url = abs(`/${p.slug}`);
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Jain ENT Hospital",
    image: `${SITE_URL}/og-default.jpg`,
    "@id": SITE_URL,
    url,
    telephone: "+91-93257-69599",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${CLINIC.address.line1}, ${CLINIC.address.line2}`,
      addressLocality: "Deesa",
      addressRegion: "Gujarat",
      postalCode: "385535",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 24.2724378, longitude: 72.1794694 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    medicalSpecialty: ["Otolaryngology", "HeadNeckSurgery"],
  };

  const conditionLd = p.conditionName
    ? {
        "@context": "https://schema.org",
        "@type": p.schemaType ?? "MedicalCondition",
        name: p.conditionName,
        relevantSpecialty: { "@type": "MedicalSpecialty", name: "Otolaryngology" },
      }
    : null;

  return {
    meta: [
      { title: p.metaTitle },
      { name: "description", content: p.metaDescription },
      { property: "og:title", content: p.metaTitle },
      { property: "og:description", content: p.metaDescription },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusiness) },
      ...(conditionLd
        ? [{ type: "application/ld+json", children: JSON.stringify(conditionLd) }]
        : []),
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([{ label: p.h1, to: `/${p.slug}` }], SITE_URL),
        ),
      },
      ...(p.faq && p.faq.length
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: p.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
          ]
        : []),
    ],
  };
}

export function LandingPage(p: LandingProps) {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: p.h1, to: `/${p.slug}` }]} />
      <PageHero eyebrow={p.eyebrow} title={p.h1} subtitle={p.intro} />

      <section className="py-14">
        <div className="container-tight grid lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 space-y-5 text-foreground leading-relaxed">
            {p.paragraphs.map((para, i) => (
              <p key={i} className="text-base">
                {para}
              </p>
            ))}

            <h2 className="font-display text-2xl font-bold text-primary mt-8">
              Why patients choose Jain ENT Hospital
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {p.faq && p.faq.length > 0 && (
              <>
                <h2 className="font-display text-2xl font-bold text-primary mt-10">
                  Frequently asked questions
                </h2>
                <div className="space-y-4 mt-3">
                  {p.faq.map((f) => (
                    <div key={f.q} className="rounded-xl ring-1 ring-border bg-white p-5">
                      <h3 className="font-semibold text-primary">{f.q}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{f.a}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-6 py-3 text-sm font-semibold"
              >
                <Calendar className="h-4 w-4" /> Book appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full ring-1 ring-border px-6 py-3 text-sm font-semibold"
              >
                View all services
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-primary text-primary-foreground p-6">
              <h3 className="font-display text-lg font-bold">Talk to our team</h3>
              <p className="mt-1 text-sm opacity-90">{CLINIC.hours.weekdays}</p>
              <a
                href={`tel:${telPrimary}`}
                className="mt-4 flex items-center gap-2 rounded-xl bg-white text-primary px-4 py-3 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" /> {CLINIC.phones.primary}
              </a>
              <a
                href={waLink(`Hi, I'd like to know more about ${p.h1}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center gap-2 rounded-xl bg-[#25D366] text-white px-4 py-3 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
            <div className="rounded-2xl bg-white ring-1 ring-border p-6 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-crimson mt-0.5" />
                <span>
                  {CLINIC.address.line1}, {CLINIC.address.line2}, {CLINIC.address.city},{" "}
                  {CLINIC.address.state} {CLINIC.address.pin}
                </span>
              </div>
              <a
                href={CLINIC.social.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-primary text-sm font-semibold hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
