import { cn } from "@/lib/utils";

/* Spotlight — sehr dezenter Schein in der Akzentfarbe auf HELLEM Grund.
   Bewusst NICHT der grelle Demo-Effekt: nur ein weicher, ruhiger Lichtfleck,
   der den 3D-Hero leicht erdet. Reduced-Motion deaktiviert die Animation
   automatisch (siehe index.css / @media prefers-reduced-motion).            */
type SpotlightProps = {
  className?: string;
  /** Deckkraft des Scheins (0–1). Standard bewusst niedrig. */
  opacity?: number;
};

export function Spotlight({ className, opacity = 0.16 }: SpotlightProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-0 blur-3xl will-change-transform motion-safe:animate-[spotlight_8s_ease-in-out_infinite_alternate]",
        className
      )}
      style={{
        background:
          "radial-gradient(closest-side, var(--accent), transparent 70%)",
        opacity,
      }}
    />
  );
}
