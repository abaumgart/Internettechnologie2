// Die Klasse Figur beschreibt weiterhin den gemeinsamen Bauplan
// für unsere grafischen Objekte.
//
// Neu ist in diesem Beispiel:
// Es werden mehrere Objekte derselben Klasse erzeugt.
// Jedes Objekt besitzt eigene Attributwerte und erhält
// seinen Aktivitätswert über einen eigenen Regler.
//
// Didaktisch ist das wichtig:
// Die Klasse bleibt gleich.
// Die Objekte unterscheiden sich durch ihre individuellen Daten.
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

    // Fachliche Attribute
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Verhalten
    this.schwellenwert = schwellenwert;
    this.flirrStaerke = flirrStaerke;

    // Zuletzt übergebener Wert
    this.aktivitaetswert = 0;
  }

  // Diese Methode erhält den aktuellen Wert von außen
  // und entscheidet, ob die Figur flirren soll.
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

  // Zusatzinformationen unterhalb der Figur
  zeigeInformationen() {
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(13);

    let textFrequenz = this.frequenzMin + " Hz bis " + this.frequenzMax + " Hz";
    let textWert = "Aktivitätswert: " + this.aktivitaetswert;
    let textSchwelle = "Schwellenwert: " + this.schwellenwert;
    let textFlirren = "Flirrstärke: " + this.flirrStaerke;

    text(textFrequenz, this.x, this.y + this.groesse / 2 + 18);
    text(textWert, this.x, this.y + this.groesse / 2 + 38);
    text(textSchwelle, this.x, this.y + this.groesse / 2 + 58);
    text(textFlirren, this.x, this.y + this.groesse / 2 + 78);
  }
}

// Drei Objekte derselben Klasse
let figurBass;
let figurMitten;
let figurHoehen;

// Drei Regler
let reglerBass;
let reglerMitten;
let reglerHoehen;

// Drei Textanzeigen
let textBass;
let textMitten;
let textHoehen;

function setup() {
  createCanvas(1150, 560);

  // Objekte erzeugen
  figurBass = new Figur(
    220, 210, 95,
    40, 180,
    35,
    2,
    color(60, 120, 220, 190)
  );

  figurMitten = new Figur(
    575, 210, 95,
    400, 1200,
    60,
    5,
    color(220, 140, 40, 190)
  );

  figurHoehen = new Figur(
    930, 210, 95,
    2500, 6000,
    80,
    8,
    color(120, 70, 220, 190)
  );

  // Steuerbereich auswählen
  let steuerung = select("#steuerung");

  // Reglerblock 1: Bass
  let blockBass = createDiv();
  blockBass.parent(steuerung);
  blockBass.class("regler-block");

  createP("Bass-Regler").parent(blockBass);
  reglerBass = createSlider(0, 100, 0, 1);
  reglerBass.parent(blockBass);
  reglerBass.style("width", "220px");
  textBass = createP("Aktueller Wert: 0");
  textBass.parent(blockBass);

  // Reglerblock 2: Mitten
  let blockMitten = createDiv();
  blockMitten.parent(steuerung);
  blockMitten.class("regler-block");

  createP("Mitten-Regler").parent(blockMitten);
  reglerMitten = createSlider(0, 100, 0, 1);
  reglerMitten.parent(blockMitten);
  reglerMitten.style("width", "220px");
  textMitten = createP("Aktueller Wert: 0");
  textMitten.parent(blockMitten);

  // Reglerblock 3: Höhen
  let blockHoehen = createDiv();
  blockHoehen.parent(steuerung);
  blockHoehen.class("regler-block");

  createP("Höhen-Regler").parent(blockHoehen);
  reglerHoehen = createSlider(0, 100, 0, 1);
  reglerHoehen.parent(blockHoehen);
  reglerHoehen.style("width", "220px");
  textHoehen = createP("Aktueller Wert: 0");
  textHoehen.parent(blockHoehen);
}

function draw() {
  background(245);

  fill(20);
  textAlign(CENTER, CENTER);

  textSize(26);
  text("Beispiel 5.6 – Drei Objekte derselben Klasse", width / 2, 35);

  textSize(16);
  text(
    "Jedes Objekt hat eigene Attributwerte und erhält seinen Aktivitätswert über einen eigenen Regler.",
    width / 2,
    70
  );

  // Aktuelle Werte aus den Reglern lesen
  let wertBass = reglerBass.value();
  let wertMitten = reglerMitten.value();
  let wertHoehen = reglerHoehen.value();

  // Texte aktualisieren
  textBass.html("Aktueller Wert: " + wertBass);
  textMitten.html("Aktueller Wert: " + wertMitten);
  textHoehen.html("Aktueller Wert: " + wertHoehen);

  // Werte an die Objekte übergeben
  figurBass.aktualisieren(wertBass);
  figurMitten.aktualisieren(wertMitten);
  figurHoehen.aktualisieren(wertHoehen);

  // Überschriften über den Figuren
  textSize(18);
  fill(20);
  text("tiefer Bereich", figurBass.x, 120);
  text("mittlerer Bereich", figurMitten.x, 120);
  text("hoher Bereich", figurHoehen.x, 120);

  // Objekte zeichnen
  figurBass.anzeigen();
  figurMitten.anzeigen();
  figurHoehen.anzeigen();

  // Informationen anzeigen
  figurBass.zeigeInformationen();
  figurMitten.zeigeInformationen();
  figurHoehen.zeigeInformationen();

  // Balkenanzeigen unter den Figuren
  zeichneWertbalken(figurBass.x - 120, 430, 240, 20, wertBass, figurBass.schwellenwert);
  zeichneWertbalken(figurMitten.x - 120, 430, 240, 20, wertMitten, figurMitten.schwellenwert);
  zeichneWertbalken(figurHoehen.x - 120, 430, 240, 20, wertHoehen, figurHoehen.schwellenwert);
}

// Zeichnet einen Balken zur Visualisierung des aktuellen Werts
// und des Schwellenwerts.
function zeichneWertbalken(x, y, breite, hoehe, wert, schwellenwert) {
  // Rahmen
  noFill();
  stroke(50);
  strokeWeight(2);
  rect(x, y, breite, hoehe);

  // Aktueller Wert
  noStroke();
  fill(50, 130, 220);
  let aktuelleBreite = map(wert, 0, 100, 0, breite);
  rect(x, y, aktuelleBreite, hoehe);

  // Schwellenwert markieren
  let markierungX = map(schwellenwert, 0, 100, x, x + breite);
  stroke(200, 0, 0);
  strokeWeight(3);
  line(markierungX, y - 7, markierungX, y + hoehe + 7);

  // Beschriftung
  noStroke();
  fill(20);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("0", x, y + 32);
  text("100", x + breite, y + 32);
}