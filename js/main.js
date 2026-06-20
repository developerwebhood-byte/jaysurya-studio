/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.innerHTML = isOpen
      ? '<span style="transform:rotate(45deg) translate(5px,5px)"></span><span style="opacity:0"></span><span style="transform:rotate(-45deg) translate(5px,-5px)"></span>'
      : '<span></span><span></span><span></span>';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.innerHTML = '<span></span><span></span><span></span>';
    });
  });
}

/* ===== ACTIVE NAV LINK ===== */
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (
    (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) ||
    (href !== 'index.html' && href && currentPath.includes(href.replace('.html', '')))
  ) {
    link.classList.add('active');
  }
});

/* ===== FADE IN OBSERVER ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Simulate API call
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Inquiry';
      contactForm.reset();
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    }, 1500);
  });
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
