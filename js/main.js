// =============================================
// NAVEGAÇÃO COM SCROLL
// =============================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// =============================================
// SCROLL SUAVE PARA ÂNCORAS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// ANIMAÇÕES FADE-IN AO SCROLL
// =============================================
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// =============================================
// CONTADOR REGRESSIVO – 16/05/2026 16:00 BRT (UTC-3)
// =============================================
function updateCountdown() {
  // Horário do evento: 16/05/2026 às 16:00 BRT = 19:00 UTC
  const eventDate = new Date(Date.UTC(2026, 4, 16, 19, 0, 0)); // mês 4 = maio (0-indexed)
  const now = new Date();
  const diff = eventDate - now;

  const daysEl     = document.getElementById('cd-days');
  const hoursEl    = document.getElementById('cd-hours');
  const minutesEl  = document.getElementById('cd-minutes');
  const secondsEl  = document.getElementById('cd-seconds');

  if (!daysEl) return;

  if (diff <= 0) {
    daysEl.textContent    = '00';
    hoursEl.textContent   = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    const bar = document.querySelector('.countdown-bar__label');
    if (bar) bar.textContent = '🎉 O encontro está acontecendo agora!';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent    = String(days).padStart(2, '0');
  hoursEl.textContent   = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =============================================
// FAQ ACCORDION
// =============================================
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const answer = item.querySelector('.faq__answer');
    const isOpen = item.classList.contains('open');

    // Fechar todos
    document.querySelectorAll('.faq__item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq__answer').style.maxHeight = '0';
    });

    // Abrir o clicado (se estava fechado)
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
