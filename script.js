// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn?.addEventListener('click', () => mobileMenu?.classList.toggle('open'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Zona accordion
document.querySelectorAll('.zona-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.zona-card');
    const toggle = header.querySelector('.zona-toggle');
    const isOpen = card.classList.toggle('open');
    toggle.textContent = isOpen ? '−' : '+';
  });
});

// Header scroll shadow
window.addEventListener('scroll', () => {
  document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 10);
});
