"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Sponsors.module.css";

const LEFT_WORD = "NASA";
const RIGHT_WORD = "HUNCH";

export function Sponsors() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsLightMode(root.classList.contains("light"));
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`section ${styles.root}`}>
      <h2 className={styles.heading}>
        Takk til Sparebankstiftelsen DNB for etableringsstøtte i 2024.
      </h2>

      <div className={styles.stage} aria-label="Takk til NASA HUNCH og Sparebankstiftelsen DNB">
        <div className={`${styles.word} ${styles.leftWord}`} aria-hidden="true">
          {LEFT_WORD.split("").map((letter, index) => (
            <span key={`${letter}-${index}`} className={styles.letter}>
              {letter}
            </span>
          ))}
        </div>

        <Image
          src={isLightMode ? "/sbs-black.png" : "/sbs-white.png"}
          alt="Sparebankstiftelsen DNB"
          width={360}
          height={220}
          className={styles.logo}
        />

        <div className={`${styles.word} ${styles.rightWord}`} aria-hidden="true">
          {RIGHT_WORD.split("").map((letter, index) => (
            <span key={`${letter}-${index}`} className={styles.letter}>
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
