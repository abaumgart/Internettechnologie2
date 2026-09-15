// =========================
// Oberfläche
// =========================
let demoStartKnopf;
let demoStopKnopf;
let liveStartKnopf;
let quellAuswahl;
let statusText;

// =========================
// Audio und Analyse
// =========================
let oscillator;
let huellkurve;
let audioEingang;
let frequenzAnalyse;

// =========================
// Betriebsmodus
// =========================
let modus = "kein-audio"; // "kein-audio", "demo", "live"

// =========================
// Zeitsteuerung für Demo-Modus
// =========================
let letzterImpuls = 0;
let impulsIntervall = 500;

// =========================
// Visualisierung
// =========================
let ringImpuls = 0;
let signalWerte = [];
let partikel = [];

function setup() {
  let zeichenflaeche = createCanvas(1000, 560);
  zeichenflaeche.parent(document.body);

  steuerungErzeugen();
  audioVorbereiten();
  visualisierungVorbereiten();
}

function draw() {
  hintergrundZeichnen();

  if (modus === "demo") {
    demoAktualisieren();
  }

  if (frequenzAnalyse) {
    frequenzAnalyse.analyze();
  }

  let bass = 0;
  let mitten = 0;
  let hoehen = 0;

  if (frequenzAnalyse) {
    bass = frequenzAnalyse.getEnergy(20, 120);
    mitten = frequenzAnalyse.getEnergy(250, 2000);
    hoehen = frequenzAnalyse.getEnergy(4000, 10000);
  }

  ringImpuls = lerp(ringImpuls, bass, 0.18);

  signalWerte.shift();
  signalWerte.push(mitten);

  partikelAktualisieren(hoehen);

  rasterZeichnen();
  typografieZeichnen(bass, mitten, hoehen);
  ringZeichnen(bass, mitten, hoehen);
  signalLinieZeichnen();
  partikelZeichnen(hoehen);
}

// =========================
// Initialisierung
// =========================
function steuerungErzeugen() {
  demoStartKnopf = createButton("Demo-Modus starten");
  demoStartKnopf.parent("steuerung");
  demoStartKnopf.mousePressed(demoModusStarten);

  liveStartKnopf = createButton("Live-Modus starten");
  liveStartKnopf.parent("steuerung");
  liveStartKnopf.mousePressed(liveModusStarten);

  demoStopKnopf = createButton("Stoppen");
  demoStopKnopf.parent("steuerung");
  demoStopKnopf.mousePressed(audioStoppen);

  quellAuswahl = createSelect();
  quellAuswahl.parent("steuerung");
  quellAuswahl.option("Audioquelle wird im Live-Modus geladen");
  quellAuswahl.disable();
  quellAuswahl.changed(quelleWechseln);

  statusText = createP("Status: Noch nicht gestartet");
  statusText.parent("steuerung");
}

function audioVorbereiten() {
  oscillator = new p5.Oscillator("sine");
  oscillator.freq(55);
  oscillator.amp(0);

  huellkurve = new p5.Envelope();
  huellkurve.setADSR(0.001, 0.08, 0.0, 0.18);
  huellkurve.setRange(0.9, 0);

  frequenzAnalyse = new p5.FFT(0.85, 256);
}

function visualisierungVorbereiten() {
  for (let i = 0; i < 120; i++) {
    signalWerte.push(0);
  }

  for (let i = 0; i < 70; i++) {
    partikel.push({
      x: random(width),
      y: random(height),
      groesse: random(1, 3),
      tempo: random(0.1, 0.5)
    });
  }
}

// =========================
// Audio-Modi
// =========================
function demoModusStarten() {
  userStartAudio();
  audioStoppenIntern();

  if (oscillator.started !== true) {
    oscillator.start();
  }

  modus = "demo";
  frequenzAnalyse.setInput(oscillator);
  letzterImpuls = millis();

  statusText.html("Status: Demo-Modus aktiv");
}

function liveModusStarten() {
  userStartAudio();
  audioStoppenIntern();

  audioEingang = new p5.AudioIn();

  audioEingang.start(
    function() {
      modus = "live";
      frequenzAnalyse.setInput(audioEingang);
      statusText.html("Status: Live-Modus aktiv. Bitte Audioquelle prüfen.");

      audioEingang.getSources(quellenGeladen);
    },
    function(fehler) {
      console.error("Fehler beim Starten des Audioeingangs:", fehler);
      statusText.html("Status: Live-Modus konnte nicht gestartet werden.");
    }
  );
}

function audioStoppen() {
  audioStoppenIntern();
  modus = "kein-audio";
  statusText.html("Status: Gestoppt");
}

function audioStoppenIntern() {
  oscillator.amp(0, 0.05);

  if (audioEingang) {
    audioEingang.stop();
    audioEingang = null;
  }
}

// =========================
// Demo-Audio
// =========================
function demoAktualisieren() {
  if (millis() - letzterImpuls > impulsIntervall) {
    impulsAusloesen();
    letzterImpuls = millis();
  }
}

function impulsAusloesen() {
  let grundFrequenz = random([48, 52, 55, 58, 60]);
  oscillator.freq(grundFrequenz);
  huellkurve.play(oscillator);
}

// =========================
// Quellenverwaltung
// =========================
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

  quellAuswahl.removeAttribute("disabled");
}

function quelleWechseln() {
  if (!audioEingang) {
    return;
  }

  let ausgewaehlterIndex = int(quellAuswahl.value());

  if (!isNaN(ausgewaehlterIndex)) {
    audioEingang.setSource(ausgewaehlterIndex);
    statusText.html("Status: Gewählte Quelle: " + quellAuswahl.selected());
  }
}

// =========================
// Darstellung
// =========================
function hintergrundZeichnen() {
  background(11, 15, 20);
}

function rasterZeichnen() {
  stroke(28, 38, 52);
  strokeWeight(1);

  for (let x = 0; x <= width; x += 60) {
    line(x, 0, x, height);
  }

  for (let y = 0; y <= height; y += 60) {
    line(0, y, width, y);
  }
}

function typografieZeichnen(bass, mitten, hoehen) {
  noStroke();
  fill(235, 242, 248);
  textAlign(CENTER, CENTER);

  textSize(30);
  text("JADE SIGNAL", width / 2, 48);

  fill(160, 176, 192);
  textSize(14);
  text("JADE HS // Internettechnologien 2", width / 2, 78);

  textSize(13);
  text("Code. Klang. Visualisierung.", width / 2, 100);

  fill(110, 130, 150);
  textAlign(LEFT, CENTER);
  text("BASS", 70, height - 100);
  text("MID", 70, height - 78);
  text("HIGH", 70, height - 56);

  fill(160, 176, 192);
  textAlign(RIGHT, CENTER);
  text("Modus: " + modus, width - 50, 40);

  textAlign(LEFT, CENTER);
  text("Bass: " + nf(bass, 1, 0), 130, height - 100);
  text("Mitten: " + nf(mitten, 1, 0), 130, height - 78);
  text("Höhen: " + nf(hoehen, 1, 0), 130, height - 56);
}

function ringZeichnen(bass, mitten, hoehen) {
  push();
  translate(width / 2, height / 2 - 10);

  let grundRadius = 90;
  let zusatzRadius = map(ringImpuls, 0, 255, 0, 75);
  let radius = grundRadius + zusatzRadius;

  noFill();

  stroke(80, 220, 255, 45);
  strokeWeight(22);
  ellipse(0, 0, radius * 2.2, radius * 2.2);

  stroke(120, 235, 255);
  strokeWeight(4);
  ellipse(0, 0, radius * 2, radius * 2);

  stroke(255, 255, 255, 120);
  strokeWeight(1.5);
  ellipse(0, 0, radius * 1.55, radius * 1.55);

  stroke(180, 220, 255, 160);
  strokeWeight(2);
  line(-radius - 20, 0, -radius - 6, 0);
  line(radius + 6, 0, radius + 20, 0);
  line(0, -radius - 20, 0, -radius - 6);
  line(0, radius + 6, 0, radius + 20);

  noStroke();
  fill(180, 245, 255, 90);
  let kern = map(hoehen, 0, 255, 8, 28);
  ellipse(0, 0, kern, kern);

  pop();
}

function signalLinieZeichnen() {
  let links = 140;
  let rechts = width - 140;
  let basisY = height - 120;

  stroke(180, 200, 220, 120);
  strokeWeight(1);
  line(links, basisY, rechts, basisY);

  noFill();
  stroke(120, 235, 255);
  strokeWeight(2);

  beginShape();
  for (let i = 0; i < signalWerte.length; i++) {
    let x = map(i, 0, signalWerte.length - 1, links, rechts);
    let y = basisY - map(signalWerte[i], 0, 255, 0, 70);
    vertex(x, y);
  }
  endShape();
}

function partikelAktualisieren(hoehen) {
  let drift = map(hoehen, 0, 255, 0.05, 1.2);

  for (let partikelObjekt of partikel) {
    partikelObjekt.y -= partikelObjekt.tempo * drift;

    if (partikelObjekt.y < -10) {
      partikelObjekt.y = height + 10;
      partikelObjekt.x = random(width);
    }
  }
}

function partikelZeichnen(hoehen) {
  let helligkeit = map(hoehen, 0, 255, 40, 180);

  noStroke();
  for (let partikelObjekt of partikel) {
    fill(160, 230, 255, helligkeit);
    ellipse(
      partikelObjekt.x,
      partikelObjekt.y,
      partikelObjekt.groesse,
      partikelObjekt.groesse
    );
  }
}