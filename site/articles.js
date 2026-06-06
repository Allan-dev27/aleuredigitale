/**
 * articles.js — Source unique des articles d'actualité d'À l'Eure Digitale
 *
 * ✅ Modifiez UNIQUEMENT ce fichier pour ajouter, modifier ou supprimer
 *    un article. Les changements se répercutent automatiquement sur
 *    blog.html ET sur la section actualités intégrée dans index.html.
 *
 * Structure d'un article :
 *   id        {number}   Identifiant unique (ne jamais réutiliser un id supprimé)
 *   category  {string}   'actu' | 'tuto' | 'projet' | 'evenement' | 'interview'
 *   title     {string}   Titre de l'article
 *   date      {Date}     new Date(année, mois_0indexé, jour)
 *   author    {string}   Nom de l'auteur
 *   excerpt   {string}   Résumé court affiché sur les cartes (2-3 phrases max)
 *   content   {string}   Contenu complet en HTML (affiché dans blog.html)
 *   tags      {string[]} Liste de tags
 *   readTime  {number}   Temps de lecture estimé en minutes
 *   cover     {string}   (optionnel) URL d'une image de couverture
 */

const ARTICLES_DATA = [

  {
    id: 1,
    category: 'actu',
    title: 'L\'association fête ses 6 premiers mois !',
    date: new Date(2026, 4, 15), // 15 mai 2026
    author: 'L\'équipe AED',
    excerpt: 'Six mois après sa création, À l\'Eure Digitale dresse un premier bilan positif : plus de 24 membres actifs, 8 ateliers organisés et une communauté qui grandit chaque semaine.',
    content: `
      <p>Six mois. C'est le chemin parcouru depuis les premiers messages sur Discord, les premières permanences, les premiers ateliers improvisés. Aujourd'hui, <strong>À l'Eure Digitale</strong> c'est une vraie communauté, vivante, bienveillante, et qui continue de grandir.</p>
      <h3>Ce qu'on a accompli</h3>
      <p>En à peine six mois, nous avons organisé <strong>8 ateliers et conférences</strong>, accueilli plus de <strong>24 membres actifs</strong> et lancé deux projets open source en cours de développement. Les permanences hebdomadaires du samedi sont devenues un rendez-vous incontournable pour toute la communauté.</p>
      <h3>Merci à vous</h3>
      <p>Tout ça n'aurait pas été possible sans votre enthousiasme, votre patience les soirs de bugs, et votre générosité pour partager vos connaissances. Cette association, c'est vous autant que nous.</p>
      <h3>Et la suite ?</h3>
      <p>Le Hackathon de juillet approche, de nouveaux ateliers sont en préparation, et on travaille à développer notre présence physique sur le territoire. La route est encore longue — et c'est tant mieux.</p>
      <p>À très vite sur Discord 💙</p>
    `,
    tags: ['Association', 'Bilan', 'Communauté'],
    readTime: 3,
  },

  {
    id: 2,
    category: 'tuto',
    title: 'Démarrer avec Git en 10 minutes',
    date: new Date(2026, 4, 8), // 8 mai 2026
    author: 'Raphaël B.',
    excerpt: 'Git fait peur au premier abord, mais avec les bonnes bases, il devient vite indispensable. Voici un guide express pour versionner vos projets dès aujourd\'hui.',
    content: `
      <p>Git est l'outil de gestion de versions le plus utilisé au monde. Il vous permet de sauvegarder l'historique de votre code, de collaborer sans écraser le travail des autres, et de revenir en arrière en cas d'erreur.</p>
      <h3>Installation</h3>
      <p>Téléchargez Git sur <a href="https://git-scm.com" target="_blank" rel="noopener">git-scm.com</a> et installez-le. Vérifiez ensuite avec <code>git --version</code> dans votre terminal.</p>
      <h3>Les commandes essentielles</h3>
      <ul>
        <li><code>git init</code> — Initialise un dépôt dans le dossier courant</li>
        <li><code>git add .</code> — Ajoute tous les fichiers modifiés à la zone de staging</li>
        <li><code>git commit -m "message"</code> — Enregistre un snapshot de votre code</li>
        <li><code>git push</code> — Envoie vos commits vers GitHub</li>
        <li><code>git pull</code> — Récupère les dernières modifications depuis le dépôt distant</li>
      </ul>
      <h3>Votre premier dépôt</h3>
      <p>Créez un compte sur <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>, créez un nouveau dépôt, puis suivez les instructions affichées pour connecter votre dépôt local. C'est aussi simple que ça.</p>
      <p>Des questions ? On en parle lors de la prochaine permanence sur Discord !</p>
    `,
    tags: ['Git', 'GitHub', 'Tutoriel', 'Débutants'],
    readTime: 5,
  },

  {
    id: 3,
    category: 'evenement',
    title: 'Retour sur l\'atelier HTML & CSS du 19 avril',
    date: new Date(2026, 4, 2), // 2 mai 2026
    author: 'Clara M.',
    excerpt: 'Retour sur notre atelier "Créer son site web avec HTML & CSS" : ambiance, contenu et ressources pour continuer à progresser.',
    content: `
      <p>Samedi 19 avril, nous avons accueilli une dizaine de participants pour l'atelier <strong>HTML & CSS</strong>. Débutants, curieux, personnes en reconversion… un beau mélange de profils pour une session pleine d'énergie.</p>
      <h3>Au programme</h3>
      <p>En trois heures, les participants ont découvert les bases de la structure HTML, la mise en forme CSS, et ont même touché au responsive design. À la fin, tout le monde avait sa propre page web qui fonctionnait !</p>
      <h3>Ce qu'on retient</h3>
      <p>Les questions les plus fréquentes portaient sur la différence entre <code>margin</code> et <code>padding</code>, et sur la façon d'organiser ses fichiers CSS. Des classiques pour les débutants — et des bases indispensables.</p>
      <h3>Ressources pour aller plus loin</h3>
      <ul>
        <li><a href="https://developer.mozilla.org/fr/" target="_blank" rel="noopener">MDN Web Docs</a> — La référence en français</li>
        <li><a href="https://css-tricks.com" target="_blank" rel="noopener">CSS-Tricks</a> — Pour les astuces CSS</li>
        <li><a href="https://flexboxfroggy.com/?lang=fr" target="_blank" rel="noopener">Flexbox Froggy</a> — Apprendre Flexbox en jouant</li>
      </ul>
      <p>Le prochain atelier est déjà en préparation. Rejoignez le Discord pour être prévenu en premier !</p>
    `,
    tags: ['HTML', 'CSS', 'Atelier', 'Retour'],
    readTime: 4,
  },

  {
    id: 4,
    category: 'projet',
    title: 'Le Hackathon 2026 : tout ce qu\'il faut savoir',
    date: new Date(2026, 3, 28), // 28 avril 2026
    author: 'L\'équipe AED',
    excerpt: 'Rendez-vous les 20–22 juillet pour notre premier Hackathon ! 48 heures pour coder, innover et construire ensemble. Voici toutes les infos pour vous préparer.',
    content: `
      <p>Le <strong>Hackathon À l'Eure Digitale 2026</strong> approche ! Du samedi 20 au lundi 22 juillet, venez relever un défi numérique en équipe dans l'esprit qui caractérise notre communauté : bienveillance, créativité et open source.</p>
      <h3>Le principe</h3>
      <p>En équipes de 2 à 5 personnes, vous disposerez de 48 heures pour concevoir et prototyper un projet numérique sur un thème annoncé le matin du départ. Développeurs, designers, communicants… tous les profils sont bienvenus et nécessaires.</p>
      <h3>Le déroulé</h3>
      <ul>
        <li>Samedi 10h — Lancement, annonce du thème, formation des équipes</li>
        <li>Samedi–Dimanche — Phase de création, mentors disponibles en continu</li>
        <li>Lundi 8h — Clôture du code, préparation des présentations</li>
        <li>Lundi 10h — Pitchs devant le jury et délibération</li>
      </ul>
      <h3>Comment participer ?</h3>
      <p>Rejoignez le Discord et rendez-vous dans le canal <strong>#hackathon-2026</strong>. Les inscriptions seront ouvertes début juillet. Restez connectés !</p>
    `,
    tags: ['Hackathon', 'Événement', '2026', 'Équipe'],
    readTime: 4,
  },

  {
    id: 5,
    category: 'interview',
    title: 'Interview : Amina, de novice à animatrice d\'ateliers',
    date: new Date(2026, 3, 14), // 14 avril 2026
    author: 'L\'équipe AED',
    excerpt: 'Amina a rejoint la communauté il y a quatre mois sans aucune expérience en développement. Elle anime aujourd\'hui ses propres ateliers Python. On lui a posé quelques questions.',
    content: `
      <p><em>Amina L. est dev fullstack en formation et membre active de la communauté depuis janvier 2026. Elle anime régulièrement des ateliers Python pour les débutants.</em></p>
      <h3>Comment as-tu découvert À l'Eure Digitale ?</h3>
      <p>Par hasard, sur un groupe Facebook local. Un post qui parlait d'une permanence numérique gratuite — j'ai cliqué, et je n'ai plus quitté le Discord depuis.</p>
      <h3>Tu animais déjà des ateliers avant ?</h3>
      <p>Pas du tout ! Au début, j'étais de l'autre côté : je venais avec mes questions, mes bugs, mes doutes. C'est la bienveillance de la communauté qui m'a donné confiance. Un jour, quelqu'un m'a proposé d'animer un atelier Python débutant… et j'ai dit oui.</p>
      <h3>Qu'est-ce que tu donnerais comme conseil à quelqu'un qui hésite à rejoindre ?</h3>
      <p>Qu'il n'attende pas d'être "assez bon". On apprend en faisant, et on apprend encore plus en transmettant. La communauté est un espace sûr pour ça.</p>
      <p><strong>Merci Amina 💙</strong></p>
    `,
    tags: ['Interview', 'Communauté', 'Python', 'Parcours'],
    readTime: 5,
  },

  /* ══ AJOUTEZ VOS NOUVEAUX ARTICLES ICI ══════════
     Pensez à incrémenter l'id (dernier id utilisé : 5).
  ═══════════════════════════════════════════════════ */

];

/* ─────────────────────────────────────────────────────
   Catégories : libellés et icônes Font Awesome
───────────────────────────────────────────────────── */
const ARTICLE_CATEGORIES = {
  actu:       { label: 'Actualité',   icon: 'fa-newspaper',          color: '#60a5fa' },
  tuto:       { label: 'Tutoriel',    icon: 'fa-graduation-cap',     color: '#4ade80' },
  projet:     { label: 'Projet',      icon: 'fa-code-branch',        color: '#c4b5fd' },
  evenement:  { label: 'Événement',   icon: 'fa-calendar-star',      color: '#fb923c' },
  interview:  { label: 'Interview',   icon: 'fa-microphone-lines',   color: '#f472b6' },
};