function triggerGift() {
  const box = document.getElementById("gift-box");
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";

    // Emoji keluar dari kado
    const emojis = ["🐯", "💜", "💫"];
    emojis.forEach((char, i) => {
      const el = document.createElement("div");
      el.className = "emoji";
      el.innerText = char;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1500);
    });

    // Putar ucapan Taehyung
    const taeAudio = document.getElementById("tae-audio");
    if (taeAudio) taeAudio.play();

    // Tampilkan quote Taehyung
    const quote = document.createElement("div");
    quote.className = "quote";
    quote.innerText = `"Don’t be trapped in someone else’s dream." — Kim Taehyung`;
    document.body.appendChild(quote);
    setTimeout(() => quote.remove(), 4000);
  }, 2200);
}

// Partikel salju dan kembang api
function createSnowflake() {
  const flake = document.createElement("div");
  flake.classList.add("snowflake");
  flake.innerText = "❄";
  flake.style.left = Math.random() * window.innerWidth + "px";
  flake.style.animationDuration = 5 + Math.random() * 5 + "s";
  flake.style.opacity = Math.random();
  document.body.appendChild(flake);
  setTimeout(() => flake.remove(), 10000);
}
setInterval(createSnowflake, 200);

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let fireworks = [];

function Firework(x, y) {
  this.x = x;
  this.y = y;
  this.p = [];
  for (let i = 0; i < 80; i++) this.p.push(new Particle(x, y));
}
function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.color = `hsl(200,100%,80%)`;
  this.sp = Math.random() * 4;
  this.ang = Math.random() * 2 * Math.PI;
  this.gr = 0.04;
  this.a = 1;
}
Particle.prototype.update = function () {
  this.x += Math.cos(this.ang) * this.sp;
  this.y += Math.sin(this.ang) * this.sp + this.gr;
  this.a -= 0.015;
};

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((fw, i) => {
    fw.p.forEach(p => {
      p.update();
      ctx.globalAlpha = p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    if (fw.p[0].a <= 0) fireworks.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();
canvas.addEventListener("click", e => fireworks.push(new Firework(e.clientX, e.clientY)));

tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: 1 },
  particles: {
    number: { value: 60 },
    size: { value: 3, random: { min: 1, max: 4 } },
    move: { enable: true, speed: 1 },
    color: { value: "#ffffff" },
    opacity: { value: 0.5 }
  }
});
