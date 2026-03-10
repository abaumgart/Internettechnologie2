// Diese Variable speichert die geladene SVG-Grafik.
// Sie wird in preload() aus dem Projektordner geladen.
let figurGrafik;

// Array für alle Objekte
let figuren = [];

// Audio-Komponenten
let audioEingang;
let frequenzAnalyse;

// Elemente der Oberfläche
let startKnopf;
let quellAuswahl;
let statusText;

// Statusvariable
let audioAktiv = false;

// preload() wird vor setup() ausgeführt.
// Diese Funktion eignet sich zum Laden externer Dateien,
// damit sie beim Start des Programms bereits verfügbar sind.
function preload() {
  figurGrafik = loadImage("figur.svg");
}

// Die Klasse Figur beschreibt den Bauplan für alle Objekte.
//
// Neu ist in diesem Beispiel:
// Die Darstellung erfolgt nicht mehr über ellipse(),
// sondern über eine externe SVG-Grafik.
class Figur {
  constructor(x, y, groesse, frequenzMin, frequenzMax, schwellenwert, flirrStaerke, grafik) {
    // Ursprüngliche Position
    this.x = x;
    this.y = y;

    // Aktuelle Position
    // Diese kann sich beim Flirren leicht verändern.
    this.aktuelleX = x;
    this.aktuelleY = y;

    // Darstellungsgröße
    this.groesse = groesse;

    // Fachliche Attribute:
    // Dieser Frequenzbereich gehört zu diesem Objekt.
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Verhaltensattribute
    this.schwellenwert = schwellenwert;
    this.flirrStaerke = flirrStaerke;

    // Referenz auf die externe Grafik
    this.grafik = grafik;

    // Zuletzt gemessene Energie
    this.aktivitaetswert = 0;
  }

  // Diese Methode übernimmt den gemessenen Energiewert
  // für den zum Objekt gehörenden Frequenzbereich.
  aktualisieren(aktivitaetswert) {
    this.aktivitaetswert = aktivitaetswert;

    if (this.aktivitaetswert >= this.schwellenwert) {
      this.flirren();
    } else {
      this.aktuelleX = this.x;
      this.aktuelleY = this.y;
    }
  }

  // Leichtes Flirren durch kleine zufällige Positionsänderungen
  flirren() {
    this.aktuelleX = this.x + random(-this.flirrStaerke, this.flirrStaerke);
    this.aktuelleY = this.y + random(-this.flirrStaerke, this.flirrStaerke);
  }

  // Die Methode anzeigen() zeichnet jetzt die externe SVG-Grafik.
  anzeigen() {
    imageMode(CENTER);
    image(this.grafik, this.aktuelleX, this.aktuelleY, this.groesse, this.groesse);
  }

  // Zusätzliche Informationen unterhalb des Objekts.
  zeigeInformationen() {
    fill(20);
    noStroke();
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

function setup() {
  createCanvas(1200, 760);

  // Steuerbereich aus dem HTML holen
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

  // Mehrere Objekte erzeugen
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

      let groesse = 70;

      // Jeder Figur wird ein eigener Frequenzbereich zugeordnet.
      let index = zeile * spalten + spalte;
      let frequenzMin = 40 + index * 150;
      let frequenzMax = frequenzMin + 180;

      // Unterschiedliche Schwellenwerte
      let schwellenwert = 80 + index * 3;

      // Unterschiedliche Flirrstärken
      let flirrStaerke = 1 + (index % 5);

      // Neues Objekt erzeugen und ins Array legen
      let neueFigur = new Figur(
        x,
        y,
        groesse,
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
  text("Beispiel 5.9 – Externe SVG-Grafiken reagieren auf Audio", width / 2, 35);

  textSize(16);
  text(
    "Die Objekte verwenden eine geladene SVG-Datei. Jedes Objekt reagiert auf die Energie seines eigenen Frequenzbereichs.",
    width / 2,
    70
  );

  // Falls Audio aktiv ist, wird das Eingangssignal analysiert.
  if (audioAktiv) {
    frequenzAnalyse.analyze();

    // Jedes Objekt erhält den Energiewert seines Frequenzbereichs.
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

  // Alle Objekte darstellen
  for (let i = 0; i < figuren.length; i++) {
    figuren[i].anzeigen();
    figuren[i].zeigeInformationen();
  }

  textSize(14);
  text(
    "Die Klasse bleibt als Bauplan erhalten. Geändert wurde nur die visuelle Darstellung der Objekte.",
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