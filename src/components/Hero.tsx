import { motion, useReducedMotion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { Model3D } from "@/components/Model3D";

/* Hero — Titel + interaktives 3D-Modell, im hellen, editorialen Stil.

   3D-MODELL
   • Standardweg: <model-viewer> mit dem EIGENEN CC0-Modell
     (public/models/basilika.glb, erzeugt von scripts/make-model.mjs).
     Lokal gehostet → keine Drittanbieter, DSGVO-sauber, rechtlich unbedenklich.
   • Bei prefers-reduced-motion wird statt des 3D-Modells ein statisches,
     lizenziertes Foto des Petersdoms gezeigt (Wikimedia Commons, CC BY-SA 4.0).

   ALTERNATIVE (Spline)
   • Wer stattdessen eine eigene/lizenzierte Spline-Szene nutzen möchte, findet
     die fertige Einbindung in src/components/ui/splite.tsx (siehe README).      */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-hairline">
      {/* sehr dezenter Akzent-Schein auf hellem Grund */}
      <Spotlight className="left-1/2 top-[-6rem] h-[34rem] w-[34rem]" opacity={0.14} />

      <div className="spread relative z-10 items-center gap-y-10 py-[clamp(3rem,7vw,6rem)]">
        {/* Randspalte */}
        <div className="rail">
          <span className="num">—</span>
          <span className="tag">Lese-Feature</span>
        </div>

        <div className="col-main grid items-center gap-x-10 gap-y-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Typografischer Block */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Enzyklika von Papst&nbsp;Leo&nbsp;XIV. · 25.&nbsp;Mai&nbsp;2026
            </p>
            <h1 className="mt-6 font-serif text-[clamp(2.9rem,1.4rem+8vw,6.5rem)] font-[380] leading-[0.94] tracking-[-0.035em] text-ink">
              Magnifica
              <span className="block font-[340] italic">humanitas</span>
            </h1>
            <p className="mt-5 max-w-[26rem] font-serif text-[clamp(1.3rem,1rem+1.4vw,1.9rem)] font-[360] italic leading-[1.2] text-ink-soft">
              KI und die Würde des Menschen
            </p>
            <p className="prose-p mt-8 max-w-[30rem]">
              Papst&nbsp;Leo&nbsp;XIV. veröffentlichte am 25.&nbsp;Mai&nbsp;2026 seine
              erste Enzyklika über die Bewahrung des Menschen im Zeitalter der
              <span className="key"> Künstlichen Intelligenz</span>.
            </p>
          </motion.div>

          {/* 3D-Modell bzw. statisches, lizenziertes Foto */}
          <figure className="m-0">
            <div className="media-frame relative h-[18rem] sm:h-[22rem] lg:h-[26rem]">
              {reduce ? (
                <img
                  src="/images/vatikan-facade.jpg"
                  alt="Petersdom im Vatikan, Westfassade mit Kuppel"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Model3D />
              )}
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-ink-soft">
              {reduce ? (
                <>
                  Petersdom, Vatikan · Foto: Livioandronico2013 / Wikimedia&nbsp;Commons ·{" "}
                  <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
                    target="_blank"
                    rel="noopener noreferrer license"
                  >
                    CC&nbsp;BY-SA&nbsp;4.0
                  </a>
                </>
              ) : (
                <>
                  Interaktiv: zum Drehen ziehen. Stilisierte Basilika · eigenes 3D-Modell ·
                  CC0 — siehe <a href="#bildnachweis">Bildnachweis</a>.
                </>
              )}
            </figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}
