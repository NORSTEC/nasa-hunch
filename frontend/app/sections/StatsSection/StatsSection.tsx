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

export function StatsSection({ data }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section} ${
        isVisible ? styles.isVisible : ""
      }`}
    >
      <div className={styles.logoWrap}>
        <Image
          src="/logo-pink.png"
          alt=""
          width={180}
          height={180}
          className={styles.logo}
        />
      </div>

      <div className={styles.stats}>
        {data.stats.slice(0, 4).map((stat, index) => {
          const width = Math.min(
            100,
            Math.max(8, (stat.number / MAX_STAT_VALUE) * 100),
          );

          return (
            <div
              key={stat._key}
              className={`${styles.stat} ${styles[`variant${index + 1}`]}`}
              style={{ "--stat-width": `${width}%` } as CSSProperties}
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
