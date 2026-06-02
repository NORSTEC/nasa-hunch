import { BuildForNasa } from "@/app/components/BuildForNasa/BuildForNasa";
import { ContactForm } from "@/app/components/ContactForm/ContactForm";
import { Footer } from "@/app/components/Footer/Footer";
import { Navbar } from "@/app/components/Navbar";
import { Sponsors } from "@/app/components/Sponsors/Sponsors";
import { CarouselSection } from "@/app/sections/CarouselSection/CarouselSection";
import { HeroSection } from "@/app/sections/HeroSection";
import { StatsSection } from "@/app/sections/StatsSection/StatsSection";
import { homePageQuery } from "@/sanity/queries";
import type { HomePage } from "@/sanity/types";

const SANITY_PROJECT_ID = "4k911a4x";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-05-30";

type SanityQueryResponse<T> = {
  result: T;
};

async function getHomePage() {
  const params = new URLSearchParams({ query: homePageQuery });
  const response = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?${params}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch home page from Sanity");
  }

  const data = (await response.json()) as SanityQueryResponse<HomePage>;

  return data.result;
}

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <main className="bg-background text-foreground">
      <Navbar data={homePage.hero} />
      <HeroSection data={homePage.hero} />
      <BuildForNasa />
      <StatsSection data={homePage.stats} />
        <ContactForm />
        <Sponsors />
      <CarouselSection data={homePage.carousel} />
        <Footer data={homePage.hero} />
    </main>
  );
}
