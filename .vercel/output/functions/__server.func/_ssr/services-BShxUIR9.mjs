import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout, P as PageHero } from "./router-BdWqalL7.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { E as Ear, aj as Wind, U as Mic, V as Microscope, a6 as Sparkles, W as Moon, B as Baby, A as Activity, ac as TriangleAlert, b as ArrowRight, k as ChevronDown } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-CDTlM2pt.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const CANCER_FAQ = [{
  q: "What types of head-neck cancers do you treat?",
  a: "We manage cancers of the oral cavity (tongue, cheek, lip), throat (pharynx, larynx), thyroid gland, salivary glands, and neck lymph nodes — from early lesions to advanced cases requiring multi-modality treatment."
}, {
  q: "How is head-neck cancer diagnosed?",
  a: "Diagnosis usually starts with a clinical exam and video endoscopy, followed by a biopsy of the suspicious area. Imaging (CT / MRI / ultrasound) and FNAC for neck swellings help stage the disease and plan surgery."
}, {
  q: "Is surgery always required?",
  a: "Not always. Treatment depends on the tumour type, location, and stage. Some cancers respond well to radiation or chemotherapy alone, while others need surgery followed by adjuvant therapy. We discuss every option transparently before deciding."
}, {
  q: "Will I be able to speak and swallow normally after surgery?",
  a: "We use voice- and swallow-preserving techniques whenever possible. Speech therapy and swallowing rehabilitation are arranged after surgery, and most patients regain near-normal function within weeks."
}, {
  q: "How long is the hospital stay after cancer surgery?",
  a: "It varies from 2–3 days for smaller resections to 7–10 days for major neck dissections or reconstructive procedures. Discharge depends on wound healing, oral intake, and drain output."
}, {
  q: "What does post-operative care involve?",
  a: "Wound and drain care, pain control, nutritional support (sometimes via a feeding tube initially), speech and swallowing exercises, and regular follow-up to monitor healing and detect any recurrence early."
}, {
  q: "How often will I need follow-up after cancer treatment?",
  a: "Typically every 1–2 months in the first year, every 3 months in the second year, and progressively spaced out till 5 years. Each visit includes a clinical exam and endoscopy; imaging is repeated as needed."
}, {
  q: "Do you coordinate with oncologists for chemotherapy and radiation?",
  a: "Yes. We work closely with medical and radiation oncologists to plan combined treatment, so patients receive seamless care from diagnosis through recovery."
}];
const FACE_FAQ = [{
  q: "What face surgeries does Dr. Jain perform?",
  a: "Dr. Jain performs rhinoplasty (nose reshaping), otoplasty (ear correction), post-cancer facial reconstruction, facial trauma repair, scar revision, and management of facial nerve conditions — all within an ENT specialist's scope."
}, {
  q: "Is surgery done under general or local anaesthesia?",
  a: "Smaller procedures like otoplasty and scar revision are often done under local anaesthesia. Rhinoplasty and reconstructive surgeries usually require general anaesthesia. The choice is discussed and planned individually before every procedure."
}, {
  q: "How long is recovery after face surgery?",
  a: "Most patients return to normal activity within 1–2 weeks for minor procedures and 3–4 weeks for major reconstruction. Swelling and bruising resolve over 2–6 weeks depending on the procedure."
}, {
  q: "Will there be visible scars?",
  a: "Incisions are placed in natural skin creases or inside the nose wherever possible to minimise visible scarring. Most scars fade significantly within 6–12 months."
}, {
  q: "Can I consult for face surgery via telemedicine?",
  a: "Yes — initial consultation, photo review and post-operative follow-ups can all be done via video call. Patients from outside Deesa or abroad are welcome to book a telemedicine slot."
}];
const GROUPS = [{
  icon: Ear,
  title: "Ear (Otology)",
  items: ["Chronic ear infections (CSOM)", "Tympanoplasty & ear microsurgery", "Hearing loss evaluation & hearing aids", "Tinnitus management", "Vertigo and balance disorders", "Ear wax removal under microscope"]
}, {
  icon: Wind,
  title: "Nose & Sinus (Rhinology)",
  items: ["Allergic rhinitis & nasal allergy care", "Acute & chronic sinusitis", "Functional endoscopic sinus surgery (FESS)", "Deviated nasal septum (septoplasty)", "Nasal polyps", "Nose-bleed (epistaxis) management"]
}, {
  icon: Mic,
  title: "Throat, Voice & Swallowing",
  items: ["Tonsillitis & tonsillectomy", "Adenoids in children", "Hoarseness / voice disorders", "Vocal cord nodules & polyps", "Swallowing difficulty (dysphagia)", "Reflux laryngitis (LPR)"]
}, {
  icon: Microscope,
  title: "Head-Neck Oncology",
  items: ["Oral cavity cancer screening", "Throat & larynx tumours", "Thyroid swellings & surgery", "Salivary gland disease", "Neck-mass evaluation", "Coordinated cancer treatment planning"]
}, {
  icon: Sparkles,
  title: "Face Surgery (Facial Plastics)",
  items: ["Rhinoplasty (nose reshaping)", "Otoplasty (ear reshaping / pinning)", "Facial trauma & fracture repair", "Post-cancer facial reconstruction", "Scar revision & keloid treatment", "Facial nerve palsy management"]
}, {
  icon: Moon,
  title: "Sleep & Snoring",
  items: ["Snoring evaluation", "Obstructive sleep apnoea (OSA)", "Lifestyle & device counselling", "Surgical options where appropriate"]
}, {
  icon: Baby,
  title: "Paediatric ENT",
  items: ["Recurrent ear infections", "Adenotonsillar disease", "Speech & hearing concerns", "Foreign body removal", "Allergy & breathing problems"]
}, {
  icon: Activity,
  title: "Diagnostics in-clinic",
  items: ["Video endoscopy of ear, nose, throat", "Pure-tone audiometry", "Tympanometry", "Allergy & symptom assessment"]
}, {
  icon: TriangleAlert,
  title: "ENT Emergencies (24×7)",
  items: ["Sudden hearing loss", "Severe nose-bleed", "Foreign body in ear / nose / throat", "Acute airway obstruction", "Facial trauma — ENT component"]
}, {
  icon: Microscope,
  title: "Cancer Surgery",
  items: ["Head-neck tumour excision", "Thyroid cancer surgery", "Oral cavity cancer surgery", "Laryngeal cancer procedures", "Reconstructive surgery post-oncology", "Facial skin cancer excision", "Parotid (salivary gland) surgery", "Post-operative cancer rehabilitation"]
}];
function Services() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Services", title: "Every ENT & face surgery need, from routine to complex.", subtitle: "A single-specialist hospital means continuity of care: the doctor who diagnoses you is the same one who performs your procedure and follows you up." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid md:grid-cols-2 gap-6", children: GROUPS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-7 hover:ring-primary transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/10 text-crimson", children: /* @__PURE__ */ jsxRuntimeExports.jsx(g.icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-primary", children: g.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid gap-2 text-sm text-muted-foreground", children: g.items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson shrink-0" }),
          i
        ] }, i)) })
      ] }, g.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-7 md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/10 text-crimson", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "FAQs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary", children: "Face Surgery — Common Questions" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-2xl", children: "Answers to the most common questions about rhinoplasty, otoplasty, facial reconstruction and scar revision." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "mt-6", children: FACE_FAQ.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `face-${i}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left text-primary font-semibold", children: f.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-muted-foreground", children: f.a })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-7 md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/10 text-crimson", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "FAQs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary", children: "Cancer Surgery — Common Questions" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-2xl", children: "Answers to the questions patients and families most often ask about head-neck cancer diagnosis, surgery, and post-operative recovery." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "mt-6", children: CANCER_FAQ.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `cancer-${i}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left text-primary font-semibold", children: f.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-muted-foreground", children: f.a })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: "Not sure which service you need?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-90 mt-1", children: "Tell us your symptoms — we'll guide you to the right consultation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", className: "inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold", children: [
          "Book a consult ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Services as component
};
