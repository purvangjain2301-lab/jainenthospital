import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Video, ShieldCheck, Wifi, Clock, Globe, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/telemedicine")({
  head: () => ({
    meta: [
      { title: "ENT Telemedicine — Consult Dr. Devendra Jain online" },
      { name: "description", content: "Online ENT consultations with Prof. Dr. Devendra M. Jain. Available to patients across India and worldwide. Hindi, English, Gujarati, Marathi." },
      { property: "og:title", content: "ENT Telemedicine — Jain ENT Hospital" },
      { property: "og:description", content: "Online ENT consultations from anywhere in India and abroad." },
      { property: "og:url", content: "https://jainent.lovable.app/telemedicine" },
    ],
    links: [{ rel: "canonical", href: "https://jainent.lovable.app/telemedicine" }],
  }),
  component: Telemed,
});

function Telemed() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Telemedicine"
        title="See the specialist — without the travel."
        subtitle="Secure video consultations for patients anywhere in India and abroad — follow-ups, second opinions, NRI consultations. Convenient, private, doctor-led."
      />
      <section className="py-14">
        <div className="container-tight grid md:grid-cols-3 gap-5">
          {[
            { icon: Video, t: "Doctor-led video call", d: "You speak directly to Dr. Jain — never a junior or a chatbot." },
            { icon: ShieldCheck, t: "Private & encrypted", d: "Your visit is one-on-one and confidential. Records stay with the clinic." },
            { icon: Wifi, t: "Works on basic 4G", d: "All you need is a phone and a stable connection — we'll guide you." },
            { icon: Clock, t: "Same-day slots", d: "Most requests are accommodated within the same working day." },
            { icon: Globe, t: "Available worldwide", d: "Patients from any state or country can consult Dr. Jain via video. Hindi, English, Gujarati and Marathi spoken." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl ring-1 ring-border bg-white p-6">
              <b.icon className="h-7 w-7 text-crimson" />
              <h3 className="font-display text-lg font-semibold mt-3 text-primary">{b.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="container-tight mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8">
            <h3 className="font-display text-2xl font-bold">Best suited for</h3>
            <ul className="mt-4 space-y-2 text-sm opacity-95">
              {[
                "Follow-up after surgery or treatment",
                "Review of test/scan reports",
                "Second opinion on an ENT diagnosis",
                "Recurrent allergy / sinus / throat issues",
                "Prescription refill consultations",
                "NRI and international patients seeking a specialist second opinion",
                "Patients across India unable to travel to Deesa",
              ].map((x) => (
                <li key={x} className="flex gap-2"><span className="text-crimson-foreground bg-crimson rounded-full h-5 w-5 inline-flex items-center justify-center text-xs shrink-0">✓</span>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl ring-1 ring-border bg-white p-8">
            <h3 className="font-display text-2xl font-bold text-primary">When you should visit in person</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {["Acute hearing loss or severe pain","Active bleeding from ear / nose / throat","Suspicious neck or oral lump","Children needing physical examination","Anything requiring an endoscopy or audiometry"].map((x) => (
                <li key={x} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson shrink-0" />{x}</li>
              ))}
            </ul>
            <Link to="/book" className="mt-6 inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold">
              Book in-clinic visit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="container-tight mt-12">
          <div className="rounded-3xl bg-gradient-primary p-10 text-primary-foreground text-center">
            <h3 className="font-display text-3xl font-bold">Ready for a video consult?</h3>
            <p className="mt-2 opacity-90">Choose your language and slot — book your video consult from anywhere.</p>
            <Link to="/book" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold">
              Book telemedicine slot <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
