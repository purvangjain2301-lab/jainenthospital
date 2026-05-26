import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Ear, Wind, Activity, Microscope, Mic, Moon, Baby, AlertTriangle, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CANCER_FAQ = [
  { q: "What types of head & neck cancers do you treat?", a: "We manage cancers of the oral cavity (tongue, cheek, lip), throat (pharynx, larynx), thyroid gland, salivary glands, and neck lymph nodes — from early lesions to advanced cases requiring multi-modality treatment." },
  { q: "How is head & neck cancer diagnosed?", a: "Diagnosis usually starts with a clinical exam and video endoscopy, followed by a biopsy of the suspicious area. Imaging (CT / MRI / ultrasound) and FNAC for neck swellings help stage the disease and plan surgery." },
  { q: "Is surgery always required?", a: "Not always. Treatment depends on the tumour type, location, and stage. Some cancers respond well to radiation or chemotherapy alone, while others need surgery followed by adjuvant therapy. We discuss every option transparently before deciding." },
  { q: "Will I be able to speak and swallow normally after surgery?", a: "We use voice- and swallow-preserving techniques whenever possible. Speech therapy and swallowing rehabilitation are arranged after surgery, and most patients regain near-normal function within weeks." },
  { q: "How long is the hospital stay after cancer surgery?", a: "It varies from 2–3 days for smaller resections to 7–10 days for major neck dissections or reconstructive procedures. Discharge depends on wound healing, oral intake, and drain output." },
  { q: "What does post-operative care involve?", a: "Wound and drain care, pain control, nutritional support (sometimes via a feeding tube initially), speech and swallowing exercises, and regular follow-up to monitor healing and detect any recurrence early." },
  { q: "How often will I need follow-up after cancer treatment?", a: "Typically every 1–2 months in the first year, every 3 months in the second year, and progressively spaced out till 5 years. Each visit includes a clinical exam and endoscopy; imaging is repeated as needed." },
  { q: "Do you coordinate with oncologists for chemotherapy and radiation?", a: "Yes. We work closely with medical and radiation oncologists to plan combined treatment, so patients receive seamless care from diagnosis through recovery." },
];


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
