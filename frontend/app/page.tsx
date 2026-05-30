import { HeroSection } from "@/app/sections/HeroSection";
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
      <HeroSection data={homePage.hero} />
    </main>
  );
}
