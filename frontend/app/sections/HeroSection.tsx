import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { RiArrowRightLongLine } from "react-icons/ri";
import { SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";
import type { HeroSection as HeroSectionData } from "@/sanity/types";

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

function toPlainText(blocks: HeroSectionData["description"] = []) {
  return blocks
    .map((block) => block.children?.map((child) => child.text).join("") ?? "")
    .filter(Boolean)
    .join("\n\n");
}

export function HeroSection({ data }: HeroSectionProps) {
  if (!data) {
    return null;
  }

  const heroImage = data.images?.[0];
  const description = toPlainText(data.description);

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
          <div className="min-h-80 w-full border border-dashed border-foreground/50" />
        )}

        <div className="flex flex-col">
          <div className="border-2 border-dashed border-foreground  text-center">
            <p className="text-lg uppercase leading-tight">NASA HUNCH</p>
            <p className="mt-1 flex items-center justify-center gap-2 text-lg uppercase leading-tight">
              HQ <RiArrowRightLongLine aria-hidden="true" /> OSLO, NORGE
            </p>
            <a
              href={`mailto:${data.contactBlock.email}`}
              className="mt-1 block text-lg transition hover:text-accent-pink"
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
            <div className="border-2 border-dashed border-foreground">
              <p className="mx-auto">
                {description}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
