"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./ContactForm.module.css";

type ContactMode = "school" | "partner";

const MODES: Record<
  ContactMode,
  {
    label: string;
    organizationPlaceholder: string;
    className: string;
    toggleClassName: string;
  }
> = {
  school: {
    label: "Skoler",
    organizationPlaceholder: "Skole",
    className: styles.school,
    toggleClassName: styles.schoolToggle,
  },
  partner: {
    label: "Partner",
    organizationPlaceholder: "Bedrift",
    className: styles.partner,
    toggleClassName: styles.partnerToggle,
  },
};

export function ContactForm() {
  const [mode, setMode] = useState<ContactMode>("school");
  const [mascotOffset, setMascotOffset] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeMode = MODES[mode];

  useEffect(() => {
    let frame = 0;

    const updateOffset = () => {
      if (!rootRef.current) {
        return;
      }

      const rect = rootRef.current.getBoundingClientRect();
      const travelDistance = window.innerHeight + rect.height;
      const rawProgress = (window.innerHeight - rect.top) / travelDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));
      const offset = (0.5 - progress) * 320;

      setMascotOffset(Math.max(-160, Math.min(160, offset)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      id="contact"
      className={`section py-20 ${activeMode.className}`}
      ref={rootRef}
    >
      <div className={styles.toggleGroup} aria-label="Velg kontakttype">
        {(Object.keys(MODES) as ContactMode[]).map((option) => {
          const isActive = option === mode;

          return (
            <button
              key={option}
              type="button"
              className={`${styles.toggle} ${MODES[option].toggleClassName} ${
                isActive ? styles.activeToggle : ""
              }`}
              onClick={() => setMode(option)}
            >
              {MODES[option].label}
            </button>
          );
        })}
      </div>

      <form className={styles.panel}>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className="sr-only">Navn</span>
            <input type="text" name="name" placeholder="Navn" />
          </label>

          <label className={styles.field}>
            <span className="sr-only">Epost</span>
            <input type="email" name="email" placeholder="Epost" />
          </label>

          <label className={styles.field}>
            <span className="sr-only">{activeMode.organizationPlaceholder}</span>
            <input
              type="text"
              name="organization"
              placeholder={activeMode.organizationPlaceholder}
            />
          </label>

          <label className={`${styles.field} ${styles.messageField}`}>
            <span className="sr-only">Melding</span>
            <textarea name="message" placeholder="Melding" rows={6} />
          </label>

          <button className={styles.submitButton} type="submit">
            SEND MELDING
          </button>
        </div>

        <div
          className={styles.mascotWrap}
          style={{ "--mascot-offset": `${mascotOffset}px` } as CSSProperties}
          aria-hidden="true"
        >
          <Image
            src="/mascot1.png"
            alt=""
            width={320}
            height={420}
            className={styles.mascot}
          />
        </div>
      </form>
    </div>
  );
}
