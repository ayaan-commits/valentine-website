// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('hearts-bg');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞', '🩷'];

    setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart-bg';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';
        heart.style.fontSize = (18 + Math.random() * 25) + 'px';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 12000);
    }, 400);
}

// ============================================
// CONFETTI
// ============================================
function fireConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#ff6b9d', '#ff8fab', '#ffc2d1', '#ff4d6d', '#ffd700', '#ff69b4'];

    (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function fireHeartConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ['circle'],
        colors: ['#ff6b9d', '#ff8fab', '#ff4d6d', '#ff1493']
    });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function typeWriter(element, text, speed = 80, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// ============================================
// PAGE NAVIGATION
// ============================================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// ============================================
// ENVELOPE PAGE
// ============================================
function initEnvelopePage() {
    const envelope = document.getElementById('envelope');
    const envelopeContainer = document.querySelector('.envelope-container');

    envelopeContainer.addEventListener('click', () => {
        envelope.classList.add('open');

        setTimeout(() => {
            showPage('page-hello');
            initHelloPage();
        }, 1500);
    });
}

// ============================================
// HELLO PAGE - TYPEWRITER
// ============================================
function initHelloPage() {
    const helloText = document.getElementById('hello-text');
    const subtitle = document.getElementById('hello-subtitle');
    const continueBtn = document.getElementById('hello-continue');

    typeWriter(helloText, "Hey You...", 100, () => {
        setTimeout(() => {
            subtitle.style.opacity = '1';
            setTimeout(() => {
                continueBtn.style.opacity = '1';
            }, 500);
        }, 500);
    });

    continueBtn.addEventListener('click', () => {
        showPage('page-question');
        initQuestionPage();
    });
}

// ============================================
// QUESTION PAGE - RUNAWAY BUTTON
// ============================================
function initQuestionPage() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const counter = document.getElementById('no-counter');

    let escapeCount = 0;
    const maxEscapes = 10;

    const noTexts = [
        "No",
        "Are you sure?",
        "Really sure?",
        "Think again!",
        "Please?",
        "Pretty please?",
        "Don't do this...",
        "I'm begging!",
        "Last chance!",
        "Fine... 😢"
    ];

    const yesTexts = [
        "Yes!",
        "YES!",
        "YESSS!",
        "SAY YES!",
        "CLICK ME!",
        "PLEASE!",
        "YESYESYES!"
    ];

    function moveNoButton() {
        escapeCount++;

        // Update texts
        noBtn.textContent = noTexts[Math.min(escapeCount, noTexts.length - 1)];
        yesBtn.textContent = yesTexts[Math.min(escapeCount, yesTexts.length - 1)];

        // Grow yes button
        const scale = 1 + (escapeCount * 0.12);
        yesBtn.style.transform = `scale(${Math.min(scale, 2)})`;

        // Move no button to random position
        const padding = 80;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        const randomX = padding + Math.random() * (maxX - padding);
        const randomY = padding + Math.random() * (maxY - padding);

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '9999';

        // Update counter
        counter.textContent = `No button escaped ${escapeCount} times! 🤣`;

        // Shake animation
        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 400);

        // After max escapes, shrink and disable
        if (escapeCount >= maxEscapes) {
            noBtn.style.transform = 'scale(0.3)';
            noBtn.style.opacity = '0.4';
            noBtn.textContent = '😢';
            noBtn.style.pointerEvents = 'none';
            counter.textContent = `The No button gave up! 😂`;
        }
    }

    // No button events
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    noBtn.addEventListener('mouseenter', () => {
        if (escapeCount < maxEscapes) {
            moveNoButton();
        }
    });

    // Yes button click
    yesBtn.addEventListener('click', () => {
        fireConfetti();
        fireHeartConfetti();

        setTimeout(() => fireConfetti(), 500);
        setTimeout(() => fireHeartConfetti(), 1000);

        setTimeout(() => {
            showPage('page-celebration');
        }, 800);
    });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    initEnvelopePage();
});
