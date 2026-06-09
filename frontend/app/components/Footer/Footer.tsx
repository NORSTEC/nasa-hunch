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
          className="section relative overflow-visible pt-60 md:pt-72 pb-5! grid items-end gap-8 text-center md:grid-cols-[minmax(8rem,1fr)_auto_minmax(8rem,1fr)] md:gap-[clamp(1.5rem,4vw,4rem)]">
        <div className="pointer-events-none absolute inset-x-0 -top-16 md:-top-24 overflow-visible">
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
        {/*
        <div
            className="order-2 flex min-w-0 items-center justify-center gap-2 md:order-none md:gap-[clamp(0.4rem,1.6vw,1.2rem)]"
            aria-hidden="true"
        >
          <Image
              src="/mascot2.png"
              alt=""
              width={180}
              height={220}
              className="float-soft h-auto w-16 object-contain drop-shadow-[0.18rem_0.22rem_0_var(--background)] [--float-duration:5.9s] [--float-x-end:-0.12rem] [--float-y-end:-0.55rem] [--float-rotate-end:-3deg] [animation-delay:-0.8s] [transform-origin:50%_55%] md:w-[clamp(4.25rem,8vw,8rem)]"
          />
          <Image
              src="/mascot2.png"
              alt=""
              width={180}
              height={220}
              className="float-soft h-auto w-16 object-contain drop-shadow-[0.18rem_0.22rem_0_var(--background)] [--float-duration:6.7s] [--float-x-end:0.14rem] [--float-y-end:-0.85rem] [--float-rotate-end:5deg] [animation-delay:-2.4s] [transform-origin:50%_55%] md:w-[clamp(4.25rem,8vw,8rem)]"
          />
          <Image
              src="/mascot1.png"
              alt=""
              width={210}
              height={270}
              className="float-soft h-auto w-20 object-contain drop-shadow-[0.18rem_0.22rem_0_var(--background)] [--float-duration:5.4s] [--float-x-end:0.18rem] [--float-y-end:-0.7rem] [--float-rotate-end:-5deg] [animation-delay:-1.6s] [transform-origin:50%_55%] md:hidden"
          />
          <Image
              src="/mascot2.png"
              alt=""
              width={180}
              height={220}
              className="float-soft h-auto w-16 object-contain drop-shadow-[0.18rem_0.22rem_0_var(--background)] [--float-duration:7.1s] [--float-x-end:-0.1rem] [--float-y-end:-0.45rem] [--float-rotate-end:4deg] [animation-delay:-3.1s] [transform-origin:50%_55%] md:hidden"
          />
        </div>


        <div className="order-1 grid justify-items-center gap-5  md:order-none">
          <h4 className="m-0 pb-20 lg:pb-40 uppercase text-accent-pink">
            All rights reserved
          </h4>
          {logo?.asset?.url ? (
              <Image
                  src={logo.asset.url}
                  alt={logo.alt}
                  width={logo.asset.metadata?.dimensions?.width ?? 360}
                  height={logo.asset.metadata?.dimensions?.height ?? 120}
                  className="h-auto w-[clamp(13rem,24vw,22rem)] object-contain"
              />
          ) : (
              <span className="font-heading text-page-heading-md uppercase leading-none">
            NASA HUNCH NORGE
          </span>
          )}

          <p className="m-0 font-heading !text-[clamp(0.6rem,0.6rem+0.75vw,1.1rem)]">
            Development and design by{" "}
            {CREDIT_LINKS.map((link, index) => (
                <span key={link.name}>
              <a
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                  className="underline underline-offset-[0.18em] transition hover:text-accent-pink"
              >
                {link.name}
              </a>
                  {index === 0 ? " & " : ""}
            </span>
            ))}
          </p>
        </div>
        {/*
        <div
            className="hidden min-w-0 items-center justify-center gap-[clamp(0.4rem,1.6vw,1.2rem)] md:flex"
            aria-hidden="true"
        >
          <Image
              src="/mascot1.png"
              alt=""
              width={210}
              height={270}
              className="float-soft h-auto w-[clamp(5.25rem,10vw,10rem)] object-contain drop-shadow-[0.18rem_0.22rem_0_var(--background)] [--float-duration:5.4s] [--float-x-end:0.18rem] [--float-y-end:-0.7rem] [--float-rotate-end:-5deg] [animation-delay:-1.6s] [transform-origin:50%_55%]"
          />
          <Image
              src="/mascot2.png"
              alt=""
              width={180}
              height={220}
              className="float-soft h-auto w-[clamp(4.25rem,8vw,8rem)] object-contain drop-shadow-[0.18rem_0.22rem_0_var(--background)] [--float-duration:7.1s] [--float-x-end:-0.1rem] [--float-y-end:-0.45rem] [--float-rotate-end:4deg] [animation-delay:-3.1s] [transform-origin:50%_55%]"
          />
        </div>
        */}
      </footer>
  );
}
