// ----------------------
// Dark/Light Mode with persistence
// ----------------------
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark-mode");
  document
    .querySelectorAll("#toggle-theme")
    .forEach((btn) => (btn.textContent = "☀️"));
}

const toggleBtns = document.querySelectorAll("#toggle-theme");
toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDark);
    btn.textContent = isDark ? "☀️" : "🌙";
  });
});

// ----------------------
// Floating Particles (Hearts/Sparkles)
// ----------------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.size = Math.random() * 3 + 2;
    this.x = Math.random() * (canvas.width - this.size * 2) + this.size;
    this.y = Math.random() * (canvas.height - this.size * 2) + this.size;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = [
      "rgba(200,160,255,0.6)",
      "rgba(210,180,255,0.6)",
      "rgba(230,200,255,0.6)",
    ][Math.floor(Math.random() * 3)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap inside canvas
    if (this.x > canvas.width - this.size) this.x = this.size;
    if (this.x < this.size) this.x = canvas.width - this.size;
    if (this.y > canvas.height - this.size) this.y = this.size;
    if (this.y < this.size) this.y = canvas.height - this.size;
  }

  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;

    ctx.beginPath();
    ctx.moveTo(this.x - this.size, this.y);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.stroke();
  }
}

for (let i = 0; i < 70; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// ----------------------
// Mouse Trail & Click Ripple (Pastel Purple)
// ----------------------
// Mouse Trail (White Core + Pastel Purple Glow)
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.classList.add("trail");

  // Add scroll offsets
  const x = Math.min(
    Math.max(e.clientX + window.scrollX, 0),
    document.body.scrollWidth - 12
  );
  const y = Math.min(
    Math.max(e.clientY + window.scrollY, 0),
    document.body.scrollHeight - 12
  );

  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  trail.style.background =
    "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(217,191,255,0.6) 40%, rgba(182,160,255,0.3) 80%)";
  trail.style.boxShadow = `0 0 10px rgba(200,160,255,0.6), 0 0 20px rgba(182,160,255,0.4)`;
  trail.style.width = "12px";
  trail.style.height = "12px";
  trail.style.borderRadius = "50%";
  trail.style.position = "absolute";
  trail.style.pointerEvents = "none";
  trail.style.zIndex = "9999";

  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 800);
});

document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.left = `${e.clientX + window.scrollX}px`;
  ripple.style.top = `${e.clientY + window.scrollY}px`;
  ripple.style.background = "rgba(200,160,255,0.4)";
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
});

// ----------------------
// Music Auto-play on all pages
// ----------------------
const player = document.getElementById("lofi-player");
if (player) {
  player.volume = 0.25;
  const wasPlaying = localStorage.getItem("music-playing") === "true";
  player.autoplay = true;
  if (wasPlaying) player.play().catch(() => {});
  else player.play().catch(() => {});
  player.addEventListener("play", () =>
    localStorage.setItem("music-playing", true)
  );
  player.addEventListener("pause", () =>
    localStorage.setItem("music-playing", false)
  );
}

// ----------------------
// Achievements Fade-In Animation
// ----------------------
const achievementCards = document.querySelectorAll('.achievement-card');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;
  achievementCards.forEach(card => {
    const boxTop = card.getBoundingClientRect().top;
    if (boxTop < triggerBottom) card.classList.add('show');
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Achievements modal
const modal = document.getElementById("certificate-modal");
const modalImg = document.getElementById("certificate-image");
const closeBtn = document.querySelector("#certificate-modal .close");

const cards = document.querySelectorAll(".achievement-card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const certSrc = card.dataset.certificate;
    if(certSrc) {
      modal.style.display = "flex";
      modalImg.src = certSrc;
    }
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal on outside click
modal.addEventListener("click", (e) => {
  if(e.target === modal) modal.style.display = "none";
});



