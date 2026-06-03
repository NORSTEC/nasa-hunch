"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { RiArrowRightLongLine } from "react-icons/ri";
import { SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";
import type { HeroSection as HeroSectionData } from "@/sanity/types";
import { portableTextToPlainText } from "@/sanity/utils/portableText";

const SOCIAL_LINKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    className: "text-accent-blue",
    Icon: SlSocialLinkedin,
  },
  {
    key: "instagram",
    label: "Instagram",
    className: "text-accent-pink",
    Icon: FaInstagram,
  },
  {
    key: "facebook",
    label: "Facebook",
    className: "text-accent-blue",
    Icon: SlSocialFacebook,
  },
] as const;

const HERO_SLIDE_DURATION = 4500;

type HeroSectionProps = {
  data: HeroSectionData | null;
};

export function HeroSection({ data }: HeroSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const images = data?.images?.filter((image) => image.asset?.url) ?? [];
  const hasCarousel = images.length > 1;

  const showImage = (targetIndex: number) => {
    setActiveImageIndex(targetIndex);
    setProgressKey((currentKey) => currentKey + 1);
  };

  useEffect(() => {
    if (!hasCarousel) {
      return;
    }

    const timeout = window.setTimeout(() => {
      showImage((activeImageIndex + 1) % images.length);
    }, HERO_SLIDE_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeImageIndex, hasCarousel, images.length]);

  if (!data) {
    return null;
  }

  const description = portableTextToPlainText(data.description);
  return (
    <section className="section pt-0!">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch">
        <div className="w-full flex-none lg:max-w-[45rem]">
          <div className="relative aspect-square w-full overflow-hidden bg-background">
            {images.map((image, index) => (
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    index === activeImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  key={image._key ?? image.asset?.url ?? index}
                >
                  {image.asset?.url ? (
                    <Image
                      src={image.asset.url}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 33rem, 100vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
              ))}
          </div>

          {hasCarousel ? (
            <div className="mt-5 flex gap-4">
              {images.map((image, index) => {
                const isActive = index === activeImageIndex;

                return (
                  <button
                    type="button"
                    className="relative h-7 flex-1 cursor-pointer overflow-hidden rounded-full border-2 border-accent-pink bg-transparent p-0"
                    key={image._key ?? image.asset?.url ?? index}
                    onClick={() => showImage(index)}
                    aria-label={`Vis hero bilde ${index + 1}`}
                    aria-pressed={isActive}
                  >
                    {isActive ? (
                      <span
                        key={`${progressKey}-${activeImageIndex}-${index}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-accent-pink"
                        style={{
                          animation: `hero-progress-fill ${HERO_SLIDE_DURATION}ms linear forwards`,
                        }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-10 lg:w-[25rem]">
          <div className="spaced-dashed-border text-center p-5">
            <p className="uppercase leading-tight">NASA HUNCH</p>
            <p className="mt-1 flex items-center justify-center gap-2 uppercase leading-tight">
              HQ <RiArrowRightLongLine aria-hidden="true" /> OSLO, NORGE
            </p>
            <div className="flex items-center justify-center">
              <a
                href={`mailto:${data.contactBlock.email}`}
                className="mt-1 block transition hover:text-accent-pink w-fit"
              >
                {data.contactBlock.email}
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-10">
              {SOCIAL_LINKS.map(({ key, label, className, Icon }) => {
                const href = data.contactBlock.socials?.[key];

                if (!href) {
                  return null;
                }

                return (
                  <a
                    key={key}
                    href={href}
                    aria-label={label}
                    className={`${className} text-4xl! leading-none transition hover:scale-110 hover:text-foreground`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {description ? (
            <div className="spaced-dashed-border p-5 text-center lg:flex-1">
              <p>{description}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
