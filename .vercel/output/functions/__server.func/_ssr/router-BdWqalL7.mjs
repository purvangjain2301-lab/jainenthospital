import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import { n as CircleCheck, C as Calendar, b as ArrowRight, Y as Phone, S as MessageCircle, Q as MapPin, y as House, l as ChevronRight, o as CircleUser, i as CalendarCheck, ak as X, R as Menu, F as Facebook, J as Instagram, r as Clock, P as Mail, m as CircleAlert } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-BmsEz5Sk.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$r = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Jain ENT Hospital, Deesa — Prof. Dr. Devendra M. Jain" },
      { name: "description", content: "ENT & Head Neck Surgeon with Cancer Care in Deesa, Gujarat. 18+ years of experience. Mon–Sat 10 AM–7 PM. 24×7 Emergency. Call +91 93257 69599." },
      { name: "author", content: "Prof. Dr. Devendra M. Jain" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Jain ENT Hospital" },
      { property: "og:title", content: "Jain ENT Hospital, Deesa — Prof. Dr. Devendra M. Jain" },
      { property: "og:description", content: "ENT & Head Neck Surgeon with Cancer Care in Deesa, Gujarat. 18+ years of experience. Mon–Sat 10 AM–7 PM. 24×7 Emergency. Call +91 93257 69599." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1A237E" },
      { name: "twitter:title", content: "Jain ENT Hospital, Deesa — Prof. Dr. Devendra M. Jain" },
      { name: "twitter:description", content: "ENT & Head Neck Surgeon with Cancer Care in Deesa, Gujarat. 18+ years of experience. Mon–Sat 10 AM–7 PM. 24×7 Emergency. Call +91 93257 69599." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/eRCuGhsQLggNwqxtJBIa4BSVUoA2/social-images/social-1779556628731-111158.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/eRCuGhsQLggNwqxtJBIa4BSVUoA2/social-images/social-1779556628731-111158.webp" }
    ],
    links: [
      { rel: "stylesheet", href: appCss }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["MedicalBusiness", "MedicalClinic"],
          "@id": "https://jainent.lovable.app/#clinic",
          name: "Jain ENT Hospital",
          url: "https://jainent.lovable.app",
          telephone: ["+91-93257-69599", "+91-63590-09719", "+91-82377-05457"],
          email: "jainentdrdevendra@gmail.com",
          priceRange: "₹₹",
          medicalSpecialty: ["Otolaryngology", "HeadNeckSurgery", "Oncologic"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "First Floor, Iskcon Pride, Opp. JIO Petrol Pump, Deesa Highway",
            addressLocality: "Deesa",
            addressRegion: "Gujarat",
            postalCode: "385535",
            addressCountry: "IN"
          },
          geo: { "@type": "GeoCoordinates", latitude: 24.2724378, longitude: 72.1794694 },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "10:00",
              closes: "19:00"
            }
          ],
          sameAs: [
            "https://www.instagram.com/dr_devendra_jain/",
            "https://g.page/r/CarLiO9V0KfzEBM"
          ]
        })
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          "@id": "https://jainent.lovable.app/#doctor",
          name: "Prof. Dr. Devendra M. Jain",
          honorificPrefix: "Prof. Dr.",
          jobTitle: "ENT & Head Neck Surgeon with Cancer Care",
          medicalSpecialty: ["Otolaryngology", "HeadNeckSurgery"],
          alumniOf: "B.J. Medical College, Pune",
          worksFor: { "@id": "https://jainent.lovable.app/#clinic" },
          url: "https://jainent.lovable.app/about"
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$r.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const drJain = "Prof. Dr. Devendra M. Jain";
const std = [
  "Single-specialist consultant care — your doctor is the surgeon.",
  "18+ years of experience in advanced ENT and head-neck care.",
  "Modern endoscopic & microscopic ENT diagnostics in-clinic.",
  "Honest second-opinion culture — no over-treatment.",
  "Multilingual: Hindi, English, Gujarati, Marathi.",
  "Telemedicine for follow-up & out-of-town patients."
];
const LANDING_PAGES = {
  "ent-doctor-deesa": {
    slug: "ent-doctor-deesa",
    metaTitle: "Best ENT Doctor in Deesa | Prof. Dr. Devendra M. Jain",
    metaDescription: "Looking for the best ENT doctor in Deesa? Prof. Dr. Devendra M. Jain offers 18+ years of expert ear, nose, throat, face surgery and head-neck cancer care.",
    h1: "Best ENT Doctor in Deesa",
    eyebrow: "ENT Specialist · Deesa",
    intro: "Comprehensive ear, nose, throat, face surgery and head-neck cancer care from one of Banaskantha's most experienced ENT consultants.",
    paragraphs: [
      `If you're searching for the best ENT doctor in Deesa, ${drJain} provides senior-consultant ENT care that combines decades of clinical experience with modern endoscopic and microscopic technology. The clinic on Deesa Highway treats patients from across Banaskantha, North Gujarat and South Rajasthan — and consults internationally via secure telemedicine.`,
      "Dr. Jain personally evaluates every patient — there is no junior or trainee in the consultation room. This single-specialist model means the doctor who diagnoses you is also the surgeon who performs your procedure and follows you up, eliminating the hand-offs that often compromise quality at larger hospitals.",
      "Conditions managed at Jain ENT Hospital include chronic sinusitis, allergic rhinitis, deviated nasal septum, nasal polyps, recurrent tonsillitis, adenoid hypertrophy in children, hearing loss, chronic ear discharge (CSOM), tinnitus, vertigo, vocal cord problems, snoring and obstructive sleep apnoea, oral and throat cancers, thyroid surgery, facial trauma, and cosmetic facial procedures including rhinoplasty and otoplasty.",
      "Most diagnostic tests — video endoscopy of the ear, nose and throat, pure-tone audiometry, and tympanometry — are performed in-house with same-day reporting. For surgical patients we coordinate the entire pathway including anaesthesia, theatre, post-operative care, and follow-up."
    ],
    highlights: std,
    faq: [
      {
        q: "How do I book an appointment with the ENT doctor in Deesa?",
        a: "You can book online via the Book page, call +91 93257 69599, or WhatsApp the clinic. Same-day slots are usually available Monday to Saturday between 10 AM and 7 PM."
      },
      {
        q: "Does the clinic see patients from outside Deesa?",
        a: "Yes — patients regularly travel from Palanpur, Dhanera, Tharad, Patan, Sidhpur, Ahmedabad and Mount Abu, and we also offer telemedicine consultations for those who cannot travel."
      }
    ],
    schemaType: "MedicalBusiness",
    conditionName: "Otolaryngology Consultation"
  },
  "ent-specialist-banaskantha": {
    slug: "ent-specialist-banaskantha",
    metaTitle: "ENT Specialist in Banaskantha District | Jain ENT Hospital",
    metaDescription: "ENT specialist serving all of Banaskantha district from the Deesa clinic — sinusitis, ear surgery, throat and head-neck cancer care by Prof. Dr. Devendra M. Jain.",
    h1: "ENT Specialist in Banaskantha District",
    eyebrow: "Banaskantha · Gujarat",
    intro: "Senior ENT consultant care for patients across Banaskantha, with the clinic located in Deesa for easy access from every taluka.",
    paragraphs: [
      "Banaskantha is one of Gujarat's largest districts, and many of its talukas lack dedicated ENT consultants. Jain ENT Hospital in Deesa serves patients travelling from Palanpur, Dhanera, Tharad, Vav, Bhabhar, Diyodar, Kankrej, Vadgam and Amirgadh — providing the full range of ear, nose, throat, face surgery and head-neck cancer services under one roof.",
      `${drJain} brings 18+ years of senior consultant experience and a teaching background to community practice. The clinic is set up to handle everything from a quick allergy review to complex head-neck cancer surgery, so most patients can complete their care without travelling to Ahmedabad.`,
      "We see a high volume of conditions specific to rural North Gujarat — chronic dust-related sinusitis, tobacco-related oral lesions, untreated hearing loss in elderly patients, and recurrent throat infections in children. Each is approached with the right mix of medical management, in-clinic procedures and surgery when needed.",
      "Free parking is available on-site, and most consultations are completed within an hour including diagnostics. For surgical patients, the entire admission, procedure and discharge cycle is coordinated by a single team to minimise repeat travel."
    ],
    highlights: std,
    conditionName: "ENT care across Banaskantha district"
  },
  "ent-doctor-palanpur": {
    slug: "ent-doctor-palanpur",
    metaTitle: "ENT Doctor near Palanpur | Jain ENT Hospital Deesa",
    metaDescription: "ENT doctor near Palanpur — Jain ENT Hospital in Deesa is a short drive away and offers senior-consultant care by Prof. Dr. Devendra M. Jain.",
    h1: "ENT Doctor near Palanpur",
    eyebrow: "Palanpur Patients Welcome",
    intro: "Palanpur residents have a senior ENT specialist within easy reach at Jain ENT Hospital, Deesa — a short drive on the Deesa highway.",
    paragraphs: [
      "Many patients from Palanpur travel to Ahmedabad for ENT care when there is no need — Jain ENT Hospital in Deesa is a short drive on the main highway and offers the same calibre of senior-consultant care without the long journey.",
      `${drJain} sees Palanpur patients every working day. Common reasons for the visit include chronic sinus problems, ear infections that won't clear, hoarseness lasting more than 2 weeks, snoring and sleep apnoea evaluation, and second opinions on previously recommended surgery.`,
      "The clinic offers in-house video endoscopy, audiometry and tympanometry — so most Palanpur patients complete their diagnosis and consultation in a single visit and head home with a clear treatment plan the same day.",
      "For patients who need surgery, the clinic coordinates the full admission, theatre and discharge cycle, which means one trip for the workup and one for the procedure — not multiple visits."
    ],
    highlights: std
  },
  "sinusitis-treatment-deesa": {
    slug: "sinusitis-treatment-deesa",
    metaTitle: "Sinusitis Treatment in Deesa Gujarat | Jain ENT Hospital",
    metaDescription: "Chronic sinusitis treatment in Deesa — medical management and endoscopic sinus surgery (FESS) by Prof. Dr. Devendra M. Jain. 18+ years' experience.",
    h1: "Sinusitis Treatment in Deesa, Gujarat",
    eyebrow: "Sinus Care",
    intro: "Modern medical and surgical sinusitis care — from allergic rhinitis to functional endoscopic sinus surgery (FESS) for chronic cases.",
    paragraphs: [
      "Sinusitis is one of the most common reasons patients visit Jain ENT Hospital. The dry, dusty climate of North Gujarat means many residents live with low-grade nasal congestion, post-nasal drip, headaches and disturbed sleep for years — often misdiagnosed as 'cold' or treated with antibiotics that don't address the underlying problem.",
      `${drJain} approaches sinusitis with a clear three-step framework: accurate diagnosis using video endoscopy and (when needed) a CT-PNS scan, optimised medical therapy with nasal sprays and allergy control, and endoscopic sinus surgery (FESS) only when medical management has genuinely failed.`,
      "Functional Endoscopic Sinus Surgery is performed through the nostrils — there are no external cuts and no facial scarring. Most patients go home the same day or the next morning and return to normal activity within a week. The aim of surgery is not to remove the sinuses but to open their natural drainage pathways so the body can clear infection on its own.",
      "Children with chronic sinusitis or adenoid-related nasal blockage are also welcome — paediatric ENT is one of the clinic's focus areas, with extra care taken to minimise time in theatre and use child-appropriate anaesthesia protocols."
    ],
    highlights: std,
    faq: [
      {
        q: "When does sinusitis need surgery?",
        a: "Only when at least 3 months of optimised medical therapy (nasal steroid sprays, saline rinses, allergy control, occasional antibiotics) has failed to control symptoms, and a CT scan shows persistent sinus blockage."
      },
      {
        q: "Is endoscopic sinus surgery painful?",
        a: "Most patients describe it as similar to a heavy cold for the first few days. There are no external cuts and no nasal packing in most cases. Pain is well controlled with simple medication."
      }
    ],
    conditionName: "Chronic Sinusitis"
  },
  "tonsil-surgery-deesa": {
    slug: "tonsil-surgery-deesa",
    metaTitle: "Tonsil Surgery Specialist in Deesa | Jain ENT Hospital",
    metaDescription: "Tonsillectomy and tonsil surgery in Deesa for adults and children. Modern techniques, day-care discharge in most cases. Prof. Dr. Devendra M. Jain.",
    h1: "Tonsil Surgery Specialist in Deesa",
    eyebrow: "Tonsils & Adenoids",
    intro: "Modern tonsillectomy and adenoid surgery for adults and children — day-care discharge in most cases.",
    paragraphs: [
      "Recurrent tonsillitis is one of the most common reasons children and young adults are referred to Jain ENT Hospital. While many cases can be managed without surgery, the right candidates benefit enormously from a one-time procedure that ends years of recurring sore throats, missed school and recurring antibiotic courses.",
      `${drJain} follows the well-established Paradise criteria — surgery is recommended when there have been 7 or more documented throat infections in one year, 5 per year for two years, or 3 per year for three years; or when tonsils cause sleep apnoea, swallowing difficulty, or peri-tonsillar abscesses.`,
      "Modern tonsillectomy is much gentler than the procedure most adults remember. Techniques used at the clinic include bipolar dissection and coblation when appropriate, minimising bleeding and post-operative pain. Most children go home the same evening or next morning, with normal diet restored within 7–10 days.",
      "Adenoidectomy — usually done alongside tonsillectomy in children with mouth-breathing and snoring — has no external incisions and adds minimal recovery time. The combined procedure dramatically improves sleep quality, breathing and even school performance in many children."
    ],
    highlights: std,
    conditionName: "Tonsillitis / Adenoid Hypertrophy"
  },
  "vertigo-treatment-deesa": {
    slug: "vertigo-treatment-deesa",
    metaTitle: "Vertigo Treatment Specialist in Deesa, Gujarat",
    metaDescription: "Vertigo and dizziness specialist in Deesa. Accurate diagnosis (BPPV, Meniere's, vestibular neuritis) and modern treatment by Prof. Dr. Devendra M. Jain.",
    h1: "Vertigo Treatment Specialist in Deesa",
    eyebrow: "Balance & Inner Ear",
    intro: "Most vertigo can be diagnosed clinically and treated effectively — once the cause is correctly identified.",
    paragraphs: [
      "Vertigo — the sensation that you or the room is spinning — is one of the most distressing ENT symptoms patients describe. It is also one of the most commonly misdiagnosed: many patients in North Gujarat have been on long courses of generic 'vertigo tablets' for years without anyone identifying which type of vertigo they actually have.",
      `At Jain ENT Hospital, vertigo evaluation starts with a detailed history and a focused physical examination including positional tests like the Dix-Hallpike manoeuvre. ${drJain} can usually distinguish between the four common causes in one visit: BPPV (benign positional vertigo), Meniere's disease, vestibular neuritis, and migraine-associated vertigo.`,
      "BPPV — by far the most common — often responds to a single in-clinic Epley manoeuvre, sometimes ending years of symptoms in 10 minutes. Other causes are managed with targeted medication, vestibular rehabilitation exercises, or referred for specialised imaging when indicated.",
      "If you or a family member has been struggling with dizziness, light-headedness or imbalance and previous treatment hasn't worked, a focused ENT vertigo consultation is often the missing step."
    ],
    highlights: std,
    conditionName: "Vertigo"
  },
  "hearing-loss-treatment-deesa": {
    slug: "hearing-loss-treatment-deesa",
    metaTitle: "Hearing Loss Treatment in Deesa | Jain ENT Hospital",
    metaDescription: "Hearing loss evaluation, ear microsurgery and hearing aid fitting in Deesa by Prof. Dr. Devendra M. Jain. In-clinic audiometry, same-day reports.",
    h1: "Hearing Loss Treatment in Deesa",
    eyebrow: "Ear & Hearing",
    intro: "Accurate hearing diagnosis with in-clinic audiometry, ear microsurgery when indicated, and trial-based hearing aid fitting.",
    paragraphs: [
      "Hearing loss in adults is far more common than most families realise — and far more treatable. At Jain ENT Hospital we see a wide range of patients: elderly patients with age-related hearing loss who have been struggling silently for years, working adults with sudden one-sided deafness, children with recurrent ear infections, and patients with chronic ear discharge that has caused conductive hearing loss.",
      "Every hearing evaluation begins with pure-tone audiometry and tympanometry in the clinic itself — no waiting weeks for a separate audiology appointment. Most patients walk out the same day with a clear audiogram, a diagnosis (conductive, sensorineural, or mixed), and a tailored treatment plan.",
      `${drJain} performs ear microsurgery for chronic suppurative otitis media (CSOM), tympanoplasty for perforated eardrums, and ossiculoplasty for damaged middle-ear bones. For sensorineural hearing loss that doesn't have a surgical solution, we offer trial-based hearing aid fitting from established brands with full follow-up.`,
      "Sudden hearing loss is a medical emergency that needs treatment within 48–72 hours for the best chance of recovery — please call us the same day if it happens to you or a family member."
    ],
    highlights: std,
    conditionName: "Hearing Loss"
  },
  "head-neck-cancer-surgeon-gujarat": {
    slug: "head-neck-cancer-surgeon-gujarat",
    metaTitle: "Head Neck Cancer Surgeon in Gujarat | Prof. Dr. Devendra M. Jain",
    metaDescription: "Head-neck cancer surgeon in Gujarat — oral, throat, laryngeal, thyroid and salivary gland cancer surgery with reconstruction by Prof. Dr. Devendra M. Jain.",
    h1: "Head & Neck Cancer Surgeon in Gujarat",
    eyebrow: "Surgical Oncology",
    intro: "Comprehensive head-neck cancer care — from early-stage detection through complex resection, reconstruction and long-term follow-up.",
    paragraphs: [
      `${drJain} is a practising head-neck cancer surgeon with years of focused experience in surgical oncology, alongside his ENT and face surgery practice. The single-roof model means every patient is seen, operated on, and followed up by the same consultant — continuity that matters in cancer care.`,
      "Conditions managed include oral cavity cancers (tongue, cheek, lip, floor of mouth), oropharyngeal cancers, laryngeal cancers, thyroid cancers and benign thyroid surgery, salivary gland tumours (parotid and submandibular), neck lymph node metastases, and facial skin cancers requiring reconstructive closure.",
      "Tobacco-related oral cancer is unfortunately common in North Gujarat, and we focus heavily on early detection — a 10-minute oral and neck examination can pick up pre-cancerous changes (leukoplakia, erythroplakia, submucous fibrosis) that are completely curable when caught early. If you use tobacco or gutkha in any form, please book a screening.",
      "Surgical care includes voice- and swallow-preserving techniques whenever possible, reconstructive procedures using local flaps for facial defects, and coordination with medical and radiation oncologists for combined treatment when needed. Speech therapy and swallowing rehabilitation are arranged after surgery so most patients regain near-normal function within weeks."
    ],
    highlights: std,
    faq: [
      {
        q: "Do you coordinate with chemotherapy and radiation centres?",
        a: "Yes. We work closely with medical and radiation oncology centres in Ahmedabad and Mehsana to plan combined treatment, so patients receive seamless care from diagnosis through recovery without losing time to coordination delays."
      },
      {
        q: "How is the diagnosis confirmed?",
        a: "Through a focused clinical exam, video endoscopy, a tissue biopsy of the suspicious area, and imaging (CT, MRI or ultrasound). FNAC is used for neck swellings. All of this is coordinated from the clinic."
      }
    ],
    conditionName: "Head and Neck Cancer"
  },
  "face-surgery-deesa": {
    slug: "face-surgery-deesa",
    metaTitle: "Face Surgery Specialist in Deesa, Gujarat",
    metaDescription: "Face surgery in Deesa — rhinoplasty, otoplasty, scar revision, facial trauma and post-cancer reconstruction by Prof. Dr. Devendra M. Jain.",
    h1: "Face Surgery Specialist in Deesa, Gujarat",
    eyebrow: "Facial Plastics",
    intro: "Cosmetic and reconstructive face surgery under one specialist — backed by years of head-neck surgical expertise.",
    paragraphs: [
      `Face surgery at Jain ENT Hospital is performed by ${drJain} himself, drawing on his combined ENT, head-neck and reconstructive surgical training. Procedures span the full range from cosmetic improvements like rhinoplasty (nose reshaping) and otoplasty (ear pinning) through to complex reconstruction after trauma or cancer resection.`,
      "Rhinoplasty is the most commonly requested cosmetic procedure — patients come for hump reduction, tip refinement, correction of a deviated nose causing breathing difficulty, or post-trauma reshaping. Because the same surgeon also handles the functional side (deviated septum, sinusitis), patients get a nose that looks better and breathes better in a single procedure.",
      "Otoplasty for prominent ears is most often performed in school-age children before social teasing becomes an issue, and is also requested by adults. The procedure is straightforward, leaves no visible scarring (the incision is behind the ear), and the result is permanent.",
      "Reconstructive procedures include facial trauma repair after road accidents, scar revision and keloid management, and post-cancer reconstruction using local flaps. For patients abroad or out-of-town, an initial telemedicine consultation with photo review is offered so most of the planning can be done before travel."
    ],
    highlights: std,
    faq: [
      {
        q: "How long is recovery after rhinoplasty?",
        a: "Most patients return to office work in 7–10 days. Visible swelling settles over 2–6 weeks, with subtle changes continuing to refine for up to a year. A nasal cast is worn for the first week."
      }
    ],
    conditionName: "Facial Plastic and Reconstructive Surgery"
  },
  "ent-doctor-dhanera": {
    slug: "ent-doctor-dhanera",
    metaTitle: "ENT Doctor in Dhanera | Jain ENT Hospital Deesa",
    metaDescription: "ENT doctor for Dhanera patients — Jain ENT Hospital in Deesa offers senior-consultant ENT care by Prof. Dr. Devendra M. Jain.",
    h1: "ENT Doctor in Dhanera",
    eyebrow: "Dhanera Patients Welcome",
    intro: "Dhanera residents can access senior-consultant ENT, face and head-neck cancer care at Jain ENT Hospital in nearby Deesa.",
    paragraphs: [
      "Dhanera doesn't currently have a full-time ENT consultant, so most residents travel to Deesa or Palanpur for specialist ear, nose and throat care. Jain ENT Hospital is the closest senior-consultant ENT clinic with full diagnostic and surgical facilities under one roof.",
      `${drJain} sees Dhanera patients every working day for the full range of conditions: chronic sinus disease, recurrent ear infections, hearing loss, tonsil and adenoid problems in children, snoring and sleep apnoea, hoarseness, vertigo, and any suspicious oral or neck swellings.`,
      "For patients who would prefer not to travel for a first consultation — especially elderly patients or those with mobility issues — we offer telemedicine video consultations. After the video consult we can advise whether an in-person visit is genuinely needed or whether the issue can be managed remotely.",
      "All major investigations (video endoscopy, audiometry, tympanometry) are performed in-clinic with same-day reporting, so Dhanera patients typically complete diagnosis and consultation in a single trip."
    ],
    highlights: std
  },
  "ent-hospital-deesa": {
    slug: "ent-hospital-deesa",
    metaTitle: "Best ENT Hospital in Deesa, Gujarat | Jain ENT Hospital",
    metaDescription: "Jain ENT Hospital — the dedicated ENT, face surgery and head-neck cancer hospital in Deesa, Gujarat, led by Prof. Dr. Devendra M. Jain.",
    h1: "Best ENT Hospital in Deesa, Gujarat",
    eyebrow: "Dedicated ENT Hospital",
    intro: "A purpose-built ENT, face surgery and head-neck cancer hospital in the heart of Deesa — modern equipment, single-specialist care, 24×7 emergency.",
    paragraphs: [
      "Jain ENT Hospital is a dedicated ear, nose, throat, face surgery and head-neck cancer care centre on Deesa Highway. Unlike general hospitals where ENT is one of many departments, every facility, instrument, theatre setup and team member at our clinic is built around ENT and head-neck care.",
      `The hospital is led by ${drJain} — MBBS, MS (ENT) — with 18+ years of experience as a senior consultant. The model is deliberately single-specialist: the doctor who diagnoses you is the same one who performs your surgery and follows you up.`,
      "Facilities include modern operation theatre with microscopic and endoscopic ENT setup, in-clinic video endoscopy of ear/nose/throat, pure-tone audiometry, tympanometry, dedicated consultation rooms, an in-house pharmacy (Yashvi Medical Store) stocking ENT-specific drops, sprays and post-operative medicines, and a 24×7 emergency line for genuine ENT emergencies.",
      "Patients are welcomed from across Banaskantha, Patan, Sabarkantha, Mehsana, South Rajasthan and worldwide via telemedicine. Free parking is available on-site and most consultations are completed within an hour including diagnostics."
    ],
    highlights: std,
    conditionName: "ENT Hospital",
    schemaType: "MedicalBusiness"
  }
};
const LANDING_SLUGS = Object.keys(LANDING_PAGES);
const props$a = LANDING_PAGES["vertigo-treatment-deesa"];
const logo = "data:image/jpeg;base64,";
const CLINIC = {
  name: "Jain ENT Hospital",
  tagline: "Ear • Nose • Throat • Face Surgery • Head & Neck Cancer Care",
  doctor: {
    name: "Prof. Dr. Devendra M. Jain",
    short: "Dr. Devendra Jain",
    creds: "MBBS, MS (ENT)",
    title: "ENT & Head Neck Surgeon with Cancer Care",
    bio: "Senior ENT Surgeon with 18+ years of experience in clinical and surgical practice. Ex-BJ Medical College, Pune. Dr. Jain is a practising ENT Surgeon who also specializes in face surgery (cosmetic & reconstructive) and head-neck cancer care, and provides in-clinic and telemedicine consultations for patients across India and worldwide."
  },
  address: {
    line1: "First Floor, Iskcon Pride",
    line2: "Opp. JIO Petrol Pump, Deesa Highway",
    city: "Deesa",
    state: "Gujarat",
    pin: "385535",
    country: "India"
  },
  phones: {
    primary: "+91 93257 69599",
    secondary: "+91 63590 09719",
    tertiary: "+91 82377 05457"
  },
  whatsapp: {
    primary: "919325769599"
  },
  email: "jainentdrdevendra@gmail.com",
  hours: {
    weekdays: "Mon – Sat · 10:00 AM – 7:00 PM",
    sunday: "Sunday Closed",
    emergency: "Emergency 24×7"
  },
  social: {
    facebook: "https://www.facebook.com/share/18i7Pnt2BH/",
    instagram: "https://www.instagram.com/dr_devendra_jain?igsh=aHg0NHE5dm53cTV5",
    maps: "https://maps.app.goo.gl/UGd5DbgeySUoC2wp6?g_st=ac"
  }
};
const telPrimary = CLINIC.phones.primary.replace(/\s/g, "");
const waLink = (msg) => `https://wa.me/${CLINIC.whatsapp.primary}?text=${encodeURIComponent(msg)}`;
function EmergencyBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-crimson text-crimson-foreground text-xs sm:text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight flex items-center justify-between gap-3 py-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium tracking-wide", children: "24×7 ENT Emergency — call any time" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: `tel:${telPrimary}`,
        className: "flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline whitespace-nowrap",
        "aria-label": `Call emergency number ${CLINIC.phones.primary}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5", "aria-hidden": true }),
          CLINIC.phones.primary
        ]
      }
    )
  ] }) });
}
const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/telemedicine", label: "Telemedicine" },
  { to: "/pharmacy", label: "Pharmacy" },
  { to: "/patient-info", label: "Patient Info" },
  { to: "/post-op-care", label: "Post-Op Care" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/feedback", label: "Reviews" },
  { to: "/contact", label: "Contact" },
  { to: "/my-appointments", label: "My Appts", icon: true }
];
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmergencyBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight flex items-center justify-between gap-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 group", "aria-label": CLINIC.name, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logo,
            alt: `${CLINIC.name} logo`,
            className: "h-11 w-11 rounded-md object-contain bg-white ring-1 ring-border",
            width: 44,
            height: 44
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg sm:text-xl font-bold text-primary", children: [
            "Jain ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-crimson", children: "ENT" }),
            " Hospital"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] sm:text-xs text-muted-foreground -mt-0.5", children: "Deesa · Prof. Dr. Devendra M. Jain" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-1", "aria-label": "Primary", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: n.to,
          activeOptions: { exact: n.to === "/" },
          className: "px-3 py-2 text-sm font-medium text-foreground/80 rounded-md hover:text-primary hover:bg-secondary transition-colors [&.active]:text-primary [&.active]:bg-secondary inline-flex items-center gap-1.5",
          children: [
            "icon" in n && n.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-4 w-4" }),
            n.label
          ]
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/book",
            className: "hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-4 w-4" }),
              " Book"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground",
            "aria-expanded": open,
            "aria-label": "Toggle navigation",
            onClick: () => setOpen((v) => !v),
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto overscroll-contain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "container-tight flex flex-col py-2", "aria-label": "Mobile", children: [
      NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: n.to,
          onClick: () => setOpen(false),
          activeOptions: { exact: n.to === "/" },
          className: "px-2 py-3 text-base font-medium border-b border-border/50 last:border-none [&.active]:text-primary inline-flex items-center gap-2",
          children: [
            "icon" in n && n.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-4 w-4" }),
            n.label
          ]
        },
        n.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/book",
          onClick: () => setOpen(false),
          className: "mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-4 w-4" }),
            " Book Appointment"
          ]
        }
      )
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 bg-primary text-primary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight py-14 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "", className: "h-12 w-12 rounded-md bg-white p-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: "Jain ENT Hospital" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80", children: CLINIC.tagline })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-sm leading-relaxed opacity-85 max-w-md", children: [
          "Comprehensive ENT, face surgery and head-neck cancer care led by ",
          CLINIC.doctor.name,
          ", serving patients across India and worldwide via telemedicine, with the clinic based in Deesa, Gujarat. 18+ years of experience in advanced ENT and head-neck care."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: CLINIC.social.facebook,
              target: "_blank",
              rel: "noreferrer",
              className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-crimson transition",
              "aria-label": "Facebook",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: CLINIC.social.instagram,
              target: "_blank",
              rel: "noreferrer",
              className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-crimson transition",
              "aria-label": "Instagram",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-5 w-5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mb-4", children: "Visit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mt-0.5 shrink-0 text-crimson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              CLINIC.address.line1,
              ", ",
              CLINIC.address.line2,
              ", ",
              CLINIC.address.city,
              ", ",
              CLINIC.address.state,
              " ",
              CLINIC.address.pin
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 mt-0.5 shrink-0 text-crimson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              CLINIC.hours.weekdays,
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              CLINIC.hours.sunday,
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: CLINIC.hours.emergency })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mb-4", children: "Contact & Patients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 mt-0.5 shrink-0 text-crimson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${telPrimary}`, className: "hover:underline", children: CLINIC.phones.primary })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 mt-0.5 shrink-0 text-crimson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${CLINIC.phones.secondary.replace(/\s/g, "")}`, className: "hover:underline", children: CLINIC.phones.secondary })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 mt-0.5 shrink-0 text-crimson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${CLINIC.email}`, className: "hover:underline break-all", children: CLINIC.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-4 w-4 mt-0.5 shrink-0 text-crimson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-appointments", className: "hover:underline", children: "My Appointments" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "inline-flex items-center gap-2 rounded-full bg-crimson px-4 py-2 text-sm font-semibold", children: "Book Appointment" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs opacity-80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Jain ENT Hospital, Deesa. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Caring for patients across India and around the world." })
    ] }) })
  ] });
}
function WhatsappFloat() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: waLink("Hello Dr. Devendra, I would like to enquire about an ENT consultation."),
      target: "_blank",
      rel: "noreferrer",
      "aria-label": "Chat on WhatsApp",
      className: "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white font-semibold shadow-elevated hover:scale-[1.03] transition",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-sm", children: "WhatsApp Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute -top-1 -right-1 inline-flex h-3 w-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-[#25D366] ring-2 ring-white" })
        ] })
      ]
    }
  );
}
function SiteLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsappFloat, {})
  ] });
}
function PageHero({
  eyebrow,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-hero border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight py-14 md:py-20", children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 rounded-full bg-crimson/10 text-crimson px-3 py-1 text-xs font-semibold tracking-wider uppercase", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-balance", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-base md:text-lg text-muted-foreground text-pretty", children: subtitle })
  ] }) });
}
function Breadcrumbs({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Breadcrumb", className: "container-tight pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1 hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3 w-3" }),
      " Home"
    ] }) }),
    items.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
      c.to && i < items.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: c.to, className: "hover:text-primary", children: c.label }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", "aria-current": "page", children: c.label })
    ] }, i))
  ] }) });
}
function breadcrumbJsonLd(items, baseUrl) {
  const list = [{ label: "Home", to: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.to ? `${baseUrl}${c.to}` : void 0
    }))
  };
}
const SITE_URL = "https://jainent.lovable.app";
const abs = (path) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
const listeners = /* @__PURE__ */ new Set();
async function saveSiteContent(key, value) {
  const { error } = await supabase.from("site_content").upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
  listeners.forEach((l) => l());
}
function landingHead(p) {
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
      addressCountry: "IN"
    },
    geo: { "@type": "GeoCoordinates", latitude: 24.2724378, longitude: 72.1794694 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00"
      }
    ],
    medicalSpecialty: ["Otolaryngology", "HeadNeckSurgery"]
  };
  const conditionLd = p.conditionName ? {
    "@context": "https://schema.org",
    "@type": p.schemaType ?? "MedicalCondition",
    name: p.conditionName,
    relevantSpecialty: { "@type": "MedicalSpecialty", name: "Otolaryngology" }
  } : null;
  return {
    meta: [
      { title: p.metaTitle },
      { name: "description", content: p.metaDescription },
      { property: "og:title", content: p.metaTitle },
      { property: "og:description", content: p.metaDescription },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusiness) },
      ...conditionLd ? [{ type: "application/ld+json", children: JSON.stringify(conditionLd) }] : [],
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([{ label: p.h1, to: `/${p.slug}` }], SITE_URL)
        )
      },
      ...p.faq && p.faq.length ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a }
            }))
          })
        }
      ] : []
    ]
  };
}
function LandingPage(p) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{ label: p.h1, to: `/${p.slug}` }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: p.eyebrow, title: p.h1, subtitle: p.intro }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight grid lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "lg:col-span-8 space-y-5 text-foreground leading-relaxed", children: [
        p.paragraphs.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: para }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary mt-8", children: "Why patients choose Jain ENT Hospital" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-3 mt-3", children: p.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h })
        ] }, h)) }),
        p.faq && p.faq.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary mt-10", children: "Frequently asked questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mt-3", children: p.faq.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl ring-1 ring-border bg-white p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-primary", children: f.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: f.a })
          ] }, f.q)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/book",
              className: "inline-flex items-center gap-2 rounded-full bg-crimson text-crimson-foreground px-6 py-3 text-sm font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                " Book appointment ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/services",
              className: "inline-flex items-center gap-2 rounded-full ring-1 ring-border px-6 py-3 text-sm font-semibold",
              children: "View all services"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:col-span-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary text-primary-foreground p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold", children: "Talk to our team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm opacity-90", children: CLINIC.hours.weekdays }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `tel:${telPrimary}`,
              className: "mt-4 flex items-center gap-2 rounded-xl bg-white text-primary px-4 py-3 text-sm font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
                " ",
                CLINIC.phones.primary
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: waLink(`Hi, I'd like to know more about ${p.h1}.`),
              target: "_blank",
              rel: "noreferrer",
              className: "mt-2 flex items-center gap-2 rounded-xl bg-[#25D366] text-white px-4 py-3 text-sm font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                " WhatsApp us"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white ring-1 ring-border p-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-crimson mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              CLINIC.address.line1,
              ", ",
              CLINIC.address.line2,
              ", ",
              CLINIC.address.city,
              ",",
              " ",
              CLINIC.address.state,
              " ",
              CLINIC.address.pin
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: CLINIC.social.maps,
              target: "_blank",
              rel: "noreferrer",
              className: "mt-3 inline-block text-primary text-sm font-semibold hover:underline",
              children: "Open in Google Maps →"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const $$splitComponentImporter$p = () => import("./vertigo-treatment-deesa-BKDakbMP.mjs");
const Route$q = createFileRoute("/vertigo-treatment-deesa")({
  head: () => landingHead(props$a),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const props$9 = LANDING_PAGES["tonsil-surgery-deesa"];
const $$splitComponentImporter$o = () => import("./tonsil-surgery-deesa-D7cjHbIP.mjs");
const Route$p = createFileRoute("/tonsil-surgery-deesa")({
  head: () => landingHead(props$9),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./telemedicine-CJu2UjMk.mjs");
const Route$o = createFileRoute("/telemedicine")({
  head: () => ({
    meta: [{
      title: "ENT Telemedicine — Consult Dr. Devendra Jain online"
    }, {
      name: "description",
      content: "Online ENT consultations with Prof. Dr. Devendra M. Jain. Available to patients across India and worldwide. Hindi, English, Gujarati, Marathi."
    }, {
      property: "og:title",
      content: "ENT Telemedicine — Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "Online ENT consultations from anywhere in India and abroad."
    }, {
      property: "og:url",
      content: "https://jainent.lovable.app/telemedicine"
    }],
    links: [{
      rel: "canonical",
      href: "https://jainent.lovable.app/telemedicine"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const BASE_URL = "https://jainent.lovable.app";
const Route$n = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const staticEntries = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/services", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/book", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/telemedicine", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/pharmacy", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/patient-info", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/post-op-care", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/blog", changefreq: "weekly", priority: "0.7", lastmod: today },
          { path: "/gallery", changefreq: "monthly", priority: "0.5", lastmod: today },
          { path: "/feedback", changefreq: "weekly", priority: "0.7", lastmod: today },
          { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod: today }
        ];
        const landingEntries = LANDING_SLUGS.map((slug) => ({
          path: `/${slug}`,
          changefreq: "monthly",
          priority: "0.8",
          lastmod: today
        }));
        let blogEntries = [];
        try {
          const { data } = await supabase.from("blog_posts").select("slug, created_at").eq("published", true);
          if (data) {
            blogEntries = data.map((p) => ({
              path: `/blog/${p.slug}`,
              changefreq: "monthly",
              priority: "0.6",
              lastmod: (p.created_at ?? today).slice(0, 10)
            }));
          }
        } catch {
        }
        const entries = [...staticEntries, ...landingEntries, ...blogEntries];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const props$8 = LANDING_PAGES["sinusitis-treatment-deesa"];
const $$splitComponentImporter$m = () => import("./sinusitis-treatment-deesa-Chxn1TKL.mjs");
const Route$m = createFileRoute("/sinusitis-treatment-deesa")({
  head: () => landingHead(props$8),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./services-BShxUIR9.mjs");
const Route$l = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "ENT Services in Deesa Gujarat | Jain ENT Hospital"
    }, {
      name: "description",
      content: "Complete ENT, face surgery and head-neck cancer services in Deesa: sinus, ear, throat, vertigo, hearing, snoring, oncology and more."
    }, {
      property: "og:title",
      content: "ENT Services in Deesa Gujarat | Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "Comprehensive ENT, face surgery and head-neck cancer services."
    }, {
      property: "og:url",
      content: "https://jainent.lovable.app/services"
    }],
    links: [{
      rel: "canonical",
      href: "https://jainent.lovable.app/services"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./post-op-care-D_8WoQhE.mjs");
const Route$k = createFileRoute("/post-op-care")({
  head: () => ({
    meta: [{
      title: `Post-Operative Care Checklist — Jain ENT Hospital, ${CLINIC.address.city}`
    }, {
      name: "description",
      content: "Downloadable post-operative care checklist for ENT and head & neck surgery patients of Prof. Dr. Devendra M. Jain. WhatsApp direct line for queries."
    }, {
      property: "og:title",
      content: "Post-Op Care Checklist — Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "Recovery guidance, warning signs, and a direct WhatsApp line for surgery patients."
    }, {
      property: "og:url",
      content: "/post-op-care"
    }],
    links: [{
      rel: "canonical",
      href: "/post-op-care"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./pharmacy-e27KKkTX.mjs");
const Route$j = createFileRoute("/pharmacy")({
  head: () => ({
    meta: [{
      title: "Yashvi Medical Store — Pharmacy at Jain ENT Hospital, Deesa"
    }, {
      name: "description",
      content: "Yashvi Medical Store — in-house pharmacy at Jain ENT Hospital, Deesa. Genuine ENT and post-op medicines. Refills via WhatsApp."
    }, {
      property: "og:title",
      content: "Pharmacy — Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "ENT pharmacy and prescription refills in Deesa."
    }, {
      property: "og:url",
      content: "https://jainent.lovable.app/pharmacy"
    }],
    links: [{
      rel: "canonical",
      href: "https://jainent.lovable.app/pharmacy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./patient-info-DyqbdOpr.mjs");
const Route$i = createFileRoute("/patient-info")({
  head: () => ({
    meta: [{
      title: "Patient Information & Visit Guide — Jain ENT Hospital"
    }, {
      name: "description",
      content: "What to bring, payment options, language, insurance and visit guidance for patients of Jain ENT Hospital, Deesa."
    }, {
      property: "og:title",
      content: "Patient Info — Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "Everything you need to know before your visit."
    }, {
      property: "og:url",
      content: "/patient-info"
    }],
    links: [{
      rel: "canonical",
      href: "/patient-info"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./my-appointments-QwjCacwA.mjs");
const Route$h = createFileRoute("/my-appointments")({
  head: () => ({
    meta: [{
      title: "My Appointments — Jain ENT Hospital"
    }, {
      name: "description",
      content: "View and manage your ENT appointments at Jain ENT Hospital."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const props$7 = LANDING_PAGES["hearing-loss-treatment-deesa"];
const $$splitComponentImporter$g = () => import("./hearing-loss-treatment-deesa-Crj8qM2N.mjs");
const Route$g = createFileRoute("/hearing-loss-treatment-deesa")({
  head: () => landingHead(props$7),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const props$6 = LANDING_PAGES["head-neck-cancer-surgeon-gujarat"];
const $$splitComponentImporter$f = () => import("./head-neck-cancer-surgeon-gujarat-D9jRLuUd.mjs");
const Route$f = createFileRoute("/head-neck-cancer-surgeon-gujarat")({
  head: () => landingHead(props$6),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./gallery-CmtI004y.mjs");
const Route$e = createFileRoute("/gallery")({
  head: () => ({
    meta: [{
      title: "Gallery — Jain ENT Hospital, Deesa"
    }, {
      name: "description",
      content: "A look inside Jain ENT Hospital, Deesa — clinic spaces, equipment and patient care moments."
    }, {
      property: "og:title",
      content: "Gallery — Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "A look inside our clinic."
    }, {
      property: "og:url",
      content: "/gallery"
    }],
    links: [{
      rel: "canonical",
      href: "/gallery"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./feedback-D8YugpdA.mjs");
const Route$d = createFileRoute("/feedback")({
  head: () => ({
    meta: [{
      title: "Patient Reviews | Jain ENT Hospital Deesa"
    }, {
      name: "description",
      content: "Read patient reviews of Jain ENT Hospital, Deesa, and share your own experience with Prof. Dr. Devendra M. Jain."
    }, {
      property: "og:title",
      content: "Patient Reviews | Jain ENT Hospital Deesa"
    }, {
      property: "og:description",
      content: "Genuine patient feedback for Jain ENT Hospital, Deesa. Share your visit with Prof. Dr. Devendra M. Jain."
    }, {
      property: "og:url",
      content: abs("/feedback")
    }, {
      property: "og:type",
      content: "website"
    }],
    links: [{
      rel: "canonical",
      href: abs("/feedback")
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbJsonLd([{
        label: "Patient Reviews",
        to: "/feedback"
      }], SITE_URL))
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const props$5 = LANDING_PAGES["face-surgery-deesa"];
const $$splitComponentImporter$c = () => import("./face-surgery-deesa-DaYnLx0e.mjs");
const Route$c = createFileRoute("/face-surgery-deesa")({
  head: () => landingHead(props$5),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const props$4 = LANDING_PAGES["ent-specialist-banaskantha"];
const $$splitComponentImporter$b = () => import("./ent-specialist-banaskantha-BMPpcyrc.mjs");
const Route$b = createFileRoute("/ent-specialist-banaskantha")({
  head: () => landingHead(props$4),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const props$3 = LANDING_PAGES["ent-hospital-deesa"];
const $$splitComponentImporter$a = () => import("./ent-hospital-deesa-Q6a3dRfV.mjs");
const Route$a = createFileRoute("/ent-hospital-deesa")({
  head: () => landingHead(props$3),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const props$2 = LANDING_PAGES["ent-doctor-palanpur"];
const $$splitComponentImporter$9 = () => import("./ent-doctor-palanpur-PYniSHEH.mjs");
const Route$9 = createFileRoute("/ent-doctor-palanpur")({
  head: () => landingHead(props$2),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const props$1 = LANDING_PAGES["ent-doctor-dhanera"];
const $$splitComponentImporter$8 = () => import("./ent-doctor-dhanera-BaqgxEn-.mjs");
const Route$8 = createFileRoute("/ent-doctor-dhanera")({
  head: () => landingHead(props$1),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const props = LANDING_PAGES["ent-doctor-deesa"];
const $$splitComponentImporter$7 = () => import("./ent-doctor-deesa-oHLXVROD.mjs");
const Route$7 = createFileRoute("/ent-doctor-deesa")({
  head: () => landingHead(props),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./contact-CrlE-KLd.mjs");
const Route$6 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact Jain ENT Hospital — Deesa, Gujarat"
    }, {
      name: "description",
      content: "Address, phone, WhatsApp, email and directions to Jain ENT Hospital, Deesa. Mon–Sat 10 AM–7 PM. Emergency 24×7."
    }, {
      property: "og:title",
      content: "Contact — Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "Reach us by phone, WhatsApp, or in person."
    }, {
      property: "og:url",
      content: "https://jainent.lovable.app/contact"
    }],
    links: [{
      rel: "canonical",
      href: "https://jainent.lovable.app/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./book-CAaxD0Ok.mjs");
const Route$5 = createFileRoute("/book")({
  head: () => ({
    meta: [{
      title: "Book ENT Appointment in Deesa | Jain ENT Hospital"
    }, {
      name: "description",
      content: "Book your ENT appointment online with Prof. Dr. Devendra M. Jain in Deesa. Clinic visit or telemedicine from anywhere. Mon–Sat 10 AM–7 PM."
    }, {
      property: "og:title",
      content: "Book ENT Appointment in Deesa | Jain ENT Hospital"
    }, {
      property: "og:description",
      content: "Reserve your ENT or face-surgery consult in Deesa, or worldwide via telemedicine."
    }, {
      property: "og:url",
      content: "https://jainent.lovable.app/book"
    }],
    links: [{
      rel: "canonical",
      href: "https://jainent.lovable.app/book"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./blog-CwIb7l_F.mjs");
const Route$4 = createFileRoute("/blog")({
  head: () => ({
    meta: [{
      title: "ENT Health Tips & Articles | Jain ENT Hospital Deesa"
    }, {
      name: "description",
      content: "Practical ENT health articles, post-op care guides, and patient education from Prof. Dr. Devendra M. Jain, Deesa."
    }, {
      property: "og:title",
      content: "ENT Health Tips & Articles | Jain ENT Hospital Deesa"
    }, {
      property: "og:description",
      content: "ENT awareness articles for patients from Jain ENT Hospital, Deesa."
    }, {
      property: "og:url",
      content: abs("/blog")
    }],
    links: [{
      rel: "canonical",
      href: abs("/blog")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin-Cs9KVp6o.mjs");
const Route$3 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      name: "robots",
      content: "noindex, nofollow"
    }, {
      title: "Admin — Jain ENT Hospital"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-BQzSLuu3.mjs");
const Route$2 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "Prof. Dr. Devendra M. Jain - ENT & Head Neck Surgeon with Cancer Care | Deesa"
    }, {
      name: "description",
      content: "Prof. Dr. Devendra M. Jain — ENT & Head Neck Surgeon with Cancer Care. 18+ years of experience. Ex-BJ Medical Pune. Telemedicine worldwide."
    }, {
      property: "og:title",
      content: "Prof. Dr. Devendra M. Jain - ENT & Head Neck Surgeon with Cancer Care"
    }, {
      property: "og:description",
      content: "ENT, face surgery & head-neck cancer specialist in Deesa, Gujarat. Telemedicine worldwide."
    }, {
      property: "og:url",
      content: "https://jainent.lovable.app/about"
    }],
    links: [{
      rel: "canonical",
      href: "https://jainent.lovable.app/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-B5UJ3aBI.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Best ENT Doctor in Deesa | Prof. Dr. Devendra M. Jain | Jain ENT Hospital"
    }, {
      name: "description",
      content: "ENT & Head Neck Surgeon with Cancer Care in Deesa, Gujarat. Prof. Dr. Devendra M. Jain — 18+ years of experience. Face surgery, head-neck cancer care & worldwide telemedicine."
    }, {
      property: "og:title",
      content: "Best ENT Doctor in Deesa | Prof. Dr. Devendra M. Jain"
    }, {
      property: "og:description",
      content: "ENT & Head Neck Surgeon with Cancer Care. 18+ years of experience. Face surgery, head-neck cancer care & worldwide telemedicine."
    }, {
      property: "og:url",
      content: "https://jainent.lovable.app/"
    }],
    links: [{
      rel: "canonical",
      href: "https://jainent.lovable.app/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./blog._slug-C2xvMl2Q.mjs");
const $$splitErrorComponentImporter = () => import("./blog._slug-DFJ5kcDI.mjs");
const $$splitNotFoundComponentImporter = () => import("./blog._slug-DrluCOnq.mjs");
const Route = createFileRoute("/blog/$slug")({
  loader: async ({
    params
  }) => {
    const {
      data
    } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).eq("published", true).maybeSingle();
    if (!data) throw notFound();
    return data;
  },
  head: ({
    params,
    loaderData
  }) => {
    const post = loaderData;
    const title = post?.meta_title || post?.title || params.slug;
    const desc = post?.meta_description || post?.excerpt || "Read this article from Jain ENT Hospital, Deesa.";
    const url = abs(`/blog/${params.slug}`);
    return {
      meta: [{
        title: `${title} | Jain ENT Hospital Deesa`
      }, {
        name: "description",
        content: desc
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:url",
        content: url
      }, {
        property: "og:type",
        content: "article"
      }, ...post?.og_image || post?.cover_image ? [{
        property: "og:image",
        content: post.og_image || post.cover_image
      }, {
        name: "twitter:image",
        content: post.og_image || post.cover_image
      }] : []],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post?.title,
          description: desc,
          datePublished: post?.created_at,
          author: {
            "@type": "Person",
            name: "Prof. Dr. Devendra M. Jain"
          },
          publisher: {
            "@type": "Organization",
            name: "Jain ENT Hospital",
            url: SITE_URL
          },
          mainEntityOfPage: url,
          ...post?.cover_image ? {
            image: post.cover_image
          } : {}
        })
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([{
          label: "Blog",
          to: "/blog"
        }, {
          label: post?.title || params.slug,
          to: `/blog/${params.slug}`
        }], SITE_URL))
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VertigoTreatmentDeesaRoute = Route$q.update({
  id: "/vertigo-treatment-deesa",
  path: "/vertigo-treatment-deesa",
  getParentRoute: () => Route$r
});
const TonsilSurgeryDeesaRoute = Route$p.update({
  id: "/tonsil-surgery-deesa",
  path: "/tonsil-surgery-deesa",
  getParentRoute: () => Route$r
});
const TelemedicineRoute = Route$o.update({
  id: "/telemedicine",
  path: "/telemedicine",
  getParentRoute: () => Route$r
});
const SitemapDotxmlRoute = Route$n.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$r
});
const SinusitisTreatmentDeesaRoute = Route$m.update({
  id: "/sinusitis-treatment-deesa",
  path: "/sinusitis-treatment-deesa",
  getParentRoute: () => Route$r
});
const ServicesRoute = Route$l.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$r
});
const PostOpCareRoute = Route$k.update({
  id: "/post-op-care",
  path: "/post-op-care",
  getParentRoute: () => Route$r
});
const PharmacyRoute = Route$j.update({
  id: "/pharmacy",
  path: "/pharmacy",
  getParentRoute: () => Route$r
});
const PatientInfoRoute = Route$i.update({
  id: "/patient-info",
  path: "/patient-info",
  getParentRoute: () => Route$r
});
const MyAppointmentsRoute = Route$h.update({
  id: "/my-appointments",
  path: "/my-appointments",
  getParentRoute: () => Route$r
});
const HearingLossTreatmentDeesaRoute = Route$g.update({
  id: "/hearing-loss-treatment-deesa",
  path: "/hearing-loss-treatment-deesa",
  getParentRoute: () => Route$r
});
const HeadNeckCancerSurgeonGujaratRoute = Route$f.update({
  id: "/head-neck-cancer-surgeon-gujarat",
  path: "/head-neck-cancer-surgeon-gujarat",
  getParentRoute: () => Route$r
});
const GalleryRoute = Route$e.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$r
});
const FeedbackRoute = Route$d.update({
  id: "/feedback",
  path: "/feedback",
  getParentRoute: () => Route$r
});
const FaceSurgeryDeesaRoute = Route$c.update({
  id: "/face-surgery-deesa",
  path: "/face-surgery-deesa",
  getParentRoute: () => Route$r
});
const EntSpecialistBanaskanthaRoute = Route$b.update({
  id: "/ent-specialist-banaskantha",
  path: "/ent-specialist-banaskantha",
  getParentRoute: () => Route$r
});
const EntHospitalDeesaRoute = Route$a.update({
  id: "/ent-hospital-deesa",
  path: "/ent-hospital-deesa",
  getParentRoute: () => Route$r
});
const EntDoctorPalanpurRoute = Route$9.update({
  id: "/ent-doctor-palanpur",
  path: "/ent-doctor-palanpur",
  getParentRoute: () => Route$r
});
const EntDoctorDhaneraRoute = Route$8.update({
  id: "/ent-doctor-dhanera",
  path: "/ent-doctor-dhanera",
  getParentRoute: () => Route$r
});
const EntDoctorDeesaRoute = Route$7.update({
  id: "/ent-doctor-deesa",
  path: "/ent-doctor-deesa",
  getParentRoute: () => Route$r
});
const ContactRoute = Route$6.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$r
});
const BookRoute = Route$5.update({
  id: "/book",
  path: "/book",
  getParentRoute: () => Route$r
});
const BlogRoute = Route$4.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$r
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$r
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$r
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$r
});
const BlogSlugRoute = Route.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const BlogRouteChildren = {
  BlogSlugRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  BlogRoute: BlogRouteWithChildren,
  BookRoute,
  ContactRoute,
  EntDoctorDeesaRoute,
  EntDoctorDhaneraRoute,
  EntDoctorPalanpurRoute,
  EntHospitalDeesaRoute,
  EntSpecialistBanaskanthaRoute,
  FaceSurgeryDeesaRoute,
  FeedbackRoute,
  GalleryRoute,
  HeadNeckCancerSurgeonGujaratRoute,
  HearingLossTreatmentDeesaRoute,
  MyAppointmentsRoute,
  PatientInfoRoute,
  PharmacyRoute,
  PostOpCareRoute,
  ServicesRoute,
  SinusitisTreatmentDeesaRoute,
  SitemapDotxmlRoute,
  TelemedicineRoute,
  TonsilSurgeryDeesaRoute,
  VertigoTreatmentDeesaRoute
};
const routeTree = Route$r._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Breadcrumbs as B,
  CLINIC as C,
  LandingPage as L,
  PageHero as P,
  Route as R,
  SiteLayout as S,
  props$9 as a,
  props$8 as b,
  props$7 as c,
  props$6 as d,
  props$5 as e,
  props$4 as f,
  props$3 as g,
  props$2 as h,
  props$1 as i,
  props as j,
  logo as l,
  props$a as p,
  router as r,
  saveSiteContent as s,
  telPrimary as t,
  waLink as w
};
