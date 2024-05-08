// JavaScript Document
class Circle {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.element = document.createElement('div');
        this.element.classList.add('circle');
        this.element.style.width = `${radius * 2}px`;
        this.element.style.height = `${radius * 2}px`;
        document.getElementById('game-container').appendChild(this.element);
        this.draw();
    }

    draw() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    checkCollision(circles) {
        circles.forEach(circle => {
            if (circle !== this) {
                const distance = Math.sqrt((this.x - circle.x) ** 2 + (this.y - circle.y) ** 2);
                if (distance <= this.radius + circle.radius) {
                    // Collision detected
                    this.dx *= -1;
                    this.dy *= -1;
                    circle.dx *= -1;
                    circle.dy *= -1;
                }
            }
        });
    }
}

const circles = [];
for (let i = 0; i < 50; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const radius = Math.random() * 50 + 20; // Random radius between 20 and 70
    const dx = Math.random() * 4 - 2; // Random speed between -2 and 2 horizontally
    const dy = Math.random() * 4 - 2; // Random speed between -2 and 2 vertically
    circles.push(new Circle(x, y, radius, dx, dy));
}

function animate() {
    requestAnimationFrame(animate);
    circles.forEach(circle => {
        circle.move();
        circle.checkCollision(circles);
    });
}

animate();
