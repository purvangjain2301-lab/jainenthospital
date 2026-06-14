import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { saveSiteContent } from "@/lib/site-content";
import { Save, Loader2, Settings2 } from "lucide-react";

const SECTIONS: { key: string; title: string; description: string }[] = [
  { key: "hero", title: "Hero Section", description: "Homepage headline, subtitle and CTAs." },
  { key: "doctor", title: "About the Doctor", description: "Name, title, credentials, experience, bio." },
  { key: "address", title: "Address", description: "Clinic address (line1, line2, city, state, pin, country)." },
  { key: "contact_phones", title: "Contact Phones & Email", description: "Primary/secondary/tertiary phone numbers and email." },
  { key: "whatsapp", title: "WhatsApp Numbers", description: "Digits-only numbers used for wa.me links." },
  { key: "hours", title: "Opening Hours", description: "Weekdays, Sunday, emergency hours." },
  { key: "social", title: "Social Media URLs", description: "Facebook, Instagram and Google Maps URLs." },
  { key: "emergency", title: "Emergency Bar", description: "Enable/disable top emergency banner and edit message." },
  { key: "pharmacy", title: "Pharmacy — Yashvi Medical Store", description: "Pharmacy name, description, hours, phone." },
  { key: "footer", title: "Footer", description: "Tagline, about paragraph, copyright text." },
  { key: "seo_defaults", title: "SEO — Defaults", description: "Site name, base URL, default OG image, twitter handle." },
  { key: "seo_pages", title: "SEO — Per-page meta", description: "Title and description for each main page (home, about, services, blog, book, feedback)." },
  { key: "reviews_settings", title: "Reviews — Google Link", description: "Google Business Profile review link used in auto-replies." },
  { key: "services_list", title: "Services (list)", description: "Array of services shown on Services page." },
  { key: "nav_links", title: "Navigation Links", description: "Top navigation items (label + to path)." },
  { key: "footer_links", title: "Footer Links", description: "Footer navigation items." },
];

export function ContentTab() {
  const [rows, setRows] = useState<Record<string, any>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("site_content").select("key, value");
    const map: Record<string, any> = {};
    const draftMap: Record<string, string> = {};
    (data ?? []).forEach((r: any) => {
      map[r.key] = r.value;
      draftMap[r.key] = JSON.stringify(r.value, null, 2);
    });
    setRows(map);
    setDrafts(draftMap);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(key: string) {
    setMsg((m) => ({ ...m, [key]: "" }));
    let parsed: any;
    try {
      parsed = JSON.parse(drafts[key] ?? "{}");
    } catch (e: any) {
      setMsg((m) => ({ ...m, [key]: "✗ Invalid JSON: " + e.message }));
      return;
    }
    setSaving(key);
    try {
      await saveSiteContent(key, parsed);
      setRows((r) => ({ ...r, [key]: parsed }));
      setMsg((m) => ({ ...m, [key]: "✓ Saved & published live" }));
    } catch (e: any) {
      setMsg((m) => ({ ...m, [key]: "✗ " + (e.message || "Save failed") }));
    } finally {
      setSaving(null);
    }
  }

  if (loading)
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading content…
      </div>
    );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-primary">Website Content (CMS)</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Edit any section below. <b>Save & Publish</b> pushes the change live instantly via
          realtime — no redeploy needed.
        </p>
      </div>

      {SECTIONS.map((s) => {
        const empty = rows[s.key] === undefined;
        return (
          <div key={s.key} className="rounded-2xl bg-white ring-1 ring-border p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-crimson" />
                  <h2 className="font-display text-lg font-bold text-primary">{s.title}</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                <code className="text-[10px] text-muted-foreground/60">key: {s.key}</code>
              </div>
              <button
                onClick={() => save(s.key)}
                disabled={saving === s.key}
                className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50 shrink-0"
              >
                {saving === s.key ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save & Publish
              </button>
            </div>
            <textarea
              value={drafts[s.key] ?? (empty ? "{}" : "")}
              onChange={(e) => setDrafts((d) => ({ ...d, [s.key]: e.target.value }))}
              rows={Math.min(Math.max((drafts[s.key] ?? "").split("\n").length, 6), 22)}
              className="mt-4 w-full border border-border rounded-xl px-4 py-3 text-xs font-mono outline-none focus:ring-2 focus:ring-primary/30 resize-y"
              spellCheck={false}
            />
            {msg[s.key] && (
              <p
                className={`mt-2 text-xs ${msg[s.key].startsWith("✓") ? "text-emerald-600" : "text-red-500"}`}
              >
                {msg[s.key]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
