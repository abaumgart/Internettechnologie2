function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(230);

  fill(30, 144, 255);
  noStroke();
  ellipse(width / 2, height / 2, 120, 120);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Die Seite wurde korrekt geladen.", width / 2, height / 2 + 100);
}