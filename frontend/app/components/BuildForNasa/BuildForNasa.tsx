import Image from "next/image";
import { RiArrowRightLongLine } from "react-icons/ri";
import styles from "./BuildForNasa.module.css";

const ARROWS = [0, 1, 2] as const;

export function BuildForNasa() {
  return (
    <div className="section">
      <div className={styles.root}>
        <Image
          src="/logo-blue.png"
          alt="Norstec"
          width={80}
          height={80}
          className={styles.logo}
        />

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
