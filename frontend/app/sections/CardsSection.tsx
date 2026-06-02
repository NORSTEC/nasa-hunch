"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { portableTextToPlainText } from "@/sanity/utils/portableText";
import type { CardItem, CardsSection as CardsSectionData } from "@/sanity/types";

type CardsSectionProps = {
  data: CardsSectionData | null;
};

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
}: {
  card: CardItem;
  cardId: string;
  onFlipChange: (cardId: string, isFlipped: boolean) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const image = card.image;
  const imageUrl = image.asset?.url;
  const description = portableTextToPlainText(card.description);

  const toggleFlip = () => {
    const next = !isFlipped;

    setIsFlipped(next);
    onFlipChange(cardId, next);
  };

  return (
    <button
      type="button"
      className="group block w-[16rem] lg:w-[23rem] cursor-pointer overflow-hidden bg-transparent p-0 text-foreground [perspective:1200px] py-5 lg:py-15 px-1"
      onClick={toggleFlip}
      aria-pressed={isFlipped}
    >
      <span
        className={`relative block aspect-[3/5] lg:aspect-[2/3] w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <span className="absolute inset-0 z-10 block overflow-hidden bg-background [backface-visibility:hidden] [transform:rotateY(0deg)]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={image.alt}
              className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-heading text-page-small uppercase">
              Mangler bilde
            </span>
          )}
          <span className="spaced-dashed-border pointer-events-none !absolute inset-0 z-20 [--dash-color:var(--foreground)] [--dash-gap:10px] [--dash-length:10px] [--dash-width:2px]" />
        </span>

        <span className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-background py-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] px-2">
          <span
            className="relative z-30 block h-full max-h-full overflow-y-auto overscroll-contain whitespace-pre-line px-1 font-heading !text-[clamp(0.6rem,0.8rem+0.75vw,1.1rem)] leading-snug"
            onWheel={(event) => event.stopPropagation()}
          >
            {description}
          </span>
          <span className="spaced-dashed-border pointer-events-none !absolute inset-0 z-20 [--dash-color:var(--foreground)] [--dash-gap:10px] [--dash-length:10px] [--dash-width:2px]" />
        </span>
      </span>
    </button>
  );
}

export function CardsSection({ data }: CardsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flippedCardIdsRef = useRef<Set<string>>(new Set());
  const [enableEmbla, setEnableEmbla] = useState(false);
  const [flippedCardIds, setFlippedCardIds] = useState<Set<string>>(
    () => new Set(),
  );
  const cards = data?.cards ?? [];
  const hasFlippedCard = flippedCardIds.size > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      axis: "x",
      dragFree: true,
      skipSnaps: true,
      containScroll: false,
    },
    [
      AutoScroll({
        playOnInit: false,
        speed: 0.75,
        stopOnInteraction: false,
        direction: "forward",
      }),
      WheelGesturesPlugin({ forceWheelAxis: "x" }),
    ],
  );

  const slides = useMemo(() => {
    if (!enableEmbla) {
      return cards;
    }

    return cards.length < 5 ? [...cards, ...cards] : cards;
  }, [cards, enableEmbla]);

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
      const autoScroll = (emblaApi?.plugins() as AutoScrollPluginApi | undefined)
        ?.autoScroll;

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

  useEffect(() => {
    const next = new Set<string>();

    flippedCardIdsRef.current = next;
    setFlippedCardIds(next);
  }, [cards]);

  if (!cards.length) {
    return null;
  }

  return (
    <section className="py-15 lg:py-25 overflow-hidden">
      <div className="px-5 sm:px-10  flex items-center gap-5 uppercase">
        <h2 className="m-0 max-w-[24rem] whitespace-pre-line text-[clamp(1.5rem,2.7vw,var(--type-heading-lg))]!">
          {data?.title}
        </h2>
        <Image
          src="/mascot2.png"
          alt=""
          width={120}
          height={150}
          className="w-20 sm:w-30 object-contain"
        />
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={enableEmbla ? emblaRef : undefined}>
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
