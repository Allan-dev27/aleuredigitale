// ============================================================
//  A L'EURE DIGITALE — AGENDA.JS
//  Fichier de configuration et de rendu des événements
//  ============================================================
//
//  COMMENT AJOUTER UN ÉVÉNEMENT :
//  Copiez un bloc { ... } dans le tableau EVENTS ci-dessous,
//  remplissez les champs, sauvegardez. C'est tout !
//
//  CHAMPS :
//   id         — identifiant unique (string, ex. "evt-001")
//   titre      — nom de l'événement
//   date       — "YYYY-MM-DD"
//   heureDebut — "HH:MM"
//   heureFin   — "HH:MM"  (optionnel, laisser "" si absent)
//   lieu       — adresse / salle
//   type       — catégorie (voir TYPES ci-dessous)
//   description— texte court (1-2 phrases)
//   lien       — URL d'inscription / info  (optionnel, laisser "")
//   labelLien  — texte du bouton (optionnel, ex. "S'inscrire")
//   complet    — true / false
// ============================================================

// ── CATÉGORIES ──────────────────────────────────────────────
// Vous pouvez ajouter vos propres catégories ici.
const TYPES = {
  atelier:     { label: "Atelier",       couleur: "#2ec06a", icone: "bi-laptop" },
  permanence:  { label: "Permanence",    couleur: "#0ea5e9", icone: "bi-people-fill" },
  evenement:   { label: "Événement",     couleur: "#f59e0b", icone: "bi-calendar-event" },
  formation:   { label: "Formation",     couleur: "#8b5cf6", icone: "bi-mortarboard-fill" },
  reunion:     { label: "Réunion",       couleur: "#ef4444", icone: "bi-chat-dots-fill" },
};

// ── ÉVÉNEMENTS ──────────────────────────────────────────────
// ✏️  AJOUTEZ / MODIFIEZ VOS ÉVÉNEMENTS ICI
const EVENTS = [
  {
    id: "evt-001",
    titre: "Atelier Git & GitHub — débutants",
    date: "2026-07-05",
    heureDebut: "14:00",
    heureFin: "17:00",
    lieu: "BeeCowork, Évreux",
    type: "atelier",
    description: "Initiation au contrôle de version avec Git : commandes de base, branches, pull requests sur GitHub.",
    lien: "mailto:aleuredudigitale@gmail.com?subject=Inscription+Atelier+Git",
    labelLien: "S'inscrire",
    complet: true,
  },
  {
    id: "evt-002",
    titre: "Permanence numérique — Bernay",
    date: "2026-07-11",
    heureDebut: "15:00",
    heureFin: "18:00",
    lieu: "Bibliothèque municipale de Bernay",
    type: "permanence",
    description: "Aide aux démarches administratives en ligne, création de compte, sécurité des mots de passe.",
    lien: "",
    labelLien: "",
    complet: false,
  },
  {
    id: "evt-003",
    titre: "Assemblée Générale 2026",
    date: "2026-06-06",
    heureDebut: "14:00",
    heureFin: "16:30",
    lieu: "Sur Discord",
    type: "reunion",
    description: "Réunion annuelle de l'association : bilan, projets à venir, élection du bureau.",
    lien: "mailto:aleuredudigitale@gmail.com?subject=AG+2026",
    labelLien: "Confirmer ma présence",
    complet: false,
  },
  {
    id: "evt-004",
    titre: "Formation Linux — niveau intermédiaire",
    date: "2026-08-02",
    heureDebut: "09:30",
    heureFin: "16:30",
    lieu: "BeeCowork, Évreux",
    type: "formation",
    description: "Journée complète sur l'administration Linux : gestion des processus, systemd, réseau et scripting bash.",
    lien: "mailto:aleuredudigitale@gmail.com?subject=Formation+Linux",
    labelLien: "S'inscrire",
    complet: false,
  },
  {
    id: "evt-005",
    titre: "Hackathon Match'Emploi",
    date: "2026-09-13",
    heureDebut: "09:00",
    heureFin: "18:00",
    lieu: "CCI Portes de Normandie, Évreux",
    type: "evenement",
    description: "Journée de co-création autour de la plateforme Match'Emploi : design, dev, UX — tous niveaux bienvenus.",
    lien: "mailto:aleuredudigitale@gmail.com?subject=Hackathon+MatchEmploi",
    labelLien: "Participer",
    complet: false,
  },
  {
    id: "evt-006",
    titre: "Atelier Sécurité Web (places limitées)",
    date: "2026-09-27",
    heureDebut: "14:00",
    heureFin: "17:00",
    lieu: "Café de la Gare, Bernay",
    type: "atelier",
    description: "Introduction à la cybersécurité : mots de passe, phishing, HTTPS et bonnes pratiques quotidiennes.",
    lien: "",
    labelLien: "",
    complet: true,  // ← Événement complet : affichage automatique du badge
  },
];

// ============================================================
//  MOTEUR DE RENDU — ne pas modifier sauf personnalisation
// ============================================================

(function () {
  const container = document.getElementById('agenda-liste');
  const filtersEl = document.getElementById('agenda-filters');
  const emptyEl   = document.getElementById('agenda-empty');
  if (!container) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Trier par date croissante, ignorer les événements passés
  const futureEvents = EVENTS
    .filter(ev => new Date(ev.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // ── Filtres ──────────────────────────────────────────────
  let activeFilter = 'tous';

  function renderFilters() {
    if (!filtersEl) return;
    const presentTypes = [...new Set(futureEvents.map(e => e.type))];
    let html = `<button class="agenda-filter active" data-filter="tous">Tous</button>`;
    presentTypes.forEach(t => {
      const info = TYPES[t] || { label: t, couleur: '#888' };
      html += `<button class="agenda-filter" data-filter="${t}" style="--fc:${info.couleur}">${info.label}</button>`;
    });
    filtersEl.innerHTML = html;
    filtersEl.querySelectorAll('.agenda-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersEl.querySelectorAll('.agenda-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderEvents();
      });
    });
  }

  // ── Formatage date ───────────────────────────────────────
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function isThisWeek(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const diff = (d - today) / 86400000;
    return diff >= 0 && diff < 7;
  }

  function isThisMonth(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }

  // ── Rendu des cartes ─────────────────────────────────────
  function renderEvents() {
    const filtered = activeFilter === 'tous'
      ? futureEvents
      : futureEvents.filter(e => e.type === activeFilter);

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    container.innerHTML = filtered.map(ev => {
      const type    = TYPES[ev.type] || { label: ev.type, couleur: '#888', icone: 'bi-calendar' };
      const horaire = ev.heureDebut + (ev.heureFin ? ` – ${ev.heureFin}` : '');
      const proche  = isThisWeek(ev.date) ? '<span class="agenda-badge agenda-badge--soon">Cette semaine</span>' : '';
      const mois    = (!isThisWeek(ev.date) && isThisMonth(ev.date))
        ? '<span class="agenda-badge agenda-badge--month">Ce mois-ci</span>' : '';
      const complet = ev.complet ? '<span class="agenda-badge agenda-badge--full">Complet</span>' : '';

      return `
      <article class="agenda-card fade-up" style="--ev-color:${type.couleur}">
        <div class="agenda-card-stripe"></div>
        <div class="agenda-card-body">
          <div class="agenda-card-top">
            <div class="agenda-type-pill">
              <i class="bi ${type.icone}"></i> ${type.label}
            </div>
            <div class="agenda-badges-row">${proche}${mois}${complet}</div>
          </div>
          <h4 class="agenda-card-title">${ev.titre}</h4>
          <p class="agenda-card-desc">${ev.description}</p>
          <div class="agenda-card-meta">
            <span><i class="bi bi-calendar3"></i> ${formatDate(ev.date)}</span>
            <span><i class="bi bi-clock"></i> ${horaire}</span>
            <span><i class="bi bi-geo-alt-fill"></i> ${ev.lieu}</span>
          </div>
          ${ev.lien && !ev.complet
            ? `<a href="${ev.lien}" class="agenda-btn" ${ev.lien.startsWith('http') ? 'target="_blank"' : ''}>${ev.labelLien || 'En savoir plus'} <i class="bi bi-arrow-right-short"></i></a>`
            : ev.complet ? `<span class="agenda-btn agenda-btn--disabled">Complet <i class="bi bi-x-circle"></i></span>` : ''}
        </div>
      </article>`;
    }).join('');

    // Réobserver les nouvelles cartes pour le fade-up
    container.querySelectorAll('.fade-up').forEach(el => {
      agendaObserver.observe(el);
    });
  }

  // Intersection observer pour les nouvelles cartes
  const agendaObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });

  renderFilters();
  renderEvents();

  // Compteur d'événements à venir
  const counter = document.getElementById('agenda-count');
  if (counter) counter.textContent = futureEvents.length;
})();
