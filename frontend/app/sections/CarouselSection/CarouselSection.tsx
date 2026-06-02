"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoPauseSharp, IoPlayBackSharp, IoPlaySharp } from "react-icons/io5";
import type { CarouselSection as CarouselSectionData } from "@/sanity/types";
import styles from "./CarouselSection.module.css";

type CarouselSectionProps = {
  data: CarouselSectionData | null;
};

type CarouselMode = "play" | "speed" | "pause";

const NORMAL_LOOP_SECONDS = 30;
const SPEED_LOOP_SECONDS = NORMAL_LOOP_SECONDS / 10;

export function CarouselSection({ data }: CarouselSectionProps) {
  const [mode, setMode] = useState<CarouselMode>("play");
  const modeRef = useRef(mode);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopDistanceRef = useRef(1);
  const images = useMemo(
    () => data?.images?.filter((image) => image.asset?.url) ?? [],
    [data],
  );

  const carouselImages = useMemo(() => [...images, ...images], [images]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track || !images.length) {
      return;
    }

    let animationFrame = 0;
    let previousTime = performance.now();

    const applyOffset = () => {
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    const measureLoop = () => {
      const duplicateStart = track.children[images.length] as
        | HTMLElement
        | undefined;
      loopDistanceRef.current =
        duplicateStart?.offsetLeft || track.scrollWidth / 2 || 1;
      offsetRef.current %= loopDistanceRef.current;
      applyOffset();
    };

    const tick = (time: number) => {
      const deltaSeconds = (time - previousTime) / 1000;
      previousTime = time;

      if (modeRef.current !== "pause") {
        const loopDistance = loopDistanceRef.current;
        const loopSeconds =
          modeRef.current === "speed"
            ? SPEED_LOOP_SECONDS
            : NORMAL_LOOP_SECONDS;

        offsetRef.current =
          (offsetRef.current + (loopDistance / loopSeconds) * deltaSeconds) %
          loopDistance;
        applyOffset();
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(measureLoop);

    measureLoop();
    resizeObserver.observe(track);
    Array.from(track.children).forEach((child) => resizeObserver.observe(child));
    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [images.length]);

  if (!images.length) {
    return null;
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.header}>
        <div className={styles.controls} aria-label="Karusellkontroller">
          <button
            type="button"
            className={`${styles.controlButton} ${
              mode === "play" ? styles.isActive : ""
            }`}
            onClick={() => setMode("play")}
            aria-label="Start karusell"
            aria-pressed={mode === "play"}
          >
            <IoPlaySharp aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.controlButton} ${styles.speedButton} ${
              mode === "speed" ? styles.isActive : ""
            }`}
            onClick={() => setMode("speed")}
            aria-label="Dobbel hastighet"
            aria-pressed={mode === "speed"}
          >
            <IoPlayBackSharp className={styles.speedIcon} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.controlButton} ${
              mode === "pause" ? styles.isActive : ""
            }`}
            onClick={() => setMode("pause")}
            aria-label="Pause karusell"
            aria-pressed={mode === "pause"}
          >
            <IoPauseSharp className={styles.pauseIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
        >
          {carouselImages.map((image, index) => (
            <figure
              key={`${image._key ?? image.asset?.url}-${index}`}
              className={styles.slide}
            >
              <Image
                src={image.asset?.url ?? ""}
                alt={image.alt}
                width={image.asset?.metadata?.dimensions?.width ?? 520}
                height={image.asset?.metadata?.dimensions?.height ?? 680}
                sizes="(max-width: 767px) 72vw, 28vw"
                placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={image.asset?.metadata?.lqip}
                className={styles.image}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
