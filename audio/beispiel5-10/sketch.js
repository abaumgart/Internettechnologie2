// Externe Grafik
let figurGrafik;

// Array für alle Objekte
let figuren = [];

// Audio-Komponenten
let audioEingang;
let frequenzAnalyse;

// Oberfläche
let startKnopf;
let quellAuswahl;
let statusText;

// Audio-Status
let audioAktiv = false;

// Grafik vorab laden
function preload() {
  figurGrafik = loadImage("figur.svg");
}

// Die Klasse Figur beschreibt den gemeinsamen Bauplan.
//
// Neu in diesem Beispiel:
// Ein Objekt reagiert nicht nur mit Flirren,
// sondern zusätzlich mit einer Veränderung der Größe.
class Figur {
  constructor(x, y, grundGroesse, frequenzMin, frequenzMax, schwellenwert, flirrStaerke, grafik) {
    // Ursprüngliche Position
    this.x = x;
    this.y = y;

    // Aktuelle Position
    this.aktuelleX = x;
    this.aktuelleY = y;

    // Grundgröße der Figur
    this.grundGroesse = grundGroesse;

    // Aktuelle Größe, die sich verändern darf
    this.aktuelleGroesse = grundGroesse;

    // Fachliche Attribute
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Verhaltensattribute
    this.schwellenwert = schwellenwert;
    this.flirrStaerke = flirrStaerke;

    // Grafikreferenz
    this.grafik = grafik;

    // Letzter Energiewert
    this.aktivitaetswert = 0;
  }

  // Diese Methode erhält den gemessenen Energiewert
  // und steuert daraus die Reaktion des Objekts.
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

  // Leichte zufällige Positionsänderung
  flirren() {
    this.aktuelleX = this.x + random(-this.flirrStaerke, this.flirrStaerke);
    this.aktuelleY = this.y + random(-this.flirrStaerke, this.flirrStaerke);
  }

  // Größenänderung in Abhängigkeit vom Aktivitätswert
  skaliere() {
    // Die Energie der FFT liegt ungefähr zwischen 0 und 255.
    // Hier wird daraus ein Skalierungszuschlag berechnet.
    let zusatzGroesse = map(
      this.aktivitaetswert,
      this.schwellenwert,
      255,
      0,
      this.grundGroesse * 0.35
    );

    // Damit der Wert nicht versehentlich negativ oder zu groß wird,
    // begrenzen wir ihn auf einen sinnvollen Bereich.
    zusatzGroesse = constrain(zusatzGroesse, 0, this.grundGroesse * 0.35);

    this.aktuelleGroesse = this.grundGroesse + zusatzGroesse;
  }

  // Grafik zeichnen
  anzeigen() {
    imageMode(CENTER);
    image(this.grafik, this.aktuelleX, this.aktuelleY, this.aktuelleGroesse, this.aktuelleGroesse);
  }

  // Zusatzinformationen anzeigen
  zeigeInformationen() {
    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);

    let textFrequenz = this.frequenzMin + " Hz - " + this.frequenzMax + " Hz";
    let textEnergie = "Energie: " + nf(this.aktivitaetswert, 1, 0);
    let textSchwelle = "Schwelle: " + this.schwellenwert;
    let textGroesse = "Größe: " + nf(this.aktuelleGroesse, 1, 1);

    text(textFrequenz, this.x, this.y + this.grundGroesse / 2 + 18);
    text(textEnergie, this.x, this.y + this.grundGroesse / 2 + 32);
    text(textSchwelle, this.x, this.y + this.grundGroesse / 2 + 46);
    text(textGroesse, this.x, this.y + this.grundGroesse / 2 + 60);
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

  // Raster von Objekten erzeugen
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

      let grundGroesse = 70;

      let index = zeile * spalten + spalte;
      let frequenzMin = 40 + index * 150;
      let frequenzMax = frequenzMin + 180;

      let schwellenwert = 80 + index * 3;
      let flirrStaerke = 1 + (index % 5);

      let neueFigur = new Figur(
        x,
        y,
        grundGroesse,
        frequenzMin,
        frequenzMax,
        schwellenwert,
        flirrStaerke,
        figurGrafik
      );

      figuren.push(neueFigur);
    }
  }
}

function draw() {
  background(245);

  fill(20);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(26);
  text("Beispiel 5.10 – SVG reagiert mit Flirren und Skalierung", width / 2, 35);

  textSize(16);
  text(
    "Die Objekte reagieren auf Audioenergie jetzt mit zwei visuellen Effekten: Positionsänderung und Größenänderung.",
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
    "Ein Objekt kann mehrere Reaktionen gleichzeitig besitzen. Hier werden Bewegung und Größe gemeinsam verändert.",
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