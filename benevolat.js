// ============================================================
//  A L'EURE DIGITALE — BENEVOLAT.JS
//  Fichier de configuration et de rendu des offres de bénévolat
//  ============================================================
//
//  COMMENT AJOUTER UNE OFFRE :
//  Copiez un bloc { ... } dans le tableau OFFRES ci-dessous,
//  remplissez les champs, sauvegardez. C'est tout !
//
//  CHAMPS :
//   id          — identifiant unique (string, ex. "ben-001")
//   titre       — intitulé de la mission
//   domaine     — domaine (voir DOMAINES ci-dessous)
//   engagement  — temps estimé (ex. "2h / semaine", "ponctuel")
//   lieu        — lieu de la mission (ou "À distance")
//   niveau      — niveau requis (ex. "Débutant accepté", "Confirmé")
//   description — résumé court affiché sur la carte (1-2 phrases)
//   missions    — tableau de tâches concrètes, affichées dans le détail
//   competences — tableau de compétences ou qualités recherchées
//   pourvu      — true / false (poste déjà pourvu)
// ============================================================

// ── DOMAINES ────────────────────────────────────────────────
// Vous pouvez ajouter vos propres domaines ici.
const DOMAINES = {
  developpement:   { label: "Développement",     couleur: "#2ec06a", icone: "bi-code-slash" },
  formation:       { label: "Formation",         couleur: "#8b5cf6", icone: "bi-mortarboard-fill" },
  accompagnement:  { label: "Accompagnement",    couleur: "#0ea5e9", icone: "bi-people-fill" },
  communication:   { label: "Communication",     couleur: "#f59e0b", icone: "bi-megaphone-fill" },
  logistique:      { label: "Logistique",        couleur: "#ef4444", icone: "bi-truck" },
  administration:  { label: "Administration",    couleur: "#64748b", icone: "bi-clipboard-data-fill" },
};

// ── OFFRES ──────────────────────────────────────────────────
// ✏️  AJOUTEZ / MODIFIEZ VOS OFFRES ICI
const OFFRES = [
  {
    id: "ben-001",
    titre: "Formateur / formatrice ateliers numériques",
    domaine: "formation",
    engagement: "3h / mois",
    lieu: "Évreux & Bernay",
    niveau: "Confirmé",
    description: "Animez nos ateliers Git, Linux, sécurité ou web auprès de publics débutants à intermédiaires, une fois par mois environ.",
    missions: [
      "Préparer et animer un atelier thématique (2 à 3h) une fois par mois",
      "Adapter le contenu au niveau des participants présents",
      "Répondre aux questions et accompagner les mises en pratique",
      "Faire un retour rapide à l'équipe après chaque session",
    ],
    competences: ["Bonne maîtrise du sujet enseigné", "Pédagogie et patience", "À l'aise pour parler en public"],
    pourvu: false,
  },
  {
    id: "ben-002",
    titre: "Développeur / développeuse bénévole — Match'Emploi",
    domaine: "developpement",
    engagement: "2 à 4h / semaine",
    lieu: "À distance",
    niveau: "Débutant accepté",
    description: "Contribuez au développement de la plateforme Match'Emploi aux côtés de l'équipe technique, sur des tâches front ou back selon vos affinités.",
    missions: [
      "Développer de nouvelles fonctionnalités ou corriger des bugs",
      "Participer aux points d'équipe hebdomadaires sur Discord",
      "Documenter le code produit pour faciliter la prise de relais",
      "Proposer des améliorations d'ergonomie ou de performance",
    ],
    competences: ["Bases en HTML/CSS/JS ou équivalent", "Envie d'apprendre en groupe", "Autonomie sur Git"],
    pourvu: false,
  },
  {
    id: "ben-003",
    titre: "Community manager bénévole",
    domaine: "communication",
    engagement: "1h / semaine",
    lieu: "À distance",
    niveau: "Débutant accepté",
    description: "Aidez à faire vivre nos réseaux sociaux et notre serveur Discord : publications, relais d'événements, animation de la communauté.",
    missions: [
      "Planifier et publier des contenus sur les réseaux sociaux de l'association",
      "Relayer les événements à venir (ateliers, permanences, AG)",
      "Modérer et animer le serveur Discord",
      "Recueillir des témoignages et photos lors des événements",
    ],
    competences: ["À l'aise avec les réseaux sociaux", "Bonne expression écrite", "Créativité"],
    pourvu: false,
  },
  {
    id: "ben-004",
    titre: "Bénévole permanences numériques",
    domaine: "accompagnement",
    engagement: "2h / mois",
    lieu: "Bernay",
    niveau: "Débutant accepté",
    description: "Accueillez et accompagnez les habitants dans leurs démarches administratives en ligne lors des permanences en bibliothèque.",
    missions: [
      "Accueillir les personnes venues pour une démarche en ligne",
      "Aider à la création de comptes, remplissage de formulaires, impression de documents",
      "Sensibiliser aux bons réflexes de sécurité numérique",
      "Orienter vers nos ateliers si besoin d'un accompagnement plus poussé",
    ],
    competences: ["Bon relationnel", "Patience pédagogique", "Aisance de base avec les outils numériques"],
    pourvu: false,
  },
  {
    id: "ben-005",
    titre: "Bénévole logistique événements",
    domaine: "logistique",
    engagement: "Ponctuel",
    lieu: "Évreux",
    niveau: "Débutant accepté",
    description: "Prêtez main-forte lors de nos temps forts (Hackathon Match'Emploi, Assemblée Générale, EureTech & Inclusion) : installation, accueil, rangement.",
    missions: [
      "Aider à l'installation et au rangement des salles avant/après l'événement",
      "Accueillir et orienter les participants le jour J",
      "Veiller au bon déroulement logistique (pauses, matériel, signalétique)",
    ],
    competences: ["Disponibilité ponctuelle", "Sens de l'organisation", "Esprit d'équipe"],
    pourvu: false,
  },
  {
    id: "ben-006",
    titre: "Trésorier / trésorière adjoint(e)",
    domaine: "administration",
    engagement: "2h / mois",
    lieu: "À distance",
    niveau: "Confirmé",
    description: "Épaulez notre trésorier dans le suivi comptable de l'association : cotisations, subventions, notes de frais.",
    missions: [
      "Suivre les entrées et sorties (cotisations HelloAsso, subventions, achats)",
      "Préparer les documents comptables pour l'Assemblée Générale",
      "Aider au montage de dossiers de subvention",
    ],
    competences: ["Notions de comptabilité associative", "Rigueur", "Discrétion"],
    pourvu: true,
  },
];

// ============================================================
//  MOTEUR DE RENDU — ne pas modifier sauf personnalisation
// ============================================================

(function () {
  const container = document.getElementById('benevolat-liste');
  const filtersEl = document.getElementById('benevolat-filters');
  const emptyEl   = document.getElementById('benevolat-empty');
  const modalEl   = document.getElementById('benevolat-modal');
  if (!container) return;

  // Postes disponibles d'abord, puis pourvus
  const sortedOffres = [...OFFRES].sort((a, b) => Number(a.pourvu) - Number(b.pourvu));

  // ── Filtres ──────────────────────────────────────────────
  let activeFilter = 'tous';

  function renderFilters() {
    if (!filtersEl) return;
    const presentDomaines = [...new Set(sortedOffres.map(o => o.domaine))];
    let html = `<button class="benevolat-filter active" data-filter="tous">Tous</button>`;
    presentDomaines.forEach(d => {
      const info = DOMAINES[d] || { label: d, couleur: '#888' };
      html += `<button class="benevolat-filter" data-filter="${d}" style="--fc:${info.couleur}">${info.label}</button>`;
    });
    filtersEl.innerHTML = html;
    filtersEl.querySelectorAll('.benevolat-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersEl.querySelectorAll('.benevolat-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderOffres();
      });
    });
  }

  // ── Rendu des cartes ─────────────────────────────────────
  function renderOffres() {
    const filtered = activeFilter === 'tous'
      ? sortedOffres
      : sortedOffres.filter(o => o.domaine === activeFilter);

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    container.innerHTML = filtered.map(off => {
      const dom = DOMAINES[off.domaine] || { label: off.domaine, couleur: '#888', icone: 'bi-star' };
      const badge = off.pourvu ? '<span class="benevolat-badge benevolat-badge--pourvu">Poste pourvu</span>' : '';

      return `
      <article class="benevolat-card fade-up ${off.pourvu ? 'is-pourvu' : ''}" style="--ben-color:${dom.couleur}" data-id="${off.id}">
        <div class="benevolat-card-top">
          <div class="benevolat-domaine-pill"><i class="bi ${dom.icone}"></i> ${dom.label}</div>
          ${badge}
        </div>
        <h4 class="benevolat-card-title">${off.titre}</h4>
        <p class="benevolat-card-desc">${off.description}</p>
        <div class="benevolat-card-meta">
          <span><i class="bi bi-clock"></i> ${off.engagement}</span>
          <span><i class="bi bi-geo-alt-fill"></i> ${off.lieu}</span>
          <span><i class="bi bi-bar-chart-fill"></i> ${off.niveau}</span>
        </div>
        ${off.pourvu
          ? `<span class="benevolat-btn benevolat-btn--disabled">Poste déjà pourvu <i class="bi bi-check-circle"></i></span>`
          : `<button class="benevolat-btn" data-id="${off.id}">Voir la mission <i class="bi bi-arrow-right-short"></i></button>`}
      </article>`;
    }).join('');

    container.querySelectorAll('.fade-up').forEach(el => benevolatObserver.observe(el));
    container.querySelectorAll('.benevolat-btn:not(.benevolat-btn--disabled)').forEach(btn => {
      btn.addEventListener('click', () => openOffre(btn.dataset.id));
    });
  }

  // ── Détail d'une offre (modal) ───────────────────────────
  function openOffre(id) {
    if (!modalEl) return;
    const off = OFFRES.find(o => o.id === id);
    if (!off) return;
    const dom = DOMAINES[off.domaine] || { label: off.domaine, couleur: '#888', icone: 'bi-star' };

    const missionsHtml = (off.missions || []).map(m => `<li>${m}</li>`).join('');
    const competencesHtml = (off.competences || [])
      .map(c => `<span class="benevolat-modal-tag">${c}</span>`).join('');
    const mailSubject = encodeURIComponent(`Bénévolat — ${off.titre}`);
    const mailBody = encodeURIComponent(`Bonjour,\n\nJe souhaite proposer mon aide bénévole pour la mission « ${off.titre} ».\n\nMerci de me recontacter pour en discuter.`);

    modalEl.querySelector('.benevolat-modal-domaine').innerHTML = `<i class="bi ${dom.icone}"></i> ${dom.label}`;
    modalEl.querySelector('.benevolat-modal-domaine').style.setProperty('--ben-color', dom.couleur);
    modalEl.querySelector('.benevolat-modal-title').textContent = off.titre;
    modalEl.querySelector('.benevolat-modal-meta').innerHTML =
      `<span><i class="bi bi-clock"></i> ${off.engagement}</span>` +
      `<span><i class="bi bi-geo-alt-fill"></i> ${off.lieu}</span>` +
      `<span><i class="bi bi-bar-chart-fill"></i> ${off.niveau}</span>`;
    modalEl.querySelector('.benevolat-modal-desc').textContent = off.description;
    modalEl.querySelector('.benevolat-modal-missions').innerHTML = missionsHtml;
    modalEl.querySelector('.benevolat-modal-tags').innerHTML = competencesHtml;
    modalEl.querySelector('.benevolat-modal-apply')
      .setAttribute('href', `mailto:aleuredudigitale@gmail.com?subject=${mailSubject}&body=${mailBody}`);

    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeOffre() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalEl) {
    modalEl.querySelectorAll('[data-benevolat-close]').forEach(el => el.addEventListener('click', closeOffre));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOffre(); });
  }

  // Intersection observer pour les nouvelles cartes
  const benevolatObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });

  renderFilters();
  renderOffres();

  // Compteur de missions disponibles
  const counter = document.getElementById('benevolat-count');
  if (counter) counter.textContent = sortedOffres.filter(o => !o.pourvu).length;
})();
