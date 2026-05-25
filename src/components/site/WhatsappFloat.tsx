import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/clinic";

export function WhatsappFloat() {
  return (
    <a
      href={waLink("Hello Dr. Devendra, I would like to enquire about an ENT consultation.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white font-semibold shadow-elevated hover:scale-[1.03] transition"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm">WhatsApp Us</span>
      <span className="absolute -top-1 -right-1 inline-flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] ring-2 ring-white" />
      </span>
    </a>
  );
}
