// =====================================
// Globale Variablen
// =====================================

// Hier speichern wir alle Pflanzenobjekte.
let pflanzen = [];

// Audio-Komponenten
let audioEingang;
let frequenzAnalyse;

// Oberflächenelemente
let startKnopf;
let quellAuswahl;
let statusText;

// Regler für die Empfindlichkeit der drei Frequenzzonen
let reglerBass;
let reglerMitten;
let reglerHoehen;

let textBass;
let textMitten;
let textHoehen;

// Aktuelle Schwellenwerte. Je kleiner der Wert, desto früher reagieren die Blätter.
let schwelleBass = 75;
let schwelleMitten = 90;
let schwelleHoehen = 105;

// Diese Variable merkt sich, ob Audio bereits aktiv ist.
let audioAktiv = false;


// =====================================
// Klasse Blatt
// =====================================
// Ein Blatt ist das kleinere Teilobjekt.
// Es besitzt eigene Daten und eigenes Verhalten.
class Blatt {
  constructor(x, y, grundGroesse, frequenzMin, frequenzMax, frequenzZone, flirrStaerke, farbe, drehung) {
    // Ursprüngliche Position
    this.x = x;
    this.y = y;

    // Aktuelle Position, die sich verändern darf
    this.aktuelleX = x;
    this.aktuelleY = y;

    // Grundgröße und aktuelle Größe
    this.grundGroesse = grundGroesse;
    this.aktuelleGroesse = grundGroesse;

    // Fachliche Attribute für die Audioanalyse
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Die Zone beschreibt, zu welchem groben Frequenzbereich das Blatt gehört:
    // "bass", "mitten" oder "hoehen".
    this.frequenzZone = frequenzZone;

    // Verhalten
    this.schwellenwert = 0;
    this.flirrStaerke = flirrStaerke;

    // Darstellung
    this.farbe = farbe;
    this.drehung = drehung;
    this.aktuelleDrehung = drehung;

    // Zuletzt gemessener Wert
    this.aktivitaetswert = 0;
  }

  // Das Blatt erhält einen Energiewert und einen Schwellenwert.
  // Der Schwellenwert wird hier bewusst von außen übergeben, weil er über
  // die drei Regler der Oberfläche gesteuert wird.
  aktualisieren(aktivitaetswert, schwellenwert) {
    this.aktivitaetswert = aktivitaetswert;
    this.schwellenwert = schwellenwert;

    if (this.aktivitaetswert >= this.schwellenwert) {
      this.flirren();
      this.skaliere();
      this.rotiereLeicht();
    } else {
      this.aktuelleX = this.x;
      this.aktuelleY = this.y;
      this.aktuelleGroesse = this.grundGroesse;
      this.aktuelleDrehung = this.drehung;
    }
  }

  // Kleine Positionsabweichung
  flirren() {
    this.aktuelleX = this.x + random(-this.flirrStaerke, this.flirrStaerke);
    this.aktuelleY = this.y + random(-this.flirrStaerke, this.flirrStaerke);
  }

  // Größenänderung in Abhängigkeit vom Energiewert
  skaliere() {
    let zusatzGroesse = map(
      this.aktivitaetswert,
      this.schwellenwert,
      255,
      0,
      this.grundGroesse * 0.28
    );

    zusatzGroesse = constrain(zusatzGroesse, 0, this.grundGroesse * 0.28);
    this.aktuelleGroesse = this.grundGroesse + zusatzGroesse;
  }

  // Kleine Drehänderung
  rotiereLeicht() {
    let zusatzDrehung = map(
      this.aktivitaetswert,
      this.schwellenwert,
      255,
      -0.1,
      0.1
    );

    zusatzDrehung = constrain(zusatzDrehung, -0.1, 0.1);
    this.aktuelleDrehung = this.drehung + zusatzDrehung;
  }

  // Mathematische Blattzeichnung
  anzeigen() {
    push();
    translate(this.aktuelleX, this.aktuelleY);
    rotate(this.aktuelleDrehung);

    fill(this.farbe);
    stroke(30);
    strokeWeight(1.2);

    beginShape();
    vertex(0, -this.aktuelleGroesse * 0.58);

    for (let winkel = 0; winkel <= PI; winkel += 0.15) {
      let y = map(winkel, 0, PI, -this.aktuelleGroesse * 0.58, this.aktuelleGroesse * 0.58);
      let breite = sin(winkel) * this.aktuelleGroesse * 0.34;
      vertex(-breite, y);
    }

    for (let winkel = PI; winkel >= 0; winkel -= 0.15) {
      let y = map(winkel, 0, PI, -this.aktuelleGroesse * 0.58, this.aktuelleGroesse * 0.58);
      let breite = sin(winkel) * this.aktuelleGroesse * 0.34;
      vertex(breite, y);
    }

    endShape(CLOSE);

    stroke(255);
    strokeWeight(1.4);
    line(0, -this.aktuelleGroesse * 0.45, 0, this.aktuelleGroesse * 0.45);

    pop();
  }
}


// =====================================
// Klasse Pflanze
// =====================================
// Eine Pflanze ist ein zusammengesetztes Objekt.
// Sie besitzt selbst Attribute, enthält aber zusätzlich viele Blätter.
class Pflanze {
  constructor(x, y, grundGroesse, grundFarbe, anzahlBlaetter) {
    this.x = x;
    this.y = y;

    // Größe und Farbe gehören als Grundcharakter zur Pflanze.
    this.grundGroesse = grundGroesse;
    this.grundFarbe = grundFarbe;

    this.anzahlBlaetter = anzahlBlaetter;
    this.blaetter = [];

    this.erstelleBlaetter();
  }

  // Diese Methode erzeugt die Blätter der Pflanze.
  // Die Blattgrößen und Blattfarben leiten sich von der Pflanze ab.
  erstelleBlaetter() {
    for (let i = 0; i < this.anzahlBlaetter; i++) {
      let hoehenAnteil = random();

      // Große Pflanzen erhalten insgesamt eine größere Ausdehnung.
      let maximaleBreite = map(hoehenAnteil, 0, 1, this.grundGroesse * 0.95, this.grundGroesse * 0.25);

      let x = this.x + random(-maximaleBreite, maximaleBreite);
      let y = this.y - map(hoehenAnteil, 0, 1, 0, this.grundGroesse * 1.5);
      y += random(-8, 8);

      // Blattgröße relativ zur Pflanzengröße
      let grundGroesseBlatt = random(this.grundGroesse * 0.18, this.grundGroesse * 0.28);

      let drehung = random(-0.8, 0.8);

      // Frequenzzonen entlang der Höhe:
      // untere Blätter reagieren auf Bass,
      // mittlere Blätter auf Mitten,
      // obere Blätter auf Höhen.
      let frequenzMin;
      let frequenzMax;
      let frequenzZone;

      if (hoehenAnteil < 0.33) {
        frequenzMin = 40;
        frequenzMax = 220;
        frequenzZone = "bass";
      } else if (hoehenAnteil < 0.66) {
        frequenzMin = 500;
        frequenzMax = 1800;
        frequenzZone = "mitten";
      } else {
        frequenzMin = 2500;
        frequenzMax = 6000;
        frequenzZone = "hoehen";
      }

      let flirrStaerke = random(1.5, 4.5);

      // Leichte Farbvariation auf Basis der Pflanzenfarbe
      let rot = red(this.grundFarbe) + random(-12, 12);
      let gruen = green(this.grundFarbe) + random(-18, 18);
      let blau = blue(this.grundFarbe) + random(-12, 12);
      let farbe = color(rot, gruen, blau, 215);

      let neuesBlatt = new Blatt(
        x,
        y,
        grundGroesseBlatt,
        frequenzMin,
        frequenzMax,
        frequenzZone,
        flirrStaerke,
        farbe,
        drehung
      );

      this.blaetter.push(neuesBlatt);
    }
  }

  // Die Pflanze aktualisiert alle ihre Blätter.
  aktualisieren(frequenzAnalyse) {
    for (let i = 0; i < this.blaetter.length; i++) {
      let blatt = this.blaetter[i];
      let energie = frequenzAnalyse.getEnergy(blatt.frequenzMin, blatt.frequenzMax);
      let schwellenwert = schwellenwertFuerZone(blatt.frequenzZone);

      blatt.aktualisieren(energie, schwellenwert);
    }
  }

  // Ohne Audio kehren alle Blätter in ihren Ruhezustand zurück.
  zuruecksetzen() {
    for (let i = 0; i < this.blaetter.length; i++) {
      let blatt = this.blaetter[i];
      blatt.aktualisieren(0, schwellenwertFuerZone(blatt.frequenzZone));
    }
  }

  // Stamm und Blätter zeichnen
  anzeigen() {
    this.zeichneStamm();

    for (let i = 0; i < this.blaetter.length; i++) {
      this.blaetter[i].anzeigen();
    }
  }

  // Einfacher Stamm, ebenfalls abhängig von der Pflanzengröße
  zeichneStamm() {
    stroke(96, 67, 38);
    strokeWeight(map(this.grundGroesse, 120, 230, 6, 12));
    line(this.x, this.y + 28, this.x, this.y - this.grundGroesse * 0.65);

    strokeWeight(map(this.grundGroesse, 120, 230, 4, 7));
    line(this.x, this.y - this.grundGroesse * 0.2, this.x - this.grundGroesse * 0.22, this.y - this.grundGroesse * 0.48);
    line(this.x, this.y - this.grundGroesse * 0.42, this.x + this.grundGroesse * 0.26, this.y - this.grundGroesse * 0.78);
    line(this.x, this.y - this.grundGroesse * 0.08, this.x + this.grundGroesse * 0.28, this.y - this.grundGroesse * 0.32);
  }
}


// =====================================
// setup()
// =====================================
function setup() {
  createCanvas(1280, 780);

  let steuerung = select("#steuerung");

  // Block für Audioauswahl
  let audioBlock = createDiv();
  audioBlock.parent(steuerung);
  audioBlock.class("steuerung-block");

  createP("Audioeingang starten und Quelle auswählen").parent(audioBlock);

  startKnopf = createButton("Audio starten");
  startKnopf.parent(audioBlock);
  startKnopf.mousePressed(audioStarten);

  quellAuswahl = createSelect();
  quellAuswahl.parent(audioBlock);
  quellAuswahl.option("Audioquelle wird nach Start geladen");
  quellAuswahl.disable();

  statusText = createP("Status: Audio noch nicht gestartet");
  statusText.parent(audioBlock);

  // Block für die drei Schwellenwert-Regler
  let reglerBlock = createDiv();
  reglerBlock.parent(steuerung);
  reglerBlock.class("steuerung-block regler-block");

  createP("Empfindlichkeit der Frequenzzonen").parent(reglerBlock);
  createP("Kleiner Wert = Blätter reagieren früher. Größerer Wert = stärkere Energie nötig.").parent(reglerBlock);

  textBass = createP("");
  textBass.parent(reglerBlock);
  reglerBass = createSlider(0, 255, schwelleBass, 1);
  reglerBass.parent(reglerBlock);
  reglerBass.style("width", "300px");

  textMitten = createP("");
  textMitten.parent(reglerBlock);
  reglerMitten = createSlider(0, 255, schwelleMitten, 1);
  reglerMitten.parent(reglerBlock);
  reglerMitten.style("width", "300px");

  textHoehen = createP("");
  textHoehen.parent(reglerBlock);
  reglerHoehen = createSlider(0, 255, schwelleHoehen, 1);
  reglerHoehen.parent(reglerBlock);
  reglerHoehen.style("width", "300px");

  // Fünf Pflanzen mit unterschiedlichen Größen und Farben.
  pflanzen.push(new Pflanze(150, 650, 125, color(72, 143, 71), 24));
  pflanzen.push(new Pflanze(365, 650, 170, color(46, 129, 88), 30));
  pflanzen.push(new Pflanze(610, 650, 220, color(120, 165, 68), 38));
  pflanzen.push(new Pflanze(885, 650, 180, color(62, 116, 104), 30));
  pflanzen.push(new Pflanze(1135, 650, 145, color(33, 150, 94), 25));
}


// =====================================
// draw()
// =====================================
function draw() {
  schwellenwerteAktualisieren();
  zeichneHintergrund();

  fill(25);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Beispiel 5.13 – Fünf Pflanzen als Instanzen derselben Klasse", width / 2, 36);

  textSize(16);
  text(
    "Die Regler steuern, ab welcher Energie untere, mittlere und obere Blätter reagieren.",
    width / 2,
    72
  );

  if (audioAktiv) {
    frequenzAnalyse.analyze();

    for (let i = 0; i < pflanzen.length; i++) {
      pflanzen[i].aktualisieren(frequenzAnalyse);
    }
  } else {
    for (let i = 0; i < pflanzen.length; i++) {
      pflanzen[i].zuruecksetzen();
    }
  }

  for (let i = 0; i < pflanzen.length; i++) {
    pflanzen[i].anzeigen();
  }

  zeichneLegende();

  fill(25);
  noStroke();
  textSize(14);
  text(
    "Jede Pflanze enthält viele Blatt-Objekte. Die Regler verändern nicht die Frequenzbereiche, sondern deren Reaktionsschwellen.",
    width / 2,
    height - 24
  );
}

// Schwellenwerte aus den Reglern lesen und Textanzeigen aktualisieren
function schwellenwerteAktualisieren() {
  schwelleBass = reglerBass.value();
  schwelleMitten = reglerMitten.value();
  schwelleHoehen = reglerHoehen.value();

  textBass.html("Untere Blätter / Bass 40–220 Hz: Schwelle " + schwelleBass);
  textMitten.html("Mittlere Blätter / Mitten 500–1800 Hz: Schwelle " + schwelleMitten);
  textHoehen.html("Obere Blätter / Höhen 2500–6000 Hz: Schwelle " + schwelleHoehen);
}

// Liefert den passenden Schwellenwert für eine Blatt-Zone.
function schwellenwertFuerZone(zone) {
  if (zone === "bass") {
    return schwelleBass;
  }

  if (zone === "mitten") {
    return schwelleMitten;
  }

  return schwelleHoehen;
}

// Kleine Legende im Canvas
function zeichneLegende() {
  fill(25);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);

  text("untere Blätter: Bass 40–220 Hz, Schwelle " + schwelleBass, 40, 115);
  text("mittlere Blätter: Mitten 500–1800 Hz, Schwelle " + schwelleMitten, 40, 135);
  text("obere Blätter: Höhen 2500–6000 Hz, Schwelle " + schwelleHoehen, 40, 155);
}

// Minimaler Hintergrund, damit die Szene ruhiger wirkt.
function zeichneHintergrund() {
  background(245, 247, 242);

  noStroke();
  fill(228, 236, 223);
  rect(0, height - 140, width, 140);

  stroke(170, 184, 162);
  strokeWeight(2);
  line(60, height - 140, width - 60, height - 140);
}


// =====================================
// Audio-Funktionen
// =====================================
function audioStarten() {
  userStartAudio();

  audioEingang = new p5.AudioIn();

  audioEingang.start(
    function() {
      frequenzAnalyse = new p5.FFT(0.8, 1024);
      frequenzAnalyse.setInput(audioEingang);

      audioEingang.getSources(quellenGeladen);

      audioAktiv = true;
      startKnopf.attribute("disabled", "");
      startKnopf.html("Audio aktiv");
      statusText.html("Status: Audio aktiv. Bitte Eingangsquelle prüfen.");
    },
    function(fehler) {
      console.error("Fehler beim Starten des Audioeingangs:", fehler);
      statusText.html("Status: Audio konnte nicht gestartet werden.");
    }
  );
}

function quellenGeladen(quellen) {
  quellAuswahl.html("");
  quellAuswahl.option("Bitte Eingangsquelle wählen", "");

  for (let i = 0; i < quellen.length; i++) {
    let name = quellen[i].label;

    if (!name || name.trim() === "") {
      name = "Audioquelle " + i;
    }

    quellAuswahl.option(name, i);
  }

  quellAuswahl.changed(quelleWechseln);
  quellAuswahl.removeAttribute("disabled");
}

function quelleWechseln() {
  let ausgewaehlterIndex = int(quellAuswahl.value());

  if (!isNaN(ausgewaehlterIndex)) {
    audioEingang.setSource(ausgewaehlterIndex);
    statusText.html("Status: Gewählte Quelle: " + quellAuswahl.selected());
  }
}