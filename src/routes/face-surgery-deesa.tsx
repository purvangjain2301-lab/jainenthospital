import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/site/LandingPage";
import { LANDING_PAGES } from "@/lib/landing-pages";

const props = LANDING_PAGES["face-surgery-deesa"];

export const Route = createFileRoute("/face-surgery-deesa")({
  head: () => landingHead(props),
  component: () => <LandingPage {...props} />,
});
