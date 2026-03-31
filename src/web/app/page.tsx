import { LandingPage } from "@/components/landing/landing-page";
import { siteContent } from "@/lib/content/site-content";

export default function Home() {
  return <LandingPage content={siteContent} />;
}
