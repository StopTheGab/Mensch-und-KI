import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EditorialArt } from "@/components/EditorialArt";
import {
  InteractiveBentoGallery,
  type BentoItem,
} from "@/components/ui/interactive-bento-gallery";

/* =============================================================================
   App — die gesamte einseitige, scrollbare Seite.
   Reihenfolge: Hero (3D) · I–X redaktionelle Abschnitte · Galerie-Interlude ·
   Bildnachweis · Impressum · Datenschutz · Footer.
   ============================================================================= */

// Galerie-Inhalte: lizenzierte Medien (Wikimedia Commons) + eine eigene Grafik.
// Jede Quelle ist im Eintrag UND gesammelt im Abschnitt „Bildnachweis" genannt.
const galleryItems: BentoItem[] = [
  {
    id: 1,
    title: "Petersdom, Vatikan",
    desc: "Sitz des kirchlichen Lehramts — Ort, an dem die Enzyklika veröffentlicht wurde.",
    img: "/images/vatikan-night.jpg",
    alt: "Fassade des Petersdoms im Vatikan bei Nacht, beleuchtet",
    credit: "Foto: Livioandronico2013 / Wikimedia Commons · CC BY-SA 4.0",
  },
  {
    id: 2,
    title: "Mensch & Gott",
    desc: "Abbild Gottes, auf Beziehung angelegt — die beinahe berührenden Hände.",
    img: "/images/erschaffung-adams.jpg",
    alt: "Ausschnitt aus Michelangelos Fresko Die Erschaffung Adams: die sich beinahe berührenden Hände von Gott und Adam",
    focus: "object-[50%_42%]",
    credit: "Michelangelo, Erschaffung Adams (um 1511) · gemeinfrei (Public Domain)",
  },
  {
    id: 3,
    title: "Der Schein von Objektivität",
    desc: "KI wirkt neutral und unparteiisch wie eine Justitia — und spiegelt doch das Wertesystem ihrer Entwickler.",
    img: "/images/justitia.jpg",
    alt: "Justitia-Figur des Gerechtigkeitsbrunnens in Bern: mit verbundenen Augen, Waage und Schwert",
    focus: "object-[50%_28%]",
    credit: "Justitiabrunnen Bern (Figur: Hans Gieng, 1543) · Foto: TheBernFiles / Wikimedia Commons · gemeinfrei (PD)",
  },
];

export default function App() {
  return (
    <>
      {/* Sprunglink für Tastatur/Screenreader */}
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>

      {/* Schmale Publikations-Zeile statt buntem Hero */}
      <div className="masthead-bar">
        <span>Religionsunterricht · Klasse&nbsp;10</span>
        <span className="accent">Ein Lese-Feature</span>
      </div>

      <div className="page">
        <Hero />

        <main id="inhalt">
          {/* ===== I — Kernfrage ===== */}
          <Section num="I" tag="Die Kernfrage" id="kernfrage">
            <h2 id="kernfrage-title" className="kicker mb-7">
              Worum es geht
            </h2>
            <Reveal as="figure" className="pullquote pullquote--feature">
              <blockquote>
                Wie bleibt der Mensch und seine Würde im Mittelpunkt, wenn Maschinen
                immer besser werden und für uns Aufgaben und Entscheidungen übernehmen?
              </blockquote>
            </Reveal>
          </Section>

          {/* ===== II — Hilfe & Herausforderung ===== */}
          <Section num="II" tag="Hilfe & Herausforderung" id="hilfe">
            <Reveal>
              <h2 id="hilfe-title" className="section-title">
                Kein Misstrauen gegen die Technik
              </h2>
              <p className="prose-p lede">
                Die Enzyklika ist ausdrücklich nicht technikfeindlich. Technik, so heißt
                es, kann <span className="key">„heilen, verbinden, bilden"</span>{" "}
                <span className="cite">(MH&nbsp;9)</span>. Künstliche Intelligenz wird
                darin als eine mögliche, wertvolle Hilfe für den Menschen anerkannt.
              </p>
              <p className="prose-p">
                Zugleich knüpft der Papst daran eine Bedingung: Diese Hilfe verlangt einen{" "}
                <span className="key">„nüchternen und wachsamen Umgang"</span>{" "}
                <span className="cite">(MH&nbsp;100)</span>. Nicht die Maschine ist das
                Problem, sondern die Frage, wie wir sie nutzen — aufmerksam und mit
                eigenem Urteil, nicht gedankenlos.
              </p>
            </Reveal>
          </Section>

          {/* ===== III — Drei Gefahren ===== */}
          <Section num="III" tag="Drei Gefahren" id="gefahren">
            <Reveal>
              <h2 id="gefahren-title" className="section-title">
                Drei Gefahren im privaten Gebrauch
              </h2>
              <p className="prose-p" style={{ color: "var(--ink-soft)" }}>
                Schon im alltäglichen, privaten Umgang mit KI sieht die Enzyklika drei
                Risiken <span className="cite">(MH&nbsp;100)</span>:
              </p>
            </Reveal>

            {[
              {
                n: "1",
                h: "Die Leichtigkeit",
                p: "Wir gewöhnen uns daran, zu viel zu delegieren und nach vorgefertigten Antworten zu suchen. Was bequem beginnt, schwächt auf Dauer das eigene Urteilsvermögen und die Kreativität.",
              },
              {
                n: "2",
                h: "Der Eindruck von Objektivität",
                p: "KI wirkt neutral und sachlich. Tatsächlich spiegelt sie aber das Wertesystem ihrer Entwickler — samt deren Schwächen und Vorurteilen. Was objektiv erscheint, ist es nicht zwangsläufig.",
              },
              {
                n: "3",
                h: "Die Simulation menschlicher Kommunikation",
                p: "KI tut so, als rede sie wie ein Mensch. Doch hinter den Worten ist niemand: Sie versteht nichts und sie fühlt nichts. Das Gegenüber, das sie vortäuscht, gibt es nicht.",
              },
            ].map((g, i) => (
              <Reveal key={g.n} className="hazard" delay={i * 0.05}>
                <span className="h-num">{g.n}</span>
                <div>
                  <h3>{g.h}</h3>
                  <p className="prose-p" style={{ marginBottom: 0 }}>
                    {g.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </Section>

          {/* ===== IV — Chance / Risiko ===== */}
          <Section num="IV" tag="Chance & Risiko" id="chance">
            <Reveal>
              <h2 id="chance-title" className="section-title">
                Zwei Seiten derselben Sache
              </h2>
              <div className="contrast">
                <div>
                  <h3 className="label-chance">Als Chance</h3>
                  <p className="prose-p">
                    KI öffnet Zugang zu Wissen, entlastet von Routine, bietet schnelle
                    Hilfe und eröffnet neue Möglichkeiten — dort, wo sie den Menschen
                    unterstützt, statt ihn zu verdrängen.
                  </p>
                </div>
                <div>
                  <h3>Als Risiko</h3>
                  <p className="prose-p">
                    Sensible Entscheidungen über Arbeit, Kredite, den Zugang zu Diensten
                    und den guten Ruf von Menschen drohen vollautomatischen Systemen
                    überlassen zu werden <span className="cite">(MH&nbsp;102–103)</span>.
                  </p>
                </div>
              </div>
              <p
                className="prose-p"
                style={{
                  marginTop: "2.5rem",
                  fontFamily: "var(--serif, 'Fraunces')",
                  fontSize: "1.2rem",
                  lineHeight: 1.45,
                  maxWidth: "36rem",
                }}
              >
                Einem Algorithmus die Macht zu geben, ohne dass ein Mensch die Last der
                Entscheidung trägt, verschiebt die <span className="key">Grenzen des Menschlichen</span>.
              </p>
            </Reveal>
          </Section>

          {/* ===== Galerie-Interlude (optional, nur eigene CC0-Grafiken) ===== */}
          <section className="section spread" aria-labelledby="galerie-title">
            <Reveal className="rail">
              <span className="num">✳</span>
              <span className="tag">Galerie</span>
            </Reveal>
            <div className="col-wide">
              <Reveal>
                <h2 id="galerie-title" className="sr-only">
                  Thematische Galerie
                </h2>
                <InteractiveBentoGallery
                  heading="Mensch &amp; Maschine — drei Bilder zum Thema"
                  subheading="Zum Vergrößern anklicken. Quellen- und Lizenzangaben stehen je Bild und gesammelt im Bildnachweis am Seitenende."
                  items={galleryItems}
                />
              </Reveal>
            </div>
          </section>

          {/* ===== V — Würde ===== */}
          <Section num="V" tag="Die Würde" id="wuerde">
            <Reveal>
              <h2 id="wuerde-title" className="section-title">
                Würde ist ein Geschenk
              </h2>
              <p className="prose-p lede">
                Im christlichen Menschenbild ist die Würde des Menschen ein Geschenk{" "}
                <span className="cite">(MH&nbsp;48–50)</span>. Sie hängt nicht von
                Fähigkeiten ab, nicht von Reichtum, nicht von Position und nicht von
                Entscheidungen.
              </p>
            </Reveal>
            <Reveal as="figure" className="pullquote pullquote--feature" delay={0.05}>
              <blockquote>
                Der Mensch ist als Abbild des dreifaltigen Gottes geschaffen und auf
                Beziehung hin angelegt.
              </blockquote>
              <figcaption>
                Zum Menschenbild der Enzyklika <span className="src">· MH&nbsp;48–50</span>
              </figcaption>
            </Reveal>

            <Reveal as="figure" className="figure" delay={0.1}>
              <img
                src="/images/erschaffung-adams.jpg"
                alt="Michelangelos Fresko Die Erschaffung Adams aus der Sixtinischen Kapelle: Gott reicht dem liegenden Adam die Hand"
                loading="lazy"
              />
              <figcaption>
                Michelangelo, <em>Die Erschaffung Adams</em> (um 1511), Sixtinische
                Kapelle. Gemeinfrei (Public Domain) · Wikimedia&nbsp;Commons — siehe{" "}
                <a href="#bildnachweis">Bildnachweis</a>.
              </figcaption>
            </Reveal>
          </Section>

          {/* ===== VI — Begrenztheit (mit auflockernder Grafik) ===== */}
          <Section num="VI" tag="Die Begrenztheit" id="grenzen">
            <Reveal>
              <h2 id="grenzen-title" className="section-title">
                Reifen an den eigenen Grenzen
              </h2>
              <p className="prose-p lede">
                Krankheit, Alter und Schwäche gelten heute oft als Mangel, den es zu
                beheben gilt. Der Papst dreht diesen Blick um{" "}
                <span className="cite">(MH&nbsp;118–120)</span>: Der Mensch reift häufig
                gerade <em>durch</em> seine Grenzen.
              </p>
            </Reveal>

            <Reveal as="figure" className="figure" delay={0.05}>
              <EditorialArt
                motif="horizon"
                title="Ruhiger Horizont mit einzelner aufsteigender Linie — eigene Strichgrafik"
              />
              <figcaption>
                Eigene Illustration · CC0 (Public Domain). Quelle: Seitenautor — siehe{" "}
                <a href="#bildnachweis">Bildnachweis</a>.
              </figcaption>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="prose-p" style={{ marginTop: "1.75rem" }}>
                Würde man allen Schmerz auslöschen, müsste man auch Liebe und Sehnsucht
                auslöschen — denn beide sind ohne Verletzlichkeit nicht zu haben. Der
                Auftrag lautet darum, <span className="key">„zutiefst menschlich"</span>{" "}
                zu bleiben <span className="cite">(MH&nbsp;15)</span>. Das, so die
                Enzyklika, kann keine Maschine ersetzen.
              </p>
            </Reveal>
          </Section>

          {/* ===== VII — Herzstück ===== */}
          <Section num="VII" tag="Das Herzstück" id="herzstueck">
            <Reveal>
              <h2 id="herzstueck-title" className="kicker mb-7">
                Entwaffnet und lebensfreundlich
              </h2>
            </Reveal>
            <Reveal as="figure" className="pullquote pullquote--feature">
              <blockquote>Sie muss entwaffnet und lebensfreundlich gemacht werden.</blockquote>
              <figcaption>
                Über die Künstliche Intelligenz <span className="src">· MH&nbsp;110</span>
              </figcaption>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="prose-p" style={{ marginTop: "2.5rem" }}>
                Der Papst vergleicht diese Aufgabe mit der atomaren Abrüstung: Eine
                mächtige Technik soll nicht abgeschafft, aber so gebändigt werden, dass
                sie dem Leben dient. Daraus leitet die Enzyklika drei Grundregeln ab.
              </p>
            </Reveal>

            <Reveal>
              <ol className="principles" style={{ marginTop: "1rem" }}>
                <li>
                  <div>
                    <h3>Verantwortung</h3>
                    <p className="prose-p" style={{ margin: 0 }}>
                      Bei wichtigen Entscheidungen über Menschen entscheidet am Ende ein
                      Mensch — und steht dafür gerade.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Transparenz</h3>
                    <p className="prose-p" style={{ margin: 0 }}>
                      Man muss immer wissen, wann man es mit KI zu tun hat — und wessen
                      Werte in ihr stecken.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Stärken statt ersetzen</h3>
                    <p className="prose-p" style={{ margin: 0 }}>
                      KI soll Kreativität, Mitgefühl und Urteilsfähigkeit stärken — nicht
                      bequem und gleichgültig machen.
                    </p>
                  </div>
                </li>
              </ol>
            </Reveal>
          </Section>

          {/* ===== VIII — Podcast (OHNE Audio-Leiste) ===== */}
          <Section num="VIII" tag="Der Podcast" id="podcast" className="podcast">
            <Reveal>
              <h2 id="podcast-title" className="section-title">
                „Mensch bleiben"
              </h2>
              <p className="prose-p">
                Begleitend zur Enzyklika diskutieren vier Stimmen, was Künstliche
                Intelligenz für den Menschen bedeutet — zwischen Technik, Glaube und
                kritischer Nachfrage. Eine Folge zum Zuhören und Weiterdenken.
              </p>

              <ul className="voices" style={{ marginTop: "2rem" }}>
                <li>
                  <span className="name">Jonas</span>
                  <span className="role">Moderation</span>
                </li>
                <li>
                  <span className="name">Dr.&nbsp;Felder</span>
                  <span className="role">KI-Experte (Informatiker)</span>
                </li>
                <li>
                  <span className="name">Pfarrer&nbsp;Berg</span>
                  <span className="role">Priester (kirchliche Sicht)</span>
                </li>
                <li>
                  <span className="name">Tarek</span>
                  <span className="role">Kritiker (Journalist)</span>
                </li>
              </ul>

              {/* Audio-Leiste entfernt. Stattdessen ein schlichter Text-Link. */}
              <a className="btn" href="#" aria-disabled="true">
                Skript nachlesen
              </a>
            </Reveal>
          </Section>

          {/* ===== IX — Reflexion ===== */}
          <Section num="IX" tag="Reflexion" id="reflexion">
            <Reveal>
              <h2 id="reflexion-title" className="section-title">
                Fragen zum Weiterdenken
              </h2>
              <ol className="questions">
                <li>
                  <p>Wo hat dir KI schon geholfen — und wo hast du zu viel an sie abgegeben?</p>
                </li>
                <li>
                  <p>Woran erkennst du, dass eine KI-Antwort nicht „objektiv" ist?</p>
                </li>
                <li>
                  <p>Welche Entscheidungen sollte niemals eine Maschine allein treffen?</p>
                </li>
                <li>
                  <p>Was heißt für dich, „zutiefst menschlich zu bleiben"?</p>
                </li>
              </ol>
            </Reveal>
          </Section>

          {/* ===== X — Quellen ===== */}
          <Section num="X" tag="Quellen" id="quellen">
            <Reveal>
              <div className="sources">
                <h2 id="quellen-title" className="section-title">
                  Quellen &amp; Belegstellen
                </h2>
                <p className="full-cite">
                  Papst&nbsp;Leo&nbsp;XIV., Enzyklika <em>„Magnifica humanitas. Über die
                  Bewahrung des Menschen im Zeitalter der Künstlichen Intelligenz"</em>, 2026.
                </p>
                <dl>
                  <dt>MH&nbsp;9</dt>
                  <dd>Technik kann „heilen, verbinden, bilden".</dd>
                  <dt>MH&nbsp;15</dt>
                  <dd>Der Auftrag, „zutiefst menschlich" zu bleiben.</dd>
                  <dt>MH&nbsp;48–50</dt>
                  <dd>Die Würde des Menschen als Geschenk; Abbild Gottes, auf Beziehung angelegt.</dd>
                  <dt>MH&nbsp;100</dt>
                  <dd>„Nüchterner und wachsamer Umgang"; drei Gefahren im privaten Gebrauch.</dd>
                  <dt>MH&nbsp;102–103</dt>
                  <dd>Risiko vollautomatischer Entscheidungen über Menschen.</dd>
                  <dt>MH&nbsp;110</dt>
                  <dd>„Entwaffnet und lebensfreundlich"; Vergleich mit atomarer Abrüstung.</dd>
                  <dt>MH&nbsp;118–120</dt>
                  <dd>Die Begrenztheit des Menschen; Reifen durch Grenzen.</dd>
                </dl>
                <p className="note">
                  Unterrichtsbezug zu <em>„Impulse zur Zeit"</em>, Erzbistum&nbsp;Köln,
                  lizenziert unter{" "}
                  <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
                    target="_blank"
                    rel="noopener noreferrer license"
                  >
                    CC&nbsp;BY-SA&nbsp;4.0
                  </a>
                  . Davon abgeleitete Inhalte dieser Seite stehen unter derselben Lizenz
                  (CC&nbsp;BY-SA&nbsp;4.0).
                </p>
              </div>
            </Reveal>
          </Section>

          {/* ===== Bildnachweis ===== */}
          <Section num="✦" tag="Bildnachweis" id="bildnachweis">
            <Reveal>
              <div className="sources">
                <h2 id="bildnachweis-title" className="section-title">
                  Bildnachweis &amp; Lizenzen
                </h2>
                <p className="prose-p">
                  Es werden ausschließlich Medien mit klarer Lizenz verwendet:
                  lizenzierte Fotos von Wikimedia&nbsp;Commons, gemeinfreie Kunstwerke
                  sowie eigene Grafiken. Alle Dateien sind lokal eingebunden (keine
                  Hotlinks). Die Fotos wurden für das Web skaliert.
                </p>
                <dl>
                  <dt>Petersdom, Westfassade (Kopfbereich)</dt>
                  <dd>
                    Foto: Livioandronico2013 / Wikimedia&nbsp;Commons —{" "}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:St_Peter_facade.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      „St Peter facade.jpg"
                    </a>
                    , Lizenz{" "}
                    <a
                      href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
                      target="_blank"
                      rel="noopener noreferrer license"
                    >
                      CC&nbsp;BY-SA&nbsp;4.0
                    </a>{" "}
                    (skaliert).
                  </dd>
                  <dt>Petersdom bei Nacht (Galerie)</dt>
                  <dd>
                    Foto: Livioandronico2013 / Wikimedia&nbsp;Commons —{" "}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:Saint_Peter%27s_Basilica_at_night_HD.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      „Saint Peter's Basilica at night HD.jpg"
                    </a>
                    , Lizenz{" "}
                    <a
                      href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
                      target="_blank"
                      rel="noopener noreferrer license"
                    >
                      CC&nbsp;BY-SA&nbsp;4.0
                    </a>{" "}
                    (skaliert).
                  </dd>
                  <dt>Die Erschaffung Adams (Galerie &amp; Abschnitt „Würde")</dt>
                  <dd>
                    Michelangelo, <em>Die Erschaffung Adams</em> (um 1511), Sixtinische
                    Kapelle —{" "}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Wikimedia&nbsp;Commons
                    </a>
                    , gemeinfrei (Public Domain).
                  </dd>
                  <dt>Justitia, Gerechtigkeitsbrunnen Bern (Galerie „Schein der Objektivität")</dt>
                  <dd>
                    Figur: Hans&nbsp;Gieng (1543) · Foto: TheBernFiles /{" "}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:Berner_Iustitia.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Wikimedia&nbsp;Commons
                    </a>
                    , gemeinfrei (Public Domain).
                  </dd>
                  <dt>Strichgrafik (Abschnitt „Begrenztheit")</dt>
                  <dd>Eigene Illustration des Seitenautors · CC0 (gemeinfrei).</dd>
                </dl>
                <p className="note">
                  Hinweis zu <strong>CC&nbsp;BY-SA&nbsp;4.0</strong>: Pflicht zur
                  Namensnennung des Urhebers, Angabe der Lizenz mit Link und Kennzeichnung
                  von Änderungen (hier: Skalierung). Bearbeitungen, die auf solchem
                  Material beruhen, sind ihrerseits unter <strong>CC&nbsp;BY-SA&nbsp;4.0</strong>{" "}
                  weiterzugeben.
                </p>
              </div>
            </Reveal>
          </Section>

          {/* ===== Impressum ===== */}
          <Section num="§" tag="Impressum" id="impressum">
            <Reveal>
              <div className="sources">
                <h2 id="impressum-title" className="section-title">
                  Impressum
                </h2>
                <p className="prose-p">Angaben gemäß § 5 DDG (ehem. § 5 TMG):</p>
                <p className="prose-p">
                  Gabriel&nbsp;Anter
                  <br />
                  Erwin-von-Witzleben-Straße&nbsp;38
                  <br />
                  40474&nbsp;Düsseldorf
                  <br />
                  E-Mail:{" "}
                  <a href="mailto:Gabriel.anter123@outlook.com">
                    Gabriel.anter123@outlook.com
                  </a>
                </p>
                <p className="note">
                  Hinweis: Wird diese Seite ausschließlich im Unterricht und nicht
                  öffentlich im Internet gezeigt, ist ein vollständiges Impressum
                  rechtlich nicht zwingend erforderlich.
                </p>
              </div>
            </Reveal>
          </Section>

          {/* ===== Datenschutzerklärung ===== */}
          <Section num="§" tag="Datenschutz" id="datenschutz">
            <Reveal>
              <div className="sources">
                <h2 id="datenschutz-title" className="section-title">
                  Datenschutzerklärung
                </h2>
                <p className="prose-p">
                  Diese Seite ist bewusst datensparsam gestaltet. Es werden{" "}
                  <span className="key">keine Cookies</span> gesetzt, es findet{" "}
                  <span className="key">kein Tracking</span> und{" "}
                  <span className="key">keine Analyse</span> des Nutzungsverhaltens statt.
                  Es sind keine Werbe- oder Analyse-Dienste eingebunden.
                </p>
                <p className="prose-p">
                  Die verwendeten Schriften (Fraunces, Hanken&nbsp;Grotesk) werden{" "}
                  <strong>selbst gehostet</strong> und lokal ausgeliefert. Es besteht
                  keine Verbindung zu Google&nbsp;Fonts oder einem anderen Schrift-CDN.
                </p>
                <h3 className="sub" style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
                  Bilder
                </h3>
                <p className="prose-p">
                  Alle Bilder werden <strong>lokal</strong> von demselben Server wie die
                  Seite ausgeliefert (keine Hotlinks, keine Einbettung von fremden
                  Servern). Es besteht <strong>keine Verbindung zu Drittanbietern</strong>;
                  es werden keine Daten an Externe übertragen.
                </p>
                <p className="note">
                  Verantwortlich im Sinne des Datenschutzrechts ist die im{" "}
                  <a href="#impressum">Impressum</a> genannte Person.
                </p>
              </div>
            </Reveal>
          </Section>
        </main>

        <footer className="site-footer">
          <nav aria-label="Rechtliche Hinweise">
            <a href="#impressum">Impressum</a>
            <a href="#datenschutz">Datenschutz</a>
            <a href="#bildnachweis">Bildnachweis</a>
            <a href="#quellen">Quellen</a>
          </nav>
          Magnifica humanitas — Lese-Feature für den Religionsunterricht, Klasse&nbsp;10
        </footer>
      </div>
    </>
  );
}
