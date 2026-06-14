import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/site/LandingPage";
import { LANDING_PAGES } from "@/lib/landing-pages";

const props = LANDING_PAGES["ent-specialist-banaskantha"];

export const Route = createFileRoute("/ent-specialist-banaskantha")({
  head: () => landingHead(props),
  component: () => <LandingPage {...props} />,
});
