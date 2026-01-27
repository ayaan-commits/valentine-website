// ==========================================
// Valentine Website - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initRevealAnimations();
  initNoButtonEscape();
  initSelectionSaving();
});

// ==========================================
// Custom Cursor
// ==========================================
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (!cursor || !follower) return;

  // Check if it's a touch device
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation
  function animateCursor() {
    // Main cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Follower has more delay
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .selection-item, input');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });
}

// ==========================================
// Reveal Animations on Scroll/Load
// ==========================================
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-text');

  // Initial reveal for elements in view
  reveals.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, index * 100);
  });

  // Scroll-based reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// ==========================================
// No Button Escape Logic
// ==========================================
function initNoButtonEscape() {
  const noBtn = document.getElementById('noBtn');
  if (!noBtn) return;

  let attempts = 0;
  const maxAttempts = 12;
  const messages = [
    'No',
    'Are you sure?',
    'Really sure?',
    'Think again!',
    'Please?',
    'Pretty please?',
    'With a cherry on top?',
    'Come on!',
    'Don\'t do this...',
    'I\'m begging you!',
    'Last chance!',
    '...'
  ];

  const yesBtn = document.querySelector('.btn-yes');

  noBtn.addEventListener('mouseenter', () => {
    if (attempts >= maxAttempts) return;

    attempts++;

    // Update button text
    noBtn.querySelector('span').textContent = messages[Math.min(attempts, messages.length - 1)];

    // Make Yes button grow
    if (yesBtn) {
      const scale = 1 + (attempts * 0.1);
      yesBtn.style.transform = `scale(${Math.min(scale, 2)})`;
    }

    // Move No button to random position
    const moveNoButton = () => {
      const rect = noBtn.getBoundingClientRect();
      const parentRect = noBtn.parentElement.getBoundingClientRect();

      const maxX = window.innerWidth - rect.width - 40;
      const maxY = window.innerHeight - rect.height - 40;

      let newX = Math.random() * maxX;
      let newY = Math.random() * maxY;

      // Keep button within reasonable bounds
      newX = Math.max(40, Math.min(newX, maxX));
      newY = Math.max(100, Math.min(newY, maxY));

      noBtn.style.position = 'fixed';
      noBtn.style.left = newX + 'px';
      noBtn.style.top = newY + 'px';
    };

    // Shake first, then move
    noBtn.classList.add('shake');
    setTimeout(() => {
      noBtn.classList.remove('shake');
      moveNoButton();
    }, 300);

    // After max attempts, make button disappear
    if (attempts >= maxAttempts) {
      setTimeout(() => {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        setTimeout(() => {
          noBtn.style.display = 'none';
        }, 500);
      }, 500);
    }
  });

  // Also handle click (for mobile)
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noBtn.dispatchEvent(new Event('mouseenter'));
  });
}

// ==========================================
// Save Selections to LocalStorage
// ==========================================
function initSelectionSaving() {
  // Food page
  const foodCheckboxes = document.querySelectorAll('input[name="food"]');
  foodCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const selected = Array.from(foodCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value.charAt(0).toUpperCase() + c.value.slice(1))
        .join(' & ');
      localStorage.setItem('selectedFood', selected || 'Food');
    });
  });

  // Dessert page
  const dessertCheckboxes = document.querySelectorAll('input[name="dessert"]');
  dessertCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const selected = Array.from(dessertCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value.charAt(0).toUpperCase() + c.value.slice(1))
        .join(' & ');
      localStorage.setItem('selectedDessert', selected || 'Dessert');
    });
  });

  // Activities page
  const activityCheckboxes = document.querySelectorAll('input[name="activity"]');
  activityCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const selected = Array.from(activityCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value.charAt(0).toUpperCase() + c.value.slice(1))
        .join(' & ');
      localStorage.setItem('selectedActivity', selected || 'Activities');
    });
  });
}

// ==========================================
// Smooth Page Transitions
// ==========================================
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.endsWith('.html')) {
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  });
});
