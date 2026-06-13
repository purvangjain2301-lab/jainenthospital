import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CLINIC, telPrimary, waLink } from "@/lib/clinic";
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram, Navigation } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Jain ENT Hospital — Deesa, Gujarat" },
      { name: "description", content: "Address, phone, WhatsApp, email and directions to Jain ENT Hospital, Deesa. Mon–Sat 10 AM–7 PM. Emergency 24×7." },
      { property: "og:title", content: "Contact — Jain ENT Hospital" },
      { property: "og:description", content: "Reach us by phone, WhatsApp, or in person." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="We're here — call, message, or visit."
        subtitle="The fastest way to reach us is WhatsApp. For emergencies, please call directly any time of day or night."
      />
      <section className="py-14">
        <div className="container-tight grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5">
            <Card icon={MapPin} title="Address">
              <p>{CLINIC.address.line1}, {CLINIC.address.line2}<br/>{CLINIC.address.city}, {CLINIC.address.state} {CLINIC.address.pin}, {CLINIC.address.country}</p>
              <a href={CLINIC.social.maps} target="_blank" rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                <Navigation className="h-4 w-4" /> Open in Google Maps
              </a>
            </Card>
            <Card icon={Phone} title="Phone (24×7 for emergencies)">
              <ul className="space-y-1">
                <li><a className="hover:text-primary" href={`tel:${telPrimary}`}>{CLINIC.phones.primary} <span className="text-xs text-muted-foreground">(primary)</span></a></li>
                <li><a className="hover:text-primary" href={`tel:${CLINIC.phones.secondary.replace(/\s/g,'')}`}>{CLINIC.phones.secondary}</a></li>
                <li><a className="hover:text-primary" href={`tel:${CLINIC.phones.tertiary.replace(/\s/g,'')}`}>{CLINIC.phones.tertiary}</a></li>
              </ul>
            </Card>
            <Card icon={Mail} title="Email">
              <a className="hover:text-primary break-all" href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
            </Card>
            <Card icon={Clock} title="Hours">
              <p>{CLINIC.hours.weekdays}<br/>{CLINIC.hours.sunday}<br/><strong className="text-crimson">{CLINIC.hours.emergency}</strong></p>
            </Card>
            <div className="flex gap-3">
              <a href={CLINIC.social.facebook} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-label="Facebook"><Facebook className="h-5 w-5"/></a>
              <a href={CLINIC.social.instagram} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-crimson text-crimson-foreground" aria-label="Instagram"><Instagram className="h-5 w-5"/></a>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <a href={waLink("Hello Jain ENT Hospital, I have a question.")} target="_blank" rel="noreferrer"
              className="block rounded-2xl bg-[#25D366] text-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-7 w-7" />
                <div>
                  <div className="text-xs uppercase tracking-wider opacity-90">Fastest reply</div>
                  <div className="font-display text-xl font-bold">WhatsApp us</div>
                </div>
              </div>
              <p className="mt-3 text-sm opacity-95">{CLINIC.whatsapp.primary.replace(/^91/, "+91 ")}</p>
            </a>
            <div className="rounded-2xl overflow-hidden ring-1 ring-border bg-white">
              <iframe
                title="Jain ENT Hospital Deesa location"
                src="https://www.google.com/maps?q=24.2724378,72.1794694&output=embed"
                className="w-full h-80 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Card({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl ring-1 ring-border bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/10 text-crimson"><Icon className="h-5 w-5" /></div>
        <h2 className="font-display text-lg font-bold text-primary">{title}</h2>
      </div>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
