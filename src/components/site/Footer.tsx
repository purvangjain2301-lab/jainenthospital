import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock, UserCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { CLINIC, telPrimary } from "@/lib/clinic";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-tight py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-md bg-white p-1" />
            <div>
              <div className="font-display text-2xl font-bold">Jain ENT Hospital</div>
              <div className="text-xs opacity-80">{CLINIC.tagline}</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed opacity-85 max-w-md">
            Comprehensive ENT, face surgery and head-neck cancer care led by {CLINIC.doctor.name},
            serving patients across India and worldwide via telemedicine, with the clinic based
            in Deesa, Gujarat. 17+ years of specialist expertise.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={CLINIC.social.facebook} target="_blank" rel="noreferrer"
               className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-crimson transition"
               aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            <a href={CLINIC.social.instagram} target="_blank" rel="noreferrer"
               className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-crimson transition"
               aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Visit</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-crimson" />
              <span>{CLINIC.address.line1}, {CLINIC.address.line2}, {CLINIC.address.city}, {CLINIC.address.state} {CLINIC.address.pin}</span></li>
            <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0 text-crimson" />
              <span>{CLINIC.hours.weekdays}<br/>{CLINIC.hours.sunday}<br/><strong>{CLINIC.hours.emergency}</strong></span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Contact & Patients</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-crimson" />
              <a href={`tel:${telPrimary}`} className="hover:underline">{CLINIC.phones.primary}</a></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-crimson" />
              <a href={`tel:${CLINIC.phones.secondary.replace(/\s/g,'')}`} className="hover:underline">{CLINIC.phones.secondary}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-crimson" />
              <a href={`mailto:${CLINIC.email}`} className="hover:underline break-all">{CLINIC.email}</a></li>
            <li className="flex gap-2"><UserCircle className="h-4 w-4 mt-0.5 shrink-0 text-crimson" />
              <Link to="/my-appointments" className="hover:underline">My Appointments</Link></li>
            <li className="pt-3">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-crimson px-4 py-2 text-sm font-semibold">
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-tight py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs opacity-80">
          <div>© {new Date().getFullYear()} Jain ENT Hospital, Deesa. All rights reserved.</div>
          <div>Caring for patients across India and around the world.</div>
        </div>
      </div>
    </footer>
  );
}
