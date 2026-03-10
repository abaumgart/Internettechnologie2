// Klasse als Bauplan
class Figur {
  constructor(x, y, groesse) {
    this.x = x;
    this.y = y;
    this.groesse = groesse;
  }

  anzeigen() {
    fill(40, 120, 220);
    noStroke();
    ellipse(this.x, this.y, this.groesse, this.groesse);
  }
}

// Hier wird eine Variable angelegt,
// die später ein Objekt speichern soll.
let figur1;

function setup() {
  createCanvas(800, 400);

  // Hier wird ein konkretes Objekt erzeugt.
  // new Figur(...) bedeutet:
  // Erzeuge eine neue Instanz der Klasse Figur.
  figur1 = new Figur(400, 220, 100);
}

function draw() {
  background(245);

  fill(20);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Ein Objekt wurde erzeugt.", width / 2, 60);

  textSize(16);
  text("Objektname: figur1", width / 2, 95);

  // Die Methode anzeigen() wird am Objekt aufgerufen.
  figur1.anzeigen();
}