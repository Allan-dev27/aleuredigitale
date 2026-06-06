/**
 * events.js — Source unique des événements d'À l'Eure Digitale
 *
 * ✅ Modifiez UNIQUEMENT ce fichier pour ajouter, modifier ou supprimer
 *    un événement. Les changements se répercutent automatiquement sur
 *    agenda.html ET sur la section agenda intégrée dans index.html.
 *
 * Structure d'un événement :
 *   id        {number}   Identifiant unique (ne jamais réutiliser un id supprimé)
 *   type      {string}   'atelier' | 'formation' | 'conf' | 'perm' | 'hack'
 *   title     {string}   Titre de l'événement
 *   date      {Date}     new Date(année, mois_0indexé, jour)
 *   time      {string}   Horaire texte, ex. '14h–17h'
 *   location  {string}   Lieu
 *   level     {string}   Niveau requis
 *   desc      {string}   Description complète
 *   tags      {string[]} Liste de tags
 *   recurrent {boolean}  (optionnel) true si événement récurrent
 *   past      {boolean}  true si l'événement est passé
 */

/* ─────────────────────────────────────────────────────
   !! NE PAS MODIFIER !! – Auto-calcul de `past` au chargement
   Si vous préférez gérer `past` manuellement, supprimez le
   bloc "Auto-calcul" plus bas et renseignez past:true/false.
───────────────────────────────────────────────────── */

const EVENTS_DATA = [

  /* ══ PASSÉS ══════════════════════════════════════ */
  {
    id: 1,
    type: 'perm',
    title: 'Permanence hebdomadaire',
    date: new Date(2026, 2, 1), // 1 mars 2026
    time: '14h–16h',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Permanence régulière d\'entraide et de discussion. Posez vos questions, partagez vos projets, rencontrez la communauté.',
    tags: ['Entraide', 'Communauté', 'Gratuit'],
    recurrent: true,
  },
  {
    id: 2,
    type: 'atelier',
    title: 'Introduction à Python',
    date: new Date(2026, 2, 14), // 14 mars 2026
    time: '14h–17h',
    location: 'En ligne (Discord)',
    level: 'Débutants',
    desc: 'Découverte du langage Python : variables, conditions, boucles, fonctions. Aucun prérequis nécessaire — venez juste avec votre curiosité !',
    tags: ['Python', 'Programmation', 'Débutants'],
  },
  {
    id: 3,
    type: 'conf',
    title: 'IA & Éthique : tour d\'horizon',
    date: new Date(2026, 2, 28), // 28 mars 2026
    time: '18h–19h30',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Quelles questions éthiques soulève l\'intelligence artificielle ? Biais, emploi, vie privée, deepfakes — un débat ouvert animé par la communauté.',
    tags: ['IA', 'Éthique', 'Débat'],
  },
  {
    id: 4,
    type: 'formation',
    title: 'Git & GitHub pour débutants',
    date: new Date(2026, 3, 5), // 5 avr 2026
    time: '10h–13h',
    location: 'En ligne (Discord)',
    level: 'Débutants',
    desc: 'Comprendre la gestion de versions avec Git : commits, branches, pull requests. Installation, configuration et premiers dépôts sur GitHub.',
    tags: ['Git', 'GitHub', 'Open Source'],
  },
  {
    id: 5,
    type: 'atelier',
    title: 'Créer son site web avec HTML & CSS',
    date: new Date(2026, 3, 19), // 19 avr 2026
    time: '14h–17h',
    location: 'En ligne (Discord)',
    level: 'Débutants',
    desc: 'Construisez votre première page web de A à Z. Structure HTML, mise en forme CSS, responsive design — en 3h vous aurez un vrai site !',
    tags: ['HTML', 'CSS', 'Web'],
  },
  {
    id: 6,
    type: 'perm',
    title: 'Permanence hebdomadaire',
    date: new Date(2026, 4, 3), // 3 mai 2026
    time: '14h–16h',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Permanence régulière d\'entraide et de discussion. Posez vos questions, partagez vos projets, rencontrez la communauté.',
    tags: ['Entraide', 'Communauté', 'Gratuit'],
    recurrent: true,
  },

  /* ══ À VENIR ══════════════════════════════════════ */
  {
    id: 7,
    type: 'perm',
    title: 'Permanence hebdomadaire',
    date: new Date(2026, 4, 24), // 24 mai 2026
    time: '14h–16h',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Permanence régulière d\'entraide, de discussion et de partage de projets. Toutes les semaines, sans inscription.',
    tags: ['Entraide', 'Communauté', 'Gratuit'],
    recurrent: true,
  },
  {
    id: 8,
    type: 'conf',
    title: 'Open Source : contribuer à un projet existant',
    date: new Date(2026, 5, 6), // 6 juin 2026
    time: '18h–19h30',
    location: 'En ligne (Discord)',
    level: 'Intermédiaire',
    desc: 'Comment franchir le pas et contribuer à un projet open source ? Trouver des issues accessibles, comprendre les conventions, soumettre sa première PR — retours d\'expérience de contributeurs actifs.',
    tags: ['Open Source', 'GitHub', 'Contribution'],
  },
  {
    id: 9,
    type: 'perm',
    title: 'Permanence hebdomadaire',
    date: new Date(2026, 5, 20), // 20 juin 2026
    time: '14h–16h',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Permanence régulière d\'entraide, de discussion et de partage de projets. Toutes les semaines, sans inscription.',
    tags: ['Entraide', 'Communauté', 'Gratuit'],
    recurrent: true,
  },
  {
    id: 10,
    type: 'atelier',
    title: 'Accessibilité web — RGAA & bonnes pratiques',
    date: new Date(2026, 6, 5), // 5 juil 2026
    time: '14h–16h30',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Pourquoi et comment rendre le web accessible à tous ? Tour du référentiel RGAA, outils de diagnostic, démonstration avec un lecteur d\'écran.',
    tags: ['Accessibilité', 'RGAA', 'HTML'],
  },
  {
    id: 11,
    type: 'conf',
    title: 'Cybersécurité du quotidien — protégez-vous',
    date: new Date(2026, 6, 12), // 12 juil 2026
    time: '18h–19h30',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Mots de passe, phishing, 2FA, VPN, réseaux sociaux… Les réflexes essentiels pour protéger vos données au quotidien. Conférence interactive avec questions-réponses.',
    tags: ['Cybersécurité', 'Vie privée', 'Sensibilisation'],
  },
  {
    id: 12,
    type: 'perm',
    title: 'Permanence hebdomadaire',
    date: new Date(2026, 6, 18), // 18 juil 2026
    time: '14h–16h',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Permanence régulière d\'entraide, de discussion et de partage de projets. Toutes les semaines, sans inscription.',
    tags: ['Entraide', 'Communauté', 'Gratuit'],
    recurrent: true,
  },
  {
    id: 13,
    type: 'hack',
    title: 'Hackathon À l\'Eure Digitale 2026',
    date: new Date(2026, 6, 22), // 22 juil 2026 (départ du week-end)
    time: '48h — Sam 10h → Lun 10h',
    location: 'En ligne (Discord) + Éventuellement présentiel Évreux',
    level: 'Tous niveaux',
    desc: '48 heures pour coder, créer, innover ! En équipe de 2 à 5 personnes, réalisez un projet numérique sur un thème annoncé le jour J. Mentors disponibles, présentations finales, délibération du jury et lots à remporter.',
    tags: ['Hackathon', 'Équipe', '48h', 'Concours'],
  },
  {
    id: 14,
    type: 'conf',
    title: 'Le numérique responsable — impacts environnementaux',
    date: new Date(2026, 8, 20), // 20 sept 2026
    time: '14h - 16h',
    location: 'En ligne (Discord)',
    level: 'Tous niveaux',
    desc: 'Empreinte carbone du numérique, éco-conception web, low-tech — comment réduire l\'impact environnemental de nos usages et productions numériques ?',
    tags: ['Éco-conception', 'Numérique responsable', 'Environnement'],
  },

  /* ══ AJOUTEZ VOS NOUVEAUX ÉVÉNEMENTS ICI ══════════
     Pensez à incrémenter l'id (dernier id utilisé : 19)
     et à ne PAS renseigner past (calculé automatiquement).
  ═══════════════════════════════════════════════════ */

];

/* ─────────────────────────────────────────────────────
   Auto-calcul du champ `past` selon la date du jour.
   Un événement devient "passé" le lendemain de sa date.
───────────────────────────────────────────────────── */
(function computePast() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  EVENTS_DATA.forEach(ev => {
    const evDay = new Date(ev.date);
    evDay.setHours(0, 0, 0, 0);
    ev.past = evDay < today;
  });
})();
