"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { StatsSection as StatsSectionData } from "@/sanity/types";
import styles from "./StatsSection.module.css";

type StatsSectionProps = {
  data: StatsSectionData | null;
};

export function StatsSection({ data }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedStatKey, setExpandedStatKey] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  if (!data?.stats?.length) {
    return null;
  }

  const stats = data.stats.slice(0, 4);
  const sortedStats = [...stats].sort(
    (firstStat, secondStat) => firstStat.number - secondStat.number,
  );
  const cardSizes = new Map<string, { desktop: string; mobile: string }>(
    sortedStats.map(
      (stat, index) =>
        [
          stat._key,
          {
            desktop: `${11 + index * 5}rem`,
            mobile: `${13 + index * 4}rem`,
          },
        ] as const,
    ),
  );

  const leftColumn = [sortedStats[0], sortedStats[3]].filter(Boolean);
  const rightColumn = [sortedStats[1], sortedStats[2]].filter(Boolean);
  const toggleStat = (statKey: string) => {
    setExpandedStatKey((currentKey) =>
      currentKey === statKey ? null : statKey,
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section} ${
        isVisible ? styles.isVisible : ""
      }`}
    >
      <div className={styles.stats}>
        <div className={styles.column}>
          {leftColumn.map((stat, index) => (
            <button
              type="button"
              key={stat._key}
              className={`${styles.stat} ${
                styles[`variant${index === 0 ? 1 : 3}`]
              } ${expandedStatKey === stat._key ? styles.isExpanded : ""}`}
              onClick={() => toggleStat(stat._key)}
              aria-expanded={expandedStatKey === stat._key}
              style={
                {
                  "--card-height": cardSizes.get(stat._key)?.desktop,
                  "--mobile-card-height": cardSizes.get(stat._key)?.mobile,
                } as CSSProperties
              }
            >
              <span className={styles.number}>{stat.number}</span>
              <span className={styles.content}>
                <span className={styles.statText}>{stat.text}</span>
                {stat.detail ? (
                  <>
                    <span className={styles.detailReserve} aria-hidden="true">
                      {stat.detail}
                    </span>
                    <span className={styles.detail}>{stat.detail}</span>
                  </>
                ) : null}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.column}>
          {rightColumn.map((stat, index) => (
            <button
              type="button"
              key={stat._key}
              className={`${styles.stat} ${
                styles[`variant${index === 0 ? 2 : 4}`]
              } ${expandedStatKey === stat._key ? styles.isExpanded : ""}`}
              onClick={() => toggleStat(stat._key)}
              aria-expanded={expandedStatKey === stat._key}
              style={
                {
                  "--card-height": cardSizes.get(stat._key)?.desktop,
                  "--mobile-card-height": cardSizes.get(stat._key)?.mobile,
                } as CSSProperties
              }
            >
              <span className={styles.number}>{stat.number}</span>
              <span className={styles.content}>
                <span className={styles.statText}>{stat.text}</span>
                {stat.detail ? (
                  <>
                    <span className={styles.detailReserve} aria-hidden="true">
                      {stat.detail}
                    </span>
                    <span className={styles.detail}>{stat.detail}</span>
                  </>
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
