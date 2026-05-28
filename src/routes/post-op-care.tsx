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
  const DARK: [number, number, number] = [30, 30, 35];
  const MUTED: [number, number, number] = [110, 110, 120];
  const LIGHT_RED: [number, number, number] = [253, 235, 238];
  const BORDER: [number, number, number] = [225, 225, 230];
  const M = 40; // page margin
  let y = 0;

  const drawWatermark = () => {
    doc.saveGraphicsState();
    // @ts-ignore - GState is available at runtime
    doc.setGState(new (doc as any).GState({ opacity: 0.05 }));
    doc.setTextColor(...CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(90);
    doc.text("JAIN ENT", W / 2, H / 2 + 30, { align: "center", angle: 30 });
    doc.restoreGraphicsState();
  };

  const drawHeader = () => {
    // Crimson header bar
    doc.setFillColor(...CRIMSON);
    doc.rect(0, 0, W, 90, "F");
    // Accent strip
    doc.setFillColor(160, 18, 40);
    doc.rect(0, 90, W, 4, "F");

    // Logo monogram circle
    doc.setFillColor(255, 255, 255);
    doc.circle(M + 22, 45, 22, "F");
    doc.setTextColor(...CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("J", M + 22, 51, { align: "center" });

    // Hospital name + doctor
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("JAIN ENT HOSPITAL", M + 58, 38);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("Prof. Dr. Devendra M. Jain, MBBS, MS (ENT)", M + 58, 53);
    doc.setFontSize(8.5);
    doc.text("Ear • Nose • Throat • Head & Neck Cancer Care", M + 58, 66);

    // Right-side contact
    doc.setFontSize(8.5);
    doc.text("+91 93257 69599  •  24×7", W - M, 38, { align: "right" });
    doc.text("jainentdrdevendra@gmail.com", W - M, 51, { align: "right" });
    doc.text("Iskcon Pride, Deesa Highway, Deesa – 385535", W - M, 64, { align: "right" });
  };

  const drawFooter = (pageNum: number, totalPages: number) => {
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.5);
    doc.line(M, H - 50, W - M, H - 50);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(
      "This checklist is a general guide. Always follow the specific instructions given to you at discharge.",
      W / 2, H - 34, { align: "center" }
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`Jain ENT Hospital  •  Deesa, Gujarat`, M, H - 18);
    doc.text(`Page ${pageNum} of ${totalPages}`, W - M, H - 18, { align: "right" });
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > H - 70) {
      doc.addPage();
      drawWatermark();
      drawHeader();
      y = 120;
    }
  };

  // ---- Page 1 ----
  drawWatermark();
  drawHeader();
  y = 120;

  // Title block
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Post-Operative Care Checklist", M, y);
  y += 8;
  doc.setDrawColor(...CRIMSON);
  doc.setLineWidth(2);
  doc.line(M, y, M + 60, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(
    "Personalised recovery guidance for ENT and Head & Neck surgery patients under the care of",
    M, y
  );
  y += 13;
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.text("Prof. Dr. Devendra M. Jain", M, y);
  y += 22;

  // Sections
  SECTIONS.forEach((s, i) => {
    ensureSpace(60);

    // Section header bar
    doc.setFillColor(...LIGHT_RED);
    doc.roundedRect(M, y, W - M * 2, 26, 4, 4, "F");
    doc.setFillColor(...CRIMSON);
    doc.roundedRect(M, y, 4, 26, 2, 2, "F");

    // Number badge
    doc.setFillColor(...CRIMSON);
    doc.circle(M + 24, y + 13, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(String(i + 1), M + 24, y + 16.5, { align: "center" });

    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(s.title.toUpperCase(), M + 42, y + 17);
    y += 36;

    // Items
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(45, 45, 55);
    s.items.forEach((it) => {
      const wrapped = doc.splitTextToSize(it, W - M * 2 - 30);
      const blockH = wrapped.length * 13 + 4;
      ensureSpace(blockH);
      // Checkbox
      doc.setDrawColor(...CRIMSON);
      doc.setLineWidth(0.8);
      doc.roundedRect(M + 6, y - 8, 10, 10, 1.5, 1.5);
      doc.text(wrapped, M + 24, y);
      y += blockH;
    });
    y += 8;
  });

  // Warning section
  ensureSpace(140);
  doc.setFillColor(...LIGHT_RED);
  doc.roundedRect(M, y, W - M * 2, 30, 4, 4, "F");
  doc.setFillColor(...CRIMSON);
  doc.roundedRect(M, y, W - M * 2, 30, 4, 4, "S");
  doc.setTextColor(...CRIMSON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("WARNING SIGNS — CONTACT US IMMEDIATELY", M + 14, y + 19);
  y += 42;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(130, 20, 30);
  RED_FLAGS.forEach((it) => {
    const wrapped = doc.splitTextToSize(it, W - M * 2 - 24);
    const blockH = wrapped.length * 13 + 4;
    ensureSpace(blockH);
    // Alert triangle marker
    doc.setFillColor(...CRIMSON);
    doc.triangle(M + 6, y, M + 14, y - 10, M + 22, y, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("!", M + 14, y - 2, { align: "center" });
    doc.setTextColor(130, 20, 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(wrapped, M + 28, y);
    y += blockH;
  });
  y += 10;

  // Emergency banner
  ensureSpace(70);
  doc.setFillColor(...CRIMSON);
  doc.roundedRect(M, y, W - M * 2, 56, 6, 6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("EMERGENCY — AVAILABLE 24×7", M + 18, y + 22);
  doc.setFontSize(20);
  doc.text("+91 93257 69599", M + 18, y + 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("WhatsApp & Call", W - M - 18, y + 22, { align: "right" });
  doc.text("jainentdrdevendra@gmail.com", W - M - 18, y + 45, { align: "right" });

  // Render footers on all pages
  const total = (doc as any).internal.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    drawFooter(p, total);
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
