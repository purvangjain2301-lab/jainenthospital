import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-tight pt-6">
      <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 hover:text-primary">
            <Home className="h-3 w-3" /> Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="hover:text-primary">
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[], baseUrl: string) {
  const list = [{ label: "Home", to: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.to ? `${baseUrl}${c.to}` : undefined,
    })),
  };
}
