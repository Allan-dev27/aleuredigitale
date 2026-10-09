// Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Scroll top button
    const scrollTop = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
      scrollTop.classList.toggle('visible', window.scrollY > 400);
    });

    // Nav active state on scroll
    const sections = document.querySelectorAll('section[id], div[id="hero"]');
    const navLinks = document.querySelectorAll('.navmenu a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
      });
    });

    // Contact form handler — Formspree
    async function handleForm(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const status = document.getElementById('form-status');
      const form = e.target;
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;
      status.style.display = 'none';

      try {
        const data = new FormData(form);
        const res = await fetch('https://formspree.io/f/aleuredudigitale@gmail.com', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.textContent = '✓ Message envoyé avec succès — Merci !';
          status.style.color = 'var(--green-accent)';
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        // Fallback: open default mail client
        const nom     = form.querySelector('[name="nom"]').value;
        const sujet   = form.querySelector('[name="sujet"]').value || 'Contact site';
        const message = form.querySelector('[name="message"]').value;
        window.location.href = `mailto:aleuredudigitale@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent('De : ' + nom + '\n\n' + message)}`;
        status.textContent = 'Redirection vers votre messagerie…';
        status.style.color = 'rgba(255,255,255,0.6)';
      }

      status.style.display = 'block';
      btn.textContent = 'Envoyer le message';
      btn.disabled = false;
    }

    // Mobile nav close on link click (le toggle du sous-menu "Découvrir" ne ferme pas le menu)
    document.querySelectorAll('.navmenu a:not(.dropdown-toggle)').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navmenu').classList.remove('open'));
    });

    // Sous-menu "Découvrir" : ouverture au clic/tactile en plus du survol desktop
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggle.closest('.has-dropdown').classList.toggle('open-dropdown');
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown.open-dropdown').forEach(el => el.classList.remove('open-dropdown'));
      }
    });


// ===== Bandeau événement + compte à rebours (Eure Tech & Inclusion) =====
(function () {
  const banner = document.getElementById('event-banner');
  if (!banner) return;

  const CLOSED_KEY = 'eti-banner-closed';
  try { if (sessionStorage.getItem(CLOSED_KEY)) return; } catch (e) {}

  const start = new Date(banner.dataset.start).getTime();
  const end   = new Date(banner.dataset.end).getTime();
  const cells = banner.querySelectorAll('.cd-num');
  const countdown = document.getElementById('event-countdown');
  const live = document.getElementById('event-live');
  let timer;

  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const now = Date.now();

    // Événement terminé : on retire le bandeau
    if (now >= end) { banner.hidden = true; clearInterval(timer); return; }

    // Événement en cours : message spécial à la place du compte à rebours
    if (now >= start) {
      countdown.hidden = true;
      live.hidden = false;
      banner.hidden = false;
      return;
    }

    const diff = Math.floor((start - now) / 1000);
    const values = {
      days:    Math.floor(diff / 86400),
      hours:   Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60,
    };
    cells.forEach(el => { el.textContent = pad(values[el.dataset.unit]); });
    banner.hidden = false;
  }

  tick();
  timer = setInterval(tick, 1000);

  document.getElementById('event-banner-close').addEventListener('click', () => {
    banner.hidden = true;
    clearInterval(timer);
    try { sessionStorage.setItem(CLOSED_KEY, '1'); } catch (e) {}
  });
})();
  // Candidature form (associations)
  const candidatureForm = document.getElementById('candidature-form');
  if (candidatureForm) {
    candidatureForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('form-status');
      const submitBtn = candidatureForm.querySelector('button[type="submit"]');
      statusEl.className = 'form-status';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';
 
      try {
        const res = await fetch(candidatureForm.action, {
          method: 'POST',
          body: new FormData(candidatureForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          statusEl.textContent = 'Merci ! Votre candidature a bien été envoyée. Nous revenons vers vous sous 3 semaines maximum.';
          statusEl.classList.add('success');
          candidatureForm.reset();
          statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Erreur d\'envoi');
        }
      } catch (err) {
        statusEl.textContent = "Une erreur est survenue lors de l'envoi. Vous pouvez aussi nous écrire directement à contact@aleuredigitale.fr.";
        statusEl.classList.add('error');
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer ma candidature →';
      }
    });
  }
 