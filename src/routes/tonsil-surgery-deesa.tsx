import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/site/LandingPage";
import { LANDING_PAGES } from "@/lib/landing-pages";

const props = LANDING_PAGES["tonsil-surgery-deesa"];

export const Route = createFileRoute("/tonsil-surgery-deesa")({
  head: () => landingHead(props),
  component: () => <LandingPage {...props} />,
});
