/* EditorialArt — eigene, schlichte Strichgrafiken (Line-Art) in der Farbwelt
   der Seite. Sie dienen als RECHTLICH UNBEDENKLICHE Platzhalter:

   • Eigene Grafik (vom Seitenautor erstellt) → als Gemeinfrei/CC0 behandelbar.
     Dadurch kein fremdes Urheberrecht, keine Pflicht zur Drittnennung.
   • Sie fügen sich ruhig ins editoriale Design ein (kein Stockfoto-Look).

   Möchte man echte LIZENZIERTE Fotos verwenden (Unsplash/Pexels/Pixabay/
   Wikimedia Commons), ersetzt man das jeweilige <EditorialArt …/> durch ein
   <img>/<figure> und trägt die Quelle in den „Bildnachweis"-Abschnitt ein.
   Siehe README, Abschnitt „Bilder & Lizenzen".                              */

type Motif = "dome" | "hands" | "grid" | "horizon";

interface EditorialArtProps {
  motif: Motif;
  className?: string;
  /** Für Barrierefreiheit: Kurzbeschreibung der Grafik. */
  title: string;
}

export function EditorialArt({ motif, className, title }: EditorialArtProps) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 400 300"
      className={className}
      style={{ display: "block", width: "100%", height: "auto", background: "var(--paper-deep)" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="ea-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.10" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {motif === "dome" && (
        <g fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round">
          {/* Kuppel (Anlehnung an einen Petersdom-/Vatikan-Umriss) */}
          <rect x="0" y="0" width="400" height="300" fill="url(#ea-fade)" stroke="none" />
          <line x1="200" y1="40" x2="200" y2="58" />
          <circle cx="200" cy="34" r="6" />
          <path d="M150 150 Q200 70 250 150" />
          <path d="M150 150 Q200 96 250 150" opacity="0.5" />
          <path d="M138 150 q62 -8 124 0" />
          <rect x="150" y="150" width="100" height="70" />
          <line x1="170" y1="150" x2="170" y2="220" opacity="0.55" />
          <line x1="200" y1="150" x2="200" y2="220" opacity="0.55" />
          <line x1="230" y1="150" x2="230" y2="220" opacity="0.55" />
          <line x1="120" y1="230" x2="280" y2="230" />
          <path d="M120 230 l-30 40 M280 230 l30 40" opacity="0.5" />
        </g>
      )}

      {motif === "hands" && (
        <g fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round">
          {/* Mensch & Maschine: zwei einander zugewandte Linien, die sich beinahe berühren */}
          <rect x="0" y="0" width="400" height="300" fill="url(#ea-fade)" stroke="none" />
          <path d="M40 200 q70 -10 120 -2 q20 3 35 18" />
          <circle cx="196" cy="216" r="3.5" fill="var(--accent)" stroke="none" />
          <path d="M360 100 q-70 10 -120 2 q-20 -3 -35 -18" />
          <circle cx="204" cy="84" r="3.5" fill="var(--ink)" stroke="none" />
          {/* angedeutete „Finger" Mensch */}
          <path d="M150 198 l10 -14 M165 200 l12 -12 M178 205 l12 -8" opacity="0.7" />
          {/* angedeutetes Raster „Maschine" */}
          <path d="M250 102 l-10 14 M235 100 l-12 12 M222 95 l-12 8" opacity="0.7" />
          <line x1="200" y1="150" x2="200" y2="150" />
        </g>
      )}

      {motif === "grid" && (
        <g fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round">
          {/* Eindruck von Objektivität: ein Auge im Raster eines Algorithmus */}
          <rect x="0" y="0" width="400" height="300" fill="url(#ea-fade)" stroke="none" />
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={"v" + i} x1={70 + i * 43} y1="60" x2={70 + i * 43} y2="240" opacity="0.28" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={"h" + i} x1="70" y1={60 + i * 45} x2="328" y2={60 + i * 45} opacity="0.28" />
          ))}
          <path d="M120 150 q80 -55 160 0 q-80 55 -160 0" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="22" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="8" fill="var(--ink)" stroke="none" />
        </g>
      )}

      {motif === "horizon" && (
        <g fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round">
          {/* Würde / Begrenztheit: ruhiger Horizont, einzelne aufsteigende Linie */}
          <rect x="0" y="0" width="400" height="300" fill="url(#ea-fade)" stroke="none" />
          <line x1="40" y1="190" x2="360" y2="190" />
          <path d="M40 190 q120 -120 160 -120 q40 0 160 120" opacity="0.45" />
          <circle cx="200" cy="70" r="5" fill="var(--accent)" stroke="none" />
          <line x1="200" y1="190" x2="200" y2="120" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}
