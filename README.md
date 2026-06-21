# Magnifica humanitas — KI und die Würde des Menschen

Ein einseitiges, scrollbares Lese-Feature für den **Religionsunterricht (Klasse 10)**
zur Enzyklika *„Magnifica humanitas"* von Papst Leo XIV. (25. Mai 2026) und dem
begleitenden Podcast *„Mensch bleiben"*.

Das ruhige, redaktionelle (print-inspirierte) Design bleibt erhalten — warmes
Papierweiß, Serifen-Überschriften (Fraunces), große Pull-Quotes, römische
Abschnittsnummern in der Akzentfarbe. Hinzugekommen sind ein **ruhiges
Foto-Hero (Petersdom)**, dezente **Scroll-Einblendungen**, eine **thematische
Galerie** und vollständige **rechtliche Angaben** (Impressum, Datenschutz,
Bildnachweis).

---

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (eigene Tokens für die editoriale Farbwelt) + **shadcn-Struktur**
  (`src/components/ui`, `src/lib/utils.ts`, `components.json`)
- **framer-motion** (dezente Bewegung, respektiert `prefers-reduced-motion`)
- **lucide-react** (Icons)
- Schriften **und Bilder selbst gehostet** (`public/`), **keine** externen Server
  (kein Google-Fonts-CDN, keine eingebetteten Drittanbieter) → DSGVO-freundlich

### Projektstruktur

```
.
├── index.html                  # Vite-Einstieg (+ Font-Preload)
├── public/
│   ├── fonts/                  # selbst gehostete Schriften (woff2)
│   └── images/                 # lizenzierte Bilder (Wikimedia Commons), lokal
├── src/
│   ├── main.tsx                # React-Einstieg
│   ├── App.tsx                 # gesamte Seite: Abschnitte I–X + Galerie + Recht
│   ├── index.css               # Design-System (Tokens, @font-face, Bausteine)
│   ├── lib/utils.ts            # cn()-Helfer (shadcn)
│   └── components/
│       ├── Hero.tsx            # Hero: Titel + ruhiges Petersdom-Foto
│       ├── Section.tsx         # Raster-Baustein (Randnummer + Lesespalte)
│       ├── Reveal.tsx          # framer-motion Scroll-Einblendung
│       ├── EditorialArt.tsx    # eigene CC0-Strichgrafiken
│       └── ui/
│           ├── card.tsx                       # shadcn Card
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

## Hero-Bild

Der Hero zeigt ein **ruhiges, dokumentarisches Foto** des Petersdoms neben dem
Titel — dezent an die Papierfarbe angeglichen (entsättigt + sehr leise
Akzent-Lasur, CSS-Klasse `.hero-photo` in `index.css`). Das Bild ist lizenziert,
lokal eingebunden und mit sichtbarer Quellen-/Lizenzangabe versehen.

**Foto austauschen:** Datei nach `public/images/` legen und in
[`src/components/Hero.tsx`](src/components/Hero.tsx) `src`, `alt`, `width/height`
sowie die Bildunterschrift (Urheber, Quelle, Lizenz) anpassen. Den Eintrag im
Abschnitt **Bildnachweis** (`App.tsx`) mitführen.

> Frühere 3D-Varianten (model-viewer / Spline) wurden entfernt, da die Seite nun
> bewusst nur ein einzelnes ruhiges Foto im Hero nutzt.

---

## Bilder & Lizenzen  ·  rechtlich sauber

Alle Medien sind **lokal eingebunden** (keine Hotlinks) und haben eine **klare
Lizenz**. Sichtbare Nachweise stehen als Bildunterschrift **und** gesammelt im
Abschnitt **„Bildnachweis"** (in `App.tsx`, `id="bildnachweis"`). Aktuell verwendet:

| Datei | Motiv | Quelle / Urheber | Lizenz |
| --- | --- | --- | --- |
| `images/vatikan-facade.jpg` | Petersdom, Westfassade (Hero-Foto) | Livioandronico2013 / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:St_Peter_facade.jpg) | CC BY-SA 4.0 |
| `images/vatikan-night.jpg` | Petersdom bei Nacht (Galerie) | Livioandronico2013 / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Saint_Peter%27s_Basilica_at_night_HD.jpg) | CC BY-SA 4.0 |
| `images/erschaffung-adams.jpg` | Michelangelo, *Die Erschaffung Adams* (Galerie + Würde) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg) | gemeinfrei (PD) |
| `images/justitia.jpg` | Justitia, Gerechtigkeitsbrunnen Bern (Galerie „Objektivität") | TheBernFiles / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Berner_Iustitia.jpg) | gemeinfrei (PD) |
| `images/haende-alter.jpg` | Hände zweier Generationen (Begrenztheit) | Jclk8888 / Pixabay, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hands-699486.jpg) | CC0 |

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
keine Tracker, keine Analytics, keine Cookies. **Schriften und Bilder sind selbst
gehostet** — es bestehen **keine** Verbindungen zu Drittanbietern.

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
- Bilder werden mit `loading="lazy"` nachgeladen; das Hero-Foto trägt
  `width`/`height` gegen Layout-Sprünge.
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
