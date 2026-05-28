import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { EmergencyBar } from "./EmergencyBar";
import { CLINIC } from "@/lib/clinic";

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
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <EmergencyBar />
      <div className="container-tight flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3 group" aria-label={CLINIC.name}>
          <img
            src={logo}
            alt={`${CLINIC.name} logo`}
            className="h-11 w-11 rounded-md object-contain bg-white ring-1 ring-border"
            width={44}
            height={44}
          />
          <div className="leading-tight">
            <div className="font-display text-lg sm:text-xl font-bold text-primary">
              Jain <span className="text-crimson">ENT</span> Hospital
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground -mt-0.5">
              Deesa · Prof. Dr. Devendra M. Jain
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-foreground/80 rounded-md hover:text-primary hover:bg-secondary transition-colors [&.active]:text-primary [&.active]:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition"
          >
            <CalendarCheck className="h-4 w-4" /> Book
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-tight flex flex-col py-2" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="px-2 py-3 text-base font-medium border-b border-border/50 last:border-none [&.active]:text-primary"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <CalendarCheck className="h-4 w-4" /> Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
