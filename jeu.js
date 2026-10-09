// ============================================================
//  A L'EURE DIGITALE — JEU.JS
//  Jeu « Arnaque ou pas ? »
//  ============================================================
//
//  COMMENT AJOUTER UNE SITUATION :
//  Copiez un bloc { ... } dans le tableau SITUATIONS ci-dessous.
//
//  CHAMPS :
//   canal      — "sms", "email" ou "site"
//   de         — expéditeur (numéro, adresse e-mail) ou adresse du site
//   objet      — objet du mail (optionnel, seulement pour "email")
//   texte      — contenu affiché. Entourez de {{ }} les passages suspects :
//                ils seront surlignés après la réponse.
//   arnaque    — true (arnaque) / false (message légitime)
//   explication— une phrase qui donne la bonne réponse
//   indices    — tableau des points à retenir
// ============================================================

const CANAUX = {
  sms:   { label: "SMS",    icone: "bi-chat-dots-fill" },
  email: { label: "E-mail", icone: "bi-envelope-fill" },
  site:  { label: "Site",   icone: "bi-globe" },
};

const SITUATIONS = [
  {
    canal: "sms", de: "+33 7 56 12 04 88",
    texte: "Colissimo : votre colis n°CL48213 n'a pas pu être livré. Des frais de réexpédition de 1,99 € sont à régler {{sous 24 h}} : {{colis-suivi-fr.top/reglement}}",
    arnaque: true,
    explication: "C'est une arnaque : un faux message de transporteur pour récupérer vos données bancaires.",
    indices: ["Le lien n'est pas le site officiel du transporteur.", "Un délai très court pousse à agir sans réfléchir.", "Un petit montant sert à vous faire saisir votre carte bancaire."],
  },
  {
    canal: "sms", de: "Pharmacie du Centre",
    texte: "Pharmacie du Centre : votre commande est prête. Vous pouvez la retirer à partir de demain, aux horaires d'ouverture, avec votre carte Vitale. À bientôt !",
    arnaque: false,
    explication: "Ce message est légitime : aucun lien, aucune urgence, aucune demande d'argent ni de mot de passe.",
    indices: ["Pas de lien à cliquer.", "Rien n'est demandé en urgence.", "Vous attendiez bien une commande : le contexte est cohérent."],
  },
  {
    canal: "email", de: "Assurance Maladie <remboursement@ameli-securite.info>",
    objet: "Remboursement de 148,60 € en attente",
    texte: "Bonjour,\nUn trop-perçu de 148,60 € est disponible sur votre dossier. Pour le recevoir, {{confirmez vos coordonnées bancaires}} avant {{vendredi}}, faute de quoi il sera perdu.",
    arnaque: true,
    explication: "C'est une arnaque : l'Assurance Maladie ne demande jamais vos coordonnées bancaires par e-mail.",
    indices: ["L'adresse de l'expéditeur ne se termine pas par ameli.fr.", "On vous demande des informations bancaires.", "Une date limite crée de la pression."],
  },
  {
    canal: "sms", de: "+33 6 12 90 45 31",
    texte: "URGENT : une connexion suspecte a été détectée sur votre compte. {{Sans action de votre part sous 1 heure}}, votre carte sera bloquée : {{secure-mabanque.online/verif}}",
    arnaque: true,
    explication: "C'est une arnaque : votre banque ne vous demande pas de « vérifier » votre compte via un lien reçu par SMS.",
    indices: ["Le nom de domaine n'est pas celui de votre banque.", "Menace de blocage et délai d'une heure.", "En cas de doute, appelez votre agence avec le numéro de votre carte ou de vos courriers."],
  },
  {
    canal: "email", de: "A l'Eure Digitale <contact@aleuredigitale.fr>",
    objet: "Rappel : atelier numérique mercredi",
    texte: "Bonjour,\nPetit rappel : l'atelier numérique a lieu mercredi à 10h à Radio Broglie. Si vous ne pouvez plus venir, répondez simplement à ce message pour nous prévenir.\nÀ mercredi !",
    arnaque: false,
    explication: "Ce message est légitime : vous connaissez l'expéditeur, l'adresse est cohérente et on ne vous demande que de répondre par e-mail.",
    indices: ["L'adresse de l'expéditeur correspond au vrai site de l'association.", "Aucun lien, aucun fichier joint, aucune donnée sensible demandée.", "Le message correspond à quelque chose que vous avez vraiment prévu."],
  },
  {
    canal: "site", de: "https://www.impots-gouv-remboursement.com/connexion",
    texte: "Espace particulier — Remboursement disponible.\nSaisissez votre numéro fiscal, votre mot de passe et {{votre numéro de carte bancaire}} pour recevoir votre remboursement.",
    arnaque: true,
    explication: "C'est une arnaque : le vrai site des impôts se termine par « .gouv.fr », et un remboursement se fait sans donner de numéro de carte.",
    indices: ["Regardez la fin du nom de domaine : impots.gouv.fr est le seul site officiel.", "On ne vous demande jamais votre carte bancaire pour être remboursé.", "Le cadenas (https) ne prouve pas qu'un site est honnête."],
  },
  {
    canal: "site", de: "https://www.impots.gouv.fr",
    texte: "Connexion à votre espace particulier.\nIdentifiez-vous avec votre numéro fiscal et votre mot de passe.",
    arnaque: false,
    explication: "Ce site est légitime : le nom de domaine se termine bien par « .gouv.fr » et seuls vos identifiants de connexion sont demandés.",
    indices: ["Le domaine est celui de l'administration.", "Il s'agit d'une simple connexion, sans demande de carte bancaire."],
  },
  {
    canal: "sms", de: "+33 7 68 33 19 02",
    texte: "Coucou maman, c'est mon nouveau numéro, mon téléphone est tombé dans l'eau. {{Tu peux me faire un virement de 380 € ?}} C'est urgent, je t'expliquerai.",
    arnaque: true,
    explication: "C'est une arnaque très courante : un escroc se fait passer pour un proche.",
    indices: ["Un « nouveau numéro » inconnu et une demande d'argent.", "Le ton presse et évite les explications.", "Rappelez votre proche sur son ancien numéro, ou posez une question dont seul lui connaît la réponse."],
  },
  {
    canal: "email", de: "Support Microsoft <support@micr0soft-service.net>",
    objet: "Votre mot de passe expire aujourd'hui",
    texte: "Votre compte va être suspendu. {{Cliquez sur le bouton ci-dessous}} pour conserver votre mot de passe actuel.\n[ Conserver mon mot de passe ]",
    arnaque: true,
    explication: "C'est une arnaque : l'adresse imite le nom de Microsoft en remplaçant un « o » par un zéro.",
    indices: ["Lisez l'adresse lettre par lettre : « micr0soft » contient un zéro.", "Un mot de passe qui « expire aujourd'hui » est un prétexte classique.", "Passez plutôt par le site officiel que vous saisissez vous-même."],
  },
  {
    canal: "sms", de: "+33 6 45 20 77 14",
    texte: "Vous disposez de 1 250 € de droits formation à utiliser avant le 31/12. Réservez votre formation gratuite : {{cpf-formation-droits.com}}",
    arnaque: true,
    explication: "C'est une arnaque : le démarchage par SMS sur le compte formation est interdit, et le lien n'est pas un site officiel.",
    indices: ["Un message non sollicité qui promet quelque chose de « gratuit ».", "Le lien ne mène pas au site officiel du compte formation.", "Consultez vos droits en vous connectant vous-même au site officiel."],
  },
];

// ============================================================
//  MOTEUR DU JEU — ne pas modifier sauf personnalisation
// ============================================================

(function () {
  const $ = id => document.getElementById(id);
  if (!$('jeu-play')) return;

  const el = {
    play: $('jeu-play'), end: $('jeu-end'), step: $('jeu-step'), score: $('jeu-score'),
    bar: $('jeu-bar-fill'), msg: $('jeu-msg'), canal: $('jeu-canal'), icon: $('jeu-canal-icon'),
    from: $('jeu-from'), subject: $('jeu-subject'), text: $('jeu-text'),
    choices: $('jeu-choices'), feedback: $('jeu-feedback'), verdict: $('jeu-verdict'),
    explain: $('jeu-explain'), clues: $('jeu-clues'), next: $('jeu-next'),
    endScore: $('jeu-end-score'), endTitle: $('jeu-end-title'), endText: $('jeu-end-text'),
    replay: $('jeu-replay'),
  };
  const buttons = el.choices.querySelectorAll('.jeu-btn');

  let deck = [], index = 0, score = 0;

  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const withClues = t => esc(t).replace(/\{\{(.+?)\}\}/g, '<span class="clue">$1</span>');

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function start() {
    deck = shuffle(SITUATIONS);
    index = 0;
    score = 0;
    el.end.hidden = true;
    el.play.hidden = false;
    show();
  }

  function show() {
    const s = deck[index];
    const canal = CANAUX[s.canal] || CANAUX.sms;
    el.step.textContent = `Situation ${index + 1} sur ${deck.length}`;
    el.score.textContent = `Score : ${score}`;
    el.bar.style.width = `${(index / deck.length) * 100}%`;
    el.icon.className = `bi ${canal.icone}`;
    el.canal.textContent = canal.label;
    el.from.textContent = s.de;
    el.subject.hidden = !s.objet;
    el.subject.textContent = s.objet ? `Objet : ${s.objet}` : '';
    el.text.innerHTML = withClues(s.texte);
    el.msg.classList.remove('jeu-revealed');
    el.feedback.hidden = true;
    buttons.forEach(b => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
  }

  function answer(choice) {
    const s = deck[index];
    const saidScam = choice === 'scam';
    const correct = saidScam === s.arnaque;
    if (correct) score++;

    buttons.forEach(b => {
      b.disabled = true;
      const isScamBtn = b.dataset.answer === 'scam';
      if (isScamBtn === s.arnaque) b.classList.add('is-right');
      else if (b.dataset.answer === choice) b.classList.add('is-wrong');
    });

    el.msg.classList.add('jeu-revealed');
    el.score.textContent = `Score : ${score}`;
    el.feedback.className = `jeu-feedback ${correct ? 'is-good' : 'is-bad'}`;
    el.verdict.textContent = correct ? 'Bonne réponse' : 'Pas tout à fait';
    el.explain.textContent = s.explication;
    el.clues.innerHTML = s.indices.map(i => `<li>${esc(i)}</li>`).join('');
    el.next.textContent = index === deck.length - 1 ? 'Voir mon résultat' : 'Situation suivante';
    el.feedback.hidden = false;
    el.feedback.focus();
  }

  function finish() {
    const total = deck.length;
    el.bar.style.width = '100%';
    el.play.hidden = true;
    el.end.hidden = false;
    el.endScore.textContent = `${score} / ${total}`;
    if (score >= total - 1) {
      el.endTitle.textContent = "Vous avez l'œil !";
      el.endText.textContent = "Vous repérez très bien les faux messages. N'hésitez pas à partager ce jeu avec vos proches.";
    } else if (score >= Math.round(total * 0.6)) {
      el.endTitle.textContent = 'Bon réflexe, mais restez vigilant';
      el.endText.textContent = "Vous en avez déjoué la plupart. Rejouez pour repérer celles qui vous ont échappé.";
    } else {
      el.endTitle.textContent = "Pas de panique, ça s'apprend";
      el.endText.textContent = "Ces arnaques sont conçues pour tromper tout le monde. Relisez les indices, puis rejouez.";
    }
    el.end.focus();
  }

  buttons.forEach(b => b.addEventListener('click', () => answer(b.dataset.answer)));
  el.next.addEventListener('click', () => {
    if (index === deck.length - 1) finish();
    else { index++; show(); el.msg.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
  el.replay.addEventListener('click', start);

  start();
})();
