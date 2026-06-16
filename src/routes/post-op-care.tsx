import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CLINIC, waLink, telPrimary } from "@/lib/clinic";
import {
  Download, MessageCircle, Phone, CheckCircle2, AlertTriangle,
  Pill, Utensils, BedDouble, Activity, ShieldAlert, CalendarCheck,
} from "lucide-react";
import jsPDF from "jspdf";


export const Route = createFileRoute("/post-op-care")({
  head: () => ({
    meta: [
      { title: `Post-Operative Care Checklist — Jain ENT Hospital, ${CLINIC.address.city}` },
      { name: "description", content: "Downloadable post-operative care checklist for ENT and head & neck surgery patients of Prof. Dr. Devendra M. Jain. WhatsApp direct line for queries." },
      { property: "og:title", content: "Post-Op Care Checklist — Jain ENT Hospital" },
      { property: "og:description", content: "Recovery guidance, warning signs, and a direct WhatsApp line for surgery patients." },
      { property: "og:url", content: "/post-op-care" },
    ],
    links: [{ rel: "canonical", href: "/post-op-care" }],
  }),
  component: PostOpCare,
});

type Section = { icon: any; title: string; items: string[] };

const SECTIONS: Section[] = [
  {
    icon: Pill,
    title: "Medications",
    items: [
      "Take all prescribed antibiotics on time — complete the full course even if you feel better.",
      "Use pain medication as advised; do not exceed the dose printed on the strip.",
      "Continue nasal sprays / ear drops exactly as scheduled by Dr. Jain.",
      "Do NOT take aspirin or blood-thinners unless specifically approved.",
    ],
  },
  {
    icon: Utensils,
    title: "Diet & Hydration",
    items: [
      "Start with cool / lukewarm liquids for the first 24 hours after throat or tonsil surgery.",
      "Soft, bland foods (khichdi, curd-rice, dal, mashed potatoes) for 5–7 days after oral / throat procedures.",
      "Avoid hot, spicy, crunchy, or acidic foods until cleared at follow-up.",
      "Drink 2–3 litres of water daily unless restricted.",
    ],
  },
  {
    icon: BedDouble,
    title: "Rest & Positioning",
    items: [
      "Sleep with head elevated on 2 pillows for the first week (especially after sinus / nasal surgery).",
      "Avoid bending forward, lifting heavy objects, or straining for at least 2 weeks.",
      "No swimming, head-dunking, or air travel until specifically allowed.",
      "Plan 5–7 days of light activity at home before resuming work.",
    ],
  },
  {
    icon: Activity,
    title: "Wound, Dressing & Hygiene",
    items: [
      "Keep the surgical site clean and dry — do not remove dressings on your own.",
      "After ear surgery, keep water out of the ear; use a vaseline-coated cotton ball while bathing.",
      "After nasal surgery, do not blow your nose forcefully for 2 weeks — dab gently.",
      "Brush teeth gently and rinse with prescribed mouthwash after oral / throat surgery.",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Follow-Up",
    items: [
      "First follow-up visit: as scheduled at discharge (usually within 5–7 days).",
      "Bring your discharge summary, prescription, and any reports to every follow-up.",
      "Tele-consultation is available for out-of-town patients via the Telemedicine page.",
      "Complete all scheduled dressing changes / suture removal appointments.",
    ],
  },
];

const RED_FLAGS = [
  "Heavy or persistent bleeding from the surgical site (nose, mouth, ear, or neck).",
  "Fever above 101°F / 38.3°C that does not respond to paracetamol.",
  "Sudden severe pain, swelling, or pus from the wound.",
  "Difficulty in breathing, swallowing, or speaking.",
  "Sudden hearing loss, severe dizziness, or facial weakness.",
  "Vomiting blood or passing dark/black stools.",
];

function generatePremiumPDF() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const CRIMSON: [number, number, number] = [194, 24, 49];
  const CRIMSON_DARK: [number, number, number] = [140, 16, 34];
  const DARK: [number, number, number] = [22, 24, 35];
  const MUTED: [number, number, number] = [120, 122, 135];
  const LIGHT_RED: [number, number, number] = [253, 235, 238];
  const CREAM: [number, number, number] = [252, 248, 244];
  const BORDER: [number, number, number] = [228, 228, 235];
  const GOLD: [number, number, number] = [184, 134, 11];
  const M = 44;
  let y = 0;

  const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
  const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);

  // ─── Cover page ──────────────────────────────────────────────────────────
  const drawCover = () => {
    // Full-bleed crimson background
    setFill(CRIMSON);
    doc.rect(0, 0, W, H, "F");
    // Darker bottom band
    setFill(CRIMSON_DARK);
    doc.rect(0, H - 200, W, 200, "F");
    // Decorative gold rule
    setFill(GOLD);
    doc.rect(M, 220, 60, 3, "F");

    // Top brand row
    setFill([255, 255, 255]);
    doc.circle(M + 18, 60, 18, "F");
    setText(CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("J", M + 18, 65, { align: "center" });

    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("JAIN ENT HOSPITAL", M + 46, 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Deesa · Banaskantha · Gujarat", M + 46, 70);

    // Title block
    setText([255, 255, 255]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("PATIENT CARE GUIDE", M, 200);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(38);
    doc.text("Post-Operative", M, 260);
    doc.text("Care Checklist", M, 300);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const intro = doc.splitTextToSize(
      "A practical recovery companion for ENT and Head & Neck surgery patients — covering medications, diet, rest, wound care, warning signs and follow-up.",
      W - M * 2
    );
    doc.text(intro, M, 340);

    // Doctor card
    setFill([255, 255, 255]);
    doc.roundedRect(M, H - 170, W - M * 2, 110, 10, 10, "F");
    setDraw(GOLD);
    doc.setLineWidth(1.2);
    doc.line(M + 16, H - 140, M + 56, H - 140);

    setText(CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("UNDER THE CARE OF", M + 16, H - 150);

    setText(DARK);
    doc.setFontSize(18);
    doc.text("Prof. Dr. Devendra M. Jain", M + 16, H - 120);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setText(MUTED);
    doc.text("MBBS, MS (ENT) · Senior ENT Surgeon · Face & Head-Neck Cancer Care", M + 16, H - 104);
    doc.text("+91 93257 69599  ·  jainentdrdevendra@gmail.com", M + 16, H - 88);
    doc.text("Iskcon Pride, Deesa Highway, Deesa – 385535", M + 16, H - 72);

    // Footer line on cover
    setText([255, 255, 255]);
    doc.setFontSize(8);
    doc.text("Issued by Jain ENT Hospital  ·  jainent.lovable.app", M, H - 32);
    doc.text(`Generated ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`, W - M, H - 32, { align: "right" });
  };

  // ─── Watermark for content pages ──────────────────────────────────────────
  const drawWatermark = () => {
    doc.saveGraphicsState();
    // @ts-ignore
    doc.setGState(new (doc as any).GState({ opacity: 0.04 }));
    setText(CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(88);
    doc.text("JAIN ENT", W / 2, H / 2 + 30, { align: "center", angle: 30 });
    doc.restoreGraphicsState();
  };

  // ─── Slim header on content pages ─────────────────────────────────────────
  const drawHeader = () => {
    setFill(CRIMSON);
    doc.rect(0, 0, W, 56, "F");
    setFill(GOLD);
    doc.rect(0, 56, W, 2, "F");

    setFill([255, 255, 255]);
    doc.circle(M + 14, 28, 14, "F");
    setText(CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("J", M + 14, 32, { align: "center" });

    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("JAIN ENT HOSPITAL", M + 36, 26);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Post-Operative Care Checklist", M + 36, 40);

    doc.setFontSize(8.5);
    doc.text("+91 93257 69599  ·  24×7", W - M, 26, { align: "right" });
    doc.text("Deesa, Gujarat", W - M, 40, { align: "right" });
  };

  const drawFooter = (pageNum: number, totalPages: number) => {
    setDraw(BORDER);
    doc.setLineWidth(0.5);
    doc.line(M, H - 46, W - M, H - 46);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    setText(MUTED);
    doc.text(
      "This checklist is a general guide. Always follow the specific instructions given to you at discharge.",
      W / 2, H - 32, { align: "center" }
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Jain ENT Hospital  ·  Prof. Dr. Devendra M. Jain", M, H - 16);
    doc.text(`Page ${pageNum} of ${totalPages}`, W - M, H - 16, { align: "right" });
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > H - 60) {
      doc.addPage();
      drawWatermark();
      drawHeader();
      y = 86;
    }
  };

  // ── Render cover ──
  drawCover();

  // ── Page 2 onwards: content ──
  doc.addPage();
  drawWatermark();
  drawHeader();
  y = 86;

  // TOC / Intro card
  setFill(CREAM);
  doc.roundedRect(M, y, W - M * 2, 76, 8, 8, "F");
  setDraw(GOLD);
  doc.setLineWidth(1.5);
  doc.line(M + 14, y + 22, M + 44, y + 22);
  setText(CRIMSON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("IN THIS GUIDE", M + 14, y + 18);
  setText(DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Five recovery pillars + emergency warning signs", M + 14, y + 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  setText(MUTED);
  doc.text(
    "Tick off items each day. Reach us on WhatsApp or call 24×7 for any concern.",
    M + 14, y + 58
  );
  y += 96;

  // Sections
  SECTIONS.forEach((s, i) => {
    ensureSpace(70);

    // Section header band
    setFill(LIGHT_RED);
    doc.roundedRect(M, y, W - M * 2, 30, 6, 6, "F");
    setFill(CRIMSON);
    doc.roundedRect(M, y, 4, 30, 2, 2, "F");

    setFill(CRIMSON);
    doc.circle(M + 26, y + 15, 11, "F");
    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(String(i + 1).padStart(2, "0"), M + 26, y + 19, { align: "center" });

    setText(DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.text(s.title.toUpperCase(), M + 46, y + 19);

    // Decorative gold dot
    setFill(GOLD);
    doc.circle(W - M - 14, y + 15, 2.5, "F");

    y += 42;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setText([45, 45, 55]);
    s.items.forEach((it) => {
      const wrapped = doc.splitTextToSize(it, W - M * 2 - 32);
      const blockH = wrapped.length * 13 + 6;
      ensureSpace(blockH);
      // Checkbox
      setDraw(CRIMSON);
      doc.setLineWidth(0.9);
      doc.roundedRect(M + 6, y - 9, 11, 11, 2, 2);
      setText([45, 45, 55]);
      doc.text(wrapped, M + 26, y);
      y += blockH;
    });
    y += 10;
  });

  // ── Warning section ──
  ensureSpace(150);
  setFill(CRIMSON);
  doc.roundedRect(M, y, W - M * 2, 34, 6, 6, "F");
  setText([255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("⚠  WARNING SIGNS — CONTACT US IMMEDIATELY", M + 16, y + 22);
  y += 46;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setText([130, 20, 30]);
  RED_FLAGS.forEach((it) => {
    const wrapped = doc.splitTextToSize(it, W - M * 2 - 28);
    const blockH = wrapped.length * 13 + 4;
    ensureSpace(blockH);
    setFill(CRIMSON);
    doc.triangle(M + 6, y, M + 14, y - 11, M + 22, y, "F");
    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("!", M + 14, y - 3, { align: "center" });
    setText([130, 20, 30]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(wrapped, M + 30, y);
    y += blockH;
  });
  y += 12;

  // ── Emergency banner ──
  ensureSpace(82);
  setFill(CRIMSON);
  doc.roundedRect(M, y, W - M * 2, 66, 8, 8, "F");
  setFill(GOLD);
  doc.roundedRect(M, y, 4, 66, 2, 2, "F");
  setText([255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("EMERGENCY — AVAILABLE 24×7", M + 18, y + 22);
  doc.setFontSize(22);
  doc.text("+91 93257 69599", M + 18, y + 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("WhatsApp & Call", W - M - 18, y + 22, { align: "right" });
  doc.text("jainentdrdevendra@gmail.com", W - M - 18, y + 38, { align: "right" });
  doc.text("Iskcon Pride, Deesa Highway, Deesa – 385535", W - M - 18, y + 54, { align: "right" });

  // Footers on all content pages (skip cover = page 1)
  const total = (doc as any).internal.getNumberOfPages();
  for (let p = 2; p <= total; p++) {
    doc.setPage(p);
    drawFooter(p - 1, total - 1);
  }

  doc.save("Jain-ENT-Post-Operative-Care-Checklist.pdf");
}

function PostOpCare() {
  function downloadChecklist() {
    generatePremiumPDF();
  }


  function printChecklist() {
    window.print();
  }

  const waMsg = `Hello Dr. Jain's team — I am a post-surgery patient and would like guidance regarding my recovery.\n\nName: \nSurgery date: \nProcedure: \nMy concern: `;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Surgery Recovery"
        title="Post-Operative Care Checklist."
        subtitle="A practical recovery guide for our ENT and head & neck surgery patients. Download it, print it, and reach us on WhatsApp anytime you need help."
      />

      <section className="py-10 print:py-0">
        <div className="container-tight">
          <div className="flex flex-wrap gap-3 print:hidden">
            <button
              onClick={downloadChecklist}
              className="inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95 transition"
            >
              <Download className="h-4 w-4" />
              Download checklist
            </button>
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95 transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Dr. Jain's team
            </a>
            <a
              href={`tel:${telPrimary}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-border px-5 py-3 text-sm font-semibold text-primary hover:border-primary transition"
            >
              <Phone className="h-4 w-4" />
              Call {CLINIC.phones.primary}
            </a>
            <button
              onClick={printChecklist}
              className="inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-border px-5 py-3 text-sm font-semibold text-primary hover:border-primary transition"
            >
              Print
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-3 print:hidden">
            This checklist is a general recovery guide. Always follow the specific instructions
            given to you at discharge by {CLINIC.doctor.short}.
          </p>
        </div>
      </section>

      <section className="pb-14">
        <div className="container-tight grid lg:grid-cols-2 gap-6">
          {SECTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl ring-1 ring-border bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/10 text-crimson">
                  <s.icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl font-semibold text-primary">{s.title}</h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-crimson shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="container-tight">
          <div className="rounded-2xl ring-1 ring-red-200 bg-red-50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <h2 className="font-display text-xl font-semibold text-red-800">
                Warning signs — contact us immediately
              </h2>
            </div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {RED_FLAGS.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-sm text-red-900">
                  <AlertTriangle className="h-4 w-4 mt-0.5 text-red-600 shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3 print:hidden">
              <a
                href={`tel:${telPrimary}`}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                <Phone className="h-4 w-4" />
                Emergency: {CLINIC.phones.primary}
              </a>
              <a
                href={waLink("URGENT — post-surgery concern. Please call back.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:opacity-95 transition"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp urgent
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
