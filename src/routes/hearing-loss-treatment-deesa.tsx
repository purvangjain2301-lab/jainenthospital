import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/site/LandingPage";
import { LANDING_PAGES } from "@/lib/landing-pages";

const props = LANDING_PAGES["hearing-loss-treatment-deesa"];

export const Route = createFileRoute("/hearing-loss-treatment-deesa")({
  head: () => landingHead(props),
  component: () => <LandingPage {...props} />,
});
