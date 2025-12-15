const canvas = document.getElementById('cmatrix');
const ctx = canvas.getContext('2d');

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to use — typical matrix glyphs (can tweak as you want)
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

const fontSize = 8;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1).map(() => Math.random() * canvas.height / fontSize);

// === Configurable speed (ms per frame) ===
let speed = 20; // lower = faster, higher = slower
let lastTime = 0;

function draw(time) {
  if (time - lastTime < speed) {
    requestAnimationFrame(draw);
    return; // skip this frame
  }
  lastTime = time;

  // translucent black background to create trail effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // reset drop to top randomly to create continuous flow
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += 1;
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

// Resize handler to keep canvas full screen
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// last thung
function popImage() {
  const img = document.getElementById("album-cover");
  img.classList.remove("pop");
  // Trigger reflow
  void img.offsetWidth;
  img.classList.add("pop");
}