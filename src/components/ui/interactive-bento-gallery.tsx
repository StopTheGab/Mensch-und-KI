import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { EditorialArt } from "@/components/EditorialArt";
import { cn } from "@/lib/utils";

/* InteractiveBentoGallery — eine ruhige, thematische Galerie.
   Bewusst zurückhaltend gehalten (kein verspieltes Drag-Demo), damit sie zum
   editorialen Stil passt: ein Bento-Raster aus Strichgrafiken, das sich per
   Klick/Tastatur in einer barrierefreien Lightbox vergrößern lässt.

   MEDIEN/RECHT: Hier werden ausschließlich EIGENE Grafiken (EditorialArt, CC0)
   verwendet. Sämtliche Demo-Assets der Vorlage (Unsplash-/Pixabay-Links) sind
   entfernt. Wer echte LIZENZIERTE Fotos einsetzt, ergänzt pro Eintrag Quelle &
   Lizenz und trägt sie zusätzlich in den „Bildnachweis"-Abschnitt ein.        */

export interface BentoItem {
  id: number;
  title: string;
  desc: string;
  /** sichtbare Quellen-/Lizenzangabe (z. B. „Eigene Grafik · CC0"). */
  credit: string;
  /** Entweder eine lizenzierte Bilddatei … */
  img?: string;
  alt?: string;
  /** object-position-Klasse für den Bildausschnitt (z. B. "object-[50%_45%]"). */
  focus?: string;
  /** … oder eine eigene CC0-Strichgrafik. */
  motif?: "dome" | "hands" | "grid" | "horizon";
  /** Bento-Spalten-/Zeilen-Spannweite (Tailwind-Klassen). */
  span?: string;
}

export function InteractiveBentoGallery({
  items,
  heading,
  subheading,
}: {
  items: BentoItem[];
  heading: string;
  subheading?: string;
}) {
  const [active, setActive] = useState<BentoItem | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Tastaturbedienung der Lightbox: Escape schließt, Fokus auf „Schließen".
  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div>
      <h3 className="font-serif text-[1.6rem] leading-tight tracking-[-0.01em] text-ink">
        {heading}
      </h3>
      {subheading && (
        <p className="prose-p mt-2 text-ink-soft">{subheading}</p>
      )}

      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            layoutId={reduce ? undefined : `bento-${item.id}`}
            onClick={() => setActive(item)}
            className={cn(
              "group relative overflow-hidden border border-hairline text-left",
              "transition-colors hover:border-accent focus-visible:border-accent",
              item.span
            )}
            aria-label={`${item.title} vergrößern`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-deep">
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.alt ?? item.title}
                  loading="lazy"
                  className={cn("h-full w-full object-cover", item.focus)}
                  style={{ filter: "saturate(0.95) contrast(1.015)" }}
                />
              ) : (
                <EditorialArt motif={item.motif ?? "grid"} title={item.title} className="h-full" />
              )}
            </div>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-paper/85 px-3 py-2 font-serif text-sm text-ink">
              {item.title}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-ink/55" />
            <motion.figure
              layoutId={reduce ? undefined : `bento-${active.id}`}
              className="relative z-10 m-0 max-w-2xl border border-hairline bg-paper"
              onClick={(e) => e.stopPropagation()}
            >
              {active.img ? (
                <img
                  src={active.img}
                  alt={active.alt ?? active.title}
                  className="block max-h-[70vh] w-full object-contain bg-paper-deep"
                />
              ) : (
                <EditorialArt motif={active.motif ?? "grid"} title={active.title} />
              )}
              <figcaption className="flex items-start justify-between gap-4 p-5">
                <span>
                  <span className="block font-serif text-xl text-ink">{active.title}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{active.desc}</span>
                  <span className="mt-2 block text-xs text-ink-soft">{active.credit}</span>
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActive(null)}
                  className="shrink-0 border border-hairline-strong p-2 text-ink transition-colors hover:border-accent hover:text-accent"
                  aria-label="Galerie schließen"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
