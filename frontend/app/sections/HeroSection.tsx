import Image from "next/image";
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

type HeroSectionProps = {
  data: HeroSectionData | null;
};

export function HeroSection({ data }: HeroSectionProps) {
  if (!data) {
    return null;
  }

  const heroImage = data.images?.[0];
  const description = portableTextToPlainText(data.description);

  return (
    <section className="">
      <div className="">
        {heroImage?.asset?.url ? (
          <Image
            src={heroImage.asset.url}
            alt={heroImage.alt}
            width={heroImage.asset.metadata?.dimensions?.width ?? 1200}
            height={heroImage.asset.metadata?.dimensions?.height ?? 900}
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full object-cover lg:h-[min(49vw,33rem)]"
          />
        ) : (
          <div className="min-h-80 w-full" />
        )}

        <div className="flex flex-col">
          <div className="spaced-dashed-border text-center">
            <p className="uppercase leading-tight">NASA HUNCH</p>
            <p className="mt-1 flex items-center justify-center gap-2 uppercase leading-tight">
              HQ <RiArrowRightLongLine aria-hidden="true" /> OSLO, NORGE
            </p>
            <a
              href={`mailto:${data.contactBlock.email}`}
              className="mt-1 block transition hover:text-accent-pink"
            >
              {data.contactBlock.email}
            </a>

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
                    className={`${className} text-4xl leading-none transition hover:scale-90 hover:text-foreground`}
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
            <div className="spaced-dashed-border">
              <p>{description}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
