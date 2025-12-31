// --- 1. CONFIGURATION & STATE ---
let currentStep = 1;
const bgMusic = document.getElementById('bgMusic');
const resolutionDisplay = document.getElementById('resolution-display');

const resolutions = [
    "Become a Millionaire 💰",
    "Eat Pizza, but stay Fit 🍕💪",
    "Travel to Mars (or at least Goa) ✈️",
    "Find a Cute Partner ❤️",
    "Finally finish that 1-hour workout 🏋️"
];

// --- 2. CUSTOM CURSOR LOGIC ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = outline.style.left = `${e.clientX}px`;
    dot.style.top = outline.style.top = `${e.clientY}px`;
});

// --- 3. STEP NAVIGATION ---
function nextStep(stepNumber) {
    // Music starts on first click (Browser policy handle)
    if(stepNumber === 2) bgMusic.play();

    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    const nextStepEl = document.getElementById(`step-${stepNumber}`);
    nextStepEl.classList.add('active');
    currentStep = stepNumber;

    // Special Logic for specific steps
    if(stepNumber === 7) startFinalCountdown();
    if(stepNumber === 9) typeMessage();
}

// --- 4. NEW YEAR COUNTDOWN LOGIC ---
const targetDate = new Date("Jan 1, 2026 00:00:00").getTime();

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');

    // Auto-trigger Step 7 (Final 10s) when time is near
    if (distance < 11000 && distance > 0 && currentStep === 6) {
        nextStep(7);
    }
}, 1000);

// --- 5. THE FINAL 10 SECONDS BLAST ---
function startFinalCountdown() {
    let count = 10;
    const bigNum = document.getElementById('big-number');
    
    const countInterval = setInterval(() => {
        count--;
        bigNum.innerText = count;
        
        // Add extreme shake as it gets closer
        if(count <= 5) bigNum.classList.add('shake');

        if (count <= 0) {
            clearInterval(countInterval);
            triggerMidnight();
        }
    }, 1000);
}

function triggerMidnight() {
    nextStep(8);
    // Extreme Confetti Blast
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

// --- 6. FUNNY/CUTE EXTRAS ---
function generateResolution() {
    const randomRes = resolutions[Math.floor(Math.random() * resolutions.length)];
    resolutionDisplay.innerText = randomRes;
    resolutionDisplay.style.transform = "scale(1.2)";
    setTimeout(() => resolutionDisplay.style.transform = "scale(1)", 200);
}

function typeMessage() {
    const text = "Aapke liye ye saal ekdum dhamakedar ho! May 2025 be your best year ever. Party hard! 🥂";
    let i = 0;
    const target = document.getElementById('typewriter-text');
    target.innerHTML = "";
    function typing() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 50);
        }
    }
    typing();
}
