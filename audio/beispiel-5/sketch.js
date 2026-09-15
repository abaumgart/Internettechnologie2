// Eine Klasse ist ein Bauplan.
// Sie beschreibt, welche Eigenschaften ein Objekt besitzt
// und welche Fähigkeiten es hat.
class Figur {
  // Der Konstruktor wird aufgerufen, wenn später ein Objekt erzeugt wird.
  // Hier definieren wir die Startwerte der Figur.
  constructor(x, y, groesse) {
    // Attribute:
    // Attribute sind die Daten, die zu einem Objekt gehören.
    this.x = x;
    this.y = y;
    this.groesse = groesse;
  }

  // Methode:
  // Eine Methode beschreibt, was ein Objekt tun kann.
  // Diese Methode zeichnet die Figur auf die Zeichenfläche.
  anzeigen() {
    fill(40, 120, 220);
    noStroke();
    ellipse(this.x, this.y, this.groesse, this.groesse);
  }
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(245);

  fill(20);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Es wurde nur eine Klasse definiert.", width / 2, 70);

  textSize(18);
  text("Noch existiert kein Objekt dieser Klasse.", width / 2, 110);

  textSize(16);
  text("Eine Klasse ist zunächst nur ein Bauplan.", width / 2, 160);
}