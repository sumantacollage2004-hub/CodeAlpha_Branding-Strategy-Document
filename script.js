/* ============================================
   CodeAlpha Branding Report — script.js
   Handles: scroll progress, TOC active state,
   scroll-triggered animations, section counters.
   ============================================ */

(function () {
  'use strict';

  /* ---- Progress Bar ---- */
  const progressBar = document.getElementById('progressBar');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ---- TOC Active Link ---- */
  const sections = document.querySelectorAll('section[id]');
  const tocLinks = document.querySelectorAll('.toc a');

  function updateToc() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;
    let active = null;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollMid) active = sec.id;
    });

    tocLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + active) {
        link.style.color = 'var(--accent)';
      }
    });
  }

  /* ---- Scroll-triggered Card Animations ---- */
  const uspCards = document.querySelectorAll('.usp-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  uspCards.forEach(card => cardObserver.observe(card));

  /* ---- Section Entrance Animations ---- */
  const reportSections = document.querySelectorAll('.report-section');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  reportSections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    sectionObserver.observe(sec);
  });

  /* ---- Roadmap Phase Animation ---- */
  const rmPhases = document.querySelectorAll('.rm-phase');

  const phaseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, i * 120);
        phaseObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  rmPhases.forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'translateX(-20px)';
    p.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    phaseObserver.observe(p);
  });

  /* ---- Campaign Items Stagger ---- */
  const campaignItems = document.querySelectorAll('.campaign-item');

  const campaignObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = [...campaignItems].indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        campaignObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  campaignItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-16px)';
    item.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    campaignObserver.observe(item);
  });

  /* ---- Table row highlight on hover (extra flair) ---- */
  const rows = document.querySelectorAll('.comp-table tbody tr');
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      rows.forEach(r => r.style.opacity = '0.5');
      row.style.opacity = '1';
    });
    row.addEventListener('mouseleave', () => {
      rows.forEach(r => r.style.opacity = '1');
    });
  });

  /* ---- Smooth TOC scroll ---- */
  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 70; // toc height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Bind scroll events ---- */
  window.addEventListener('scroll', () => {
    updateProgress();
    updateToc();
  }, { passive: true });

  /* ---- Init ---- */
  updateProgress();
  updateToc();

})();
