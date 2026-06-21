import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout, P as PageHero, w as waLink, C as CLINIC, t as telPrimary } from "./router-BdWqalL7.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import { D as Download, S as MessageCircle, Y as Phone, Z as Pill, ag as Utensils, f as BedDouble, A as Activity, i as CalendarCheck, n as CircleCheck, a4 as ShieldAlert, ac as TriangleAlert } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
const SECTIONS = [{
  icon: Pill,
  title: "Medications",
  items: ["Take all prescribed antibiotics on time — complete the full course even if you feel better.", "Use pain medication as advised; do not exceed the dose printed on the strip.", "Continue nasal sprays / ear drops exactly as scheduled by Dr. Jain.", "Do NOT take aspirin or blood-thinners unless specifically approved."]
}, {
  icon: Utensils,
  title: "Diet & Hydration",
  items: ["Start with cool / lukewarm liquids for the first 24 hours after throat or tonsil surgery.", "Soft, bland foods (khichdi, curd-rice, dal, mashed potatoes) for 5–7 days after oral / throat procedures.", "Avoid hot, spicy, crunchy, or acidic foods until cleared at follow-up.", "Drink 2–3 litres of water daily unless restricted."]
}, {
  icon: BedDouble,
  title: "Rest & Positioning",
  items: ["Sleep with head elevated on 2 pillows for the first week (especially after sinus / nasal surgery).", "Avoid bending forward, lifting heavy objects, or straining for at least 2 weeks.", "No swimming, head-dunking, or air travel until specifically allowed.", "Plan 5–7 days of light activity at home before resuming work."]
}, {
  icon: Activity,
  title: "Wound, Dressing & Hygiene",
  items: ["Keep the surgical site clean and dry — do not remove dressings on your own.", "After ear surgery, keep water out of the ear; use a vaseline-coated cotton ball while bathing.", "After nasal surgery, do not blow your nose forcefully for 2 weeks — dab gently.", "Brush teeth gently and rinse with prescribed mouthwash after oral / throat surgery."]
}, {
  icon: CalendarCheck,
  title: "Follow-Up",
  items: ["First follow-up visit: as scheduled at discharge (usually within 5–7 days).", "Bring your discharge summary, prescription, and any reports to every follow-up.", "Tele-consultation is available for out-of-town patients via the Telemedicine page.", "Complete all scheduled dressing changes / suture removal appointments."]
}];
const RED_FLAGS = ["Heavy or persistent bleeding from the surgical site (nose, mouth, ear, or neck).", "Fever above 101°F / 38.3°C that does not respond to paracetamol.", "Sudden severe pain, swelling, or pus from the wound.", "Difficulty in breathing, swallowing, or speaking.", "Sudden hearing loss, severe dizziness, or facial weakness.", "Vomiting blood or passing dark/black stools."];
function generatePremiumPDF() {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const CRIMSON = [194, 24, 49];
  const CRIMSON_DARK = [140, 16, 34];
  const DARK = [22, 24, 35];
  const MUTED = [120, 122, 135];
  const LIGHT_RED = [253, 235, 238];
  const CREAM = [252, 248, 244];
  const BORDER = [228, 228, 235];
  const GOLD = [184, 134, 11];
  const M = 44;
  let y = 0;
  const setFill = (c) => doc.setFillColor(c[0], c[1], c[2]);
  const setText = (c) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c) => doc.setDrawColor(c[0], c[1], c[2]);
  const drawCover = () => {
    setFill(CRIMSON);
    doc.rect(0, 0, W, H, "F");
    setFill(CRIMSON_DARK);
    doc.rect(0, H - 200, W, 200, "F");
    setFill(GOLD);
    doc.rect(M, 220, 60, 3, "F");
    setFill([255, 255, 255]);
    doc.circle(M + 18, 60, 18, "F");
    setText(CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("J", M + 18, 65, {
      align: "center"
    });
    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("JAIN ENT HOSPITAL", M + 46, 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Deesa · Banaskantha · Gujarat", M + 46, 70);
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
    const intro = doc.splitTextToSize("A practical recovery companion for ENT and Head & Neck surgery patients — covering medications, diet, rest, wound care, warning signs and follow-up.", W - M * 2);
    doc.text(intro, M, 340);
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
    setText([255, 255, 255]);
    doc.setFontSize(8);
    doc.text("Issued by Jain ENT Hospital  ·  jainent.lovable.app", M, H - 32);
    doc.text(`Generated ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })}`, W - M, H - 32, {
      align: "right"
    });
  };
  const drawWatermark = () => {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({
      opacity: 0.04
    }));
    setText(CRIMSON);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(88);
    doc.text("JAIN ENT", W / 2, H / 2 + 30, {
      align: "center",
      angle: 30
    });
    doc.restoreGraphicsState();
  };
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
    doc.text("J", M + 14, 32, {
      align: "center"
    });
    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("JAIN ENT HOSPITAL", M + 36, 26);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Post-Operative Care Checklist", M + 36, 40);
    doc.setFontSize(8.5);
    doc.text("+91 93257 69599  ·  24×7", W - M, 26, {
      align: "right"
    });
    doc.text("Deesa, Gujarat", W - M, 40, {
      align: "right"
    });
  };
  const drawFooter = (pageNum, totalPages) => {
    setDraw(BORDER);
    doc.setLineWidth(0.5);
    doc.line(M, H - 46, W - M, H - 46);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    setText(MUTED);
    doc.text("This checklist is a general guide. Always follow the specific instructions given to you at discharge.", W / 2, H - 32, {
      align: "center"
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Jain ENT Hospital  ·  Prof. Dr. Devendra M. Jain", M, H - 16);
    doc.text(`Page ${pageNum} of ${totalPages}`, W - M, H - 16, {
      align: "right"
    });
  };
  const ensureSpace = (needed) => {
    if (y + needed > H - 60) {
      doc.addPage();
      drawWatermark();
      drawHeader();
      y = 86;
    }
  };
  drawCover();
  doc.addPage();
  drawWatermark();
  drawHeader();
  y = 86;
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
  doc.text("Tick off items each day. Reach us on WhatsApp or call 24×7 for any concern.", M + 14, y + 58);
  y += 96;
  SECTIONS.forEach((s, i) => {
    ensureSpace(70);
    setFill(LIGHT_RED);
    doc.roundedRect(M, y, W - M * 2, 30, 6, 6, "F");
    setFill(CRIMSON);
    doc.roundedRect(M, y, 4, 30, 2, 2, "F");
    setFill(CRIMSON);
    doc.circle(M + 26, y + 15, 11, "F");
    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(String(i + 1).padStart(2, "0"), M + 26, y + 19, {
      align: "center"
    });
    setText(DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.text(s.title.toUpperCase(), M + 46, y + 19);
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
      setDraw(CRIMSON);
      doc.setLineWidth(0.9);
      doc.roundedRect(M + 6, y - 9, 11, 11, 2, 2);
      setText([45, 45, 55]);
      doc.text(wrapped, M + 26, y);
      y += blockH;
    });
    y += 10;
  });
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
    doc.text("!", M + 14, y - 3, {
      align: "center"
    });
    setText([130, 20, 30]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(wrapped, M + 30, y);
    y += blockH;
  });
  y += 12;
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
  doc.text("WhatsApp & Call", W - M - 18, y + 22, {
    align: "right"
  });
  doc.text("jainentdrdevendra@gmail.com", W - M - 18, y + 38, {
    align: "right"
  });
  doc.text("Iskcon Pride, Deesa Highway, Deesa – 385535", W - M - 18, y + 54, {
    align: "right"
  });
  const total = doc.internal.getNumberOfPages();
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
  const waMsg = `Hello Dr. Jain's team — I am a post-surgery patient and would like guidance regarding my recovery.

Name: 
Surgery date: 
Procedure: 
My concern: `;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Surgery Recovery", title: "Post-Operative Care Checklist.", subtitle: "A practical recovery guide for our ENT and head & neck surgery patients. Download it, print it, and reach us on WhatsApp anytime you need help." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 print:py-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 print:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadChecklist, className: "inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          "Download checklist"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(waMsg), target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          "WhatsApp Dr. Jain's team"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${telPrimary}`, className: "inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-border px-5 py-3 text-sm font-semibold text-primary hover:border-primary transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
          "Call ",
          CLINIC.phones.primary
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: printChecklist, className: "inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-border px-5 py-3 text-sm font-semibold text-primary hover:border-primary transition", children: "Print" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3 print:hidden", children: [
        "This checklist is a general recovery guide. Always follow the specific instructions given to you at discharge by ",
        CLINIC.doctor.short,
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid lg:grid-cols-2 gap-6", children: SECTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-border bg-white p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/10 text-crimson", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-primary", children: s.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2.5", children: s.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm text-foreground/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mt-0.5 text-crimson shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it })
      ] }, it)) })
    ] }, s.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-red-200 bg-red-50 p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-red-800", children: "Warning signs — contact us immediately" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid sm:grid-cols-2 gap-2.5", children: RED_FLAGS.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm text-red-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 mt-0.5 text-red-600 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it })
      ] }, it)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3 print:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${telPrimary}`, className: "inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
          "Emergency: ",
          CLINIC.phones.primary
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink("URGENT — post-surgery concern. Please call back."), target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:opacity-95 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          "WhatsApp urgent"
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  PostOpCare as component
};
