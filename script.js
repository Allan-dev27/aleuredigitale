/* ── DARK MODE ────────────────────────────────────── */
const html = document.documentElement;
const darkBtn = document.getElementById('darkToggle');
const darkIcon = document.getElementById('darkIcon');

function applyTheme(t){
  html.setAttribute('data-theme', t);
  darkIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('aed-theme', t);
  if(window._leafletMap) updateMapTiles(t);
}
function toggleTheme(){
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}
darkBtn.addEventListener('click', toggleTheme);
const saved = localStorage.getItem('aed-theme');
if(saved) applyTheme(saved);
else if(window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');

/* ── BURGER MENU ──────────────────────────────────── */
const burgerBtn = document.getElementById('burgerBtn');
const burgerIcon = document.getElementById('burgerIcon');
const navMobile = document.getElementById('navMobile');
burgerBtn.addEventListener('click', ()=>{
  const open = navMobile.classList.toggle('open');
  burgerIcon.className = open ? 'fas fa-times' : 'fas fa-bars';
});
function closeMobile(){
  navMobile.classList.remove('open');
  burgerIcon.className = 'fas fa-bars';
}

/* ── PARTICLES (hero canvas) ──────────────────────── */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize(){
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}

function mkParticle(){
  return {
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
    r: Math.random()*1.5+.5, o: Math.random()*.6+.2
  };
}

function initParticles(n=90){
  particles = Array.from({length:n}, mkParticle);
}

function drawParticles(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x<0) p.x=W; if(p.x>W) p.x=0;
    if(p.y<0) p.y=H; if(p.y>H) p.y=0;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${p.o})`;
    ctx.fill();
  });
  // Lines between close particles
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<90){
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle = `rgba(255,255,255,${.12*(1-d/90)})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', ()=>{resize();initParticles();});
resize(); initParticles(); drawParticles();

/* ── ANIMATED COUNTERS ────────────────────────────── */
function animateCounter(el, target, duration=1400){
  const start = performance.now();
  function step(now){
    const p = Math.min((now-start)/duration, 1);
    const ease = 1-Math.pow(1-p,3);
    el.textContent = Math.round(ease*target);
    if(p<1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.cnt').forEach(el=>{
        animateCounter(el, +el.dataset.target);
      });
      counterObs.unobserve(e.target);
    }
  });
},{threshold:0.05, rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.hero-counters').forEach(el=>counterObs.observe(el));

/* ── SCROLL REVEAL ────────────────────────────────── */
const revealObs = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('revealed'), i*70);
      revealObs.unobserve(e.target);
    }
  });
},{threshold:.1});
document.querySelectorAll('.scroll-reveal').forEach(el=>revealObs.observe(el));

/* ── LEAFLET MAP ──────────────────────────────────── */
let _lightLayer, _darkLayer;

function buildMap(){
  const map = L.map('map', {zoomControl:true, scrollWheelZoom:false}).setView([49.05,1.15],9);
  window._leafletMap = map;

  _lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a>',maxZoom:18
  });
  _darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
    attribution:'© <a href="https://carto.com">CARTO</a>',maxZoom:19
  });

  const theme = html.getAttribute('data-theme');
  (theme==='dark' ? _darkLayer : _lightLayer).addTo(map);

  const icon = (color)=>L.divIcon({
    className:'',
    html:`<div style="width:14px;height:14px;background:${color};border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.35)"></div>`,
    iconAnchor:[7,7]
  });

  const villes = [
    {name:'Évreux', lat:49.0269, lng:1.1507, color:'#2ecc71', desc:'Chef-lieu · Siège de l\'asso'},
    {name:'Le Neubourg', lat:49.1477, lng:0.9091, color:'#60a5fa', desc:'Zone d\'activité'},
    {name:'Saint-André-de-l\'Eure', lat:48.9119, lng:1.2668, color:'#f59e0b', desc:'Zone d\'activité'},
    {name:'Bernay', lat:49.0870, lng:0.5998, color:'#a78bfa', desc:'Zone d\'activité'},
    {name:'Les Andelys', lat:49.2474, lng:1.5725, color:'#f87171', desc:'Zone d\'activité'},
  ];

  villes.forEach(v=>{
    L.marker([v.lat,v.lng],{icon:icon(v.color)})
      .addTo(map)
      .bindPopup(`<b style="font-family:Sora,sans-serif">${v.name}</b><br><span style="font-size:.8rem;color:#666">${v.desc}</span>`);
  });

  // Department circle
  L.circle([49.05, 1.15],{
    radius:50000,color:'#6c3fc5',fillColor:'#6c3fc5',fillOpacity:.06,weight:1.5,dashArray:'6 4'
  }).addTo(map);
}

function updateMapTiles(theme){
  const map = window._leafletMap;
  if(!map) return;
  if(theme==='dark'){
    if(_lightLayer) map.removeLayer(_lightLayer);
    _darkLayer.addTo(map);
  } else {
    if(_darkLayer) map.removeLayer(_darkLayer);
    _lightLayer.addTo(map);
  }
}

// Init map when territoire section is visible
const mapObs = new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !window._leafletMap){
    buildMap();
    mapObs.disconnect();
  }
},{threshold:.1});
mapObs.observe(document.getElementById('territoire'));

/* ── FAQ ACCORDION ────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});

/* ── CONTACT FORM ─────────────────────────────────── */
const FORMSPREE_ID = 'mnjwlvvn'; 

function validate(id, check){
  const el = document.getElementById(id);
  const err = document.getElementById('err-'+id);
  const ok = check(el.value.trim());
  el.classList.toggle('err', !ok);
  err.classList.toggle('show', !ok);
  return ok;
}

async function submitForm(e){
  e.preventDefault();
  const ok = [
    validate('fname', v=>v.length>0),
    validate('lname', v=>v.length>0),
    validate('femail', v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
    validate('fsubject', v=>v!==''),
    validate('fmessage', v=>v.length>=10),
  ].every(Boolean);

  if(!ok) return;

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…';

  const subjectMap = {
    question:'Question générale', projet:'Proposer un projet',
    partenariat:'Partenariat', benevole:'Devenir bénévole', presse:'Presse / Média'
  };
  const subjectVal = document.getElementById('fsubject').value;

  const payload = {
    _replyto: document.getElementById('femail').value.trim(),
    _subject: `[À l'Eure Digitale] ${subjectMap[subjectVal] || subjectVal}`,
    Prénom:   document.getElementById('fname').value.trim(),
    Nom:      document.getElementById('lname').value.trim(),
    Email:    document.getElementById('femail').value.trim(),
    Sujet:    subjectMap[subjectVal] || subjectVal,
    Message:  document.getElementById('fmessage').value.trim(),
  };

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });

    if(res.ok){
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
      // 🎉 Confetti !
      if(typeof confetti === 'function'){
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#2ecc71','#6c3fc5','#60a5fa','#e67e22','#fff'] });
        setTimeout(()=>confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 0, y: 0.65 }, colors:['#2ecc71','#a78bfa'] }), 300);
        setTimeout(()=>confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 1, y: 0.65 }, colors:['#60a5fa','#e67e22'] }), 500);
      }
    } else {
      const data = await res.json();
      const msg = data.errors ? data.errors.map(e=>e.message).join(', ') : 'Erreur inconnue.';
      showFormError(`Échec de l'envoi : ${msg}`);
      resetBtn(btn);
    }
  } catch(err){
    showFormError('Impossible de contacter le serveur. Vérifiez votre connexion.');
    resetBtn(btn);
  }
}

function resetBtn(btn){
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
}

function showFormError(msg){
  let errBox = document.getElementById('form-send-error');
  if(!errBox){
    errBox = document.createElement('p');
    errBox.id = 'form-send-error';
    errBox.style.cssText = 'color:#ef4444;font-size:.85rem;margin-top:12px;text-align:center;font-family:var(--font-head);';
    document.getElementById('submitBtn').insertAdjacentElement('afterend', errBox);
  }
  errBox.textContent = msg;
}

/* ── READ PROGRESS BAR ────────────────────────────── */
const progressBar = document.getElementById('read-progress');
window.addEventListener('scroll', ()=>{
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (window.scrollY / docH * 100) : 0;
  progressBar.style.width = pct + '%';
}, {passive:true});

/* ── NAV ACTIVE SECTION ───────────────────────────── */
const navSections = ['about','pour-qui','discord','hackathon','proposer','temoignages','territoire','faq','contact'];
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(a=>a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if(active) active.classList.add('active');
    }
  });
},{threshold:.35, rootMargin:'-64px 0px -40% 0px'});
navSections.forEach(id=>{
  const el = document.getElementById(id);
  if(el) sectionObs.observe(el);
});

/* ── SECTION HIGHLIGHT ON NAV CLICK ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(!target) return;
    setTimeout(()=>{
      target.classList.remove('section-flash');
      void target.offsetWidth; // reflow
      target.classList.add('section-flash');
      setTimeout(()=>target.classList.remove('section-flash'), 1000);
    }, 500);
  });
});

/* ── ONLINE MEMBER COUNT (Discord API réelle) ─────── */
// ID du serveur Discord (extrait de l'invite discord.gg/yHCAgYKwk)
// Pour obtenir votre GUILD_ID : activez le mode développeur Discord
// → Paramètres > Avancés > Mode développeur, puis clic droit sur le serveur > Copier l'identifiant
const DISCORD_GUILD_ID = 'REMPLACEZ_PAR_VOTRE_GUILD_ID'; // ex: '1234567890123456789'

async function fetchDiscordOnline(){
  const onlineEl = document.getElementById('onlineCount');
  if(!onlineEl) return;
  try {
    const res = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`);
    if(!res.ok) throw new Error('Widget désactivé ou ID invalide');
    const data = await res.json();
    const count = data.presence_count ?? data.members?.length ?? '?';
    onlineEl.textContent = count;
  } catch(err) {
    // En cas d'échec, on affiche un fallback discret sans mentir
    onlineEl.textContent = '?';
    const badge = document.getElementById('discordBadge');
    if(badge) badge.title = 'Activez le widget Discord dans les paramètres du serveur';
    console.warn('Discord widget:', err.message);
  }
}

fetchDiscordOnline();
// Rafraîchissement toutes les 2 minutes
setInterval(fetchDiscordOnline, 2 * 60 * 1000);

/* ── TOAST DE BIENVENUE ───────────────────────────── */
setTimeout(()=>{
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 7000);
}, 2000);

/* ── COPY DISCORD LINK ────────────────────────────── */
function copyDiscord(){
  const text = document.getElementById('discordLink').textContent.trim();
  navigator.clipboard.writeText('https://' + text).then(()=>{
    const btn = document.getElementById('copyBtn');
    btn.innerHTML = '<i class="fas fa-check"></i> Copié !';
    btn.classList.add('copied');
    setTimeout(()=>{
      btn.innerHTML = '<i class="fas fa-copy"></i> Copier';
      btn.classList.remove('copied');
    }, 2500);
  });
}

/* ── FAQ SEARCH FILTER ────────────────────────────── */
function filterFaq(query){
  const q = query.toLowerCase().trim();
  const items = document.querySelectorAll('.faq-item');
  let visible = 0;
  items.forEach(item=>{
    const text = item.querySelector('.faq-q-text').textContent.toLowerCase()
      + ' ' + item.querySelector('.faq-body-inner').textContent.toLowerCase();
    const show = !q || text.includes(q);
    item.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  document.getElementById('faqNoResults').style.display = visible === 0 ? 'block' : 'none';
}

/* ── TÉMOIGNAGES CAROUSEL ─────────────────────────── */
(function initCarousel(){
  const track = document.getElementById('temoTrack');
  if(!track) return;
  const cards = track.querySelectorAll('.temo-card');
  const dotsContainer = document.getElementById('temoDots');
  let current = 0;
  let autoplay;
  const total = cards.length;

  // Build dots
  cards.forEach((_,i)=>{
    const d = document.createElement('div');
    d.className = 'temo-dot' + (i===0?' active':'');
    d.addEventListener('click',()=>goTo(i));
    dotsContainer.appendChild(d);
  });

  function goTo(n){
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.temo-dot').forEach((d,i)=>d.classList.toggle('active',i===current));
    resetAutoplay();
  }

  function resetAutoplay(){
    clearInterval(autoplay);
    autoplay = setInterval(()=>goTo(current+1), 5000);
  }

  document.getElementById('temoPrev').addEventListener('click',()=>goTo(current-1));
  document.getElementById('temoNext').addEventListener('click',()=>goTo(current+1));

  // Pause on hover
  const carousel = track.closest('.temo-carousel');
  carousel.addEventListener('mouseenter',()=>clearInterval(autoplay));
  carousel.addEventListener('mouseleave',resetAutoplay);

  // Touch swipe
  let touchX = null;
  track.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});
  track.addEventListener('touchend',e=>{
    if(touchX===null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if(Math.abs(dx)>50) goTo(dx < 0 ? current+1 : current-1);
    touchX=null;
  });

  resetAutoplay();
})();

/* ── AGENDA DYNAMIQUE ─────────────────────────────── */
(function buildAgenda(){
  const list = document.getElementById('agendaList');
  if(!list) return;

  function nextSaturdays(n){
    const dates = [];
    const d = new Date();
    d.setHours(0,0,0,0);
    const daysUntilSat = (6 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + daysUntilSat);
    for(let i = 0; i < n; i++){
      dates.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }
    return dates;
  }

  const MOIS = ['jan.','fév.','mar.','avr.','mai','juin','juil.','août','sep.','oct.','nov.','déc.'];

  const samedis = nextSaturdays(2);
  const events = samedis.map(d => ({
    label: 'Sam.',
    date: `${d.getDate()} ${MOIS[d.getMonth()]}`,
    title: 'Permanence numérique',
    detail: '14h–16h · En ligne · Gratuit',
    type: 'permanence',
    description: 'Rendez-vous hebdomadaire en ligne chaque samedi de 14h à 16h. Posez vos questions tech, obtenez de l\'aide sur un projet, ou discutez simplement avec d\'autres membres. Aucune inscription, accès libre et gratuit.',
    niveau: 'Tous niveaux',
    discord: 'https://discord.gg/yHCAgYKwk',
    fullDate: d.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
  }));

  // Atelier exemple
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 18);
  events.push({
    label: MOIS[nextMonth.getMonth()],
    date: `${nextMonth.getDate()}`,
    title: 'Atelier Git & GitHub',
    detail: '18h–20h · En ligne · Gratuit',
    type: 'atelier',
    description: 'Apprenez à versionner vos projets avec Git et à collaborer sur GitHub. Au programme : branches, pull requests, résolution de conflits. Idéal pour les débutants comme pour ceux souhaitant consolider leurs bases.',
    niveau: 'Débutant / Intermédiaire',
    discord: 'https://discord.gg/yHCAgYKwk',
    fullDate: nextMonth.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
  });

  // Hackathon fixe
  const hackDate = new Date('2026-07-20');
  if(hackDate > new Date()){
    events.push({
      label: 'Juil.',
      date: '20–22',
      title: 'Hackathon Associatif',
      detail: 'En présentiel · Tous profils',
      type: 'hackathon',
      description: 'Trois jours pour imaginer, prototyper et présenter des projets numériques à impact local, en équipe et dans l\'esprit open source. Mentors présents, ambiance bienveillante, projets publiés en open source.',
      niveau: 'Tous profils',
      discord: 'https://discord.gg/yHCAgYKwk',
      fullDate: '20 au 22 juillet 2026'
    });
  }

  const typeConfig = {
    permanence: { color: '#2ecc71', icon: 'fa-headset',          label: 'Permanence' },
    atelier:    { color: '#6c3fc5', icon: 'fa-chalkboard-teacher', label: 'Atelier' },
    hackathon:  { color: '#e67e22', icon: 'fa-trophy',            label: 'Hackathon' },
  };

  function renderEvents(filter){
    list.innerHTML = '';
    const filtered = filter === 'all' ? events : events.filter(ev => ev.type === filter);
    if(filtered.length === 0){
      list.innerHTML = '<p style="font-size:.8rem;color:var(--text-muted);text-align:center;padding:12px 0;">Aucun événement dans cette catégorie.</p>';
      return;
    }
    filtered.forEach((ev, idx)=>{
      const cfg = typeConfig[ev.type] || typeConfig.permanence;
      const el = document.createElement('div');
      el.className = 'agenda-event';
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.setAttribute('aria-label',`${ev.title} — ${ev.date} — Cliquer pour les détails`);
      el.dataset.idx = events.indexOf(ev);
      el.innerHTML = `
        <div class="agenda-date" style="background:${cfg.color}">${ev.label}<br>${ev.date}</div>
        <div class="agenda-info">
          <strong>${ev.title}</strong>
          <span>${ev.detail}</span>
        </div>
        <div class="agenda-type-pill" style="background:${cfg.color}20;color:${cfg.color};border:1px solid ${cfg.color}40;">
          <i class="fas ${cfg.icon}"></i> ${cfg.label}
        </div>
        <div class="agenda-chevron"><i class="fas fa-chevron-right"></i></div>`;
      el.addEventListener('click', ()=> openEventModal(events[el.dataset.idx]));
      el.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openEventModal(events[el.dataset.idx]); }});
      list.appendChild(el);
    });
  }

  // Filter buttons
  document.querySelectorAll('.agenda-filter-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.agenda-filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderEvents(btn.dataset.type);
    });
  });

  renderEvents('all');
})();

/* ── MODAL ÉVÉNEMENT ─────────────────────────────────── */
function openEventModal(ev){
  const modal   = document.getElementById('eventModal');
  const cfg     = { permanence:{color:'#2ecc71',icon:'fa-headset',label:'Permanence'}, atelier:{color:'#6c3fc5',icon:'fa-chalkboard-teacher',label:'Atelier'}, hackathon:{color:'#e67e22',icon:'fa-trophy',label:'Hackathon'} };
  const c       = cfg[ev.type] || cfg.permanence;

  document.getElementById('modalBadge').innerHTML = `<i class="fas ${c.icon}"></i> ${c.label}`;
  document.getElementById('modalBadge').style.cssText = `background:${c.color}20;color:${c.color};border:1px solid ${c.color}50;`;
  document.getElementById('modalTitle').textContent  = ev.title;
  document.getElementById('modalDate').innerHTML     = `<i class="fas fa-calendar-alt"></i> ${ev.fullDate} &nbsp;·&nbsp; ${ev.detail}`;
  document.getElementById('modalDesc').textContent   = ev.description;
  document.getElementById('modalMeta').innerHTML     = `
    <div class="modal-meta-item"><i class="fas fa-signal"></i><span>Niveau requis : <strong>${ev.niveau}</strong></span></div>
    <div class="modal-meta-item"><i class="fab fa-discord"></i><span>Accès via <strong>Discord</strong> — lien dans le canal #événements</span></div>`;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(()=>modal.classList.add('open'),10);
  document.getElementById('modalClose').focus();
}

function closeEventModal(){
  const modal = document.getElementById('eventModal');
  modal.classList.remove('open');
  setTimeout(()=>{ modal.hidden = true; document.body.style.overflow = ''; }, 280);
}

document.getElementById('modalClose').addEventListener('click', closeEventModal);
document.getElementById('eventModal').addEventListener('click', e=>{
  if(e.target === document.getElementById('eventModal')) closeEventModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeEventModal(); });

/* ── PREFERS-REDUCED-MOTION ───────────────────────── */
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  if(canvas) canvas.style.display = 'none';
}

/* ── SCROLL TO TOP ────────────────────────────────── */
const totop = document.getElementById('totop');
window.addEventListener('scroll',()=>{
  totop.classList.toggle('show', window.scrollY > 400);
});

/* ── FORMULAIRE PROPOSITION D'ATELIER ────────────── */
(function initProposerForm(){

  // ── État ──
  const state = { subject:'', desc:'', level:'', format:'', dispos:[], pseudo:'', prenom:'', email:'' };
  let currentStep = 1;
  const FORMSPREE_ATELIER_ID = 'mnjwlvvn'; // Remplacez par un ID dédié si vous créez un 2e endpoint Formspree

  // ── Helpers ──
  const $ = id => document.getElementById(id);
  function showStep(n){
    [1,2,3].forEach(i=>{
      $('pstep'+i)?.classList.toggle('hidden', i!==n);
    });
    document.querySelectorAll('#proposerSteps .pstep').forEach(el=>{
      const s = +el.dataset.step;
      el.classList.toggle('active', s === n);
      el.classList.toggle('done',   s < n);
    });
    currentStep = n;
  }

  function fieldErr(id, msg, show){
    const el = $(id);
    const err = $('perr-'+id);
    if(!el || !err) return;
    el.classList.toggle('err', show);
    err.classList.toggle('show', show);
    if(show) err.textContent = msg;
  }

  // ── Compteur caractères ──
  const psubjectEl = $('psubject');
  const psubjectCount = $('psubject-count');
  if(psubjectEl && psubjectCount){
    psubjectEl.addEventListener('input', ()=>{
      psubjectCount.textContent = `${psubjectEl.value.length} / 80`;
    });
  }

  // ── Étape 1 → 2 ──
  $('pnext1')?.addEventListener('click', ()=>{
    const subject = $('psubject')?.value.trim() || '';
    const desc    = $('pdesc')?.value.trim()    || '';
    const level   = $('plevel')?.value          || '';
    let ok = true;
    if(subject.length < 3){ fieldErr('psubject','Veuillez saisir un titre (3 caractères min.).',true); ok=false; } else fieldErr('psubject','',false);
    if(desc.length < 20)  { fieldErr('pdesc','Veuillez écrire une description (20 caractères min.).',true); ok=false; } else fieldErr('pdesc','',false);
    if(!level)            { fieldErr('plevel','Veuillez choisir un niveau.',true); ok=false; } else fieldErr('plevel','',false);
    if(!ok) return;
    state.subject = subject; state.desc = desc; state.level = level;
    showStep(2);
  });

  // ── Format cards ──
  document.querySelectorAll('.format-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      document.querySelectorAll('.format-card').forEach(c=>c.classList.remove('selected'));
      card.classList.add('selected');
      $('pformat').value = card.dataset.value;
      fieldErr('pformat','',false);
    });
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); card.click(); }});
  });

  // ── Étape 2 → 3 ──
  $('pnext2')?.addEventListener('click', ()=>{
    const format = $('pformat')?.value || '';
    const dispos = Array.from(document.querySelectorAll('input[name="dispo"]:checked')).map(el=>el.value);
    let ok = true;
    if(!format){ fieldErr('pformat','Veuillez choisir un format.',true); ok=false; } else fieldErr('pformat','',false);
    if(!dispos.length){ fieldErr('pdispo','Veuillez cocher au moins une disponibilité.',true); ok=false; } else fieldErr('pdispo','',false);
    if(!ok) return;
    state.format = format; state.dispos = dispos;
    buildRecap();
    showStep(3);
  });

  // ── Retours ──
  $('pback2')?.addEventListener('click', ()=>showStep(1));
  $('pback3')?.addEventListener('click', ()=>showStep(2));

  // ── Récap ──
  const levelLabels = { debutant:'Débutant', intermediaire:'Intermédiaire', avance:'Avancé', tous:'Tous niveaux' };
  const formatLabels = { 'en-ligne':'En ligne', 'presentiel':'En présentiel', 'hybride':'Hybride', 'peu-importe':'Peu importe' };
  const dispoLabels  = { 'semaine-soir':'Soirs semaine', 'samedi-aprem':'Sam. après-midi', 'samedi-matin':'Sam. matin', 'dimanche':'Dimanche', 'flexible':'Flexible' };

  function buildRecap(){
    const recap = $('proposerRecap');
    if(!recap) return;
    recap.innerHTML = `
      <div class="recap-title"><i class="fas fa-eye"></i> Récapitulatif</div>
      <div class="recap-row"><span>Sujet</span><strong>${state.subject}</strong></div>
      <div class="recap-row"><span>Niveau</span><strong>${levelLabels[state.level]||state.level}</strong></div>
      <div class="recap-row"><span>Format</span><strong>${formatLabels[state.format]||state.format}</strong></div>
      <div class="recap-row"><span>Disponibilités</span><strong>${state.dispos.map(d=>dispoLabels[d]||d).join(', ')}</strong></div>`;
  }

  // ── Soumission ──
  $('psubmitBtn')?.addEventListener('click', async ()=>{
    const pseudo = $('ppseudo')?.value.trim() || '';
    const prenom = $('ppresnom')?.value.trim() || '';
    const email  = $('pemail')?.value.trim()  || '';
    if(!pseudo){ fieldErr('ppseudo','Veuillez saisir votre pseudo Discord.',true); return; }
    fieldErr('ppseudo','',false);
    state.pseudo = pseudo; state.prenom = prenom; state.email = email;

    const btn = $('psubmitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…';

    const payload = {
      _subject: `[Atelier proposé] ${state.subject}`,
      Sujet:          state.subject,
      Description:    state.desc,
      Niveau:         levelLabels[state.level] || state.level,
      Format:         formatLabels[state.format] || state.format,
      Disponibilités: state.dispos.map(d=>dispoLabels[d]||d).join(', '),
      Discord:        pseudo,
      Prénom:         prenom || '(non renseigné)',
      Email:          email  || '(non renseigné)',
    };

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ATELIER_ID}`, {
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(payload)
      });

      if(res.ok){
        $('proposerForm').classList.add('hidden');
        const successEl = $('proposerSuccess');
        successEl.classList.remove('hidden');
        $('psuccess-name').textContent   = prenom || 'vous';
        $('psuccess-pseudo').textContent = pseudo;
        // Confetti 🎉
        if(typeof confetti==='function'){
          confetti({ particleCount:100, spread:70, origin:{y:0.6}, colors:['#2ecc71','#6c3fc5','#60a5fa','#e67e22'] });
        }
      } else {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer ma proposition';
        alert('Une erreur est survenue. Vérifiez votre connexion et réessayez.');
      }
    } catch(e){
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer ma proposition';
      alert('Impossible de contacter le serveur. Vérifiez votre connexion.');
    }
  });

  // ── Réinitialiser ──
  $('proposerReset')?.addEventListener('click', ()=>{
    ['psubject','pdesc','ppseudo','ppresnom','pemail'].forEach(id=>{ const el=$(id); if(el) el.value=''; });
    const levelEl=$('plevel'); if(levelEl) levelEl.value='';
    $('pformat').value='';
    document.querySelectorAll('.format-card').forEach(c=>c.classList.remove('selected'));
    document.querySelectorAll('input[name="dispo"]').forEach(c=>c.checked=false);
    if(psubjectCount) psubjectCount.textContent='0 / 80';
    $('proposerSuccess').classList.add('hidden');
    $('proposerForm').classList.remove('hidden');
    showStep(1);
  });

})();

/* ── RÉSEAU TABS FILTER ───────────────────────────── */
(function(){
  const tabs  = document.querySelectorAll('.reseau-tab');
  const cards = document.querySelectorAll('.reseau-card[data-cat]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? '' : 'none';
        if(show) card.classList.add('scroll-reveal-visible');
      });
    });
  });
})();

/* ── FAQ KEYBOARD NAVIGATION ──────────────────────── */
(function initFaqKeyboard(){
  const faqList = document.querySelector('.faq-list');
  if(!faqList) return;

  function getVisibleItems(){
    return Array.from(faqList.querySelectorAll('.faq-item')).filter(el=>el.style.display!=='none');
  }

  // Make items focusable
  function updateFocusable(){
    getVisibleItems().forEach((item,i)=>{
      const q = item.querySelector('.faq-q');
      q.setAttribute('tabindex','0');
      q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
      q.setAttribute('role','button');
    });
  }
  updateFocusable();

  // Keyboard handler on the faq-list container
  faqList.addEventListener('keydown', e=>{
    const items = getVisibleItems();
    const focused = document.activeElement?.closest('.faq-item');
    if(!focused) return;
    const idx = items.indexOf(focused);

    if(e.key === 'ArrowDown'){
      e.preventDefault();
      const next = items[idx + 1];
      if(next) next.querySelector('.faq-q').focus();
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      const prev = items[idx - 1];
      if(prev) prev.querySelector('.faq-q').focus();
    } else if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      focused.querySelector('.faq-q').click();
    } else if(e.key === 'Home'){
      e.preventDefault();
      items[0]?.querySelector('.faq-q').focus();
    } else if(e.key === 'End'){
      e.preventDefault();
      items[items.length-1]?.querySelector('.faq-q').focus();
    }
  });

  // Update aria-expanded when state changes
  faqList.addEventListener('click', ()=>{ setTimeout(updateFocusable, 50); });
  // Re-run after FAQ filter
  const origFilter = window.filterFaq;
  window.filterFaq = function(q){ origFilter(q); setTimeout(updateFocusable, 50); };
})();

/* ── COMPTE À REBOURS HACKATHON ───────────────────── */
(function initCountdown(){
  const target = new Date('2026-07-20T00:00:00');
  const cdEl = document.getElementById('hackathonCountdown');
  if(!cdEl) return;

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const now  = new Date();
    const diff = target - now;
    if(diff <= 0){
      cdEl.innerHTML = '<div class="countdown-over">🎉 Le hackathon a débuté — rejoignez-nous !</div>';
      return;
    }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);
    document.getElementById('cdDays').textContent    = days;
    document.getElementById('cdHours').textContent   = pad(hours);
    document.getElementById('cdMinutes').textContent = pad(mins);
    document.getElementById('cdSeconds').textContent = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── BANNIÈRE RGPD ────────────────────────────────── */
(function initCookieBanner(){
  const banner = document.getElementById('cookieBanner');
  if(!banner) return;
  if(localStorage.getItem('aed-rgpd-ok')) return;

  setTimeout(()=>banner.classList.add('show'), 1200);

  document.getElementById('cookieAccept').addEventListener('click',()=>{
    localStorage.setItem('aed-rgpd-ok','1');
    banner.classList.remove('show');
    setTimeout(()=>banner.remove(), 400);
  });

  document.getElementById('cookieMore').addEventListener('click',()=>{
    alert('À l\'Eure Digitale ne dépose aucun cookie tiers ni tracker. Seule votre préférence de thème (clair/sombre) est sauvegardée dans localStorage de votre navigateur. Aucune donnée n\'est transmise à des tiers.');
  });
})();
