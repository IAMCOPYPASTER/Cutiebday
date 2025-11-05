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

// --- OPTIMIZATION: Preload all slideshow images ---
function preloadImages() {
  photos.forEach(src => {
    const img = new Image();
    img.src = `assets/${src}`;
  });
}
preloadImages();


// --- background floating hearts ---
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

// --- FIX: Updated heart drawing function ---
function drawHearts() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  hearts.forEach((h, i) => {
    h.y -= h.dy;
    h.x += h.dx;
    if (h.y < -10) {
      hearts.splice(i, 1);
      hearts.push(new Heart(Math.random() * bgCanvas.width, bgCanvas.height + 10, Math.random() * 8 + 4, true));
    }

    // --- NEW: Heart Drawing Logic ---
    const s = h.size * 0.8; // Scale the size
    const x = h.x;
    const y = h.y;

    bgCtx.beginPath();
    bgCtx.moveTo(x, y + s * 0.7); // Bottom tip
    bgCtx.quadraticCurveTo(x, y, x - s * 0.8, y); // Bottom-left
    bgCtx.quadraticCurveTo(x - s * 1.6, y, x - s * 1.6, y - s * 0.8); // Left curve
    bgCtx.quadraticCurveTo(x - s * 1.6, y - s * 1.4, x - s * 0.8, y - s * 1.6); // Top-left
    bgCtx.quadraticCurveTo(x, y - s * 2.2, x + s * 0.8, y - s * 1.6); // Top-center dip
    bgCtx.quadraticCurveTo(x + s * 1.6, y - s * 1.4, x + s * 1.6, y - s * 0.8); // Top-right
    bgCtx.quadraticCurveTo(x + s * 1.6, y, x + s * 0.8, y); // Right curve
    bgCtx.quadraticCurveTo(x, y, x, y + s * 0.7); // Bottom-right
    bgCtx.closePath();

    // Apply the same beautiful glow gradient
    const gradient = bgCtx.createRadialGradient(x, y - s, 0, x, y - s, s * 3);
    gradient.addColorStop(0, `rgba(255,182,193,${h.alpha})`);
    gradient.addColorStop(1, 'transparent');
    bgCtx.fillStyle = gradient;

    bgCtx.fill();
    // --- End of new logic ---
  });
  requestAnimationFrame(drawHearts);
}

for (let i = 0; i < 60; i++) {
  hearts.push(new Heart(Math.random() * bgCanvas.width, Math.random() * bgCanvas.height, Math.random() * 8 + 4, true));
}
drawHearts(); // Start the heart animation


// --- fireworks effect ---
const fxCanvas = document.querySelector('.canvas-fx');
const fxCtx = fxCanvas.getContext('2d');
fxCanvas.width = innerWidth;
fxCanvas.height = innerHeight;

let fireworks = []; // Will hold all active particles

function launchFirework() {
  const x = Math.random() * fxCanvas.width;
  const y = Math.random() * fxCanvas.height / 2;
  const count = 80;
  
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = Math.random() * 3 + 2;
    fireworks.push({
      x, y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: 100, // Frames to live
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
}

// --- FIX: Updated fireworks animation loop ---
function animateFireworks() {
  // Use clearRect to prevent background from turning black
  fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

  fireworks.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.dy += 0.03; // Gravity
    p.life--;

    if (p.life <= 0) {
      fireworks.splice(i, 1); // Remove dead particles
    } else {
      fxCtx.beginPath();
      fxCtx.fillStyle = p.color;
      fxCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      fxCtx.fill();
    }
  });

  requestAnimationFrame(animateFireworks); // Keep the loop running
}
animateFireworks(); // Start the fireworks animation loop


// --- AESTHETIC ADDON: Variable speed typing effect ---
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
    // Use a randomized delay to feel more human
    const delay = Math.random() * 40 + 20; // Random between 20ms and 60ms
    setTimeout(() => typeText(text, el, i + 1), delay);
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
    music.play().catch(e => console.log("Audio couldn't play automatically."));
    
    // Launch a few fireworks
    launchFirework();
    setTimeout(launchFirework, 300);
    setTimeout(launchFirework, 600);
    
    messageCard.classList.remove('hidden');
    slideshow.classList.remove('hidden');
    
    // Start typing *after* the card has faded in
    setTimeout(() => {
        typeText(messageText, typedEl);
    }, 600); // 600ms matches the CSS transition duration
  }
});


// --- OPTIMIZATION: Debounce function ---
function debounce(func, delay = 250) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// --- handle resize ---
window.addEventListener('resize', debounce(() => {
  bgCanvas.width = innerWidth;
  bgCanvas.height = innerHeight;
  fxCanvas.width = innerWidth;
  fxCanvas.height = innerHeight;
}));
