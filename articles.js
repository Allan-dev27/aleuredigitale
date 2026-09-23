// ============================================================
//  A L'EURE DIGITALE — ARTICLES.JS
//  Fichier de configuration et de rendu du blog
//  ============================================================
//
//  COMMENT AJOUTER UN ARTICLE :
//  Copiez un bloc { ... } dans le tableau ARTICLES ci-dessous,
//  remplissez les champs, sauvegardez. C'est tout !
//
//  CHAMPS :
//   id          — identifiant unique (string, ex. "art-001")
//   titre       — titre de l'article
//   date        — "YYYY-MM-DD"
//   auteur      — nom de l'auteur ou de l'autrice
//   categorie   — catégorie (voir CATEGORIES ci-dessous)
//   icone       — icône Bootstrap affichée sur la vignette (ex. "bi-laptop")
//   extrait     — résumé court affiché sur la carte (1-2 phrases)
//   contenu     — texte complet, affiché dans la fenêtre de lecture
//                 (utilisez des sauts de ligne "\n\n" pour les paragraphes)
//   tempsLecture— durée de lecture en minutes (nombre)
//   lien        — URL externe optionnelle (ex. article invité, presse)
//   labelLien   — texte du bouton de lien externe (optionnel)
// ============================================================

// ── CATÉGORIES ──────────────────────────────────────────────
// Vous pouvez ajouter vos propres catégories ici.
const CATEGORIES = {
  actualite:   { label: "Actualité",     couleur: "#2ec06a", icone: "bi-megaphone-fill" },
  atelier:     { label: "Retour d'atelier", couleur: "#0ea5e9", icone: "bi-laptop" },
  temoignage:  { label: "Témoignage",    couleur: "#f59e0b", icone: "bi-chat-quote-fill" },
  tutoriel:    { label: "Tutoriel",      couleur: "#8b5cf6", icone: "bi-book-half" },
  partenariat: { label: "Partenariat",   couleur: "#ef4444", icone: "bi-people-fill" },
};

// ── ARTICLES ────────────────────────────────────────────────
// ✏️  AJOUTEZ / MODIFIEZ VOS ARTICLES ICI
const ARTICLES = [
  {
    id: "art-001",
    titre: "Match'Emploi : où en est le projet ?",
    date: "2026-09-10",
    auteur: "L'équipe A l'Eure Digitale",
    categorie: "actualite",
    icone: "bi-rocket-takeoff",
    extrait: "Six mois après son lancement, le « Tinder de l'emploi » local dresse un premier bilan encourageant et prépare son hackathon de juillet 2027.",
    contenu: "Six mois après son lancement, Match'Emploi continue de grandir. La plateforme met en relation les habitants du département avec les entreprises locales qui recrutent, à travers un système de mise en relation simple et rapide.\n\nCe travail collectif, porté par des bénévoles de l'association, avance étape par étape : maquettes, retours utilisateurs, itérations. Le prochain grand rendez-vous est le Hackathon Match'Emploi du 13 juillet 2027 à la Webradio locale : Radio Broglie, où designers et développeurs de tous niveaux sont attendus pour une journée de co-création.\n\nSi vous voulez contribuer, que vous sachiez coder ou non, votre place est à cet événement.",
    tempsLecture: 3,
    lien: "",
    labelLien: "",
  },
  {
    id: "art-002",
    titre: "Retour sur l'atelier numérique du 1er septembre",
    date: "2026-09-01",
    auteur: "L'équipe A l'Eure Digitale",
    categorie: "atelier",
    icone: "bi-desktop",
    extrait: "L'atelier numérique du 1er septembre a permis un accompagnement individuel aux participants.",
    contenu: "L'atelier numérique du 1er septembre à bien démarré et a permis de démarrer les accompagnements individuels à la Webradio Radio Broglie.\n\nAu programme également : La création d'un tableau Excel pour lister les participants de son association, dans le cadre de l'Assemblée Générale annuel de son association..\n\nDurant la séance, Liliane à adhérer à l'association et a pu bénéficier d'un accompagnement personnalisé pour la création de son tableau Excel. Elle a pu poser toutes ses questions et repartir avec un tableau fonctionnel et adapté à ses besoins.",
    tempsLecture: 2,
    lien: "",
    labelLien: "",
  },
  {
    id: "art-003",
    titre: "« L'association m'a redonné confiance en mes compétences »",
    date: "2026-06-20",
    auteur: "Témoignage recueilli par l'association",
    categorie: "temoignage",
    icone: "bi-chat-quote-fill",
    extrait: "Ancienne graphiste reconvertie au développement web, Sophie raconte comment les permanences numériques l'ont aidée à structurer son projet.",
    contenu: "Sophie a rejoint À l'Eure Digitale il y a huit mois, après une reconversion professionnelle vers le développement web. « Je savais coder un peu, mais je n'osais pas me lancer seule sur un vrai projet », explique-t-elle.\n\nGrâce aux permanences numériques et aux échanges avec d'autres membres, elle a pu structurer son premier site vitrine, poser les bonnes questions techniques et surtout, prendre confiance. Aujourd'hui, elle accompagne à son tour de nouveaux arrivants lors des ateliers.\n\n« Ce que j'ai trouvé ici, c'est un endroit où on apprend sans jugement, à son rythme. »",
    tempsLecture: 3,
    lien: "",
    labelLien: "",
  },
  {
    id: "art-004",
    titre: "Nouveau partenariat avec la Webradio locale : Radio Broglie",
    date: "2026-06-02",
    auteur: "L'équipe A l'Eure Digitale",
    categorie: "partenariat",
    icone: "bi-handshake",
    extrait: "L'association officialise sa collaboration avec la Webradio locale pour accompagner davantage de structures locales dans leur transition numérique.",
    contenu: "À l'Eure Digitale annonce un nouveau partenariat avec la Webradio locale : Radio Broglie. Cette collaboration vise à mieux accompagner les artisans, commerçants et petites entreprises du territoire dans leurs usages numériques : présence en ligne, outils de gestion, sécurité informatique.\n\nConcrètement, ce partenariat se traduira par des ateliers dédiés aux particuliers et par la mise à disposition des locaux pour des ateliers numérique et pour des événements.\n\nUn premier rendez-vous est déjà prévu : la journée Eure Tech & Inclusion, organisé conjointement le 19 novembre 2026 dans les locaux de la Webradio partenaire : Radio Broglie.",
    tempsLecture: 2,
    lien: "",
    labelLien: "",
  },
];

// ============================================================
//  MOTEUR DE RENDU — ne pas modifier sauf personnalisation
// ============================================================

(function () {
  const container = document.getElementById('blog-liste');
  const filtersEl = document.getElementById('blog-filters');
  const emptyEl   = document.getElementById('blog-empty');
  const modalEl   = document.getElementById('blog-modal');
  if (!container) return;

  // Trier du plus récent au plus ancien
  const sortedArticles = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));

  // ── Filtres ──────────────────────────────────────────────
  let activeFilter = 'tous';

  function renderFilters() {
    if (!filtersEl) return;
    const presentCats = [...new Set(sortedArticles.map(a => a.categorie))];
    let html = `<button class="blog-filter active" data-filter="tous">Tous</button>`;
    presentCats.forEach(c => {
      const info = CATEGORIES[c] || { label: c, couleur: '#888' };
      html += `<button class="blog-filter" data-filter="${c}" style="--fc:${info.couleur}">${info.label}</button>`;
    });
    filtersEl.innerHTML = html;
    filtersEl.querySelectorAll('.blog-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersEl.querySelectorAll('.blog-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderArticles();
      });
    });
  }

  // ── Formatage date ───────────────────────────────────────
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function isRecent(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    const diff = (today - d) / 86400000;
    return diff >= 0 && diff < 14;
  }

  // ── Rendu des cartes ─────────────────────────────────────
  function renderArticles() {
    const filtered = activeFilter === 'tous'
      ? sortedArticles
      : sortedArticles.filter(a => a.categorie === activeFilter);

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    container.innerHTML = filtered.map(art => {
      const cat    = CATEGORIES[art.categorie] || { label: art.categorie, couleur: '#888', icone: 'bi-file-text' };
      const recent = isRecent(art.date) ? '<span class="blog-badge blog-badge--new">Nouveau</span>' : '';

      return `
      <article class="blog-card fade-up" style="--art-color:${cat.couleur}" data-id="${art.id}">
        <div class="blog-card-thumb">
          <i class="bi ${art.icone || cat.icone}"></i>
          ${recent}
        </div>
        <div class="blog-card-body">
          <div class="blog-category-pill"><i class="bi ${cat.icone}"></i> ${cat.label}</div>
          <h4 class="blog-card-title">${art.titre}</h4>
          <p class="blog-card-excerpt">${art.extrait}</p>
          <div class="blog-card-meta">
            <span><i class="bi bi-calendar3"></i> ${formatDate(art.date)}</span>
            <span><i class="bi bi-clock"></i> ${art.tempsLecture} min</span>
          </div>
          <button class="blog-read-btn" data-id="${art.id}">Lire l'article <i class="bi bi-arrow-right-short"></i></button>
        </div>
      </article>`;
    }).join('');

    container.querySelectorAll('.fade-up').forEach(el => blogObserver.observe(el));
    container.querySelectorAll('.blog-read-btn').forEach(btn => {
      btn.addEventListener('click', () => openArticle(btn.dataset.id));
    });
  }

  // ── Fenêtre de lecture (modal) ───────────────────────────
  function openArticle(id) {
    if (!modalEl) return;
    const art = ARTICLES.find(a => a.id === id);
    if (!art) return;
    const cat = CATEGORIES[art.categorie] || { label: art.categorie, couleur: '#888', icone: 'bi-file-text' };
    const paragraphs = art.contenu.split('\n\n').map(p => `<p>${p}</p>`).join('');
    const lienHtml = art.lien
      ? `<a href="${art.lien}" class="blog-modal-external" target="_blank" rel="noopener">${art.labelLien || 'Lire la source'} <i class="bi bi-box-arrow-up-right"></i></a>`
      : '';

    modalEl.querySelector('.blog-modal-category').innerHTML = `<i class="bi ${cat.icone}"></i> ${cat.label}`;
    modalEl.querySelector('.blog-modal-category').style.setProperty('--art-color', cat.couleur);
    modalEl.querySelector('.blog-modal-title').textContent = art.titre;
    modalEl.querySelector('.blog-modal-meta').innerHTML =
      `<span><i class="bi bi-person"></i> ${art.auteur}</span>` +
      `<span><i class="bi bi-calendar3"></i> ${formatDate(art.date)}</span>` +
      `<span><i class="bi bi-clock"></i> ${art.tempsLecture} min de lecture</span>`;
    modalEl.querySelector('.blog-modal-body').innerHTML = paragraphs + lienHtml;

    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeArticle() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalEl) {
    modalEl.querySelectorAll('[data-blog-close]').forEach(el => el.addEventListener('click', closeArticle));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeArticle(); });
  }

  // Intersection observer pour les nouvelles cartes
  const blogObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });

  renderFilters();
  renderArticles();

  // Compteur d'articles
  const counter = document.getElementById('blog-count');
  if (counter) counter.textContent = sortedArticles.length;
})();
