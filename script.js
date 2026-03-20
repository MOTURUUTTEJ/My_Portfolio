/**
 * ============================================================
 *  UTTEJ MOTURU — PORTFOLIO SCRIPT  2025
 *  Core: sidebar, nav, filter, form — always works
 *  Enhanced by: GSAP, Typed.js, tsParticles, VanillaTilt, AOS
 * ============================================================
 */

/* ─── HELPERS ─────────────────────────────────────────────── */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
const has = name => typeof window[name] !== 'undefined';

/* ─── 1. SIDEBAR TOGGLE ────────────────────────────────────── */
function initSidebar() {
  const sidebar = $('[data-sidebar]');
  const btn     = $('[data-sidebar-btn]');
  on(btn, 'click', () => sidebar.classList.toggle('active'));
}

/* ─── 2. TESTIMONIALS MODAL ────────────────────────────────── */
function initModal() {
  const container = $('[data-modal-container]');
  const overlay   = $('[data-overlay]');
  const closeBtn  = $('[data-modal-close-btn]');
  const modalImg  = $('[data-modal-img]');
  const modalTitle = $('[data-modal-title]');
  const modalText  = $('[data-modal-text]');
  if (!container) return;
  const open  = () => { container.classList.add('active');    overlay.classList.add('active'); };
  const close = () => { container.classList.remove('active'); overlay.classList.remove('active'); };
  $$('[data-testimonials-item]').forEach(item => {
    on(item, 'click', () => {
      const av = item.querySelector('[data-testimonials-avatar]');
      const ti = item.querySelector('[data-testimonials-title]');
      const tx = item.querySelector('[data-testimonials-text]');
      if (av && modalImg)   { modalImg.src = av.src; modalImg.alt = av.alt; }
      if (ti && modalTitle)   modalTitle.innerHTML = ti.innerHTML;
      if (tx && modalText)    modalText.innerHTML  = tx.innerHTML;
      open();
    });
  });
  on(closeBtn, 'click', close);
  on(overlay,  'click', close);
}

/* ─── 3. PORTFOLIO FILTER ──────────────────────────────────── */
function initFilter() {
  const filterBtns  = $$('[data-filter-btn]');
  const selectItems = $$('[data-select-item]');
  const selectEl    = $('[data-select]');
  const selectVal   = $('[data-selecct-value]');
  const items       = $$('[data-filter-item]');

  function filterFunc(val) {
    items.forEach(item => {
      const show = val === 'all' || item.dataset.category === val;
      item.classList.toggle('active', show);
    });
  }

  let lastBtn = filterBtns[0];
  filterBtns.forEach(btn => {
    on(btn, 'click', function () {
      filterFunc(this.innerText.toLowerCase());
      if (selectVal) selectVal.innerText = this.innerText;
      lastBtn && lastBtn.classList.remove('active');
      this.classList.add('active');
      lastBtn = this;
    });
  });

  on(selectEl, 'click', function () {
    this.classList.toggle('active');
  });
  selectItems.forEach(item => {
    on(item, 'click', function () {
      const val = this.innerText.toLowerCase();
      if (selectVal) selectVal.innerText = this.innerText;
      selectEl && selectEl.classList.remove('active');
      filterFunc(val);
    });
  });
}

/* ─── 4. NAVBAR / PAGE SWITCHING ───────────────────────────── */
function initNavbar() {
  const links = $$('[data-nav-link]');
  const pages = $$('[data-page]');
  links.forEach(link => {
    on(link, 'click', function () {
      const target = this.innerHTML.toLowerCase();
      pages.forEach((page, i) => {
        const isMatch = page.dataset.page === target;
        page.classList.toggle('active', isMatch);
        links[i].classList.toggle('active', isMatch);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // refresh AOS on tab switch
      if (has('AOS')) setTimeout(() => AOS.refresh(), 100);
    });
  });
}

/* ─── 5. CONTACT FORM VALIDATION ───────────────────────────── */
function initForm() {
  const form   = $('[data-form]');
  const inputs = $$('[data-form-input]');
  const btn    = $('[data-form-btn]');
  if (!form || !btn) return;
  inputs.forEach(i => on(i, 'input', () => { btn.disabled = !form.checkValidity(); }));
}

/* ─── 6. LOADER EXIT (with or without GSAP) ────────────────── */
function hideLoader() {
  const loader = $('#loader');
  if (!loader) return;
  if (has('gsap')) {
    gsap.to(loader, { opacity: 0, duration: 0.8, delay: 0.8, ease: 'power2.inOut',
      onComplete: () => { loader.classList.add('hidden'); bootEnhancements(); }
    });
  } else {
    setTimeout(() => { loader.classList.add('hidden'); bootEnhancements(); }, 1200);
  }
}

/* ─── 7. TYPED.JS — TYPING EFFECT ──────────────────────────── */
function initTyped() {
  const el = $('#typingText');
  if (!el) return;
  if (has('Typed')) {
    new Typed(el, {
      strings: ['Software Engineer', 'Full Stack Developer', 'AI & CV Engineer', 'R&D Lead', 'Problem Solver'],
      typeSpeed: 60, backSpeed: 35, backDelay: 2200, loop: true, showCursor: false
    });
  } else {
    el.textContent = 'Software Engineer';
  }
}

/* ─── 8. tsParticles ───────────────────────────────────────── */
function initParticles() {
  if (!has('tsParticles')) return;
  tsParticles.load('particleCanvas', {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' }, onClick: { enable: true, mode: 'push' } },
      modes:  { grab: { distance: 150, links: { opacity: 0.5 } }, push: { quantity: 3 } }
    },
    particles: {
      number: { density: { enable: true, area: 900 }, value: 55 },
      color:  { value: ['#00d4ff', '#8b5cf6', '#f0c34f'] },
      links:  { enable: true, color: '#00d4ff', distance: 140, opacity: 0.12, width: 1 },
      move:   { enable: true, speed: 0.5, random: true, outModes: { default: 'bounce' } },
      opacity: { value: { min: 0.1, max: 0.5 } },
      size:   { value: { min: 1, max: 3 } },
      shape:  { type: 'circle' }
    },
    detectRetina: true
  }).then(container => {
    const c = container.canvas && container.canvas.element;
    if (c) Object.assign(c.style, { position:'fixed', top:'0', left:'0', width:'100%', height:'100%', pointerEvents:'none', zIndex:'0' });
  }).catch(() => {});
}

/* ─── 9. GSAP ANIMATIONS ───────────────────────────────────── */
function initGSAP() {
  if (!has('gsap')) return;
  if (has('ScrollTrigger')) gsap.registerPlugin(ScrollTrigger);

  // Sidebar entrance
  gsap.from('.sidebar', { x: -50, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
  gsap.from('.main-content', { x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 });
  gsap.from('.avatar-box img', { scale: 0.6, opacity: 0, rotation: -10, duration: 0.8, ease: 'back.out(2)', delay: 0.4 });
  gsap.from('.info-content .name', { y: 16, opacity: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' });
  gsap.from('.info-content .title', { y: 12, opacity: 0, duration: 0.5, delay: 0.75, ease: 'power2.out' });
  gsap.from('.navbar-link', { y: -18, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'back.out(1.5)', delay: 0.3 });

  if (!has('ScrollTrigger')) return;

  // Service cards on scroll
  ScrollTrigger.batch('.service-item', {
    onEnter: b => gsap.from(b, { y: 35, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', clearProps: 'all' }),
    start: 'top 90%'
  });
  // Timeline items on scroll
  ScrollTrigger.batch('.timeline-item', {
    onEnter: b => gsap.from(b, { x: -24, opacity: 0, stagger: 0.09, duration: 0.55, ease: 'power2.out', clearProps: 'all' }),
    start: 'top 90%'
  });
  // Skills on scroll
  ScrollTrigger.batch('.skills-item', {
    onEnter: b => gsap.from(b, { x: -16, opacity: 0, stagger: 0.06, duration: 0.45, ease: 'power1.out', clearProps: 'all' }),
    start: 'top 92%'
  });
  // Article titles
  $$('.article-title').forEach(el => {
    gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 18, opacity: 0, duration: 0.55, ease: 'power2.out' });
  });
}

/* ─── 10. VanillaTilt — 3D CARD HOVER ──────────────────────── */
function initTilt() {
  if (!has('VanillaTilt')) return;
  VanillaTilt.init($$('.project-item > a'), {
    max: 7, speed: 350, glare: true, 'max-glare': 0.12, scale: 1.02
  });
  VanillaTilt.init($$('.service-item'), {
    max: 5, speed: 450, glare: false, scale: 1.01
  });
}

/* ─── 11. AOS SCROLL ANIMATIONS ────────────────────────────── */
function initAOS() {
  if (!has('AOS')) return;
  AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 50 });
  $$('.project-item').forEach((el, i) => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', String((i % 3) * 70));
  });
  $$('.clients-item').forEach((el, i) => {
    el.setAttribute('data-aos', 'zoom-in');
    el.setAttribute('data-aos-delay', String(i * 40));
  });
}

/* ─── 12. CUSTOM CURSOR ────────────────────────────────────── */
function initCursor() {
  const glow = $('#cursorGlow');
  const dot  = $('#cursorDot');
  if (!glow || !dot) return;

  let gx = 0, gy = 0;
  document.addEventListener('mousemove', e => {
    // Dot — instant
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
    // Glow — lagged via GSAP if available
    if (has('gsap')) {
      gsap.to({ x: gx, y: gy }, {
        x: e.clientX, y: e.clientY, duration: 0.25,
        onUpdate() { glow.style.left = this.targets()[0].x + 'px'; glow.style.top = this.targets()[0].y + 'px'; }
      });
    } else {
      glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    }
  });

  $$('a, button').forEach(el => {
    on(el, 'mouseenter', () => dot.style.transform = 'translate(-50%,-50%) scale(2.5)');
    on(el, 'mouseleave', () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

/* ─── 13. GLITCH NAME ON HOVER ─────────────────────────────── */
function initGlitch() {
  const name = $('.info-content .name');
  if (!name || !has('gsap')) return;
  on(name, 'mouseenter', () => {
    gsap.to(name, { skewX: 6, duration: 0.06, repeat: 4, yoyo: true, onComplete: () => gsap.set(name, { skewX: 0 }) });
  });
}

/* ─── 14. MAGNETIC BUTTONS ──────────────────────────────────── */
function initMagnetic() {
  if (!has('gsap')) return;
  $$('.form-btn, .social-link').forEach(btn => {
    on(btn, 'mousemove', function (e) {
      const r = this.getBoundingClientRect();
      gsap.to(this, { x: (e.clientX - r.left - r.width/2) * 0.22, y: (e.clientY - r.top - r.height/2) * 0.22, duration: 0.3, ease: 'power2.out' });
    });
    on(btn, 'mouseleave', function () {
      gsap.to(this, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });
}

/* ─── BOOT ENHANCEMENTS (called after loader hides) ─────────── */
function bootEnhancements() {
  initTyped();
  initParticles();
  initGSAP();
  initAOS();
  initTilt();
  initCursor();
  initGlitch();
  initMagnetic();
}

/* ─── INIT CORE (runs immediately on DOMContentLoaded) ──────── */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initModal();
  initFilter();
  initNavbar();
  initForm();
});

/* ─── ON FULL LOAD (start loader exit) ──────────────────────── */
window.addEventListener('load', hideLoader);
