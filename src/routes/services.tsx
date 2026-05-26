import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Ear, Wind, Activity, Microscope, Mic, Moon, Baby, AlertTriangle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "ENT Services & Procedures — Jain ENT Hospital, Deesa" },
      { name: "description", content: "Full-spectrum ENT care: ear surgery, sinus & allergy, voice & swallowing, head-neck cancer, paediatric ENT, sleep apnoea, vertigo. Deesa, Gujarat." },
      { property: "og:title", content: "Services — Jain ENT Hospital" },
      { property: "og:description", content: "Comprehensive ENT and head-neck cancer services." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const GROUPS = [
  {
    icon: Ear, title: "Ear (Otology)",
    items: ["Chronic ear infections (CSOM)", "Tympanoplasty & ear microsurgery", "Hearing loss evaluation & hearing aids", "Tinnitus management", "Vertigo and balance disorders", "Ear wax removal under microscope"],
  },
  {
    icon: Wind, title: "Nose & Sinus (Rhinology)",
    items: ["Allergic rhinitis & nasal allergy care", "Acute & chronic sinusitis", "Functional endoscopic sinus surgery (FESS)", "Deviated nasal septum (septoplasty)", "Nasal polyps", "Nose-bleed (epistaxis) management"],
  },
  {
    icon: Mic, title: "Throat, Voice & Swallowing",
    items: ["Tonsillitis & tonsillectomy", "Adenoids in children", "Hoarseness / voice disorders", "Vocal cord nodules & polyps", "Swallowing difficulty (dysphagia)", "Reflux laryngitis (LPR)"],
  },
  {
    icon: Microscope, title: "Head & Neck Oncology",
    items: ["Oral cavity cancer screening", "Throat & larynx tumours", "Thyroid swellings & surgery", "Salivary gland disease", "Neck-mass evaluation", "Coordinated cancer treatment planning"],
  },
  {
    icon: Moon, title: "Sleep & Snoring",
    items: ["Snoring evaluation", "Obstructive sleep apnoea (OSA)", "Lifestyle & device counselling", "Surgical options where appropriate"],
  },
  {
    icon: Baby, title: "Paediatric ENT",
    items: ["Recurrent ear infections", "Adenotonsillar disease", "Speech & hearing concerns", "Foreign body removal", "Allergy & breathing problems"],
  },
  {
    icon: Activity, title: "Diagnostics in-clinic",
    items: ["Video endoscopy of ear, nose, throat", "Pure-tone audiometry", "Tympanometry", "Allergy & symptom assessment"],
  },
  {
    icon: AlertTriangle, title: "ENT Emergencies (24×7)",
    items: ["Sudden hearing loss", "Severe nose-bleed", "Foreign body in ear / nose / throat", "Acute airway obstruction", "Facial trauma — ENT component"],
  },
  {
    icon: Microscope, title: "Cancer Surgery",
    items: ["Head & neck tumour excision", "Thyroid cancer surgery", "Oral cavity cancer surgery", "Laryngeal cancer procedures", "Reconstructive surgery post-oncology", "Post-operative cancer rehabilitation"],
  },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Every ENT need, from routine to complex."
        subtitle="A single-specialist hospital means continuity of care: the doctor who diagnoses you is the same one who performs your procedure and follows you up."
      />
      <section className="py-16">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          {GROUPS.map((g) => (
            <div key={g.title} className="rounded-2xl ring-1 ring-border bg-white p-7 hover:ring-primary transition">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/10 text-crimson">
                  <g.icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-primary">{g.title}</h2>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson shrink-0" />{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="container-tight mt-12">
          <div className="rounded-2xl bg-gradient-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold">Not sure which service you need?</h3>
              <p className="opacity-90 mt-1">Tell us your symptoms — we'll guide you to the right consultation.</p>
            </div>
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold">
              Book a consult <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
