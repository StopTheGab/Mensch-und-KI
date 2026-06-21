import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* Reveal — sehr dezente Scroll-Einblendung mit framer-motion.
   Respektiert prefers-reduced-motion: ist die Einstellung aktiv, wird NICHT
   animiert (kein Versatz, sofort sichtbar). Bewusst ruhig: kleiner Versatz,
   weiche Feder, nur einmalig beim Eintreten in den Sichtbereich.            */
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Verzögerung in Sekunden für gestaffelte Einblendungen. */
  delay?: number;
  as?: "div" | "section" | "li" | "figure";
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    // Ohne Bewegung: einfaches Element, sofort sichtbar.
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
