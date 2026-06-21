import { Suspense, lazy } from "react";

/* SplineScene — lädt eine interaktive 3D-Szene von Spline.
   Die eigentliche Spline-Bibliothek wird per lazy()/Suspense NACHgeladen
   (Code-Splitting), damit die Seite schnell startet und das schwere 3D-Bundle
   nur bei Bedarf geladen wird.

   ┌─ RECHT / LIZENZ (sehr wichtig) ────────────────────────────────────────┐
   │ Verwende KEINE fremde Spline-Szene oder fremdes 3D-Modell ohne Lizenz.   │
   │ Erlaubt ist nur:                                                         │
   │  • eine SELBST in Spline erstellte Szene, ODER                           │
   │  • ein ausdrücklich FREI lizenziertes Modell (z. B. CC0 / CC-BY mit      │
   │    Urhebernennung — Nennung dann im Abschnitt „Bildnachweis").           │
   │ Die Szene-URL wird im Hero gesetzt (siehe Hero.tsx, dort der TODO).      │
   │ DSGVO: Wird die Szene von prod.spline.design geladen, ist das eine       │
   │ Verbindung zu einem Drittanbieter — in der Datenschutzerklärung genannt. │
   │ Sauberer: .splinecode/Assets lokal hosten und von dort laden.            │
   └─────────────────────────────────────────────────────────────────────────┘ */
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  /** URL der Spline-Szene (.splinecode). */
  scene: string;
  className?: string;
  /** Wird angezeigt, solange die Szene lädt. */
  fallback?: React.ReactNode;
  onLoad?: () => void;
}

export function SplineScene({ scene, className, fallback, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        fallback ?? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm tracking-wide text-ink-soft">
              3D-Szene wird geladen …
            </span>
          </div>
        )
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}
