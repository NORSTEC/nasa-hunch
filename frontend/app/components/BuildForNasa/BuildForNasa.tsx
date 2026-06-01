"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RiArrowRightLongLine } from "react-icons/ri";
import styles from "./BuildForNasa.module.css";

const ARROWS = [0, 1, 2] as const;
const THEME_STORAGE_KEY = "nasa-hunch-theme";

export function BuildForNasa() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [logoSpinKey, setLogoSpinKey] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsLightMode(root.classList.contains("light"));
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const toggleLightMode = () => {
    const nextLightMode = !document.documentElement.classList.contains("light");

    document.documentElement.classList.toggle("light", nextLightMode);
    localStorage.setItem(THEME_STORAGE_KEY, nextLightMode ? "light" : "dark");
    setIsLightMode(nextLightMode);
    setLogoSpinKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="section">
      <div className={styles.root}>
        <button
          type="button"
          className={styles.logoButton}
          onClick={toggleLightMode}
          aria-pressed={isLightMode}
          aria-label="Bytt fargetema"
        >
          <span key={logoSpinKey} className={styles.logoStack}>
            <Image
              src="/norstec-blue.png"
              alt=""
              width={80}
              height={80}
              priority
              className={`${styles.logo} ${
                isLightMode ? "" : styles.logoVisible
              }`}
            />
            <Image
              src="/norstec-pink.png"
              alt=""
              width={80}
              height={80}
              priority
              className={`${styles.logo} ${
                isLightMode ? styles.logoVisible : ""
              }`}
            />
          </span>
        </button>

        <p className={styles.text}>
          <span>Vi bygger for</span>
          <span className={styles.arrows} aria-hidden="true">
            {ARROWS.map((arrow) => (
              <RiArrowRightLongLine key={arrow} className={styles.arrow} />
            ))}
          </span>
          <span>NASA</span>
        </p>
      </div>
    </div>
  );
}
