import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/site/LandingPage";
import { LANDING_PAGES } from "@/lib/landing-pages";

const props = LANDING_PAGES["ent-doctor-deesa"];

export const Route = createFileRoute("/ent-doctor-deesa")({
  head: () => landingHead(props),
  component: () => <LandingPage {...props} />,
});
