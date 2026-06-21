import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/* Section — der wiederkehrende redaktionelle Baustein:
   schmale Randspalte (römische Nummer + Kurzlabel) + breite Lesespalte.
   Die Randbeschriftung nutzt die Akzentfarbe (Abschnittsnummer).            */
interface SectionProps {
  /** Römische Abschnittsnummer, z. B. "II". */
  num: string;
  /** Kurzlabel in der Randspalte. */
  tag: string;
  /** Anker-/Überschrift-id für aria-labelledby & Sprungmarken. */
  id: string;
  children: ReactNode;
  /** Zusätzliche Klassen am <section> (z. B. "podcast" für abgesetzten Grund). */
  className?: string;
}

export function Section({ num, tag, id, children, className = "" }: SectionProps) {
  return (
    <section className={`section spread ${className}`} aria-labelledby={`${id}-title`}>
      <Reveal className="rail">
        <span className="num">{num}</span>
        <span className="tag">{tag}</span>
      </Reveal>
      <div className="col-main">{children}</div>
    </section>
  );
}
