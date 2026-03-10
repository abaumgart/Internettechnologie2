// Diese Klasse beschreibt weiterhin den gemeinsamen Bauplan
// für alle grafischen Objekte.
//
// Neu ist in diesem Beispiel:
// Der Aktivitätswert wird nicht mehr von einem Regler geliefert,
// sondern aus einer echten Audioanalyse berechnet.
//
// Jedes Objekt besitzt einen eigenen Frequenzbereich.
// Genau für diesen Bereich wird später per FFT ein Energiewert gelesen.
// Dieser Wert wird an das Objekt übergeben.
class Figur {
  constructor(x, y, groesse, frequenzMin, frequenzMax, schwellenwert, flirrStaerke, farbe) {
    // Ursprüngliche Position
    this.x = x;
    this.y = y;

    // Aktuelle Position, die sich beim Flirren verändern darf
    this.aktuelleX = x;
    this.aktuelleY = y;

    // Darstellung
    this.groesse = groesse;
    this.farbe = farbe;

    // Fachliche Attribute:
    // Dieser Frequenzbereich gehört zu diesem Objekt.
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Verhaltensattribute
    this.schwellenwert = schwellenwert;
    this.flirrStaerke = flirrStaerke;

    // Zuletzt gemessene Energie
    this.aktivitaetswert = 0;
  }

  // Diese Methode erhält die gemessene Energie des passenden Frequenzbereichs.
  // Das Objekt entscheidet dann selbst, ob es reagieren soll.
  aktualisieren(aktivitaetswert) {
    this.aktivitaetswert = aktivitaetswert;

    if (this.aktivitaetswert >= this.schwellenwert) {
      this.flirren();
    } else {
      this.aktuelleX = this.x;
      this.aktuelleY = this.y;
    }
  }

  // Leichte zufällige Verschiebung
  flirren() {
    this.aktuelleX = this.x + random(-this.flirrStaerke, this.flirrStaerke);
    this.aktuelleY = this.y + random(-this.flirrStaerke, this.flirrStaerke);
  }

  // Objekt zeichnen
  anzeigen() {
    fill(this.farbe);
    noStroke();
    ellipse(this.aktuelleX, this.aktuelleY, this.groesse, this.groesse);
  }

  // Informationen unterhalb der Figur anzeigen
  zeigeInformationen() {
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(11);

    let textFrequenz = this.frequenzMin + " Hz - " + this.frequenzMax + " Hz";
    let textWert = "Energie: " + nf(this.aktivitaetswert, 1, 0);
    let textSchwelle = "Schwelle: " + this.schwellenwert;

    text(textFrequenz, this.x, this.y + this.groesse / 2 + 14);
    text(textWert, this.x, this.y + this.groesse / 2 + 28);
    text(textSchwelle, this.x, this.y + this.groesse / 2 + 42);
  }
}

// Array für viele Objekte
let figuren = [];

// Audio
let audioEingang;
let frequenzAnalyse;

// Oberfläche
let startKnopf;
let quellAuswahl;
let statusText;

// Status
let audioAktiv = false;

function setup() {
  createCanvas(1200, 760);

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

  // Viele Objekte erzeugen und im Array speichern
  let spalten = 5;
  let zeilen = 4;

  let startX = 160;
  let startY = 160;
  let abstandX = 220;
  let abstandY = 140;

  for (let zeile = 0; zeile < zeilen; zeile++) {
    for (let spalte = 0; spalte < spalten; spalte++) {
      let x = startX + spalte * abstandX;
      let y = startY + zeile * abstandY;

      let groesse = 60;

      // Gestaffelte Frequenzbereiche
      let index = zeile * spalten + spalte;
      let frequenzMin = 40 + index * 150;
      let frequenzMax = frequenzMin + 180;

      // Unterschiedliche Schwellenwerte
      let schwellenwert = 80 + index * 3;

      // Unterschiedliche Flirrstärken
      let flirrStaerke = 1 + (index % 5);

      // Unterschiedliche Farben
      let rot = 50 + spalte * 35;
      let gruen = 80 + zeile * 35;
      let blau = 180;

      let farbe = color(rot, gruen, blau, 190);

      let neueFigur = new Figur(
        x,
        y,
        groesse,
        frequenzMin,
        frequenzMax,
        schwellenwert,
        flirrStaerke,
        farbe
      );

      figuren.push(neueFigur);
    }
  }
}

function draw() {
  background(245);

  fill(20);
  textAlign(CENTER, CENTER);

  textSize(26);
  text("Beispiel 5.8 – Audioanalyse für viele Objekte", width / 2, 35);

  textSize(16);
  text(
    "Jedes Objekt erhält seine Energie aus einem eigenen Frequenzbereich des Eingangssignals.",
    width / 2,
    70
  );

  // Nur wenn Audio aktiv ist, wird FFT ausgewertet.
  if (audioAktiv) {
    frequenzAnalyse.analyze();

    // Für jedes Objekt wird die Energie im eigenen Frequenzbereich gelesen.
    for (let i = 0; i < figuren.length; i++) {
      let figur = figuren[i];

      let energie = frequenzAnalyse.getEnergy(
        figur.frequenzMin,
        figur.frequenzMax
      );

      figur.aktualisieren(energie);
    }
  } else {
    // Ohne Audio bleiben alle Objekte ruhig.
    for (let i = 0; i < figuren.length; i++) {
      figuren[i].aktualisieren(0);
    }
  }

  // Alle Objekte zeichnen
  for (let i = 0; i < figuren.length; i++) {
    figuren[i].anzeigen();
    figuren[i].zeigeInformationen();
  }

  textSize(14);
  fill(20);
  text(
    "Die FFT liefert Werte für Frequenzbereiche. Jedes Objekt reagiert nur auf seinen eigenen Bereich.",
    width / 2,
    height - 30
  );
}

function audioStarten() {
  userStartAudio();

  audioEingang = new p5.AudioIn();

  audioEingang.start(
    function() {
      // FFT anlegen
      frequenzAnalyse = new p5.FFT(0.8, 1024);
      frequenzAnalyse.setInput(audioEingang);

      // Verfügbare Quellen laden
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