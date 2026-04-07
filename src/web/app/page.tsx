import { LandingPage } from "@/components/landing/landing-page";
import { getLandingPageContent } from "@/lib/content/public-content";

export default async function Home() {
  const content = await getLandingPageContent();

  return <LandingPage content={content} />;
}
