  /* ─── TABS ─── */
  function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.querySelectorAll('#tab-' + tab + ' .reveal').forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }

  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ─── FORMULAIRE MULTI-ÉTAPES ─── */
  let currentStep = 1;
  const totalSteps = 3;
  const progressValues = { 1: '33%', 2: '66%', 3: '100%' };

  function goToStep(step) {
    // Validation simple étape 1
    if (step > 1 && currentStep === 1) {
      const prenom = document.getElementById('prenom').value.trim();
      const nom    = document.getElementById('nom').value.trim();
      const email  = document.getElementById('email').value.trim();
      const commune= document.getElementById('commune').value.trim();
      if (!prenom || !nom || !email || !commune) {
        shakeForm(); return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) { document.getElementById('email').focus(); shakeForm(); return; }
    }
    // Validation simple étape 2
    if (step > 2 && currentStep === 2) {
      const statut = document.getElementById('statut').value;
      const niveau = document.getElementById('niveau').value;
      if (!statut || !niveau) { shakeForm(); return; }
    }

    // Masquer page courante, afficher nouvelle
    document.getElementById('form-page-' + currentStep).classList.remove('active');
    currentStep = step;
    document.getElementById('form-page-' + currentStep).classList.add('active');

    // Mettre à jour indicateurs
    updateStepIndicators();
    // Scroller en haut du form
    document.querySelector('.reg-form-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateStepIndicators() {
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = progressValues[currentStep] || '100%';
    for (let i = 1; i <= totalSteps; i++) {
      const el = document.getElementById('step-indicator-' + i);
      if (!el) continue;
      el.classList.remove('active', 'done');
      if (i < currentStep)  el.classList.add('done');
      if (i === currentStep) el.classList.add('active');
      // Mettre à jour le dot pour les étapes terminées
      const dot = el.querySelector('.step-dot');
      if (i < currentStep) dot.innerHTML = '<i class="bi bi-check-lg" style="font-size:0.65rem"></i>';
      else dot.textContent = i;
    }
  }

  async function submitForm() {
    // Vérifier RGPD
    if (!document.getElementById('rgpd').checked) {
      document.getElementById('rgpd').closest('.consent-box').style.borderColor = 'red';
      setTimeout(() => document.getElementById('rgpd').closest('.consent-box').style.borderColor = '', 2000);
      return;
    }

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Envoi en cours…';

    // Recueillir les données
    const prenom = document.getElementById('prenom').value.trim();
    const nom    = document.getElementById('nom').value.trim();
    const email  = document.getElementById('email').value.trim();

    // Tentative Formspree
    try {
      const formData = new FormData();
      formData.append('name', prenom + ' ' + nom);
      formData.append('email', email);
      formData.append('commune', document.getElementById('commune').value);
      formData.append('statut', document.getElementById('statut').value);
      formData.append('niveau', document.getElementById('niveau').value);
      formData.append('handicap', document.getElementById('handicap').value);
      formData.append('organisation', document.getElementById('organisation').value);
      formData.append('remarques', document.getElementById('remarques').value);
      const sessions = [...document.querySelectorAll('input[name="sessions"]:checked')].map(c => c.value).join(', ');
      formData.append('sessions_choisies', sessions || 'Non précisé');
      formData.append('newsletter', document.getElementById('newsletter').checked ? 'Oui' : 'Non');
      formData.append('_subject', 'Inscription Eure Tech & Inclusion 2026 — ' + prenom + ' ' + nom);

      const res = await fetch('https://formspree.io/f/aleuredudigitale@gmail.com', {
        method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
      });

      if (!res.ok) throw new Error('Formspree error');
    } catch {
      // Fallback mailto si Formspree échoue
      const sessions = [...document.querySelectorAll('input[name="sessions"]:checked')].map(c => c.value).join(', ');
      const body = `Nom : ${prenom} ${nom}\nEmail : ${email}\nStatut : ${document.getElementById('statut').value}\nNiveau : ${document.getElementById('niveau').value}\nSessions : ${sessions || 'Non précisé'}\nRemarques : ${document.getElementById('remarques').value}`;
      window.location.href = `mailto:aleuredudigitale@gmail.com?subject=${encodeURIComponent('Inscription Eure Tech & Inclusion 2026')}&body=${encodeURIComponent(body)}`;
    }

    // Afficher page confirmation
    showConfirmation(prenom, nom, email);
  }

  function showConfirmation(prenom, nom, email) {
    document.getElementById('form-page-3').classList.remove('active');
    document.getElementById('form-page-confirm').classList.add('active');
    document.getElementById('progressBar').style.width = '100%';

    // Mettre à jour le récap
    const recap = document.getElementById('confirmRecap');
    const nameRow = document.createElement('div');
    nameRow.className = 'confirm-recap-row';
    nameRow.innerHTML = `<i class="bi bi-person-fill"></i><span><strong>Inscrit(e) :</strong> ${prenom} ${nom}</span>`;
    recap.insertBefore(nameRow, recap.firstChild);

    // Passer tous les steps en "done"
    for (let i = 1; i <= totalSteps; i++) {
      const el = document.getElementById('step-indicator-' + i);
      if (!el) continue;
      el.classList.remove('active');
      el.classList.add('done');
      el.querySelector('.step-dot').innerHTML = '<i class="bi bi-check-lg" style="font-size:0.65rem"></i>';
    }

    document.querySelector('.reg-form-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function shakeForm() {
    const body = document.querySelector('.reg-form-body');
    body.style.animation = 'none';
    body.offsetHeight; // reflow
    body.style.animation = 'shake 0.4s ease';
    setTimeout(() => body.style.animation = '', 500);
  }
