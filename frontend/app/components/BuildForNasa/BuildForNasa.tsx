"use client";

import Image from "next/image";
import { RiArrowRightLongLine } from "react-icons/ri";
import styles from "./BuildForNasa.module.css";

const ARROWS = [0, 1, 2] as const;

export function BuildForNasa() {
  return (
    <div className="section">
      <div className={styles.root}>
        <div className={styles.text}>
          <h2>Vi bygger for</h2>
          <span className={styles.arrows} aria-hidden="true">
            {ARROWS.map((arrow) => (
              <RiArrowRightLongLine key={arrow} className={styles.arrow} />
            ))}
          </span>
          <h2>NASA</h2>
        </div>

        <Image
          src="/Mascot_happy.svg"
          alt=""
          width={500}
          height={500}
          priority
          className="float-soft h-auto w-48 object-contain drop-shadow-[0.18rem_0.22rem_0_var(--background)] [--float-duration:6.7s] [--float-x-end:0.14rem] [--float-y-end:-0.85rem] [--float-rotate-end:5deg] [animation-delay:-2.4s] [transform-origin:50%_55%]"
        />
      </div>
    </div>
  );
}
