"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { StatsSection as StatsSectionData } from "@/sanity/types";
import styles from "./StatsSection.module.css";

type StatsSectionProps = {
  data: StatsSectionData | null;
};

const MAX_STAT_VALUE = 15;
const THEME_STORAGE_KEY = "nasa-hunch-theme";

export function StatsSection({ data }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [logoSpinKey, setLogoSpinKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLightMode(document.documentElement.classList.contains("light"));

    if (!sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  if (!data?.stats?.length) {
    return null;
  }

  const toggleLightMode = () => {
    const nextLightMode = !document.documentElement.classList.contains("light");

    document.documentElement.classList.toggle("light", nextLightMode);
    localStorage.setItem(THEME_STORAGE_KEY, nextLightMode ? "light" : "dark");
    setIsLightMode(nextLightMode);
    setLogoSpinKey((currentKey) => currentKey + 1);
  };

  const stats = data.stats.slice(0, 4);
  const mobileMaxValue = Math.max(...stats.map((stat) => stat.number), 1);

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section} ${
        isVisible ? styles.isVisible : ""
      }`}
    >
      <button
        type="button"
        className={styles.logoWrap}
        onClick={toggleLightMode}
        aria-pressed={isLightMode}
        aria-label="Bytt fargetema"
      >
        <Image
          key={logoSpinKey}
          src={isLightMode ? "/norstec-blue.png" : "/norstec-pink.png"}
          alt=""
          width={180}
          height={180}
          className={styles.logo}
        />
      </button>

      <div className={styles.stats}>
        {stats.map((stat, index) => {
          const width = Math.min(
            100,
            Math.max(8, (stat.number / MAX_STAT_VALUE) * 100),
          );
          const mobileWidth = Math.min(
            100,
            Math.max(8, (stat.number / mobileMaxValue) * 100),
          );

          return (
            <div
              key={stat._key}
              className={`${styles.stat} ${styles[`variant${index + 1}`]}`}
              style={
                {
                  "--stat-width": `${width}%`,
                  "--stat-mobile-width": `${mobileWidth}%`,
                } as CSSProperties
              }
            >
              <span className={styles.statText}>
                {stat.number} {stat.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
