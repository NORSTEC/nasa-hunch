"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdFlip } from "react-icons/md";
import { portableTextToPlainText } from "@/sanity/utils/portableText";
import type {
  CardItem,
  CardsSection as CardsSectionData,
} from "@/sanity/types";

type CardsSectionProps = {
  data: CardsSectionData | null;
};

const THEME_STORAGE_KEY = "nasa-hunch-theme";

type AutoScrollPluginApi = {
  autoScroll?: {
    play?: () => void;
    stop?: () => void;
    isPlaying?: () => boolean;
  };
};

function FlipCard({
  card,
  cardId,
  onFlipChange,
  autoFlip,
}: {
  card: CardItem;
  cardId: string;
  onFlipChange: (cardId: string, isFlipped: boolean) => void;
  autoFlip: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const image = card.image;
  const imageUrl = image.asset?.url;
  const description = portableTextToPlainText(card.description);
  const descriptionRef = useRef<HTMLSpanElement>(null);
  const hasAutoFlippedRef = useRef(false); //for teasern

  const toggleFlip = () => {
    const next = !isFlipped;

    setIsFlipped(next);
    onFlipChange(cardId, next);
  };
  //Dette er teaser
  useEffect(() => {
    if (!autoFlip || hasAutoFlippedRef.current) {
      return;
    }

    const element = cardRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAutoFlippedRef.current) {
          return;
        }

        hasAutoFlippedRef.current = true;

        setIsFlipped(true);

        setTimeout(() => {
          setIsFlipped(false);
        }, 2000);

        observer.disconnect();
      },
      {
        threshold: 0.75,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [autoFlip]);
  //til hit

  useEffect(() => {
    const descriptionElement = descriptionRef.current;

    if (!descriptionElement) {
      return;
    }

    const stopCarouselGesture = (event: Event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    descriptionElement.addEventListener("wheel", stopCarouselGesture, {
      capture: true,
    });
    descriptionElement.addEventListener("pointerdown", stopCarouselGesture, {
      capture: true,
    });
    descriptionElement.addEventListener("touchstart", stopCarouselGesture, {
      capture: true,
    });
    descriptionElement.addEventListener("touchmove", stopCarouselGesture, {
      capture: true,
    });

    return () => {
      descriptionElement.removeEventListener("wheel", stopCarouselGesture, {
        capture: true,
      });
      descriptionElement.removeEventListener(
        "pointerdown",
        stopCarouselGesture,
        {
          capture: true,
        },
      );
      descriptionElement.removeEventListener(
        "touchstart",
        stopCarouselGesture,
        {
          capture: true,
        },
      );
      descriptionElement.removeEventListener("touchmove", stopCarouselGesture, {
        capture: true,
      });
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group block w-[16rem] lg:w-[23rem] overflow-hidden bg-transparent p-0 text-foreground [perspective:1200px] py-5 lg:py-15 px-1"
    >
      <span
        className={`relative block aspect-[3/5] lg:aspect-[2/3] w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <span
          className={`absolute inset-0 block overflow-hidden bg-background p-0 text-foreground [backface-visibility:hidden] [transform:rotateY(0deg)] ${
            isFlipped ? "pointer-events-none z-0" : "z-10"
          }`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={image.alt}
              className="block h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-heading text-page-small uppercase">
              Mangler bilde
            </span>
          )}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <button
            type="button"
            className="dotted-button dotted-button-pink dotted-icon-button absolute bottom-4 left-1/2 z-30 -translate-x-1/2 cursor-pointer"
            onClick={toggleFlip}
            aria-label="Snu kortet"
            aria-pressed={isFlipped}
          >
            <MdFlip aria-hidden="true" />
          </button>
          <span className="spaced-dashed-border pointer-events-none !absolute inset-0 z-20 [--dash-color:var(--foreground)] [--dash-gap:10px] [--dash-length:10px] [--dash-width:2px]" />
        </span>

        <span
          className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-background py-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] px-2 ${
            isFlipped ? "z-10" : "pointer-events-none z-0"
          }`}
        >
          <span
            ref={descriptionRef}
            className="relative z-30 block min-h-0 flex-1 cursor-auto overflow-y-auto overscroll-contain whitespace-pre-line px-1 font-heading !text-[clamp(0.6rem,0.8rem+0.75vw,1.1rem)] leading-snug [touch-action:pan-y] [-webkit-overflow-scrolling:touch]"
            tabIndex={isFlipped ? 0 : -1}
            onWheelCapture={(event) => event.stopPropagation()}
            onPointerDownCapture={(event) => event.stopPropagation()}
            onTouchStartCapture={(event) => event.stopPropagation()}
            onTouchMoveCapture={(event) => event.stopPropagation()}
          >
            {description}
          </span>
          <button
            type="button"
            className="dotted-button dotted-button-pink dotted-icon-button relative z-30 mt-3 shrink-0 cursor-pointer"
            onClick={toggleFlip}
            aria-label="Snu kortet tilbake"
            aria-pressed={isFlipped}
          >
            <MdFlip aria-hidden="true" />
          </button>
          <span className="spaced-dashed-border pointer-events-none !absolute inset-0 z-20 [--dash-color:var(--foreground)] [--dash-gap:10px] [--dash-length:10px] [--dash-width:2px]" />
        </span>
      </span>
    </div>
  );
}

export function CardsSection({ data }: CardsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flippedCardIdsRef = useRef<Set<string>>(new Set());
  const [enableEmbla, setEnableEmbla] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [logoSpinKey, setLogoSpinKey] = useState(0);
  const [flippedCardIds, setFlippedCardIds] = useState<Set<string>>(
    () => new Set(),
  );
  const cards = useMemo(() => data?.cards ?? [], [data]);
  const hasFlippedCard = flippedCardIds.size > 0;
  const emblaPlugins = useMemo(
    () => [
      AutoScroll({
        playOnInit: false,
        speed: 0.75,
        stopOnInteraction: false,
        direction: "forward",
      }),
      WheelGesturesPlugin({ forceWheelAxis: "x" }),
    ],
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      axis: "x",
      dragFree: true,
      skipSnaps: true,
      containScroll: false,
    },
    emblaPlugins,
  );

  const slides = useMemo(() => {
    if (!enableEmbla) {
      return cards;
    }

    return cards.length < 5 ? [...cards, ...cards] : cards;
  }, [cards, enableEmbla]);

  const toggleLightMode = () => {
    const nextLightMode = !document.documentElement.classList.contains("light");

    document.documentElement.classList.toggle("light", nextLightMode);
    localStorage.setItem(THEME_STORAGE_KEY, nextLightMode ? "light" : "dark");
    setIsLightMode(nextLightMode);
    setLogoSpinKey((currentKey) => currentKey + 1);
  };

  const handleFlipChange = (cardId: string, isFlipped: boolean) => {
    const next = new Set(flippedCardIdsRef.current);
    const autoScroll = (emblaApi?.plugins() as AutoScrollPluginApi | undefined)
      ?.autoScroll;

    if (isFlipped) {
      next.add(cardId);
      autoScroll?.stop?.();
    } else {
      next.delete(cardId);
    }

    flippedCardIdsRef.current = next;
    setFlippedCardIds(next);

    if (!next.size && enableEmbla) {
      requestAnimationFrame(() => autoScroll?.play?.());
    }
  };

  useEffect(() => {
    const check = () => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const totalWidth = Array.from(container.children).reduce(
        (acc, child) => acc + (child as HTMLElement).offsetWidth,
        0,
      );

      setEnableEmbla(totalWidth > container.offsetWidth);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [cards.length]);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsLightMode(root.classList.contains("light"));
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const autoScroll = (emblaApi?.plugins() as AutoScrollPluginApi | undefined)
      ?.autoScroll;

    if (!autoScroll) {
      return;
    }

    if (hasFlippedCard) {
      autoScroll.stop?.();
    } else if (enableEmbla) {
      requestAnimationFrame(() => autoScroll.play?.());
    }
  }, [emblaApi, enableEmbla, hasFlippedCard]);

  useEffect(() => {
    if (!hasFlippedCard) {
      return;
    }

    let animationFrame = 0;
    const keepAutoScrollStopped = () => {
      const autoScroll = (
        emblaApi?.plugins() as AutoScrollPluginApi | undefined
      )?.autoScroll;

      if (autoScroll?.isPlaying?.()) {
        autoScroll.stop?.();
      } else {
        autoScroll?.stop?.();
      }

      animationFrame = requestAnimationFrame(keepAutoScrollStopped);
    };

    keepAutoScrollStopped();

    return () => cancelAnimationFrame(animationFrame);
  }, [emblaApi, hasFlippedCard]);

  if (!cards.length) {
    return null;
  }

  return (
    <section className="py-15 lg:py-25 overflow-hidden">
      <div className="flex items-stretch gap-5 px-5 uppercase sm:px-10">
        <h2 className="m-0 whitespace-pre-line text-[clamp(1.5rem,2.7vw,var(--type-heading-lg))]!">
          {data?.title}
        </h2>
        <button
          type="button"
          className="theme-logo-button"
          onClick={toggleLightMode}
          aria-pressed={isLightMode}
          aria-label="Bytt fargetema"
        >
          <span key={logoSpinKey} className="theme-logo-stack">
            <Image
              src="/norstec-blue.png"
              alt=""
              width={90}
              height={90}
              priority
              className={`theme-logo-image ${
                isLightMode ? "" : "theme-logo-image-visible"
              }`}
            />
            <Image
              src="/norstec-pink.png"
              alt=""
              width={90}
              height={90}
              priority
              className={`theme-logo-image ${
                isLightMode ? "theme-logo-image-visible" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div className="embla">
        <div
          className="embla__viewport"
          ref={enableEmbla ? emblaRef : undefined}
        >
          <div
            className="embla__container"
            ref={!enableEmbla ? containerRef : null}
          >
            {slides.map((card, index) => {
              const cardId = `${card._key}-${index}`;

              return (
                <div
                  className="embla__slide min-w-[18rem] lg:min-w-[25rem]"
                  key={cardId}
                >
                  <FlipCard
                    card={card}
                    cardId={cardId}
                    onFlipChange={handleFlipChange}
                    autoFlip={index === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
