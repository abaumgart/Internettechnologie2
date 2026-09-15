let audioEingang;
let startKnopf;
let pegel = 0;
let audioGestartet = false;

function setup() {
  createCanvas(500, 700);

  // Knopf anlegen, damit der Nutzer den Audiozugriff bewusst startet
  startKnopf = createButton("Audio starten");
  startKnopf.mousePressed(audioStarten);

  textFont("Arial");
}

function draw() {
  background(240);

  // Überschrift
  fill(20);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Ampel für Eingangssignal", width / 2, 40);

  // Wenn Audio noch nicht aktiv ist
  if (!audioGestartet) {
    textSize(18);
    text("Bitte auf „Audio starten“ klicken\nund den Zugriff erlauben.", width / 2, 90);
    zeichneAmpel("aus");
    return;
  }

  // Lautstärke aus dem Eingang lesen
  pegel = audioEingang.getLevel();

  // Prozentwert berechnen
  let prozent = pegel * 100;

  // Ampelstatus bestimmen
  let status = "gruen";

  if (prozent <= 30) {
    status = "gruen";
  } else if (prozent <= 60) {
    status = "gelb";
  } else {
    status = "rot";
  }

  // Ampel zeichnen
  zeichneAmpel(status);

  // Zusatzinfos anzeigen
  fill(20);
  noStroke();
  textSize(22);
  text("Lautstärke: " + nf(prozent, 1, 1) + " %", width / 2, 610);

  textSize(18);
  text("Status: " + status.toUpperCase(), width / 2, 650);
}

function audioStarten() {
  // Audio-Kontext starten
  userStartAudio();

  // Eingang anlegen
  audioEingang = new p5.AudioIn();

  // Eingang aktivieren
  audioEingang.start(
    function() {
      // Eingang zusätzlich hörbar machen
      audioEingang.connect();
      audioGestartet = true;
      startKnopf.html("Audio aktiv");
      startKnopf.attribute("disabled", "");
    },
    function(fehler) {
      console.error("Fehler beim Audiozugriff:", fehler);
      alert("Der Audiozugriff konnte nicht gestartet werden.");
    }
  );
}

function zeichneAmpel(status) {
  // Gehäuse
  fill(60);
  stroke(30);
  strokeWeight(3);
  rect(width / 2 - 70, 140, 140, 360, 25);

  // Standardfarben: dunkel
  let rotFarbe = color(80, 0, 0);
  let gelbFarbe = color(80, 80, 0);
  let gruenFarbe = color(0, 80, 0);

  // Je nach Status eine Lampe aktiv schalten
  if (status === "rot") {
    rotFarbe = color(255, 0, 0);
  } else if (status === "gelb") {
    gelbFarbe = color(255, 220, 0);
  } else if (status === "gruen") {
    gruenFarbe = color(0, 200, 0);
  }

  // Rote Lampe
  fill(rotFarbe);
  ellipse(width / 2, 210, 80, 80);

  // Gelbe Lampe
  fill(gelbFarbe);
  ellipse(width / 2, 320, 80, 80);

  // Grüne Lampe
  fill(gruenFarbe);
  ellipse(width / 2, 430, 80, 80);
}