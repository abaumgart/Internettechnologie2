let audioEingang;
let frequenzAnalyse;
let spitzenErkennung;

let startKnopf;
let quellAuswahl;

let audioAktiv = false;
let quellenListe = [];

let punktSichtbarBis = 0;
let erkannteBassEnergie = 0;
let statusText = "Noch nicht gestartet";

// Hier speichern wir das aktuelle Frequenzspektrum.
// Die FFT liefert dabei Werte zwischen 0 und 255.
let spektrum = [];

function setup() {
  createCanvas(980, 620);

  // Knopf zum Starten des Audios anlegen
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

  zeichneUeberschrift();
  zeichneBeatLinie();

  if (!audioAktiv) {
    fill(120);
    noStroke();
    textSize(16);
    text("Bitte Audio starten und danach die richtige Eingangsquelle wählen.", width / 2, height - 30);
    return;
  }

  // FFT-Analyse durchführen.
  // analyze() liefert ein Array mit Spektralwerten zurück.
  spektrum = frequenzAnalyse.analyze();

  // Peak-Erkennung mit den aktuellen FFT-Daten aktualisieren.
  spitzenErkennung.update(frequenzAnalyse);

  // Energie im tiefen Bereich auslesen.
  // Dort sitzen oft Kickdrum und andere rhythmische Impulse.
  erkannteBassEnergie = frequenzAnalyse.getEnergy(40, 180);

  // Wenn ein Beat erkannt wurde, soll der Punkt kurz sichtbar sein.
  if (spitzenErkennung.isDetected) {
    punktSichtbarBis = millis() + 140;
    statusText = "Beat erkannt";
  } else {
    statusText = "Analyse läuft";
  }

  zeichneBeatPunkt();
  zeichneSpektrum();
  zeichneZusatzinfos();
}

function zeichneUeberschrift() {
  fill(20);
  noStroke();

  textSize(24);
  text("Beat-Punkt und Live-Frequenzspektrum", width / 2, 35);

  textSize(15);
  text(statusText, width / 2, 65);
}

function zeichneBeatLinie() {
  // Horizontale Linie für die Beat-Anzeige
  stroke(40);
  strokeWeight(3);
  line(120, 160, width - 120, 160);

  noStroke();
  fill(70);
  textSize(13);
  text("Mitte", width / 2, 188);

  textSize(15);
  fill(20);
  text("Wenn ein Beat erkannt wird, erscheint kurz ein Punkt in der Mitte.", width / 2, 115);
}

function zeichneBeatPunkt() {
  if (millis() < punktSichtbarBis) {
    fill(20);
    noStroke();
    ellipse(width / 2, 160, 18, 18);
  }
}

function zeichneSpektrum() {
  // Bereich für das Spektrum
  let links = 80;
  let oben = 270;
  let breite = width - 160;
  let hoehe = 240;

  // Rahmen und Beschriftung
  noFill();
  stroke(180);
  strokeWeight(1);
  rect(links, oben, breite, hoehe);

  noStroke();
  fill(20);
  textSize(16);
  text("Live-Frequenzspektrum", width / 2, oben - 20);

  textSize(13);
  fill(80);
  text("tief", links + 20, oben + hoehe + 20);
  text("hoch", links + breite - 20, oben + hoehe + 20);

  // Jede Säule zeigt einen Frequenzbereich.
  // Je höher die Säule, desto stärker ist dort gerade die Energie.
  let anzahlWerte = spektrum.length;
  let spaltenBreite = breite / anzahlWerte;

  noStroke();
  fill(30);

  for (let i = 0; i < anzahlWerte; i++) {
    let wert = spektrum[i];

    // FFT-Werte liegen zwischen 0 und 255.
    // Diese werden auf die Zeichenhöhe des Spektrums umgerechnet.
    let spaltenHoehe = map(wert, 0, 255, 0, hoehe);

    let x = links + i * spaltenBreite;
    let y = oben + hoehe - spaltenHoehe;

    rect(x, y, spaltenBreite, spaltenHoehe);
  }

  // Markierung für den Bassbereich
  // Dieser Bereich wird für die Beat-Erkennung besonders beachtet.
  noFill();
  stroke(120);
  strokeWeight(2);

  // Nur grobe visuelle Markierung am linken Anfang des Spektrums,
  // weil tiefe Frequenzen links liegen.
  rect(links, oben, breite * 0.12, hoehe);

  noStroke();
  fill(60);
  textSize(12);
  text("relevanter Bereich für Beat-Erkennung", links + 90, oben - 6);
}

function zeichneZusatzinfos() {
  noStroke();
  fill(20);

  textSize(16);
  text("Bass-Energie: " + nf(erkannteBassEnergie, 1, 0), width / 2, 545);

  textSize(14);
  text(
    "Die FFT zerlegt das Eingangssignal in viele Frequenzbereiche. Unten siehst du deren aktuelle Verteilung als Balken.",
    width / 2,
    575
  );
}

function audioStarten() {
  // Der Browser verlangt normalerweise eine Nutzeraktion,
  // bevor Audio wirklich starten darf.
  userStartAudio();

  audioEingang = new p5.AudioIn();

  audioEingang.start(
    function() {
      // Verfügbare Audioquellen laden
      audioEingang.getSources(quellenGeladen);

      // FFT anlegen:
      // 0.8 = Glättung
      // 1024 = Anzahl der Analysewerte
      frequenzAnalyse = new p5.FFT(0.8, 1024);

      // FFT soll den Audioeingang analysieren
      frequenzAnalyse.setInput(audioEingang);

      // Peak-Erkennung im tiefen Bereich
      // 40 bis 180 Hz: grober Startbereich für Kick und Bassimpulse
      // 0.18: Schwellwert
      // 20: kurze Sperre, damit nicht sofort mehrfach ausgelöst wird
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

    // Manche Browser liefern erst nach Freigabe sinnvolle Namen.
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