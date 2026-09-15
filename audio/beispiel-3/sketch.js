let audioEingang;
let frequenzAnalyse;
let spitzenErkennung;

let startKnopf;
let quellAuswahl;

let audioAktiv = false;
let quellenListe = [];
let punktSichtbarBis = 0;

// Anzeigehilfen
let erkannteBassEnergie = 0;
let statusText = "Noch nicht gestartet";

function setup() {
  createCanvas(900, 420);

  // Startknopf anlegen
  startKnopf = createButton("Audio starten");
  startKnopf.parent("steuerung");
  startKnopf.mousePressed(audioStarten);

  // Auswahlliste für Audioquellen anlegen
  quellAuswahl = createSelect();
  quellAuswahl.parent("steuerung");
  quellAuswahl.option("Audioquelle wird geladen ...");
  quellAuswahl.disable();

  textFont("Arial");
  textAlign(CENTER, CENTER);
}

function draw() {
  background(248);

  // Überschrift im Canvas
  fill(20);
  noStroke();
  textSize(24);
  text("Beat-Punkt auf einer Linie", width / 2, 35);

  textSize(15);
  text(statusText, width / 2, 65);

  // Horizontale Linie zeichnen
  stroke(40);
  strokeWeight(3);
  line(120, height / 2, width - 120, height / 2);

  // Mittelpunkt markieren
  noStroke();
  fill(70);
  textSize(13);
  text("Mitte", width / 2, height / 2 + 28);

  // Falls Audio noch nicht aktiv ist, nur Grundansicht zeigen
  if (!audioAktiv) {
    fill(130);
    textSize(16);
    text("Bitte Audio starten und eine Eingangsquelle wählen.", width / 2, height - 40);
    return;
  }

  // FFT analysiert das Eingangssignal
  // analyze() muss vor PeakDetect.update() aufgerufen werden
  frequenzAnalyse.analyze();

  // Peak-Erkennung mit FFT-Daten aktualisieren
  spitzenErkennung.update(frequenzAnalyse);

  // Energie im Bassbereich als zusätzliche Hilfsanzeige auslesen
  erkannteBassEnergie = frequenzAnalyse.getEnergy(40, 180);

  // Wenn ein Beat erkannt wurde, Punkt für kurze Zeit sichtbar machen
  if (spitzenErkennung.isDetected) {
    punktSichtbarBis = millis() + 140;
    statusText = "Beat erkannt";
  } else {
    statusText = "Analyse läuft";
  }

  // Punkt in der Mitte nur kurz einblenden
  if (millis() < punktSichtbarBis) {
    fill(20, 20, 20);
    ellipse(width / 2, height / 2, 18, 18);
  }

  // Zusatzinfos unten anzeigen
  noStroke();
  fill(20);
  textSize(16);
  text("Bass-Energie: " + nf(erkannteBassEnergie, 1, 0), width / 2, height - 60);

  textSize(14);
  text(
    "Die Beat-Erkennung schaut hier besonders auf tiefe Frequenzen zwischen 40 Hz und 180 Hz.",
    width / 2,
    height - 30
  );
}

function audioStarten() {
  userStartAudio();

  audioEingang = new p5.AudioIn();

  audioEingang.start(
    function() {
      // Verfügbare Eingangsquellen abfragen
      audioEingang.getSources(quellenGeladen);

      // FFT anlegen
      // Erster Wert = Glättung
      // Zweiter Wert = Anzahl der Frequenzbereiche
      frequenzAnalyse = new p5.FFT(0.8, 1024);

      // FFT soll genau diesen Audioeingang analysieren
      frequenzAnalyse.setInput(audioEingang);

      // Peak-Erkennung:
      // 40 bis 180 Hz = grober Bereich für Kick / tiefe Impulse
      // 0.18 = Schwellwert
      // 20 = Anzahl der Bilder, bis erneut ein Peak erkannt werden darf
      spitzenErkennung = new p5.PeakDetect(40, 180, 0.18, 20);

      audioAktiv = true;
      statusText = "Audio aktiv. Bitte Eingangsquelle prüfen.";
      startKnopf.attribute("disabled", "");
      startKnopf.html("Audio aktiv");
    },
    function(fehler) {
      console.error("Fehler beim Starten des Audioeingangs:", fehler);
      statusText = "Audio konnte nicht gestartet werden";
    }
  );
}

function quellenGeladen(quellen) {
  quellenListe = quellen;

  quellAuswahl.html("");
  quellAuswahl.option("Bitte Eingangsquelle wählen", "");

  for (let i = 0; i < quellenListe.length; i++) {
    let name = quellenListe[i].label;

    // Manche Browser liefern leere Namen, solange noch keine Rechte vergeben wurden
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
    statusText = "Gewählte Quelle: " + quellAuswahl.selected();
  }
}