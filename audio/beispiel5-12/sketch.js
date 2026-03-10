// =========================
// Globale Variablen
// =========================

// Die Pflanze ist jetzt selbst ein Objekt.
// Sie enthält später viele Blatt-Objekte.
let pflanze;

// Audio-Komponenten
let audioEingang;
let frequenzAnalyse;

// Oberfläche
let startKnopf;
let quellAuswahl;
let statusText;

// Statusvariable
let audioAktiv = false;


// =========================
// Klasse Blatt
// =========================
//
// Die Klasse Blatt beschreibt ein einzelnes Blatt.
// Ein Blatt besitzt:
// - Position
// - Größe
// - Frequenzbereich
// - Verhalten bei Audioaktivität
//
// Wichtig:
// Das Blatt ist ein eigenständiges Objekt.
// Es weiß aber nichts über die gesamte Pflanze.
// Es kümmert sich nur um sich selbst.
class Blatt {
  constructor(x, y, grundGroesse, frequenzMin, frequenzMax, schwellenwert, flirrStaerke, farbe, drehung) {
    // Ursprüngliche Position
    this.x = x;
    this.y = y;

    // Aktuelle Position
    this.aktuelleX = x;
    this.aktuelleY = y;

    // Grundgröße und aktuelle Größe
    this.grundGroesse = grundGroesse;
    this.aktuelleGroesse = grundGroesse;

    // Fachliche Attribute für Audioanalyse
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Verhalten
    this.schwellenwert = schwellenwert;
    this.flirrStaerke = flirrStaerke;

    // Darstellung
    this.farbe = farbe;
    this.drehung = drehung;
    this.aktuelleDrehung = drehung;

    // Zuletzt gemessene Energie
    this.aktivitaetswert = 0;
  }

  // Diese Methode erhält von außen einen Energiewert.
  // Wenn die Energie hoch genug ist, reagiert das Blatt.
  aktualisieren(aktivitaetswert) {
    this.aktivitaetswert = aktivitaetswert;

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

  // Kleine zufällige Positionsänderung
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
      this.grundGroesse * 0.35
    );

    zusatzGroesse = constrain(zusatzGroesse, 0, this.grundGroesse * 0.35);
    this.aktuelleGroesse = this.grundGroesse + zusatzGroesse;
  }

  // Kleine Drehveränderung für ein lebendigeres Verhalten
  rotiereLeicht() {
    let zusatzDrehung = map(
      this.aktivitaetswert,
      this.schwellenwert,
      255,
      -0.12,
      0.12
    );

    zusatzDrehung = constrain(zusatzDrehung, -0.12, 0.12);
    this.aktuelleDrehung = this.drehung + zusatzDrehung;
  }

  // Das Blatt wird mathematisch gezeichnet.
  // Die Form entsteht aus berechneten Punkten.
  anzeigen() {
    push();

    translate(this.aktuelleX, this.aktuelleY);
    rotate(this.aktuelleDrehung);

    fill(this.farbe);
    stroke(30);
    strokeWeight(1.5);

    beginShape();

    // Blattspitze oben
    vertex(0, -this.aktuelleGroesse * 0.6);

    // Linke Hälfte
    for (let winkel = 0; winkel <= PI; winkel += 0.15) {
      let y = map(
        winkel,
        0,
        PI,
        -this.aktuelleGroesse * 0.6,
        this.aktuelleGroesse * 0.6
      );

      let breite = sin(winkel) * this.aktuelleGroesse * 0.35;
      vertex(-breite, y);
    }

    // Rechte Hälfte
    for (let winkel = PI; winkel >= 0; winkel -= 0.15) {
      let y = map(
        winkel,
        0,
        PI,
        -this.aktuelleGroesse * 0.6,
        this.aktuelleGroesse * 0.6
      );

      let breite = sin(winkel) * this.aktuelleGroesse * 0.35;
      vertex(breite, y);
    }

    endShape(CLOSE);

    // Mittelrippe
    stroke(255);
    strokeWeight(1.5);
    line(0, -this.aktuelleGroesse * 0.5, 0, this.aktuelleGroesse * 0.5);

    pop();
  }
}


// =========================
// Klasse Pflanze
// =========================
//
// Die Klasse Pflanze ist das neue zentrale OOP-Element.
//
// Eine Pflanze besitzt:
// - eine Position
// - eine Liste von Blättern
//
// Wichtig:
// Die Pflanze zeichnet nicht jedes Blatt "von Hand",
// sondern verwaltet viele Blatt-Objekte.
// Das ist ein Beispiel für Komposition.
class Pflanze {
  constructor(x, y, anzahlBlaetter) {
    // Mittelpunkt oder Basisposition der Pflanze
    this.x = x;
    this.y = y;

    // Array für alle Blätter dieser Pflanze
    this.blaetter = [];

    // Anzahl der Blätter
    this.anzahlBlaetter = anzahlBlaetter;

    // Beim Erzeugen der Pflanze werden direkt Blätter angelegt
    this.erstelleBlaetter();
  }

  // Diese Methode erzeugt die Blätter der Pflanze.
  //
  // Ziel:
  // Die Blätter sollen nicht in einem Raster liegen,
  // sondern eine busch- oder pflanzenartige Form bilden.
  erstelleBlaetter() {
    for (let i = 0; i < this.anzahlBlaetter; i++) {
      // Die Pflanze wird in Zonen aufgebaut:
      // Unten breiter, oben schmaler.
      //
      // Dazu verwenden wir einen normierten Wert zwischen 0 und 1.
      // 0 = unten
      // 1 = oben
      let hoehenAnteil = random();

      // Je höher ein Blatt liegt, desto schmaler wird die Pflanze.
      let maximaleBreite = map(hoehenAnteil, 0, 1, 180, 45);

      // x-Position relativ zur Pflanzenmitte
      let x = this.x + random(-maximaleBreite, maximaleBreite);

      // y-Position:
      // unten nahe this.y, oben weiter darüber
      let y = this.y - map(hoehenAnteil, 0, 1, 0, 260);

      // Kleine Zufallsabweichung für organischere Verteilung
      y += random(-8, 8);

      // Größe leicht variieren
      let grundGroesse = random(38, 62);

      // Drehung: Blätter sollen leicht nach links oder rechts kippen
      let drehung = random(-0.8, 0.8);

      // Frequenzbereich abhängig von der Höhe:
      // unten eher tiefe Frequenzen
      // mittig eher mittlere Frequenzen
      // oben eher hohe Frequenzen
      let frequenzMin;
      let frequenzMax;

      if (hoehenAnteil < 0.33) {
        frequenzMin = 40;
        frequenzMax = 220;
      } else if (hoehenAnteil < 0.66) {
        frequenzMin = 500;
        frequenzMax = 1800;
      } else {
        frequenzMin = 2500;
        frequenzMax = 6000;
      }

      // Schwellenwert leicht variieren
      let schwellenwert = random(75, 120);

      // Flirrstärke leicht variieren
      let flirrStaerke = random(1.5, 4.5);

      // Farbvariation
      let rot = random(40, 90);
      let gruen = random(120, 190);
      let blau = random(50, 90);
      let farbe = color(rot, gruen, blau, 210);

      // Neues Blatt erzeugen
      let neuesBlatt = new Blatt(
        x,
        y,
        grundGroesse,
        frequenzMin,
        frequenzMax,
        schwellenwert,
        flirrStaerke,
        farbe,
        drehung
      );

      // Blatt in das Array der Pflanze einfügen
      this.blaetter.push(neuesBlatt);
    }
  }

  // Die Pflanze aktualisiert alle ihre Blätter.
  //
  // Die Pflanze selbst liest die Audioenergie für jedes Blatt aus
  // und reicht den passenden Wert an das jeweilige Blatt weiter.
  aktualisieren(frequenzAnalyse) {
    for (let i = 0; i < this.blaetter.length; i++) {
      let blatt = this.blaetter[i];

      let energie = frequenzAnalyse.getEnergy(
        blatt.frequenzMin,
        blatt.frequenzMax
      );

      blatt.aktualisieren(energie);
    }
  }

  // Wenn kein Audio aktiv ist, bleiben die Blätter ruhig.
  zuruecksetzen() {
    for (let i = 0; i < this.blaetter.length; i++) {
      this.blaetter[i].aktualisieren(0);
    }
  }

  // Die Pflanze zeichnet zuerst einen einfachen Stängel
  // und dann alle Blätter.
  anzeigen() {
    this.zeichneStamm();

    for (let i = 0; i < this.blaetter.length; i++) {
      this.blaetter[i].anzeigen();
    }
  }

  // Einfache Stamm- oder Stängelzeichnung
  zeichneStamm() {
    stroke(90, 60, 30);
    strokeWeight(10);
    line(this.x, this.y + 40, this.x, this.y - 120);

    strokeWeight(6);
    line(this.x, this.y - 70, this.x - 45, this.y - 130);
    line(this.x, this.y - 110, this.x + 50, this.y - 180);
    line(this.x, this.y - 20, this.x + 60, this.y - 80);
  }

  // Kleine Informationsanzeige
  zeigeInformationen() {
    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);

    text(
      "Die Pflanze ist ein Objekt, das viele Blatt-Objekte enthält.",
      width / 2,
      height - 55
    );

    text(
      "Tiefe Blätter reagieren eher auf Bass, mittlere auf Mitten, obere auf hohe Frequenzen.",
      width / 2,
      height - 30
    );
  }
}


// =========================
// setup()
// =========================
function setup() {
  createCanvas(1100, 760);

  let steuerung = select("#steuerung");

  let block = createDiv();
  block.parent(steuerung);
  block.class("steuerung-block");

  createP("Audioeingang starten und Quelle auswählen").parent(block);

  startKnopf = createButton("Audio starten");
  startKnopf.parent(block);
  startKnopf.mousePressed(audioStarten);

  quellAuswahl = createSelect();
  quellAuswahl.parent(block);
  quellAuswahl.option("Audioquelle wird nach Start geladen");
  quellAuswahl.disable();

  statusText = createP("Status: Audio noch nicht gestartet");
  statusText.parent(block);

  // Eine Pflanze mit vielen Blättern erzeugen
  pflanze = new Pflanze(width / 2, height - 140, 36);
}


// =========================
// draw()
// =========================
function draw() {
  background(245);

  fill(20);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(26);
  text("Beispiel 5.12 – Komposition: Pflanze aus Blatt-Objekten", width / 2, 35);

  textSize(16);
  text(
    "Die Pflanze ist ein zusammengesetztes Objekt. Sie verwaltet viele Blätter, die jeweils eigenständig auf Audio reagieren.",
    width / 2,
    70
  );

  // Bodenlinie
  stroke(150);
  strokeWeight(2);
  line(100, height - 95, width - 100, height - 95);

  if (audioAktiv) {
    frequenzAnalyse.analyze();
    pflanze.aktualisieren(frequenzAnalyse);
  } else {
    pflanze.zuruecksetzen();
  }

  pflanze.anzeigen();
  pflanze.zeigeInformationen();
}


// =========================
// Audio-Funktionen
// =========================
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