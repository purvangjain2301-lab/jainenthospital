import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/site/LandingPage";
import { LANDING_PAGES } from "@/lib/landing-pages";

const props = LANDING_PAGES["ent-doctor-dhanera"];

export const Route = createFileRoute("/ent-doctor-dhanera")({
  head: () => landingHead(props),
  component: () => <LandingPage {...props} />,
});
