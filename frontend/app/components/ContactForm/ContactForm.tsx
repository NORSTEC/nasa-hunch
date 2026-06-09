"use client";

import Image from "next/image";
import Script from "next/script";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

type ContactMode = "school" | "partner";
type SubmitStatus = "idle" | "loading" | "success" | "error";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_CONTACT_APPS_SCRIPT_URL;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ACTION = "contact_submit";

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string },
        ) => Promise<string>;
      };
    };
  }
}

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
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [mascotOffset, setMascotOffset] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeMode = MODES[mode];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("loading");

    try {
      if (!APPS_SCRIPT_URL || !RECAPTCHA_SITE_KEY) {
        throw new Error("Contact form environment variables are missing");
      }

      const form = event.currentTarget;
      const formData = new FormData(form);
      const recaptcha = window.grecaptcha?.enterprise;

      if (!recaptcha) {
        throw new Error("reCAPTCHA Enterprise did not load");
      }

      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        recaptcha.ready(async () => {
          try {
            resolve(
              await recaptcha.execute(RECAPTCHA_SITE_KEY, {
                action: RECAPTCHA_ACTION,
              }),
            );
          } catch (error) {
            reject(error);
          }
        });
      });

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          contactType: mode,
          name: formData.get("name"),
          email: formData.get("email"),
          organization: formData.get("organization"),
          message: formData.get("message"),
          recaptchaToken,
        }),
      });
      const result = (await response.json()) as { ok?: boolean };

      if (!response.ok || !result.ok) {
        throw new Error("Contact form submission was rejected");
      }

      form.reset();
      setSubmitStatus("success");
    } catch (error) {
      console.error("Contact form submission failed", error);
      setSubmitStatus("error");
    }
  };

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
      className={`section ${activeMode.className}`}
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

      {RECAPTCHA_SITE_KEY ? (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      ) : null}

      <form className={styles.panel} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className="sr-only">Navn</span>
            <input
              type="text"
              name="name"
              placeholder="Navn"
              autoComplete="name"
              maxLength={200}
              required
            />
          </label>

          <label className={styles.field}>
            <span className="sr-only">Epost</span>
            <input
              type="email"
              name="email"
              placeholder="Epost"
              autoComplete="email"
              maxLength={320}
              required
            />
          </label>

          <label className={styles.field}>
            <span className="sr-only">
              {activeMode.organizationPlaceholder}
            </span>
            <input
              type="text"
              name="organization"
              placeholder={activeMode.organizationPlaceholder}
              autoComplete="organization"
              maxLength={300}
              required
            />
          </label>

          <label className={`${styles.field} ${styles.messageField}`}>
            <span className="sr-only">Melding</span>
            <textarea
              name="message"
              placeholder="Melding"
              rows={6}
              maxLength={5000}
              required
            />
          </label>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={submitStatus === "loading"}
          >
            {submitStatus === "loading" ? "SENDER..." : "SEND MELDING"}
          </button>
          <p
            className={`${styles.status} ${
              submitStatus === "error" ? styles.errorStatus : ""
            }`}
            role="status"
            aria-live="polite"
          >
            {submitStatus === "success"
              ? "Takk! Meldingen er sendt."
              : submitStatus === "error"
                ? "Noe gikk galt. Prøv igjen senere."
                : ""}
          </p>
          <p className={styles.recaptchaNotice}>
            Dette nettstedet er beskyttet av reCAPTCHA. Googles{" "}
            <a href="https://policies.google.com/privacy">personvernregler</a>{" "}
            og <a href="https://policies.google.com/terms">vilkår</a> gjelder.
          </p>
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
