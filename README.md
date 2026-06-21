# Magnifica humanitas — KI und die Würde des Menschen

Ein einseitiges, scrollbares Lese-Feature für den **Religionsunterricht (Klasse 10)**
zur Enzyklika *„Magnifica humanitas"* von Papst Leo XIV. (25. Mai 2026) und dem
begleitenden Podcast *„Mensch bleiben"*.

Das ruhige, redaktionelle (print-inspirierte) Design bleibt erhalten — warmes
Papierweiß, Serifen-Überschriften (Fraunces), große Pull-Quotes, römische
Abschnittsnummern in der Akzentfarbe. Neu hinzugekommen sind ein **interaktiver
3D-Hero (Vatikan)**, dezente **Scroll-Einblendungen**, eine **thematische Galerie**
und vollständige **rechtliche Angaben** (Impressum, Datenschutz, Bildnachweis).

---

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (eigene Tokens für die editoriale Farbwelt) + **shadcn-Struktur**
  (`src/components/ui`, `src/lib/utils.ts`, `components.json`)
- **framer-motion** (dezente Bewegung, respektiert `prefers-reduced-motion`)
- **@google/model-viewer** — interaktives 3D-Modell, **lokal** gehostet (Standardweg)
- **@splinetool/react-spline** + **@splinetool/runtime** — Spline als optionale 3D-Alternative
- **lucide-react** (Icons)
- Schriften, 3D-Modell **und Bilder selbst gehostet** (`public/`), **keine** externen
  Server (kein Google-Fonts-CDN, kein 3D-Drittanbieter) → DSGVO-freundlich

### Projektstruktur

```
.
├── index.html                  # Vite-Einstieg (+ Font-Preload)
├── public/
│   ├── fonts/                  # selbst gehostete Schriften (woff2)
│   ├── images/                 # lizenzierte Bilder (Wikimedia Commons), lokal
│   └── models/basilika.glb     # eigenes CC0-3D-Modell
├── scripts/make-model.mjs      # erzeugt das CC0-3D-Modell (basilika.glb)
├── src/
│   ├── main.tsx                # React-Einstieg
│   ├── App.tsx                 # gesamte Seite: Abschnitte I–X + Galerie + Recht
│   ├── index.css               # Design-System (Tokens, @font-face, Bausteine)
│   ├── model-viewer.d.ts       # JSX-Typen für <model-viewer>
│   ├── lib/utils.ts            # cn()-Helfer (shadcn)
│   └── components/
│       ├── Hero.tsx            # Hero: 3D-Modell + lizenziertes Foto-Fallback
│       ├── Model3D.tsx         # <model-viewer> (lazy, lokal) — Standard-3D
│       ├── Section.tsx         # Raster-Baustein (Randnummer + Lesespalte)
│       ├── Reveal.tsx          # framer-motion Scroll-Einblendung
│       ├── EditorialArt.tsx    # eigene CC0-Strichgrafiken
│       └── ui/
│           ├── card.tsx                       # shadcn Card
│           ├── spotlight.tsx                   # dezenter Akzent-Schein
│           ├── splite.tsx                      # SplineScene (lazy) — Alternative
│           └── interactive-bento-gallery.tsx   # Galerie (Lightbox, Bild/Grafik)
├── tailwind.config.js · postcss.config.js · components.json
├── vite.config.ts · tsconfig*.json
└── vercel.json
```

---

## Lokal starten

Voraussetzung: **Node.js ≥ 18** (getestet mit v24).

```bash
npm install
npm run dev        # http://localhost:3000
```

Produktionsbuild und lokale Vorschau:

```bash
npm run build      # erzeugt dist/
npm run preview    # serviert dist/ auf http://localhost:3000
```

---

## 3D-Modell  ·  rechtlich sauber & DSGVO-konform

Die Seite zeigt im Hero ein **interaktives 3D-Modell** einer stilisierten Basilika
mit Kuppel. Es ist bereits **fertig eingebunden** und läuft sofort:

- Angezeigt mit **`<model-viewer>`** (Google, quelloffen), **lokal gebündelt** —
  keine Verbindung zu Drittanbietern.
- Das Modell **`public/models/basilika.glb`** ist ein **eigenes, prozedural
  erzeugtes CC0-Modell** (kein fremdes Urheberrecht). Erzeugt von
  [`scripts/make-model.mjs`](scripts/make-model.mjs) — neu bauen mit:
  ```bash
  node scripts/make-model.mjs
  ```
- Lädt **lazy** (eigener Chunk). Bei `prefers-reduced-motion: reduce` wird statt des
  3D-Modells ein statisches, lizenziertes Foto des Petersdoms gezeigt.

### Eigenes Modell verwenden

Eigene `.glb`-Datei nach `public/models/` legen und in
[`src/components/Model3D.tsx`](src/components/Model3D.tsx) `src="/models/…glb"`
anpassen. Stammt die Datei nicht von dir, nur **CC0/CC-BY-Modelle** verwenden (z. B.
von **Sketchfab**, **Smithsonian Open Access**) und bei **CC-BY** Urheber/Quelle/
Lizenz im Abschnitt **Bildnachweis** ergänzen. Datei stets **lokal** ablegen.

### Alternative: Spline

Wer lieber eine **Spline**-Szene möchte: Die Einbindung liegt fertig in
[`src/components/ui/splite.tsx`](src/components/ui/splite.tsx). In `Hero.tsx` `Model3D`
durch `SplineScene` ersetzen und eine **eigene oder frei lizenzierte** Szene-URL
setzen. **Achtung:** Spline lädt dann von `prod.spline.design` (Drittanbieter) —
das ist in der Datenschutzerklärung zu nennen (Textbaustein ist vorbereitet).

---

## Bilder & Lizenzen  ·  rechtlich sauber

Alle Medien sind **lokal eingebunden** (keine Hotlinks) und haben eine **klare
Lizenz**. Sichtbare Nachweise stehen als Bildunterschrift **und** gesammelt im
Abschnitt **„Bildnachweis"** (in `App.tsx`, `id="bildnachweis"`). Aktuell verwendet:

| Datei | Motiv | Quelle / Urheber | Lizenz |
| --- | --- | --- | --- |
| `images/vatikan-facade.jpg` | Petersdom, Westfassade (Hero-Foto / Fallback) | Livioandronico2013 / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:St_Peter_facade.jpg) | CC BY-SA 4.0 |
| `images/vatikan-night.jpg` | Petersdom bei Nacht (Galerie) | Livioandronico2013 / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Saint_Peter%27s_Basilica_at_night_HD.jpg) | CC BY-SA 4.0 |
| `images/erschaffung-adams.jpg` | Michelangelo, *Die Erschaffung Adams* (Galerie + Würde) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg) | gemeinfrei (PD) |
| `models/basilika.glb` | 3D-Modell (Hero) | eigenes Modell (`make-model.mjs`) | CC0 |
| Strichgrafiken | Galerie „Objektivität", Begrenztheit | eigene Illustrationen | CC0 |

Die Fotos wurden für das Web **skaliert** — das ist im Bildnachweis vermerkt, wie es
**CC BY-SA 4.0** verlangt (Urhebernennung, Lizenz-Link, Änderungshinweis;
abgeleitetes Material wiederum unter CC BY-SA 4.0).

**Bild austauschen/ergänzen:** Datei in `public/images/` ablegen, im JSX ein
`<figure className="figure">` mit `<img>` + `<figcaption>` (Urheber, Quelle-Link,
Lizenz) verwenden und den Eintrag im **Bildnachweis** ergänzen. Nur **Unsplash,
Pexels, Pixabay, Wikimedia Commons** (PD/CC) oder selbst erstellte Bilder — **keine**
beliebigen Bilder aus der Google-Suche.

**CC BY-SA 4.0 für *„Impulse zur Zeit"*** (Erzbistum Köln): Namensnennung,
Lizenz-Link und Share-Alike-Hinweis sind im Quellen-Abschnitt bereits umgesetzt.

---

## Impressum

Die Daten stehen im Abschnitt **Impressum** (`App.tsx`, `id="impressum"`) und sind
eingetragen:

- Name: **Gabriel Anter** *(vollständigen Namen ggf. ergänzen)*
- Adresse: Erwin-von-Witzleben-Straße 38, **40474 Düsseldorf**
- E-Mail: `Gabriel.anter123@outlook.com` (als `mailto:`-Link)

> **Hinweis:** Wird die Seite **nur im Unterricht** (nicht öffentlich im Internet)
> gezeigt, ist ein vollständiges Impressum rechtlich **nicht zwingend** nötig.

---

## Datenschutz

Eine kurze Datenschutzerklärung ist als Abschnitt enthalten (im Footer verlinkt):
keine Tracker, keine Analytics, keine Cookies. Schriften, **3D-Modell und Bilder
sind selbst gehostet** — es bestehen **keine** Verbindungen zu Drittanbietern.

Nur falls du auf die **Spline**-Variante umstellst, lädt die Seite von
`prod.spline.design` (Drittanbieter); ein entsprechender Textbaustein ist in der
Datenschutzerklärung bereits vorbereitet (derzeit als „nicht aktiv" gekennzeichnet).

---

## Akzentfarbe ändern

Die gesamte Farbwelt liegt zentral als CSS-Variablen am Anfang von
[`src/index.css`](src/index.css) (Abschnitt *„DESIGN-TOKENS"*):

```css
:root {
  --paper:       #F5F1E8;  /* Hintergrund (warmes Papierweiß) */
  --ink:         #1E1B17;  /* Fließtext (Tinten-Anthrazit)    */
  --accent:      #2F5D54;  /* Akzent: gedämpftes Petrol-Grün  */
  --accent-deep: #234A42;  /* dunklere Akzentvariante (Hover) */
}
```

`--accent` und `--accent-deep` ändern — z. B. auf gedecktes **Aubergine**:

```css
--accent:      #4A2C4D;
--accent-deep: #3A1F3C;
```

Tailwind nutzt dieselben Variablen (siehe `tailwind.config.js`), daher ändern sich
Abschnittsnummern, Initialen, Haarlinien-Akzente, Zitatzeichen, Links und der
3D-Spotlight automatisch mit. **Auf WCAG-AA-Kontrast achten** (Akzent auf Papier
≥ 4,5:1 — die mitgelieferten Werte erfüllen das).

---

## Auf Vercel deployen

Die Seite ist eine statische Vite-App und ohne Sonderkonfiguration deploybar.

**Variante A — Vercel CLI**

```bash
npm i -g vercel
vercel            # Framework wird als „Vite" erkannt; Build: vite build, Output: dist
vercel --prod
```

**Variante B — Weboberfläche**

1. Projekt in ein Git-Repo legen (GitHub/GitLab) und auf https://vercel.com/new importieren.
2. Framework Preset **„Vite"**, Build Command `npm run build`, Output Directory `dist`.
3. Deploy.

Die mitgelieferte `vercel.json` sorgt für sauberes Caching der selbst gehosteten
Schriften.

---

## Barrierefreiheit & Performance

- Semantisches HTML, Tastatur-Sprunglink, sichtbarer Fokus, `aria`-Labels,
  Lightbox per Tastatur bedienbar (Escape schließt).
- WCAG-AA-Kontraste; sinnvolle `alt`-/Grafik-Beschreibungen.
- `prefers-reduced-motion` wird überall respektiert (keine Bewegung, 3D wird durch
  ein statisches Bild ersetzt).
- 3D-Modell und Galerie werden **lazy** geladen; das schwere Spline-Bundle wird nur
  geladen, wenn eine Szene gesetzt ist.
- Mobile-first, responsiv.

---

## Quelle & Lizenz der Inhalte

Papst Leo XIV., Enzyklika *„Magnifica humanitas. Über die Bewahrung des Menschen im
Zeitalter der Künstlichen Intelligenz"*, 2026. Enzyklika-Zitate sind kurz gehalten und
mit Stellenangabe (MH …) versehen. Unterrichtsbezug zu *„Impulse zur Zeit"*,
Erzbistum Köln, lizenziert unter **CC BY-SA 4.0**; davon abgeleitete Inhalte stehen
unter derselben Lizenz.

**Schriften:** Fraunces & Hanken Grotesk — SIL Open Font License 1.1 (frei
einbettbar / selbst hostbar).
