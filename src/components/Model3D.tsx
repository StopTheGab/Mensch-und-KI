import { useEffect, useState, type CSSProperties } from "react";

/* Model3D — interaktives 3D-Modell über <model-viewer> (Google, quelloffen).

   • Das Web-Component wird per dynamischem import() NACHgeladen — Nutzer mit
     „Bewegung reduzieren" bekommen es gar nicht erst (siehe Hero.tsx).
   • Modell und Bibliothek werden LOKAL ausgeliefert (gebündelt bzw. aus
     /public) → keine Verbindung zu Drittanbietern, DSGVO-sauber.
   • Das gezeigte Modell (public/models/basilika.glb) ist ein EIGENES,
     prozedural erzeugtes CC0-Modell (siehe scripts/make-model.mjs).
   • Solange das Modell lädt, dient das lizenzierte Foto als Poster.            */
export function Model3D() {
  const [, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    // Web-Component erst beim Mounten registrieren (eigener Chunk).
    import("@google/model-viewer").then(() => active && setReady(true));
    return () => {
      active = false;
    };
  }, []);

  return (
    <model-viewer
      src="/models/basilika.glb"
      poster="/images/vatikan-facade.jpg"
      alt="Interaktives 3D-Modell einer stilisierten Basilika mit Kuppel — eigenes Modell, frei beweg- und drehbar"
      camera-controls
      auto-rotate
      auto-rotate-delay={400}
      rotation-per-second="16deg"
      interaction-prompt="none"
      shadow-intensity="0.9"
      shadow-softness="0.9"
      exposure="1.08"
      camera-orbit="30deg 74deg auto"
      min-camera-orbit="auto 45deg auto"
      max-camera-orbit="auto 90deg auto"
      loading="eager"
      style={
        {
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          // Poster-Hintergrund an die Papierfarbe angleichen
          "--poster-color": "transparent",
        } as CSSProperties
      }
    >
      {/* Fallback, falls das Web-Component nicht unterstützt wird */}
      <img
        slot="poster"
        src="/images/vatikan-facade.jpg"
        alt="Petersdom im Vatikan, Westfassade"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </model-viewer>
  );
}
