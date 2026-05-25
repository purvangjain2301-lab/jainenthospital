import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsappFloat } from "./WhatsappFloat";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsappFloat />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-hero border-b border-border">
      <div className="container-tight py-14 md:py-20">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full bg-crimson/10 text-crimson px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground text-pretty">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
