import Image from "next/image";
import { RiArrowRightLongLine } from "react-icons/ri";
import styles from "./BuildForNasa.module.css";

const ARROWS = [0, 1, 2] as const;

export function BuildForNasa() {
  return (
    <div className="section py-20 flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-6 text-center font-heading text-page-heading-md uppercase sm:justify-start sm:gap-8">
        <Image
          src="/logo-blue.png"
          alt="Norstec"
          width={80}
          height={80}
          className="h-14 w-14 object-contain"
        />

        <p className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
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
