import { motion, useReducedMotion } from "framer-motion";

/* Hero — Titel + ein einzelnes, ruhiges dokumentarisches Foto (Petersdom),
   dezent an die Papierfarbe angeglichen. Kein 3D, kein Stock-Look.

   Bild: lizenziert (Wikimedia Commons, CC BY-SA 4.0), lokal eingebunden, mit
   sichtbarer Quellen-/Lizenzangabe in der Bildunterschrift und gesammelt im
   Abschnitt „Bildnachweis".                                                   */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-hairline">
      <div className="spread relative z-10 items-center gap-y-10 py-[clamp(3rem,7vw,6rem)]">
        {/* Randspalte */}
        <div className="rail">
          <span className="num">—</span>
          <span className="tag">Lese-Feature</span>
        </div>

        <div className="col-main grid items-center gap-x-12 gap-y-9 lg:grid-cols-[1.05fr_0.92fr]">
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

          {/* Ruhiges dokumentarisches Foto */}
          <motion.figure
            className="m-0"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-photo media-frame">
              <img
                src="/images/vatikan-facade.jpg"
                alt="Petersdom im Vatikan, Westfassade mit der großen Kuppel"
                width={1920}
                height={1272}
                className="w-full"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-ink-soft">
              Petersdom, Vatikan · Foto: Livioandronico2013 / Wikimedia&nbsp;Commons ·{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
                target="_blank"
                rel="noopener noreferrer license"
              >
                CC&nbsp;BY-SA&nbsp;4.0
              </a>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </header>
  );
}
