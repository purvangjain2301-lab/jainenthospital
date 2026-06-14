import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/site/LandingPage";
import { LANDING_PAGES } from "@/lib/landing-pages";

const props = LANDING_PAGES["head-neck-cancer-surgeon-gujarat"];

export const Route = createFileRoute("/head-neck-cancer-surgeon-gujarat")({
  head: () => landingHead(props),
  component: () => <LandingPage {...props} />,
});
