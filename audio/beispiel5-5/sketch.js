// Die Klasse Figur beschreibt ein grafisches Objekt mit Attributen und Verhalten.
//
// In diesem Beispiel erhält das Objekt einen Aktivitätswert,
// der über einen Regler eingestellt wird.
// Überschreitet der Wert den Schwellenwert, beginnt die Figur zu flirren.
class Figur {
  constructor(x, y, groesse, frequenzMin, frequenzMax) {
    // Ursprüngliche Position der Figur
    this.x = x;
    this.y = y;

    // Aktuelle Position, die sich beim Flirren leicht verändern darf
    this.aktuelleX = x;
    this.aktuelleY = y;

    // Grundgröße der Figur
    this.groesse = groesse;

    // Fachliche Attribute für einen späteren Bezug zur Audioanalyse
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;

    // Schwellenwert:
    // Ab diesem Wert soll die Figur sichtbar reagieren.
    this.schwellenwert = 60;

    // Maximale Stärke des Flirrens
    this.flirrStaerke = 4;

    // Zuletzt übergebener Aktivitätswert
    this.aktivitaetswert = 0;
  }

  // Diese Methode übernimmt den aktuellen Wert von außen.
  // Das Hauptprogramm liefert also einen Wert,
  // das Objekt entscheidet über seine Reaktion.
  aktualisieren(aktivitaetswert) {
    this.aktivitaetswert = aktivitaetswert;

    if (this.aktivitaetswert >= this.schwellenwert) {
      this.flirren();
    } else {
      this.aktuelleX = this.x;
      this.aktuelleY = this.y;
    }
  }

  // Leichte zufällige Verschiebung für das Flirren
  flirren() {
    this.aktuelleX = this.x + random(-this.flirrStaerke, this.flirrStaerke);
    this.aktuelleY = this.y + random(-this.flirrStaerke, this.flirrStaerke);
  }

  // Figur zeichnen
  anzeigen() {
    fill(40, 120, 220, 190);
    noStroke();
    ellipse(this.aktuelleX, this.aktuelleY, this.groesse, this.groesse);
  }

  // Zusatzinformationen anzeigen
  zeigeInformationen() {
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(13);

    let textFrequenz = this.frequenzMin + " Hz bis " + this.frequenzMax + " Hz";
    let textAktivitaet = "Aktivitätswert: " + this.aktivitaetswert;

    text(textFrequenz, this.x, this.y + this.groesse / 2 + 18);
    text(textAktivitaet, this.x, this.y + this.groesse / 2 + 38);
  }
}

let figur1;

// Regler für den Aktivitätswert
let reglerAktivitaet;

// Absatz für die textuelle Anzeige des Reglerwerts
let reglerText;

function setup() {
  createCanvas(1000, 500);

  // Objekt erzeugen
  figur1 = new Figur(500, 220, 100, 40, 180);

  // Regler anlegen:
  // min = 0, max = 100, Startwert = 0, Schrittweite = 1
  reglerAktivitaet = createSlider(0, 100, 0, 1);
  reglerAktivitaet.parent("steuerung");
  reglerAktivitaet.style("width", "320px");

  // Textausgabe unter dem Regler
  reglerText = createP("Aktueller Reglerwert: 0");
  reglerText.parent("steuerung");
}

function draw() {
  background(245);

  fill(20);
  textAlign(CENTER, CENTER);

  textSize(26);
  text("Beispiel 5.5 – Verhalten in Abhängigkeit von einem Reglerwert", width / 2, 40);

  textSize(16);
  text(
    "Bewege den Regler. Überschreitet der Wert den Schwellenwert, beginnt die Figur leicht zu flirren.",
    width / 2,
    80
  );

  // Aktuellen Wert aus dem Regler lesen
  let aktuellerWert = reglerAktivitaet.value();

  // Text unter dem Regler aktualisieren
  reglerText.html("Aktueller Reglerwert: " + aktuellerWert);

  // Wert an das Objekt übergeben
  figur1.aktualisieren(aktuellerWert);

  // Objekt zeichnen
  figur1.anzeigen();
  figur1.zeigeInformationen();

  // Zusatztext
  textSize(15);
  fill(20);
  text("Schwellenwert für Flirren: " + figur1.schwellenwert, width / 2, 360);

  // Visuelle Anzeige des aktuellen Werts
  zeichneAktivitaetsanzeige(aktuellerWert);
}

function zeichneAktivitaetsanzeige(aktuellerWert) {
  let balkenX = 200;
  let balkenY = 410;
  let balkenBreite = 600;
  let balkenHoehe = 24;

  // Rahmen
  noFill();
  stroke(50);
  strokeWeight(2);
  rect(balkenX, balkenY, balkenBreite, balkenHoehe);

  // Füllung entsprechend des aktuellen Werts
  noStroke();
  fill(40, 120, 220);
  let aktuelleBreite = map(aktuellerWert, 0, 100, 0, balkenBreite);
  rect(balkenX, balkenY, aktuelleBreite, balkenHoehe);

  // Markierung für den Schwellenwert
  let markierungX = map(figur1.schwellenwert, 0, 100, balkenX, balkenX + balkenBreite);
  stroke(200, 0, 0);
  strokeWeight(3);
  line(markierungX, balkenY - 8, markierungX, balkenY + balkenHoehe + 8);

  // Beschriftungen
  noStroke();
  fill(20);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("0", balkenX, balkenY + 40);
  text("100", balkenX + balkenBreite, balkenY + 40);
  text("aktueller Aktivitätswert", width / 2, balkenY - 18);
}