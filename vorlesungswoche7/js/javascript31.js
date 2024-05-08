// JavaScript Document
class Kreis {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.geschwindigkeitX = Math.random() * 2 - 1; // Zufällige Geschwindigkeit für Beweglichkeit
        this.geschwindigkeitY = Math.random() * 2 - 1;
        this.farbe = "#" + Math.floor(Math.random()*16777215).toString(16); // Generiert eine Zufallsfarbe
    }

    // Zeichnet den Kreis
    zeichne(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.farbe;
        ctx.fill();
        ctx.closePath();
    }

    // Bewegt den Kreis und prüft, ob die Wand getroffen wurde
    bewege() {
        this.x += this.geschwindigkeitX;
        this.y += this.geschwindigkeitY;

        // Kollisionsprüfung mit den Wänden und Richtungsänderung
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.geschwindigkeitX *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.geschwindigkeitY *= -1;
        }
    }
}

let canvas = document.getElementById("leinwand");
let ctx = canvas.getContext("2d");

let kreise = [];
for (let i = 0; i < 1000; i++) { // Erstellt Kreise
    let radius = 4;
    let x = Math.random() * (canvas.width - 2 * radius) + radius;
    let y = Math.random() * (canvas.height - 2 * radius) + radius;
    kreise.push(new Kreis(x, y, radius));
}

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bereinigt den Canvas

    for (let kreis of kreise) {
        kreis.zeichne(ctx);
        kreis.bewege();
    }

    requestAnimationFrame(animation); // Wiederholt die Animation
}

animation();