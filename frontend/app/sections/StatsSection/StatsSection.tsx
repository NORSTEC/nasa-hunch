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

    const stats = data.stats.slice(0, 4);

    const leftColumn = [stats[0], stats[2]].filter(Boolean);
    const rightColumn = [stats[1], stats[3]].filter(Boolean);

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
                        <div
                            key={stat._key}
                            className={`${styles.stat} ${
                                styles[`variant${index === 0 ? 1 : 3}`]
                            }`}
                            style={
                                {
                                    "--card-height": `${2 + stat.number * 1.5}rem`,
                                } as CSSProperties
                            }
                        >
                            <span className={styles.statText}>{stat.text}</span>

                            <span className={styles.number}>{stat.number}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.column}>
                    {rightColumn.map((stat, index) => (
                        <div
                            key={stat._key}
                            className={`${styles.stat} ${
                                styles[`variant${index === 0 ? 2 : 4}`]
                            }`}
                            style={
                                {
                                    "--card-height": `${2 + stat.number * 1.5}rem`,
                                } as CSSProperties
                            }
                        >
                            <span className={styles.statText}>{stat.text}</span>

                            <span className={styles.number}>{stat.number}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}