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
const navSections = ['about','pour-qui','discord','hackathon','temoignages','territoire','faq','contact'];
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

  // Génère les N prochains samedis à partir d'aujourd'hui
  function nextSaturdays(n){
    const dates = [];
    const d = new Date();
    d.setHours(0,0,0,0);
    // Avance jusqu'au prochain samedi (6 = samedi)
    const daysUntilSat = (6 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + daysUntilSat);
    for(let i = 0; i < n; i++){
      dates.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }
    return dates;
  }

  const MOIS = ['jan.','fév.','mar.','avr.','mai','juin','juil.','août','sep.','oct.','nov.','déc.'];

  // Permanences : 2 prochains samedis
  const samedis = nextSaturdays(2);
  const events = samedis.map(d => ({
    label: 'Sam.',
    date: `${d.getDate()} ${MOIS[d.getMonth()]}`,
    title: 'Permanence numérique',
    detail: '14h–16h · En ligne · Gratuit'
  }));

  // Hackathon fixe (août 2026) — à mettre à jour manuellement après l'événement
  const hackathon = new Date('2026-08-27');
  if(hackathon > new Date()){
    events.push({
      label: 'Août',
      date: '27–30',
      title: 'Hackathon Associatif',
      detail: 'En présentiel · Tous profils'
    });
  }

  events.forEach(ev=>{
    list.insertAdjacentHTML('beforeend',`
      <div class="agenda-event">
        <div class="agenda-date">${ev.label}<br>${ev.date}</div>
        <div class="agenda-info">
          <strong>${ev.title}</strong>
          <span>${ev.detail}</span>
        </div>
      </div>`);
  });
})();

/* ── PREFERS-REDUCED-MOTION ───────────────────────── */
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  if(canvas) canvas.style.display = 'none';
}

/* ── SCROLL TO TOP ────────────────────────────────── */
const totop = document.getElementById('totop');
window.addEventListener('scroll',()=>{
  totop.classList.toggle('show', window.scrollY > 400);
});
