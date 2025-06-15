function playMusic() {
  const music = document.getElementById('music');
  music.play();
}

// Fireworks Effect
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function Firework(x, y) {
  this.x = x;
  this.y = y;
  this.particles = [];

  for (let i = 0; i < 100; i++) {
    this.particles.push(new Particle(x, y));
  }
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 2;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  this.speed = Math.random() * 5;
  this.angle = Math.random() * 2 * Math.PI;
  this.gravity = 0.05;
  this.alpha = 1;
}

Particle.prototype.update = function () {
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  this.alpha -= 0.01;
};

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.particles.forEach((particle, i) => {
      particle.update();
      ctx.globalAlpha = particle.alpha;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    if (firework.particles[0].alpha <= 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
  fireworks.push(new Firework(e.clientX, e.clientY));
});

animate();
