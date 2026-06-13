(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav__link');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const sections = document.querySelectorAll('section[id]');

  const headerHeight = () => header ? header.offsetHeight : 0;

  function scrollToSection(target) {
    const el = document.querySelector(target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight() - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      scrollToSection(href);
      closeMenu();
    });
  });

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove('nav__menu--open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('nav__menu--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('nav__menu--open')) return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href');
          link.classList.toggle('nav__link--active', href === '#' + id);
        });
      });
    },
    {
      rootMargin: '-' + (headerHeight() + 20) + 'px 0px -60% 0px',
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMenu();
  });
})();
