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

    // Mobile nav close on link click
    document.querySelectorAll('.navmenu a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navmenu').classList.remove('open'));
    });
