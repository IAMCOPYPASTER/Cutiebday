// script.js — makes the magic happen 🎆💫

// --- element refs ---
const giftWrap = document.querySelector('.gift-wrap');
const messageCard = document.querySelector('.message-card');
const typedEl = document.querySelector('.typed');
const slideshow = document.querySelector('.slideshow');
const slideView = document.querySelector('.slide-view img');
const thumbs = document.querySelectorAll('.thumbs img');
const music = new Audio('assets/music.mp3');

// --- preload photos ---
const photos = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];
let current = 0;

// --- background floating hearts + stars ---
const bgCanvas = document.querySelector('.canvas-bg');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = innerWidth;
bgCanvas.height = innerHeight;

let hearts = [];
function Heart(x, y, size, glow) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.glow = glow;
  this.alpha = Math.random() * 0.7 + 0.3;
  this.dy = Math.random() * 0.3 + 0.15;
  this.dx = (Math.random() - 0.5) * 0.2;
}
function drawHearts() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  hearts.forEach((h, i) => {
    h.y -= h.dy;
    h.x += h.dx;
    if (h.y < -10) {
      hearts.splice(i, 1);
      hearts.push(new Heart(Math.random() * bgCanvas.width, bgCanvas.height + 10, Math.random() * 8 + 4, true));
    }
    bgCtx.beginPath();
    const gradient = bgCtx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.size * 2);
    gradient.addColorStop(0, `rgba(255,182,193,${h.alpha})`);
    gradient.addColorStop(1, 'transparent');
    bgCtx.fillStyle = gradient;
    bgCtx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
    bgCtx.fill();
  });
  requestAnimationFrame(drawHearts);
}
for (let i = 0; i < 60; i++) {
  hearts.push(new Heart(Math.random() * bgCanvas.width, Math.random() * bgCanvas.height, Math.random() * 8 + 4, true));
}
drawHearts();

// --- fireworks effect ---
const fxCanvas = document.querySelector('.canvas-fx');
const fxCtx = fxCanvas.getContext('2d');
fxCanvas.width = innerWidth;
fxCanvas.height = innerHeight;

function launchFirework() {
  const x = Math.random() * fxCanvas.width;
  const y = Math.random() * fxCanvas.height / 2;
  const count = 80;
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = Math.random() * 3 + 2;
    particles.push({
      x, y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: 100,
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
  const interval = setInterval(() => {
    fxCtx.fillStyle = 'rgba(0,0,0,0.15)';
    fxCtx.fillRect(0, 0, fxCanvas.width, fxCanvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.03;
      p.life--;
      fxCtx.beginPath();
      fxCtx.fillStyle = p.color;
      fxCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      fxCtx.fill();
    });
    if (particles.every(p => p.life <= 0)) clearInterval(interval);
  }, 16);
}

// --- typing effect ---
const messageText = `Hey Riddhi 💫

I don’t know if I’ll ever be able to say this properly in person… 
but you genuinely make life feel a little warmer just by being around. 
Every small talk, every random laugh — it all somehow sticks.  

You have this quiet, gentle magic about you. 
And today, I just want to say something that’s been sitting on my mind for a while — 
you deserve every ounce of happiness this world can offer.  

💖💖💖

🎉🎉 HAPPY BIRTHDAY RIDDHU 🎉🎉

💖💖💖

I hope this night feels as magical as your smile — 
because someone out there truly thinks you're too sweet for this planet.  

— from someone who thinks you're too sweet 💫  
– Tanishq`;

function typeText(text, el, i = 0) {
  if (i < text.length) {
    el.textContent += text.charAt(i);
    setTimeout(() => typeText(text, el, i + 1), 40);
  }
}

// --- slideshow ---
function showSlide(idx) {
  current = idx;
  slideView.src = `assets/${photos[idx]}`;
  thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
}
thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => showSlide(i));
});
showSlide(0);

// --- main gift interaction ---
giftWrap.addEventListener('click', () => {
  if (!giftWrap.classList.contains('gift-open')) {
    giftWrap.classList.add('gift-open');
    music.play().catch(()=>{});
    launchFirework();
    messageCard.classList.remove('hidden');
    typeText(messageText, typedEl);
    slideshow.classList.remove('hidden');
  }
});

// --- handle resize ---
window.addEventListener('resize', () => {
  bgCanvas.width = innerWidth;
  bgCanvas.height = innerHeight;
  fxCanvas.width = innerWidth;
  fxCanvas.height = innerHeight;
});