import Image from "next/image";
import type { HeroSection as HeroSectionData } from "@/sanity/types";

type NavbarProps = {
  data: HeroSectionData | null;
};

export function Navbar({ data }: NavbarProps) {
  const logo = data?.logo;
  const email = data?.contactBlock.email;

  return (
    <header className="section pt-10">
      <nav className="flex items-center justify-between gap-6">
        <div aria-label="NASA HUNCH home" className="block">
          {logo?.asset?.url ? (
            <Image
              src={logo.asset.url}
              alt={logo.alt}
              width={logo.asset.metadata?.dimensions?.width ?? 220}
              height={logo.asset.metadata?.dimensions?.height ?? 80}
              priority
              className="h-14 w-auto object-contain"
            />
          ) : (
            <span className="font-heading uppercase">NASA HUNCH</span>
          )}
        </div>

        {email ? (
          <a
            href={`mailto:${email}`}
            className="dotted-button dotted-button-pink uppercase"
          >
            Kontakt
          </a>
        ) : null}
      </nav>
    </header>
  );
}
