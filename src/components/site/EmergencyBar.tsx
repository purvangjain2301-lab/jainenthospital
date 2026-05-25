import { Phone, AlertCircle } from "lucide-react";
import { CLINIC, telPrimary } from "@/lib/clinic";

export function EmergencyBar() {
  return (
    <div className="w-full bg-crimson text-crimson-foreground text-xs sm:text-sm">
      <div className="container-tight flex items-center justify-between gap-3 py-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate font-medium tracking-wide">
            24×7 ENT Emergency — call any time
          </span>
        </div>
        <a
          href={`tel:${telPrimary}`}
          className="flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline whitespace-nowrap"
          aria-label={`Call emergency number ${CLINIC.phones.primary}`}
        >
          <Phone className="h-3.5 w-3.5" aria-hidden />
          {CLINIC.phones.primary}
        </a>
      </div>
    </div>
  );
}
