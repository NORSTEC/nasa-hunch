"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroSection as HeroSectionData } from "@/sanity/types";

type NavbarProps = {
  data: HeroSectionData | null;
};

export function Navbar({ data }: NavbarProps) {
  const [isLightMode, setIsLightMode] = useState(false);
  const lightLogo = data?.logo;
  const darkLogo = data?.darkLogo ?? data?.logo;
  const logo = isLightMode ? lightLogo : darkLogo;
  const email = data?.contactBlock.email;

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsLightMode(root.classList.contains("light"));
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="px-5 py-6 sm:px-10">
      <nav className="flex items-center justify-between gap-6">
        <div aria-label="NASA HUNCH home" className="block">
          {logo?.asset?.url ? (
            <Image
              src={logo.asset.url}
              alt={logo.alt}
              width={logo.asset.metadata?.dimensions?.width ?? 220}
              height={logo.asset.metadata?.dimensions?.height ?? 80}
              priority
              className="h-12 w-auto object-contain"
            />
          ) : (
            <span className="font-heading uppercase">NASA HUNCH</span>
          )}
        </div>

        {email ? (
          <a
            href="#contact"
            className="dotted-button dotted-button-pink uppercase"
          >
            Kontakt
          </a>
        ) : null}
      </nav>
    </header>
  );
}
