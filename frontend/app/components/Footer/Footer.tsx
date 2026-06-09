"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroSection as HeroSectionData } from "@/sanity/types";

type FooterProps = {
  data: HeroSectionData | null;
};

const CREDIT_LINKS = [
  {
    name: "Eirik Kvam",
    href: "https://www.linkedin.com/in/eirik-engen-kvam/",
  },
  {
    name: "August Middelkoop",
    href: "https://www.linkedin.com/in/august-solli-middelkoop/",
  },
] as const;

export function Footer({ data }: FooterProps) {
  const [isLightMode, setIsLightMode] = useState(false);
  const lightLogo = data?.logo;
  const darkLogo = data?.darkLogo ?? data?.logo;
  const logo = isLightMode ? lightLogo : darkLogo;

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsLightMode(root.classList.contains("light"));
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
      <footer
          className="section relative overflow-visible pt-60 md:pt-72 pb-16 md:pb-24 px-8 md:px-12"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 overflow-visible">
          <svg
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              className="hidden h-[320px] w-full md:block"
              aria-hidden="true"
          >
            <path
                d="
      M0 220

      C120 170 220 110 340 130
      C470 150 580 170 720 160

      C840 150 930 110 980 60

      C1020 20 1070 10 1095 45
      C1120 80 1095 130 1055 125
      C1005 120 995 45 1045 15
      C1115 -25 1185 40 1155 120

      C1135 180 1075 195 1050 150
      C1025 105 1080 70 1130 95

      C1190 125 1230 165 1290 185
      C1350 205 1400 190 1440 150
    "
                fill="none"
                stroke="var(--accent-pink)"
                strokeWidth="2"
                strokeDasharray="10 10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>

          <svg
              viewBox="0 0 390 200"
              preserveAspectRatio="none"
              className="h-[160px] w-full md:hidden"
              aria-hidden="true"
          >
            <path
                d="
      M0 140

      C50 105 100 85 145 95
      C190 105 230 110 270 95

      C295 80 315 55 325 35

      C335 15 350 10 360 25
      C370 40 360 60 345 58
      C330 56 325 25 345 10
      C370 -5 390 25 378 60

      C370 90 350 100 340 80
      C330 60 350 50 365 58

      C375 65 385 75 390 80
    "
                fill="none"
                stroke="var(--accent-pink)"
                strokeWidth="2"
                strokeDasharray="8 8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="mt-40 md:mt-52">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-8">
            <div className="flex flex-col items-center justify-center">
              <p className="m-0 max-w-[22ch] font-heading">
                Vi takker NORSTEC for å
                <br/>
                overta stafettpinnen
                <br/>
                for NASA HUNCH Norge
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p>
                Utvikling og Design
              </p>

              {CREDIT_LINKS.map((link) => (
                  <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block underline underline-offset-[0.18em] transition hover:text-accent-pink"
                  >
                    {link.name}
                  </a>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="m-0 mb-2 ">
                Personvernerklæring
              </p>

              <p className="m-0 max-w-[20ch]">
                Vi henter ikke inn data.
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
}
