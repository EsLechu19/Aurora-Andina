const navbar = document.querySelector('[data-navbar]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const revealItems = document.querySelectorAll('[data-reveal]');

const setNavbarState = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
};

const closeMenu = () => {
  document.body.classList.remove('menu-open');
  navbar.classList.remove('menu-active');
  mobileMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
};

setNavbarState();
window.addEventListener('scroll', setNavbarState, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
  navbar.classList.toggle('menu-active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));
