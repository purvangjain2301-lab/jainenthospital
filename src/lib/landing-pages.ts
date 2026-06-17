import type { LandingProps } from "@/components/site/LandingPage";

const drJain = "Prof. Dr. Devendra M. Jain";
const std = [
  "Single-specialist consultant care — your doctor is the surgeon.",
  "18+ years of experience in advanced ENT and head-neck care.",
  "Modern endoscopic & microscopic ENT diagnostics in-clinic.",
  "Honest second-opinion culture — no over-treatment.",
  "Multilingual: Hindi, English, Gujarati, Marathi.",
  "Telemedicine for follow-up & out-of-town patients.",
];

export const LANDING_PAGES: Record<string, LandingProps> = {
  "ent-doctor-deesa": {
    slug: "ent-doctor-deesa",
    metaTitle: "Best ENT Doctor in Deesa | Prof. Dr. Devendra M. Jain",
    metaDescription:
      "Looking for the best ENT doctor in Deesa? Prof. Dr. Devendra M. Jain offers 18+ years of expert ear, nose, throat, face surgery and head-neck cancer care.",
    h1: "Best ENT Doctor in Deesa",
    eyebrow: "ENT Specialist · Deesa",
    intro:
      "Comprehensive ear, nose, throat, face surgery and head-neck cancer care from one of Banaskantha's most experienced ENT consultants.",
    paragraphs: [
      `If you're searching for the best ENT doctor in Deesa, ${drJain} provides senior-consultant ENT care that combines decades of clinical experience with modern endoscopic and microscopic technology. The clinic on Deesa Highway treats patients from across Banaskantha, North Gujarat and South Rajasthan — and consults internationally via secure telemedicine.`,
      "Dr. Jain personally evaluates every patient — there is no junior or trainee in the consultation room. This single-specialist model means the doctor who diagnoses you is also the surgeon who performs your procedure and follows you up, eliminating the hand-offs that often compromise quality at larger hospitals.",
      "Conditions managed at Jain ENT Hospital include chronic sinusitis, allergic rhinitis, deviated nasal septum, nasal polyps, recurrent tonsillitis, adenoid hypertrophy in children, hearing loss, chronic ear discharge (CSOM), tinnitus, vertigo, vocal cord problems, snoring and obstructive sleep apnoea, oral and throat cancers, thyroid surgery, facial trauma, and cosmetic facial procedures including rhinoplasty and otoplasty.",
      "Most diagnostic tests — video endoscopy of the ear, nose and throat, pure-tone audiometry, and tympanometry — are performed in-house with same-day reporting. For surgical patients we coordinate the entire pathway including anaesthesia, theatre, post-operative care, and follow-up.",
    ],
    highlights: std,
    faq: [
      {
        q: "How do I book an appointment with the ENT doctor in Deesa?",
        a: "You can book online via the Book page, call +91 93257 69599, or WhatsApp the clinic. Same-day slots are usually available Monday to Saturday between 10 AM and 7 PM.",
      },
      {
        q: "Does the clinic see patients from outside Deesa?",
        a: "Yes — patients regularly travel from Palanpur, Dhanera, Tharad, Patan, Sidhpur, Ahmedabad and Mount Abu, and we also offer telemedicine consultations for those who cannot travel.",
      },
    ],
    schemaType: "MedicalBusiness",
    conditionName: "Otolaryngology Consultation",
  },

  "ent-specialist-banaskantha": {
    slug: "ent-specialist-banaskantha",
    metaTitle: "ENT Specialist in Banaskantha District | Jain ENT Hospital",
    metaDescription:
      "ENT specialist serving all of Banaskantha district from the Deesa clinic — sinusitis, ear surgery, throat and head-neck cancer care by Prof. Dr. Devendra M. Jain.",
    h1: "ENT Specialist in Banaskantha District",
    eyebrow: "Banaskantha · Gujarat",
    intro:
      "Senior ENT consultant care for patients across Banaskantha, with the clinic located in Deesa for easy access from every taluka.",
    paragraphs: [
      "Banaskantha is one of Gujarat's largest districts, and many of its talukas lack dedicated ENT consultants. Jain ENT Hospital in Deesa serves patients travelling from Palanpur, Dhanera, Tharad, Vav, Bhabhar, Diyodar, Kankrej, Vadgam and Amirgadh — providing the full range of ear, nose, throat, face surgery and head-neck cancer services under one roof.",
      `${drJain} brings 18+ years of senior consultant experience and a teaching background to community practice. The clinic is set up to handle everything from a quick allergy review to complex head-neck cancer surgery, so most patients can complete their care without travelling to Ahmedabad.`,
      "We see a high volume of conditions specific to rural North Gujarat — chronic dust-related sinusitis, tobacco-related oral lesions, untreated hearing loss in elderly patients, and recurrent throat infections in children. Each is approached with the right mix of medical management, in-clinic procedures and surgery when needed.",
      "Free parking is available on-site, and most consultations are completed within an hour including diagnostics. For surgical patients, the entire admission, procedure and discharge cycle is coordinated by a single team to minimise repeat travel.",
    ],
    highlights: std,
    conditionName: "ENT care across Banaskantha district",
  },

  "ent-doctor-palanpur": {
    slug: "ent-doctor-palanpur",
    metaTitle: "ENT Doctor near Palanpur | Jain ENT Hospital Deesa",
    metaDescription:
      "ENT doctor near Palanpur — Jain ENT Hospital in Deesa is a short drive away and offers senior-consultant care by Prof. Dr. Devendra M. Jain.",
    h1: "ENT Doctor near Palanpur",
    eyebrow: "Palanpur Patients Welcome",
    intro:
      "Palanpur residents have a senior ENT specialist within easy reach at Jain ENT Hospital, Deesa — a short drive on the Deesa highway.",
    paragraphs: [
      "Many patients from Palanpur travel to Ahmedabad for ENT care when there is no need — Jain ENT Hospital in Deesa is a short drive on the main highway and offers the same calibre of senior-consultant care without the long journey.",
      `${drJain} sees Palanpur patients every working day. Common reasons for the visit include chronic sinus problems, ear infections that won't clear, hoarseness lasting more than 2 weeks, snoring and sleep apnoea evaluation, and second opinions on previously recommended surgery.`,
      "The clinic offers in-house video endoscopy, audiometry and tympanometry — so most Palanpur patients complete their diagnosis and consultation in a single visit and head home with a clear treatment plan the same day.",
      "For patients who need surgery, the clinic coordinates the full admission, theatre and discharge cycle, which means one trip for the workup and one for the procedure — not multiple visits.",
    ],
    highlights: std,
  },

  "sinusitis-treatment-deesa": {
    slug: "sinusitis-treatment-deesa",
    metaTitle: "Sinusitis Treatment in Deesa Gujarat | Jain ENT Hospital",
    metaDescription:
      "Chronic sinusitis treatment in Deesa — medical management and endoscopic sinus surgery (FESS) by Prof. Dr. Devendra M. Jain. 18+ years' experience.",
    h1: "Sinusitis Treatment in Deesa, Gujarat",
    eyebrow: "Sinus Care",
    intro:
      "Modern medical and surgical sinusitis care — from allergic rhinitis to functional endoscopic sinus surgery (FESS) for chronic cases.",
    paragraphs: [
      "Sinusitis is one of the most common reasons patients visit Jain ENT Hospital. The dry, dusty climate of North Gujarat means many residents live with low-grade nasal congestion, post-nasal drip, headaches and disturbed sleep for years — often misdiagnosed as 'cold' or treated with antibiotics that don't address the underlying problem.",
      `${drJain} approaches sinusitis with a clear three-step framework: accurate diagnosis using video endoscopy and (when needed) a CT-PNS scan, optimised medical therapy with nasal sprays and allergy control, and endoscopic sinus surgery (FESS) only when medical management has genuinely failed.`,
      "Functional Endoscopic Sinus Surgery is performed through the nostrils — there are no external cuts and no facial scarring. Most patients go home the same day or the next morning and return to normal activity within a week. The aim of surgery is not to remove the sinuses but to open their natural drainage pathways so the body can clear infection on its own.",
      "Children with chronic sinusitis or adenoid-related nasal blockage are also welcome — paediatric ENT is one of the clinic's focus areas, with extra care taken to minimise time in theatre and use child-appropriate anaesthesia protocols.",
    ],
    highlights: std,
    faq: [
      {
        q: "When does sinusitis need surgery?",
        a: "Only when at least 3 months of optimised medical therapy (nasal steroid sprays, saline rinses, allergy control, occasional antibiotics) has failed to control symptoms, and a CT scan shows persistent sinus blockage.",
      },
      {
        q: "Is endoscopic sinus surgery painful?",
        a: "Most patients describe it as similar to a heavy cold for the first few days. There are no external cuts and no nasal packing in most cases. Pain is well controlled with simple medication.",
      },
    ],
    conditionName: "Chronic Sinusitis",
  },

  "tonsil-surgery-deesa": {
    slug: "tonsil-surgery-deesa",
    metaTitle: "Tonsil Surgery Specialist in Deesa | Jain ENT Hospital",
    metaDescription:
      "Tonsillectomy and tonsil surgery in Deesa for adults and children. Modern techniques, day-care discharge in most cases. Prof. Dr. Devendra M. Jain.",
    h1: "Tonsil Surgery Specialist in Deesa",
    eyebrow: "Tonsils & Adenoids",
    intro:
      "Modern tonsillectomy and adenoid surgery for adults and children — day-care discharge in most cases.",
    paragraphs: [
      "Recurrent tonsillitis is one of the most common reasons children and young adults are referred to Jain ENT Hospital. While many cases can be managed without surgery, the right candidates benefit enormously from a one-time procedure that ends years of recurring sore throats, missed school and recurring antibiotic courses.",
      `${drJain} follows the well-established Paradise criteria — surgery is recommended when there have been 7 or more documented throat infections in one year, 5 per year for two years, or 3 per year for three years; or when tonsils cause sleep apnoea, swallowing difficulty, or peri-tonsillar abscesses.`,
      "Modern tonsillectomy is much gentler than the procedure most adults remember. Techniques used at the clinic include bipolar dissection and coblation when appropriate, minimising bleeding and post-operative pain. Most children go home the same evening or next morning, with normal diet restored within 7–10 days.",
      "Adenoidectomy — usually done alongside tonsillectomy in children with mouth-breathing and snoring — has no external incisions and adds minimal recovery time. The combined procedure dramatically improves sleep quality, breathing and even school performance in many children.",
    ],
    highlights: std,
    conditionName: "Tonsillitis / Adenoid Hypertrophy",
  },

  "vertigo-treatment-deesa": {
    slug: "vertigo-treatment-deesa",
    metaTitle: "Vertigo Treatment Specialist in Deesa, Gujarat",
    metaDescription:
      "Vertigo and dizziness specialist in Deesa. Accurate diagnosis (BPPV, Meniere's, vestibular neuritis) and modern treatment by Prof. Dr. Devendra M. Jain.",
    h1: "Vertigo Treatment Specialist in Deesa",
    eyebrow: "Balance & Inner Ear",
    intro:
      "Most vertigo can be diagnosed clinically and treated effectively — once the cause is correctly identified.",
    paragraphs: [
      "Vertigo — the sensation that you or the room is spinning — is one of the most distressing ENT symptoms patients describe. It is also one of the most commonly misdiagnosed: many patients in North Gujarat have been on long courses of generic 'vertigo tablets' for years without anyone identifying which type of vertigo they actually have.",
      `At Jain ENT Hospital, vertigo evaluation starts with a detailed history and a focused physical examination including positional tests like the Dix-Hallpike manoeuvre. ${drJain} can usually distinguish between the four common causes in one visit: BPPV (benign positional vertigo), Meniere's disease, vestibular neuritis, and migraine-associated vertigo.`,
      "BPPV — by far the most common — often responds to a single in-clinic Epley manoeuvre, sometimes ending years of symptoms in 10 minutes. Other causes are managed with targeted medication, vestibular rehabilitation exercises, or referred for specialised imaging when indicated.",
      "If you or a family member has been struggling with dizziness, light-headedness or imbalance and previous treatment hasn't worked, a focused ENT vertigo consultation is often the missing step.",
    ],
    highlights: std,
    conditionName: "Vertigo",
  },

  "hearing-loss-treatment-deesa": {
    slug: "hearing-loss-treatment-deesa",
    metaTitle: "Hearing Loss Treatment in Deesa | Jain ENT Hospital",
    metaDescription:
      "Hearing loss evaluation, ear microsurgery and hearing aid fitting in Deesa by Prof. Dr. Devendra M. Jain. In-clinic audiometry, same-day reports.",
    h1: "Hearing Loss Treatment in Deesa",
    eyebrow: "Ear & Hearing",
    intro:
      "Accurate hearing diagnosis with in-clinic audiometry, ear microsurgery when indicated, and trial-based hearing aid fitting.",
    paragraphs: [
      "Hearing loss in adults is far more common than most families realise — and far more treatable. At Jain ENT Hospital we see a wide range of patients: elderly patients with age-related hearing loss who have been struggling silently for years, working adults with sudden one-sided deafness, children with recurrent ear infections, and patients with chronic ear discharge that has caused conductive hearing loss.",
      "Every hearing evaluation begins with pure-tone audiometry and tympanometry in the clinic itself — no waiting weeks for a separate audiology appointment. Most patients walk out the same day with a clear audiogram, a diagnosis (conductive, sensorineural, or mixed), and a tailored treatment plan.",
      `${drJain} performs ear microsurgery for chronic suppurative otitis media (CSOM), tympanoplasty for perforated eardrums, and ossiculoplasty for damaged middle-ear bones. For sensorineural hearing loss that doesn't have a surgical solution, we offer trial-based hearing aid fitting from established brands with full follow-up.`,
      "Sudden hearing loss is a medical emergency that needs treatment within 48–72 hours for the best chance of recovery — please call us the same day if it happens to you or a family member.",
    ],
    highlights: std,
    conditionName: "Hearing Loss",
  },

  "head-neck-cancer-surgeon-gujarat": {
    slug: "head-neck-cancer-surgeon-gujarat",
    metaTitle: "Head Neck Cancer Surgeon in Gujarat | Prof. Dr. Devendra M. Jain",
    metaDescription:
      "Head-neck cancer surgeon in Gujarat — oral, throat, laryngeal, thyroid and salivary gland cancer surgery with reconstruction by Prof. Dr. Devendra M. Jain.",
    h1: "Head & Neck Cancer Surgeon in Gujarat",
    eyebrow: "Surgical Oncology",
    intro:
      "Comprehensive head-neck cancer care — from early-stage detection through complex resection, reconstruction and long-term follow-up.",
    paragraphs: [
      `${drJain} is a practising head-neck cancer surgeon with years of focused experience in surgical oncology, alongside his ENT and face surgery practice. The single-roof model means every patient is seen, operated on, and followed up by the same consultant — continuity that matters in cancer care.`,
      "Conditions managed include oral cavity cancers (tongue, cheek, lip, floor of mouth), oropharyngeal cancers, laryngeal cancers, thyroid cancers and benign thyroid surgery, salivary gland tumours (parotid and submandibular), neck lymph node metastases, and facial skin cancers requiring reconstructive closure.",
      "Tobacco-related oral cancer is unfortunately common in North Gujarat, and we focus heavily on early detection — a 10-minute oral and neck examination can pick up pre-cancerous changes (leukoplakia, erythroplakia, submucous fibrosis) that are completely curable when caught early. If you use tobacco or gutkha in any form, please book a screening.",
      "Surgical care includes voice- and swallow-preserving techniques whenever possible, reconstructive procedures using local flaps for facial defects, and coordination with medical and radiation oncologists for combined treatment when needed. Speech therapy and swallowing rehabilitation are arranged after surgery so most patients regain near-normal function within weeks.",
    ],
    highlights: std,
    faq: [
      {
        q: "Do you coordinate with chemotherapy and radiation centres?",
        a: "Yes. We work closely with medical and radiation oncology centres in Ahmedabad and Mehsana to plan combined treatment, so patients receive seamless care from diagnosis through recovery without losing time to coordination delays.",
      },
      {
        q: "How is the diagnosis confirmed?",
        a: "Through a focused clinical exam, video endoscopy, a tissue biopsy of the suspicious area, and imaging (CT, MRI or ultrasound). FNAC is used for neck swellings. All of this is coordinated from the clinic.",
      },
    ],
    conditionName: "Head and Neck Cancer",
  },

  "face-surgery-deesa": {
    slug: "face-surgery-deesa",
    metaTitle: "Face Surgery Specialist in Deesa, Gujarat",
    metaDescription:
      "Face surgery in Deesa — rhinoplasty, otoplasty, scar revision, facial trauma and post-cancer reconstruction by Prof. Dr. Devendra M. Jain.",
    h1: "Face Surgery Specialist in Deesa, Gujarat",
    eyebrow: "Facial Plastics",
    intro:
      "Cosmetic and reconstructive face surgery under one specialist — backed by years of head-neck surgical expertise.",
    paragraphs: [
      `Face surgery at Jain ENT Hospital is performed by ${drJain} himself, drawing on his combined ENT, head-neck and reconstructive surgical training. Procedures span the full range from cosmetic improvements like rhinoplasty (nose reshaping) and otoplasty (ear pinning) through to complex reconstruction after trauma or cancer resection.`,
      "Rhinoplasty is the most commonly requested cosmetic procedure — patients come for hump reduction, tip refinement, correction of a deviated nose causing breathing difficulty, or post-trauma reshaping. Because the same surgeon also handles the functional side (deviated septum, sinusitis), patients get a nose that looks better and breathes better in a single procedure.",
      "Otoplasty for prominent ears is most often performed in school-age children before social teasing becomes an issue, and is also requested by adults. The procedure is straightforward, leaves no visible scarring (the incision is behind the ear), and the result is permanent.",
      "Reconstructive procedures include facial trauma repair after road accidents, scar revision and keloid management, and post-cancer reconstruction using local flaps. For patients abroad or out-of-town, an initial telemedicine consultation with photo review is offered so most of the planning can be done before travel.",
    ],
    highlights: std,
    faq: [
      {
        q: "How long is recovery after rhinoplasty?",
        a: "Most patients return to office work in 7–10 days. Visible swelling settles over 2–6 weeks, with subtle changes continuing to refine for up to a year. A nasal cast is worn for the first week.",
      },
    ],
    conditionName: "Facial Plastic and Reconstructive Surgery",
  },

  "ent-doctor-dhanera": {
    slug: "ent-doctor-dhanera",
    metaTitle: "ENT Doctor in Dhanera | Jain ENT Hospital Deesa",
    metaDescription:
      "ENT doctor for Dhanera patients — Jain ENT Hospital in Deesa offers senior-consultant ENT care by Prof. Dr. Devendra M. Jain.",
    h1: "ENT Doctor in Dhanera",
    eyebrow: "Dhanera Patients Welcome",
    intro:
      "Dhanera residents can access senior-consultant ENT, face and head-neck cancer care at Jain ENT Hospital in nearby Deesa.",
    paragraphs: [
      "Dhanera doesn't currently have a full-time ENT consultant, so most residents travel to Deesa or Palanpur for specialist ear, nose and throat care. Jain ENT Hospital is the closest senior-consultant ENT clinic with full diagnostic and surgical facilities under one roof.",
      `${drJain} sees Dhanera patients every working day for the full range of conditions: chronic sinus disease, recurrent ear infections, hearing loss, tonsil and adenoid problems in children, snoring and sleep apnoea, hoarseness, vertigo, and any suspicious oral or neck swellings.`,
      "For patients who would prefer not to travel for a first consultation — especially elderly patients or those with mobility issues — we offer telemedicine video consultations. After the video consult we can advise whether an in-person visit is genuinely needed or whether the issue can be managed remotely.",
      "All major investigations (video endoscopy, audiometry, tympanometry) are performed in-clinic with same-day reporting, so Dhanera patients typically complete diagnosis and consultation in a single trip.",
    ],
    highlights: std,
  },

  "ent-hospital-deesa": {
    slug: "ent-hospital-deesa",
    metaTitle: "Best ENT Hospital in Deesa, Gujarat | Jain ENT Hospital",
    metaDescription:
      "Jain ENT Hospital — the dedicated ENT, face surgery and head-neck cancer hospital in Deesa, Gujarat, led by Prof. Dr. Devendra M. Jain.",
    h1: "Best ENT Hospital in Deesa, Gujarat",
    eyebrow: "Dedicated ENT Hospital",
    intro:
      "A purpose-built ENT, face surgery and head-neck cancer hospital in the heart of Deesa — modern equipment, single-specialist care, 24×7 emergency.",
    paragraphs: [
      "Jain ENT Hospital is a dedicated ear, nose, throat, face surgery and head-neck cancer care centre on Deesa Highway. Unlike general hospitals where ENT is one of many departments, every facility, instrument, theatre setup and team member at our clinic is built around ENT and head-neck care.",
      `The hospital is led by ${drJain} — MBBS, MS (ENT) — with 18+ years of experience as a senior consultant. The model is deliberately single-specialist: the doctor who diagnoses you is the same one who performs your surgery and follows you up.`,
      "Facilities include modern operation theatre with microscopic and endoscopic ENT setup, in-clinic video endoscopy of ear/nose/throat, pure-tone audiometry, tympanometry, dedicated consultation rooms, an in-house pharmacy (Yashvi Medical Store) stocking ENT-specific drops, sprays and post-operative medicines, and a 24×7 emergency line for genuine ENT emergencies.",
      "Patients are welcomed from across Banaskantha, Patan, Sabarkantha, Mehsana, South Rajasthan and worldwide via telemedicine. Free parking is available on-site and most consultations are completed within an hour including diagnostics.",
    ],
    highlights: std,
    conditionName: "ENT Hospital",
    schemaType: "MedicalBusiness",
  },
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);
