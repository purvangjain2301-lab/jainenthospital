import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ClipboardList, BadgeIndianRupee, FileText, ShieldCheck, MapPin, Languages } from "lucide-react";

export const Route = createFileRoute("/patient-info")({
  head: () => ({
    meta: [
      { title: "Patient Information & Visit Guide — Jain ENT Hospital" },
      { name: "description", content: "What to bring, payment options, language, insurance and visit guidance for patients of Jain ENT Hospital, Deesa." },
      { property: "og:title", content: "Patient Info — Jain ENT Hospital" },
      { property: "og:description", content: "Everything you need to know before your visit." },
      { property: "og:url", content: "/patient-info" },
    ],
    links: [{ rel: "canonical", href: "/patient-info" }],
  }),
  component: Info,
});

const FAQS = [
  { q: "Do I need an appointment?", a: "Walk-ins are accepted but appointments are strongly recommended to minimise waiting. Book online or call the front desk." },
  { q: "What should I bring on my first visit?", a: "Government photo ID, any previous prescriptions, reports (audiograms, CT/MRI scans, lab work), and the list of medicines you currently take." },
  { q: "How much is the consultation fee?", a: "Our consultation fee is shown only at the secure payment step after slot confirmation — never advertised before." },
  { q: "Do you accept cash and UPI?", a: "Yes — cash, UPI, debit/credit cards and online payments are all accepted." },
  { q: "Will the doctor see my child?", a: "Yes. Dr. Jain regularly cares for paediatric ENT patients including infants." },
  { q: "Is parking available?", a: "Yes — street parking and a JIO petrol-pump landmark right opposite the clinic make it easy to find." },
  { q: "What languages can I consult in?", a: "English, Hindi, and Gujarati." },
];

function Info() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Patient Info"
        title="Plan a smooth visit."
        subtitle="A few minutes of preparation makes your consultation far more productive. Here's everything we'd want you to know."
      />
      <section className="py-14">
        <div className="container-tight grid lg:grid-cols-3 gap-5">
          {[
            { icon: ClipboardList, t: "What to bring", d: "Photo ID, prior prescriptions, scans/reports, list of current medicines." },
            { icon: BadgeIndianRupee, t: "Payments", d: "Cash, UPI, debit/credit cards, online payment links. Fee shown at payment step." },
            { icon: FileText, t: "Reports & follow-up", d: "Most diagnostics produce a same-day report. Follow-ups can be done via telemedicine." },
            { icon: ShieldCheck, t: "Privacy", d: "Records are kept strictly confidential and shared only with you." },
            { icon: MapPin, t: "Finding us", d: "First Floor, Iskcon Pride, opp. JIO Petrol Pump, Deesa Highway — easy to spot from the highway." },
            { icon: Languages, t: "Languages", d: "Consultations in English, Hindi, and Gujarati." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl ring-1 ring-border bg-white p-6">
              <b.icon className="h-7 w-7 text-crimson" />
              <h3 className="font-display text-lg font-semibold mt-3 text-primary">{b.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="container-tight mt-12">
          <h2 className="font-display text-3xl font-bold text-primary">Frequently asked</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl ring-1 ring-border bg-white">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <span className="ml-4 text-crimson group-open:rotate-45 transition text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
