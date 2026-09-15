// Die Klasse Figur beschreibt weiterhin den gemeinsamen Bauplan
// für alle grafischen Objekte.
//
// In diesem Beispiel ist entscheidend:
// Es gibt nicht mehr nur einzelne benannte Objekte,
// sondern viele Objekte, die gemeinsam in einem Array gespeichert werden.
//
// Dadurch lässt sich dieselbe Logik mit Schleifen
// auf alle Objekte anwenden.
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

    // Verhaltensattribute
    this.schwellenwert = schwellenwert;
    this.flirrStaerke = flirrStaerke;

    // Zuletzt übergebener Aktivitätswert
    this.aktivitaetswert = 0;
  }

  // Diese Methode erhält einen Wert von außen
  // und entscheidet, ob das Objekt reagieren soll.
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

  // Zusätzliche Informationen unter der Figur
  zeigeInformationen() {
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(11);

    let textFrequenz = this.frequenzMin + " Hz - " + this.frequenzMax + " Hz";
    let textWert = "Wert: " + this.aktivitaetswert;
    let textSchwelle = "Schwelle: " + this.schwellenwert;

    text(textFrequenz, this.x, this.y + this.groesse / 2 + 14);
    text(textWert, this.x, this.y + this.groesse / 2 + 28);
    text(textSchwelle, this.x, this.y + this.groesse / 2 + 42);
  }
}

// Array für viele Objekte
let figuren = [];

// Ein gemeinsamer Regler für alle Objekte
let reglerAktivitaet;
let textReglerwert;

function setup() {
  createCanvas(1200, 760);

  // Steuerbereich aus dem HTML holen
  let steuerung = select("#steuerung");

  // Steuerblock anlegen
  let block = createDiv();
  block.parent(steuerung);
  block.class("steuerung-block");

  createP("Gemeinsamer Aktivitätsregler für alle Objekte").parent(block);

  reglerAktivitaet = createSlider(0, 100, 0, 1);
  reglerAktivitaet.parent(block);
  reglerAktivitaet.style("width", "280px");

  textReglerwert = createP("Aktueller Wert: 0");
  textReglerwert.parent(block);

  // Mehrere Objekte erzeugen und in das Array legen
  //
  // Alle Objekte basieren auf derselben Klasse,
  // unterscheiden sich aber in ihren Attributwerten.
  //
  // Hier wird ein Raster erzeugt:
  // 5 Spalten und 4 Zeilen = 20 Objekte.
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

      // Die Frequenzbereiche werden hier systematisch gestaffelt,
      // damit sichtbar wird, dass jedes Objekt eigene Werte besitzt.
      let frequenzMin = 40 + (zeile * 4 + spalte) * 120;
      let frequenzMax = frequenzMin + 180;

      // Unterschiedliche Schwellenwerte
      let schwellenwert = 20 + (zeile * 4 + spalte) * 3;

      // Unterschiedliche Flirrstärken
      let flirrStaerke = 1 + ((zeile + spalte) % 5);

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
  text("Beispiel 5.7 – Viele Objekte derselben Klasse in einem Array", width / 2, 35);

  textSize(16);
  text(
    "Alle Figuren erhalten denselben Reglerwert. Ob sie reagieren, hängt von ihren individuellen Attributen ab.",
    width / 2,
    70
  );

  // Aktuellen Reglerwert lesen
  let aktuellerWert = reglerAktivitaet.value();
  textReglerwert.html("Aktueller Wert: " + aktuellerWert);

  // Alle Objekte mit einer Schleife aktualisieren
  for (let i = 0; i < figuren.length; i++) {
    figuren[i].aktualisieren(aktuellerWert);
  }

  // Alle Objekte mit einer Schleife anzeigen
  for (let i = 0; i < figuren.length; i++) {
    figuren[i].anzeigen();
    figuren[i].zeigeInformationen();
  }

  // Zusatzinfo unten
  textSize(14);
  fill(20);
  text(
    "Ein gemeinsamer Wert führt nicht bei allen Objekten zur gleichen Reaktion, weil jedes Objekt einen eigenen Schwellenwert besitzt.",
    width / 2,
    height - 30
  );
}