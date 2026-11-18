/* SALDR STUDIO — main.ts (bundled by Astro/Vite)
   Lenis smooth scroll · GSAP 3.15 (ScrollTrigger, SplitText, CustomEase) · first-visit intro
   Page-to-page transitions are native cross-document View Transitions (CSS). */
// @ts-nocheck
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
const TG_USER = 'wcinreak';
const WA_NUM = '393520881131';
/* ==========================================================
   TAMGA STUDIO — main.js
   Smooth scroll · transitions · reveals · reel · drawer · forms
   Works without GSAP/Lenis (content stays visible).
   ========================================================== */
(() => {
  const d = document, html = d.documentElement, body = d.body;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Phones & tablets: native scroll, no intro, lighter effects, deferred setup
  const MOBILE = matchMedia('(max-width: 899px), (hover: none)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const G = gsap, ST = ScrollTrigger;
  const $ = (s, r = d) => r.querySelector(s);
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  G.registerPlugin(ST, CustomEase, SplitText);
  ST.config({ ignoreMobileResize: true });
  CustomEase.create('tg', '0.16,1,0.3,1'); CustomEase.create('tgio', '0.65,0,0.35,1');
  G.defaults({ ease: 'tg', duration: 1 });
  const EIO = 'tgio';

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (!RM && !MOBILE) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1 });
    if (G && ST) {
      lenis.on('scroll', ST.update);
      G.ticker.add(t => lenis.raf(t * 1000));
      G.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const lock = on => { if (lenis) on ? lenis.stop() : lenis.start(); body.style.overflow = on ? 'hidden' : ''; };
  // anchor links with smooth scroll
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: -90, duration: 1.4 }) : t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
  }));

  /* ---------- Split helpers ---------- */
  const splitWords = el => SplitText.create(el, { type: 'lines,words', mask: 'lines', linesClass: 'split-line', aria: 'none' });

  /* ---------- First-visit intro (later pages use native View Transitions) ---------- */
  const pt = $('.pt');
  const ptCount = $('.pt__count');
  const introDone = [];
  const onIntro = fn => introDone.push(fn);
  const finishIntro = () => { html.classList.add('js-ready'); html.classList.remove('intro'); introDone.forEach(f => f()); };
  store.set('sd-seen', '1');
  const safety = setTimeout(finishIntro, 4000);
  if (pt && html.classList.contains('intro') && !RM) {
    const c = { v: 0 };
    G.timeline({ onComplete: () => { clearTimeout(safety); finishIntro(); } })
      .to('.pt__bird', { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: EIO }, 0)
      .to(c, { v: 100, duration: 1.1, ease: EIO, onUpdate: () => { if (ptCount) ptCount.textContent = String(Math.round(c.v)).padStart(3, '0'); } }, 0)
      .to('.pt__bird', { x: '30vw', y: '-30vh', scale: 0.6, opacity: 0, duration: 0.7, ease: 'power3.in' }, 1.15)
      .to(pt, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: EIO }, 1.35);
  } else {
    clearTimeout(safety);
    requestAnimationFrame(finishIntro);
  }

  /* ---------- Header: hide on scroll, dark mode over dark sections ---------- */
  const hdr = $('.hdr');
  let lastY = 0;
  const onScroll = y => {
    if (!hdr || html.classList.contains('menu-open')) return;
    const dy = y - lastY;
    if (Math.abs(dy) < 6) return;
    hdr.classList.toggle('is-hidden', dy > 0 && y > 240);
    lastY = y;
  };
  if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

  const darkSecs = $$('[data-theme="dark"]');
  if (darkSecs.length && hdr) {
    const check = () => {
      const y = 40; let on = false;
      darkSecs.forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom >= y) on = true; });
      hdr.classList.toggle('on-dark', on);
      html.classList.toggle('on-dark-cursor', darkSecs.some(s => { const r = s.getBoundingClientRect(); return r.top <= innerHeight / 2 && r.bottom >= innerHeight / 2; }));
    };
    if (lenis) lenis.on('scroll', check); else window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* nav hover pill */
  const links = $('.nav__links'), pill = $('.nav__pill');
  if (links && pill) {
    const cur = $('a[aria-current="page"]', links);
    const moveTo = a => {
      if (!a) { pill.style.opacity = 0; return; }
      pill.style.width = a.offsetWidth + 'px';
      pill.style.transform = `translateX(${a.offsetLeft}px)`;
      pill.style.opacity = 1;
    };
    $$('a', links).forEach(a => a.addEventListener('mouseenter', () => moveTo(a)));
    links.addEventListener('mouseleave', () => moveTo(cur));
    requestAnimationFrame(() => { pill.style.transition = 'none'; moveTo(cur); requestAnimationFrame(() => (pill.style.transition = '')); });
    addEventListener('resize', () => moveTo(cur));
  }

  /* mobile menu */
  const burger = $('.nav__burger');
  if (burger) burger.addEventListener('click', () => {
    const open = !html.classList.contains('menu-open');
    html.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.querySelector('.nav__burger-t').textContent = open ? burger.dataset.close : burger.dataset.menu;
    hdr && hdr.classList.remove('is-hidden');
    lock(open);
  });

  /* ---------- Drawer ---------- */
  const drawer = $('.drawer');
  let lastFocus = null;
  const openDrawer = () => {
    if (!drawer) return;
    lastFocus = d.activeElement;
    html.classList.remove('menu-open');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    lock(true);
    setTimeout(() => { const f = $('input', drawer); f && f.focus({ preventScroll: true }); }, 450);
  };
  const closeDrawer = () => {
    if (!drawer || !drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    lock(false);
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  };
  $$('[data-drawer-open]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openDrawer(); }));
  $$('[data-drawer-close]').forEach(b => b.addEventListener('click', closeDrawer));
  d.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeDrawer(); if (html.classList.contains('menu-open')) burger && burger.click(); }
    if (e.key === 'Tab' && drawer && drawer.classList.contains('is-open')) {
      const f = $$('a,button,input,textarea,[tabindex]:not([tabindex="-1"])', drawer).filter(x => !x.disabled && x.offsetParent);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Forms ---------- */
  $$('form.js-form').forEach(form => {
    const done = form.parentElement.querySelector('.done');
    const fields = $$('.field[data-req]', form);
    const check = f => {
      const i = $('input,textarea', f); let ok = i.value.trim().length > 0;
      if (ok && i.name === 'contact') ok = /^@?[A-Za-z0-9_]{4,}$|^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim());
      f.classList.toggle('is-invalid', !ok); i.setAttribute('aria-invalid', !ok);
      return ok;
    };
    fields.forEach(f => {
      const i = $('input,textarea', f);
      i.addEventListener('blur', () => { if (i.value) check(f); });
      i.addEventListener('input', () => { if (f.classList.contains('is-invalid')) check(f); });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = fields.filter(f => !check(f));
      if (bad.length) { $('input,textarea', bad[0]).focus(); return; }
      const fd = new FormData(form);
      const T = JSON.parse((d.getElementById('form-i18n') || {}).textContent || '{}');
      const what = fd.getAll('what').join(', ') || T.notSure;
      const budget = fd.get('budget') || T.notSure;
      const msg = `${T.greeting}\n\n${fd.get('message')}\n\n${T.what}: ${what}\n${T.budget}: ${budget}\n${T.name}: ${fd.get('name')}\n${T.contact}: ${fd.get('contact')}`;
      if (done) {
        $('.done__box', done).textContent = msg;
        $('.done__tg', done).href = `https://t.me/${TG_USER}?text=${encodeURIComponent(msg)}`;
        const wa = $('.done__wa', done); if (wa) wa.href = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
        const cp = $('.done__copy', done);
        cp.onclick = () => {
          (navigator.clipboard ? navigator.clipboard.writeText(msg) : Promise.reject()).then(
            () => { cp.querySelector('.roll span').textContent = T.copied; },
            () => { cp.querySelector('.roll span').textContent = T.copyFail; });
        };
        form.style.display = 'none';
        done.classList.add('is-on');
        $('h3', done).focus();
      }
    });
    if (done) $('.done__back', done).addEventListener('click', () => { done.classList.remove('is-on'); form.style.display = ''; });
  });

  /* ---------- Language menu ---------- */
  $$('details.lang').forEach(dt => d.addEventListener('click', e => { if (!dt.contains(e.target)) dt.removeAttribute('open'); }));

  /* ---------- Clock ---------- */
  const clocks = $$('[data-clock]');
  if (clocks.length) {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit' });
    const tick = () => clocks.forEach(c => (c.textContent = fmt.format(new Date())));
    tick(); setInterval(tick, 15000);
  }

  /* ---------- FAQ accordion (animated) ---------- */
  $$('.faq details').forEach(det => {
    const sum = $('summary', det), body2 = $('.faq__a', det);
    sum.addEventListener('click', e => {
      if (RM || !body2.animate) return;
      e.preventDefault();
      if (det.open) {
        const h = body2.offsetHeight;
        body2.animate([{ height: h + 'px' }, { height: '0px' }], { duration: 450, easing: 'cubic-bezier(.65,0,.35,1)' }).onfinish = () => (det.open = false);
      } else {
        det.open = true;
        const h = body2.offsetHeight;
        body2.animate([{ height: '0px' }, { height: h + 'px' }], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    });
  });

  /* ---------- Work: filters + hover preview ---------- */
  const filt = $('.filters');
  if (filt) {
    const rows = $$('.wrow[data-cat]');
    $$('button', filt).forEach(b => b.addEventListener('click', () => {
      $$('button', filt).forEach(x => x.setAttribute('aria-pressed', x === b));
      const f = b.dataset.f;
      rows.forEach(r => r.classList.toggle('is-off', f !== 'all' && !r.dataset.cat.split(' ').includes(f)));
      if (G && !RM) G.fromTo(rows.filter(r => !r.classList.contains('is-off')), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 });
      ST && ST.refresh();
    }));
  }
  const prev = $('.wpreview');
  if (prev && FINE) {
    let tx = 0, ty = 0, x = 0, y = 0, on = false;
    $$('a.wrow[data-key]').forEach(r => {
      r.addEventListener('mouseenter', () => { on = true; prev.classList.add('is-on'); $$('picture', prev).forEach(i => i.classList.toggle('is-on', !!i.querySelector('.pv-' + r.dataset.key))); });
      r.addEventListener('mouseleave', () => { on = false; prev.classList.remove('is-on'); });
    });
    addEventListener('mousemove', e => { tx = e.clientX + 28; ty = e.clientY - prev.offsetHeight / 2; });
    const loop = () => { x += (tx - x) * 0.14; y += (ty - y) * 0.14; prev.style.left = x + 'px'; prev.style.top = y + 'px'; requestAnimationFrame(loop); };
    loop();
  }

  /* ---------- Services active state (IO, works without GSAP) ---------- */
  const svcItems = $$('.svc__item');
  if (svcItems.length && 'IntersectionObserver' in window) {
    const vis = $$('.svc__stage .svc__vis');
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      svcItems.forEach(i => i.classList.toggle('is-active', i === en.target));
      vis.forEach(v => v.classList.toggle('is-active', v.dataset.vis === en.target.dataset.vis));
    }), { rootMargin: '-45% 0px -45% 0px' });
    svcItems.forEach(i => io.observe(i));
  }

  /* ---------- Reel (drag + auto + velocity) ---------- */
  const reel = $('.reel');
  if (reel) {
    const track = $('.reel__track', reel);
    let x = 0, half = 0, vel = 0, drag = false, sx = 0, lx = 0, visible = true, scrollV = 0;
    const measure = () => (half = track.scrollWidth / 2);
    measure(); addEventListener('resize', measure);
    $$('img', track).forEach(i => i.addEventListener('load', measure));
    if (lenis) lenis.on('scroll', e => (scrollV = e.velocity || 0));
    new IntersectionObserver(es => (visible = es[0].isIntersecting)).observe(reel);
    reel.addEventListener('pointerdown', e => { drag = true; sx = lx = e.clientX; vel = 0; reel.classList.add('is-drag'); reel.setPointerCapture(e.pointerId); });
    reel.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - lx; lx = e.clientX; x += dx; vel = dx; });
    const up = () => { drag = false; reel.classList.remove('is-drag'); };
    reel.addEventListener('pointerup', up); reel.addEventListener('pointercancel', up);
    const base = RM ? 0 : -0.45;
    const loop = () => {
      if (visible && half) {
        if (!drag) { vel *= 0.94; x += vel + base * (1 + Math.min(Math.abs(scrollV) * 0.25, 6)); }
        if (x <= -half) x += half; if (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0)`;
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Ruler ---------- */
  const ruler = $('.ruler');
  if (ruler) {
    const N = 36; ruler.innerHTML = '<i></i>'.repeat(N);
    const ticks = $$('i', ruler);
    const upd = () => {
      const max = d.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? (lenis ? lenis.scroll : scrollY) / max : 0;
      const k = Math.round(p * (N - 1));
      ticks.forEach((t, i) => { t.classList.toggle('is-on', i === k); t.classList.toggle('is-near', Math.abs(i - k) === 1); });
    };
    if (lenis) lenis.on('scroll', upd); else addEventListener('scroll', upd, { passive: true });
    upd();
  }

  /* ---------- Cursor + magnetic ---------- */
  if (FINE && !RM) {
    html.classList.add('has-cursor');
    const cur = $('.cursor'), lab = $('.cursor__label');
    let cx = innerWidth / 2, cy = innerHeight / 2, px = cx, py = cy;
    addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
    const loop = () => { px += (cx - px) * 0.2; py += (cy - py) * 0.2; cur.style.transform = `translate3d(${px}px,${py}px,0)`; requestAnimationFrame(loop); };
    loop();
    d.addEventListener('mouseover', e => {
      const l = e.target.closest('[data-cursor]');
      if (l) { lab.textContent = l.dataset.cursor; cur.classList.add('is-label'); cur.classList.remove('is-hover'); return; }
      cur.classList.remove('is-label');
      cur.classList.toggle('is-hover', !!e.target.closest('a,button,summary,label,input,textarea'));
    });
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2, my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.22}px,${my * 0.32}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ==========================================================
     GSAP-driven motion (skipped with reduced motion)
     ========================================================== */
  if (RM) return;

  /* draw-on helper */
  const prepDraw = els => els.forEach(p => { const L = p.getTotalLength ? p.getTotalLength() : 300; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });

  /* Hero intro (home): words rise, construction lines draw, the eagle glides in */
  const hero = $('.hero');
  if (hero) {
    const h1 = $('.hero h1');
    const sp = splitWords(h1);
    G.set(sp.words, { yPercent: 115 });
    const fades = $$('.hero__status, .hero__sub, .hero__cta, .hero__meta');
    G.set(fades, { opacity: 0, y: 18 });
    const cons = $$('.hero .cons'), nodes = $$('.hero .node, .hero .lbl'), bird = $('.hero .stage__bird');
    prepDraw(cons);
    G.set(nodes, { opacity: 0 });
    G.set(bird, { opacity: 0, x: -60, y: 50, rotate: 6 });
    onIntro(() => {
      G.timeline()
        .to(sp.words, { yPercent: 0, duration: 1.2, stagger: 0.05 }, 0)
        .to(fades, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.35)
        .to(cons, { strokeDashoffset: 0, duration: 1.6, stagger: 0.05, ease: EIO }, 0.1)
        .to(bird, { opacity: 1, x: 0, y: 0, rotate: 0, duration: 1.8 }, 0.45)
        .to(nodes, { opacity: 1, duration: 0.6, stagger: 0.04 }, 1.3)
        .call(() => { sp.revert(); float(); });
    });
    // idle float + pointer parallax
    const float = () => G.to(bird, { y: -12, rotate: -1.2, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    if (FINE) {
      const qx = G.quickTo('.hero .stage__lines', 'x', { duration: 1.2 }), qy = G.quickTo('.hero .stage__lines', 'y', { duration: 1.2 });
      const bx = G.quickTo('.hero .stage', 'x', { duration: 1.6 }), by = G.quickTo('.hero .stage', 'y', { duration: 1.6 });
      hero.addEventListener('mousemove', e => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        qx(nx * -14); qy(ny * -14); bx(nx * 22); by(ny * 16);
      });
    }
    // on scroll the eagle climbs out of frame
    G.to('.hero .stage', { xPercent: 18, yPercent: -26, scale: 0.86, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* Page hero titles (above the fold, run now) */
  $$('.phero [data-split]').forEach(el => {
    const sp = splitWords(el); if (!sp) return;
    G.set(sp.words, { yPercent: 115 });
    onIntro(() => G.to(sp.words, { yPercent: 0, duration: 1.1, stagger: 0.035, onComplete: () => sp.revert() }));
  });
  $$('.phero [data-fade]').forEach((el, i) => {
    G.set(el, { opacity: 0, y: 16 });
    onIntro(() => G.to(el, { opacity: 1, y: 0, duration: 1, delay: 0.25 + i * 0.08 }));
  });

  /* Everything below the fold is set up in small idle chunks, so the first
     seconds on a phone stay free for scrolling and taps. */
  const idle = window.requestIdleCallback ? (cb => requestIdleCallback(cb, { timeout: 1200 })) : (cb => setTimeout(cb, 120));
  const jobs = [];
  const later = fn => jobs.push(fn);

  later(() => $$('[data-split]').filter(el => !el.closest('.phero')).forEach(el => {
    const sp = splitWords(el); if (!sp) return;
    G.set(sp.words, { yPercent: 115 });
    ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => G.to(sp.words, { yPercent: 0, duration: 1.1, stagger: 0.035, onComplete: () => sp.revert() }) });
  }));

  /* Blur-in titles */
  later(() => {
  $$('[data-blur]').forEach(el => {
    G.fromTo(el, MOBILE ? { opacity: 0, y: 14 } : { opacity: 0, filter: 'blur(12px)', y: 10 }, { opacity: 1, ...(MOBILE ? {} : { filter: 'blur(0px)' }), y: 0, duration: 1.2, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  });

  /* Manifesto scroll-scrub */
  later(() => {
  $$('[data-scrub]').forEach(el => {
    const sp = SplitText.create($$('p', el), { type: 'words', wordsClass: 'w', aria: 'none' });
    G.to(sp.words, { color: '#16181D', stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 55%', scrub: 0.6 } });
  });
  });

  /* Draw on enter */
  later(() => {
  $$('[data-draw]').forEach(svg => {
    const ps = $$('path,circle,line', svg).filter(p => !p.classList.contains('nodraw'));
    prepDraw(ps);
    G.to(ps, { strokeDashoffset: 0, duration: 1.8, stagger: 0.18, ease: EIO, scrollTrigger: { trigger: svg, start: 'top 85%', once: true } });
  });
  });

  /* Case stack: previous card recedes */
  later(() => {
  const cases = $$('.stack .case');
  cases.forEach((c, i) => {
    const next = cases[i + 1]; if (!next) return;
    G.to($('.case__frame', c), { scale: 0.92, '--dim': 0.7, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true } });
  });
  });

  /* Clip reveals + parallax */
  later(() => {
  $$('[data-clip]').forEach(el => {
    G.fromTo(el, { clipPath: 'inset(10% 10% 10% 10% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true } });
  });
  $$('[data-parallax]').forEach(el => {
    const v = parseFloat(el.dataset.parallax) || 0.1;
    G.fromTo(el, { yPercent: v * 100 }, { yPercent: -v * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  });

  /* Reel entrance */
  later(() => {
  if (reel) G.from('.reel__item', { y: 80, opacity: 0, duration: 1.3, stagger: 0.05, scrollTrigger: { trigger: reel, start: 'top 90%', once: true } });
  });

  /* Process lines */
  later(() => {
  const steps = $$('.step');
  if (steps.length) G.to(steps, { '--p': 1, stagger: 0.3, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 82%', end: 'top 30%', scrub: true } });
  });

  /* Footer wordmark */
  later(() => {
  const fw = $$('.ftr__word span');
  if (fw.length) G.from(fw, { yPercent: 100, duration: 1.3, stagger: 0.06, scrollTrigger: { trigger: '.ftr__word', start: 'top 95%', once: true } });
  });

  /* CTA mark spin */
  later(() => {
  if ($('.cta__mark')) G.fromTo('.cta__mark', { rotate: -20, scale: 0.85 }, { rotate: 10, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Plans / principles subtle stagger (one orchestrated moment per group) */
  later(() => {
  ['.plans .plan', '.princ > div', '.idgrid .idtile', '.swatches .sw'].forEach(sel => {
    const els = $$(sel); if (!els.length) return;
    G.from(els, { y: 40, opacity: 0, duration: 1.1, stagger: 0.08, scrollTrigger: { trigger: els[0].parentElement, start: 'top 85%', once: true } });
  });
  });

  const run = () => { const job = jobs.shift(); if (job) { job(); idle(run); } else ST.refresh(); };
  idle(run);
  addEventListener('load', () => { if (!jobs.length) ST.refresh(); });
})();
