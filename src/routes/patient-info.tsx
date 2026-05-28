import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ClipboardList, BadgeIndianRupee, FileText, ShieldCheck, MapPin, Languages, Download, MessageCircle, HeartPulse } from "lucide-react";
import { waLink } from "@/lib/clinic";

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
  { q: "What languages can I consult in?", a: "English, Hindi, Gujarati, and Marathi." },
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
            { icon: Languages, t: "Languages", d: "Consultations in English, Hindi, Gujarati, and Marathi." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl ring-1 ring-border bg-white p-6">
              <b.icon className="h-7 w-7 text-crimson" />
              <h3 className="font-display text-lg font-semibold mt-3 text-primary">{b.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="container-tight mt-10">
          <div className="rounded-2xl bg-gradient-to-br from-crimson/5 to-primary/5 ring-1 ring-crimson/20 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0 h-12 w-12 rounded-2xl bg-crimson/10 text-crimson inline-flex items-center justify-center">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-primary">After surgery? Use our recovery checklist.</h3>
                <p className="text-sm text-muted-foreground mt-1">A printable post-operative care checklist for ENT and head & neck cancer surgery patients — covers the first 24 hours, the first week, warning signs and long-term recovery.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href="/downloads/post-operative-care-checklist.pdf" download
                    className="inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-5 py-2.5 text-sm font-semibold">
                    <Download className="h-4 w-4" /> Download checklist (PDF)
                  </a>
                  <a href={waLink("Hello Dr. Jain, I have a question about my post-operative care.")}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold">
                    <MessageCircle className="h-4 w-4" /> Chat post-op care on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
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
