import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { waLink } from "@/lib/clinic";
import { Pill, ShieldCheck, Truck, ClipboardList, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/pharmacy")({
  head: () => ({
    meta: [
      { title: "In-house Pharmacy — Jain ENT Hospital, Deesa" },
      { name: "description", content: "Genuine, doctor-prescribed ENT medicines available at Jain ENT Hospital pharmacy. Request a refill via WhatsApp." },
      { property: "og:title", content: "Pharmacy — Jain ENT Hospital" },
      { property: "og:description", content: "ENT pharmacy and prescription refills in Deesa." },
      { property: "og:url", content: "/pharmacy" },
    ],
    links: [{ rel: "canonical", href: "/pharmacy" }],
  }),
  component: Pharmacy,
});

function Pharmacy() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pharmacy"
        title="The right ENT medicines — under the doctor's eye."
        subtitle="Skip the guesswork at outside chemists. Our in-house pharmacy stocks the exact ear drops, nasal sprays, antibiotics, antihistamines, and post-op medications prescribed by Dr. Jain."
      />
      <section className="py-14">
        <div className="container-tight grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Pill, t: "Specialist stock", d: "ENT-specific drops, sprays and tablets — not just general items." },
            { icon: ShieldCheck, t: "Genuine only", d: "Sourced from authorised distributors. Strict batch & expiry checks." },
            { icon: ClipboardList, t: "Matches your Rx", d: "Dispensed against the exact prescription written by Dr. Jain." },
            { icon: Truck, t: "Refill on WhatsApp", d: "Send a photo of your prescription. We'll prepare it for pickup." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl ring-1 ring-border bg-white p-6">
              <b.icon className="h-7 w-7 text-crimson" />
              <h3 className="font-display text-lg font-semibold mt-3 text-primary">{b.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="container-tight mt-10 rounded-2xl bg-primary text-primary-foreground p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-2xl font-bold">Need a refill?</h3>
            <p className="opacity-90 mt-1 text-sm">WhatsApp a clear photo of your prescription and your name.</p>
          </div>
          <a href={waLink("Hi, I'd like to refill my ENT prescription. My name is ____. (Please attach a photo of your prescription.)")}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold">
            <MessageCircle className="h-4 w-4" /> Request refill
          </a>
        </div>
        <p className="container-tight mt-6 text-xs text-muted-foreground">
          Medicines are dispensed strictly against a valid prescription. Please do not self-medicate based on past prescriptions.
        </p>
      </section>
    </SiteLayout>
  );
}
