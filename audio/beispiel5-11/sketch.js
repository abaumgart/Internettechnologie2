// Array für alle Objekte
let figuren = [];

// Audio-Komponenten
let audioEingang;
let frequenzAnalyse;

// Oberfläche
let startKnopf;
let quellAuswahl;
let statusText;

// Statusvariable
let audioAktiv = false;

// Die Klasse BlattFigur beschreibt ein Objekt,
// dessen grafische Form mathematisch berechnet wird.
//
// Anders als bei der SVG-Variante liegt die Form also
// nicht in einer Datei, sondern entsteht direkt im Code.
class BlattFigur {
  constructor(x, y, grundGroesse, frequenzMin, frequenzMax, schwellenwert, flirrStaerke, farbe) {
    // Ursprüngliche Position
    this.x = x;
    this.y = y;

    // Aktuelle Position
    this.aktuelleX = x;
    this.aktuelleY = y;

    // Grundgröße und aktuelle Größe
    this.grundGroesse = grundGroesse;
    this.aktuelleGroesse = grundGroesse;

    // Fachliche Attribute für die Audioanalyse
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Verhaltensattribute
    this.schwellenwert = schwellenwert;
    this.flirrStaerke = flirrStaerke;

    // Darstellungsfarbe
    this.farbe = farbe;

    // Zuletzt gemessener Energiewert
    this.aktivitaetswert = 0;
  }

  // Das Objekt erhält einen Energiewert von außen.
  // Danach entscheidet es selbst über seine Reaktion.
  aktualisieren(aktivitaetswert) {
    this.aktivitaetswert = aktivitaetswert;

    if (this.aktivitaetswert >= this.schwellenwert) {
      this.flirren();
      this.skaliere();
    } else {
      this.aktuelleX = this.x;
      this.aktuelleY = this.y;
      this.aktuelleGroesse = this.grundGroesse;
    }
  }

  // Leichtes Flirren durch kleine zufällige Positionsabweichungen
  flirren() {
    this.aktuelleX = this.x + random(-this.flirrStaerke, this.flirrStaerke);
    this.aktuelleY = this.y + random(-this.flirrStaerke, this.flirrStaerke);
  }

  // Größenanpassung in Abhängigkeit vom Energiewert
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

  // Diese Methode zeichnet das Blatt mathematisch.
  //
  // Die Form entsteht aus einer Folge von Punkten.
  // Wir berechnen zuerst die linke Hälfte des Blattes
  // und danach die rechte Hälfte.
  anzeigen() {
    push();

    translate(this.aktuelleX, this.aktuelleY);

    fill(this.farbe);
    stroke(30);
    strokeWeight(2);

    beginShape();

    // Obere Blattspitze
    vertex(0, -this.aktuelleGroesse * 0.6);

    // Linke Blatthälfte
    for (let winkel = 0; winkel <= PI; winkel += 0.15) {
      let y = map(winkel, 0, PI, -this.aktuelleGroesse * 0.6, this.aktuelleGroesse * 0.6);

      // Die Breite wird über sin(winkel) erzeugt:
      // oben und unten schmal, in der Mitte breiter.
      let breite = sin(winkel) * this.aktuelleGroesse * 0.35;

      vertex(-breite, y);
    }

    // Rechte Blatthälfte
    for (let winkel = PI; winkel >= 0; winkel -= 0.15) {
      let y = map(winkel, 0, PI, -this.aktuelleGroesse * 0.6, this.aktuelleGroesse * 0.6);
      let breite = sin(winkel) * this.aktuelleGroesse * 0.35;

      vertex(breite, y);
    }

    endShape(CLOSE);

    // Mittelrippe des Blattes
    stroke(255);
    strokeWeight(2);
    line(0, -this.aktuelleGroesse * 0.5, 0, this.aktuelleGroesse * 0.5);

    pop();
  }

  // Zusatzinformationen unterhalb des Objekts
  zeigeInformationen() {
    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);

    let textFrequenz = this.frequenzMin + " Hz - " + this.frequenzMax + " Hz";
    let textEnergie = "Energie: " + nf(this.aktivitaetswert, 1, 0);
    let textSchwelle = "Schwelle: " + this.schwellenwert;

    text(textFrequenz, this.x, this.y + this.grundGroesse / 2 + 28);
    text(textEnergie, this.x, this.y + this.grundGroesse / 2 + 42);
    text(textSchwelle, this.x, this.y + this.grundGroesse / 2 + 56);
  }
}

function setup() {
  createCanvas(1200, 790);

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

  // Mehrere Blattobjekte in einem Raster erzeugen
  let spalten = 5;
  let zeilen = 4;

  let startX = 160;
  let startY = 170;
  let abstandX = 220;
  let abstandY = 145;

  for (let zeile = 0; zeile < zeilen; zeile++) {
    for (let spalte = 0; spalte < spalten; spalte++) {
      let x = startX + spalte * abstandX;
      let y = startY + zeile * abstandY;

      let grundGroesse = 75;

      let index = zeile * spalten + spalte;
      let frequenzMin = 40 + index * 150;
      let frequenzMax = frequenzMin + 180;

      let schwellenwert = 80 + index * 3;
      let flirrStaerke = 1 + (index % 5);

      let rot = 40 + spalte * 20;
      let gruen = 120 + zeile * 20;
      let blau = 70 + spalte * 10;

      let farbe = color(rot, gruen, blau, 210);

      let neuesBlatt = new BlattFigur(
        x,
        y,
        grundGroesse,
        frequenzMin,
        frequenzMax,
        schwellenwert,
        flirrStaerke,
        farbe
      );

      figuren.push(neuesBlatt);
    }
  }
}

function draw() {
  background(245);

  fill(20);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(26);
  text("Beispiel 5.11 – Mathematische Blattform reagiert auf Audio", width / 2, 35);

  textSize(16);
  text(
    "Die Objekte werden hier nicht als Bild geladen, sondern durch berechnete Punkte als Form konstruiert.",
    width / 2,
    70
  );

  if (audioAktiv) {
    frequenzAnalyse.analyze();

    for (let i = 0; i < figuren.length; i++) {
      let figur = figuren[i];

      let energie = frequenzAnalyse.getEnergy(
        figur.frequenzMin,
        figur.frequenzMax
      );

      figur.aktualisieren(energie);
    }
  } else {
    for (let i = 0; i < figuren.length; i++) {
      figuren[i].aktualisieren(0);
    }
  }

  for (let i = 0; i < figuren.length; i++) {
    figuren[i].anzeigen();
    figuren[i].zeigeInformationen();
  }

  textSize(14);
  text(
    "Die Form des Objekts entsteht hier aus Mathematik. Verhalten und Darstellung liegen trotzdem weiterhin in derselben Klasse.",
    width / 2,
    height - 30
  );
}

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