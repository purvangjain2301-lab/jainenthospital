// Re-export the auto-generated Supabase browser client so existing imports
// (`@/lib/supabase`) keep working alongside the canonical
// `@/integrations/supabase/client` path.
export { supabase } from "@/integrations/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  label: string;
  url: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
  created_at: string;
}

export type BlogPostDraft = Omit<BlogPost, "id" | "created_at">;

export interface Appointment {
  id: string;
  user_id?: string | null;
  name: string;
  age: string | null;
  phone: string;
  email?: string | null;
  mode: string;
  date: string;
  slot: string;
  concern: string;
  status: string;
  payment_status: string;
  razorpay_order_id?: string | null;
  token_number?: number | null;
  created_at: string;
}

export interface Slot {
  id: string;
  date: string;
  time_label: string;
  max_capacity: number;
  is_blocked: boolean;
  created_at: string;
}


