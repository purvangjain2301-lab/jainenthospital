import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CLINIC } from "@/lib/clinic";

// Canonical site URL — used for canonical + og:url everywhere
export const SITE_URL = "https://jainent.lovable.app";
export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// ─── Fallback defaults (mirror the seed in migration) ─────────────────────────
export const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "Jain ENT Hospital · Deesa, Gujarat",
    title: "Advanced ENT, Face Surgery & Head-Neck Cancer Care",
    subtitle: `Prof. Dr. Devendra M. Jain — ENT & Head Neck Surgeon with Cancer Care. 18+ years of experience. Patients welcomed from across India and worldwide via telemedicine.`,
    cta_primary_label: "Book Appointment",
    cta_primary_href: "/book",
    cta_secondary_label: "Telemedicine",
    cta_secondary_href: "/telemedicine",
  },
  doctor: CLINIC.doctor,
  address: CLINIC.address,
  contact_phones: { ...CLINIC.phones, email: CLINIC.email },
  whatsapp: CLINIC.whatsapp,
  hours: CLINIC.hours,
  social: CLINIC.social,
  emergency: { enabled: true, message: "24×7 ENT Emergency — call any time" },
  pharmacy: {
    name: "Yashvi Medical Store",
    description: "In-house pharmacy with all ENT, post-op and general medicines.",
    hours: "Mon – Sat · 10:00 AM – 8:00 PM",
    phone: CLINIC.phones.primary,
  },
  footer: {
    tagline: CLINIC.tagline,
    about:
      "Senior ENT specialist clinic in Deesa, Gujarat — 18+ years of experience, 15+ years as a Teaching Professor.",
    copyright: "© Jain ENT Hospital. All rights reserved.",
  },
  reviews_settings: {
    google_review_link: "https://g.page/r/CarLiO9V0KfzEBM/review",
    google_place_url: "https://g.page/r/CarLiO9V0KfzEBM",
  },
  seo_defaults: {
    site_name: "Jain ENT Hospital",
    base_url: SITE_URL,
    default_og_image: "",
    twitter_handle: "",
  },
};

export type ContentKey = keyof typeof DEFAULT_CONTENT | string;

// In-memory cache shared across all hook instances
const cache: Record<string, any> = {};
const listeners = new Set<() => void>();
let loaded = false;
let loadingPromise: Promise<void> | null = null;

async function loadAll() {
  if (loadingPromise) return loadingPromise;
  loadingPromise = (async () => {
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (!error && data) {
      for (const row of data as Array<{ key: string; value: any }>) {
        cache[row.key] = row.value;
      }
    }
    loaded = true;
    listeners.forEach((l) => l());
  })();
  return loadingPromise;
}

let realtimeChannel: ReturnType<typeof supabase.channel> | null = null;
function ensureRealtime() {
  if (realtimeChannel || typeof window === "undefined") return;
  realtimeChannel = supabase
    .channel("site_content_realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "site_content" },
      (payload: any) => {
        const row = (payload.new ?? payload.old) as { key: string; value: any } | undefined;
        if (!row) return;
        if (payload.eventType === "DELETE") delete cache[row.key];
        else cache[row.key] = row.value;
        listeners.forEach((l) => l());
      },
    )
    .subscribe();
}

export function useSiteContent<K extends keyof typeof DEFAULT_CONTENT>(
  key: K,
): (typeof DEFAULT_CONTENT)[K];
export function useSiteContent<T = any>(key: string): T;
export function useSiteContent(key: string): any {
  const [, force] = useState(0);
  useEffect(() => {
    if (!loaded) loadAll();
    ensureRealtime();
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return cache[key] ?? (DEFAULT_CONTENT as any)[key];
}

export async function saveSiteContent(key: string, value: any) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
  cache[key] = value;
  listeners.forEach((l) => l());
}

export async function fetchAllContent(): Promise<Record<string, any>> {
  await loadAll();
  return { ...cache };
}

// Phone helpers re-exported from clinic for backward compat
export const telDigits = (p: string) => p.replace(/[^\d+]/g, "");
export const waUrl = (digits: string, msg: string) =>
  `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
