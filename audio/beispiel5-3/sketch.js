class Figur {
  constructor(x, y, groesse) {
    this.x = x;
    this.y = y;
    this.groesse = groesse;
  }

  anzeigen() {
    fill(40, 120, 220, 190);
    noStroke();
    ellipse(this.x, this.y, this.groesse, this.groesse);
  }
}

// Zwei einzelne Objekte
let figur1;
let figur2;

// Ein Array für viele Objekte
let figuren = [];

function setup() {
  createCanvas(900, 500);

  // Zwei einzelne Objekte erzeugen
  figur1 = new Figur(180, 120, 70);
  figur2 = new Figur(320, 120, 70);

  // Jetzt werden 30 weitere Objekte erzeugt.
  // Alle basieren auf derselben Klasse,
  // erhalten aber unterschiedliche Positionswerte.
  for (let i = 0; i < 30; i++) {
    let x = random(80, width - 80);
    let y = random(220, height - 60);
    let groesse = random(30, 70);

    let neueFigur = new Figur(x, y, groesse);
    figuren.push(neueFigur);
  }
}

function draw() {
  background(245);

  fill(20);
  textAlign(CENTER, CENTER);

  textSize(24);
  text("Zwei einzelne Objekte", width / 2, 35);

  textSize(15);
  text("figur1 und figur2 wurden direkt erzeugt.", width / 2, 65);

  // Die beiden einzelnen Objekte zeichnen
  figur1.anzeigen();
  figur2.anzeigen();

  textSize(24);
  text("30 weitere Objekte derselben Klasse", width / 2, 185);

  textSize(15);
  text("Alle Objekte haben denselben Bauplan, aber unterschiedliche Attributwerte.", width / 2, 215);

  // Alle Objekte aus dem Array zeichnen
  for (let i = 0; i < figuren.length; i++) {
    figuren[i].anzeigen();
  }
}