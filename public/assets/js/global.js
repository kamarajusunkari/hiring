/**
 * Arora Tech Solutions - Global Client Scripts
 * Header blur, Mega Menu, Mobile Drawer, Accordions, Scroll Revelations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Sticky Header Scroll Effect
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Desktop Mega-Menu Toggle & Escape Handling
  const megaMenuTrigger = document.getElementById('mega-menu-trigger');
  const megaMenu = document.getElementById('hire-mega-menu');

  if (megaMenuTrigger && megaMenu) {
    const toggleMegaMenu = (expand) => {
      const isExpanded = expand ?? (megaMenuTrigger.getAttribute('aria-expanded') !== 'true');
      megaMenuTrigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      if (isExpanded) {
        megaMenu.classList.add('is-active');
      } else {
        megaMenu.classList.remove('is-active');
      }
    };

    megaMenuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMegaMenu();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!megaMenu.contains(e.target) && !megaMenuTrigger.contains(e.target)) {
        toggleMegaMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && megaMenu.classList.contains('is-active')) {
        toggleMegaMenu(false);
        megaMenuTrigger.focus();
      }
    });
  }

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeButtons = document.querySelectorAll('[data-close-drawer]');

  if (mobileToggle && mobileDrawer) {
    const openDrawer = () => {
      mobileDrawer.classList.add('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const firstClose = mobileDrawer.querySelector('.drawer-close-btn');
      if (firstClose) firstClose.focus();
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      mobileToggle.focus();
    };

    mobileToggle.addEventListener('click', openDrawer);

    closeButtons.forEach(btn => {
      btn.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // 4. Accessible FAQ Accordions
  const accordionButtons = document.querySelectorAll('.accordion-button');
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');
      
      // Optional single-open behavior: uncomment to close siblings
      /*
      const parent = item.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('is-open');
            const siblingBtn = sibling.querySelector('.accordion-button');
            if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }
      */

      if (isOpen) {
        item.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Scroll Reveals (IntersectionObserver) respecting prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
  }
});
