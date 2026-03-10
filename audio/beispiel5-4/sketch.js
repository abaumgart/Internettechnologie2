// Die Klasse Figur beschreibt einen Bauplan für grafische Objekte.
//
// Neu ist hier:
// Ein Objekt besitzt nicht mehr nur sichtbare Attribute
// wie Position und Größe, sondern auch fachliche Attribute,
// nämlich einen minimalen und einen maximalen Frequenzwert.
//
// Diese Werte werden in diesem Beispiel noch nicht für Audioanalyse genutzt.
// Sie dienen zunächst dazu, die Klasse sinnvoll zu erweitern
// und die spätere Reaktion auf Klang vorzubereiten.
class Figur {
  // Der Konstruktor erhält alle Werte,
  // die ein neues Objekt beim Erzeugen bekommen soll.
  constructor(x, y, groesse, frequenzMin, frequenzMax) {
    // Visuelle Attribute:
    // Sie bestimmen, wo und wie die Figur dargestellt wird.
    this.x = x;
    this.y = y;
    this.groesse = groesse;

    // Fachliche Attribute:
    // Diese Werte beschreiben, für welchen Frequenzbereich
    // das Objekt später zuständig sein soll.
    this.frequenzMin = frequenzMin;
    this.frequenzMax = frequenzMax;
  }

  // Diese Methode zeichnet die Figur.
  anzeigen() {
    fill(40, 120, 220, 190);
    noStroke();
    ellipse(this.x, this.y, this.groesse, this.groesse);
  }

  // Diese Methode ergänzt eine textuelle Anzeige.
  // So wird sichtbar, dass das Objekt nicht nur eine Form ist,
  // sondern auch zusätzliche Daten mit sich trägt.
  zeigeInformationen() {
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(13);

    let beschriftung =
      this.frequenzMin + " Hz bis " + this.frequenzMax + " Hz";

    text(beschriftung, this.x, this.y + this.groesse / 2 + 18);
  }
}

// Drei Objekte derselben Klasse.
// Alle beruhen auf demselben Bauplan,
// haben aber unterschiedliche Attributwerte.
let figur1;
let figur2;
let figur3;

function setup() {
  createCanvas(1000, 500);

  // Objekt 1:
  // Diese Figur bekommt einen tiefen Frequenzbereich.
  figur1 = new Figur(220, 220, 90, 40, 180);

  // Objekt 2:
  // Diese Figur bekommt einen mittleren Frequenzbereich.
  figur2 = new Figur(500, 220, 90, 400, 1200);

  // Objekt 3:
  // Diese Figur bekommt einen höheren Frequenzbereich.
  figur3 = new Figur(780, 220, 90, 2500, 6000);
}

function draw() {
  background(245);

  fill(20);
  textAlign(CENTER, CENTER);

  textSize(26);
  text("Beispiel 5.4 – Objekte mit zusätzlichen Attributen", width / 2, 40);

  textSize(16);
  text(
    "Die Klasse Figur enthält jetzt neben Position und Größe auch einen Frequenzbereich.",
    width / 2,
    80
  );

  textSize(15);
  text(
    "Jedes Objekt besitzt also visuelle und fachliche Eigenschaften.",
    width / 2,
    110
  );

  // Objekte anzeigen
  figur1.anzeigen();
  figur2.anzeigen();
  figur3.anzeigen();

  // Informationen unter den Objekten anzeigen
  figur1.zeigeInformationen();
  figur2.zeigeInformationen();
  figur3.zeigeInformationen();

  // Zusätzliche Überschriften über den Figuren,
  // damit der Unterschied der Frequenzbereiche schneller erkennbar wird.
  textSize(15);
  fill(20);
  text("tiefer Bereich", figur1.x, 150);
  text("mittlerer Bereich", figur2.x, 150);
  text("hoher Bereich", figur3.x, 150);
}