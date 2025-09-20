/* Melbourne Hunt App v3.6 (Per-Target Scoring + Challenge Count Bonus + Target Detail Modal)
   Data + UI logic in one file for simple static deployment.
*/

const STORAGE_KEY = 'melbourne-hunt-v3.6';

// Data adapted from YAML (version 3.6). Only the essentials for runtime.
const huntData = {
  version: '3.6',
  completionBonus: { requiredChallenges: 10, points: 2 },
  players: ['Tom', 'Mon'],
  challenges: [
    { id:1, title:'Lines & Letter Launch', coop:false,
      longDesc:'Kick off the hunt at an iconic civic space. You are primed to look for deliberate architectural design choices: strong leading lines and bold typography. These first two photographic targets warm up observational skills you will reuse all day.',
      bonus:'First to present a valid \"M\" photo earns brag only (no points).',
      location:{ name:'Federation Square', suggested:'Federation Square – Main Plaza near ACMI facade', address:'Swanston St & Flinders St, Melbourne VIC 3000', backups:[
        { name:'Atrium edge (NGV entrance side)', note:'If plaza events obstruct' },
        { name:"St Paul’s Cathedral frontage", note:'Large signage letters for M potential' }
      ]},
      targets:[
        { short:'Angle selfie', detail:'Both players in one selfie that intentionally includes a strong architectural line (edge / beam / roofline / designed paving alignment / deliberate curve) that leads the eye toward a point or vanishing direction. Frame shoulders upward; line must be clearly visible and not accidental.'},
        { short:"Letter 'M' capture", detail:"Photo of an existing physical, printed, mounted, engraved, carved or painted capital 'M' found on-site (signage, plaque, sculpture). No drawing, typing, tracing in condensation, or forming it with hands. Crop so the 'M' is legible."}
      ],
      notes:'Architectural line = structural edge (façade corner, roofline, beam, rail, designed paving alignment, or deliberate curve) – not shadows or temporary objects.'
    },
    { id:2, title:'Hosier Lane Photo Set', coop:false,
      longDesc:'Dive into Melbourne’s most photographed graffiti laneway—but look with constraints. Each target pushes you to classify what you see: subject matter, colour dominance, medium (stencil) and iconography. Curating a diverse micro‑collection trains visual scanning speed.',
      bonus:'First to finish all five targets earns bragging rights only.',
      location:{ name:'Hosier Lane', suggested:'Enter from Flinders Ln near Russell St', address:'Hosier Ln, Melbourne VIC 3000', backups:[
        { name:'Rutledge Lane', note:'Spillover graffiti if targets scarce' },
        { name:'AC/DC Lane', note:'If Hosier overly crowded' }
      ]},
      targets:[
        { short:'Animal piece', detail:'Graffiti / street art showing a recognizable non‑abstract animal (whole or partial) where species is guessable (e.g., cat, bird). Mythical creatures do NOT count unless clearly animal hybrid.'},
        { short:'3-char tag', detail:'A tag consisting of exactly three alphanumeric characters (letters or digits). No punctuation, arrows, or extra marks beyond normal stylistic flares; stray dots allowed only if part of style not extra letters.'},
        { short:'Single-colour dominant', detail:'An artwork where one hue (allowing tonal variations/light-dark) covers ~70% or more of visible painted area. Minor accents OK. Photograph should show enough context to judge dominance.'},
        { short:'Stencil piece', detail:'Spray-painted image created with a cut template: crisp repeated edges, uniform fill or shading indicating stencil use. Hand freeform outlines don’t count.'},
        { short:'Crown symbol', detail:'Any piece featuring a stylized crown shape (≥3 points). Could be above a name or incorporated in a character. Must be intentional, not random triangles.'}
      ]
    },
    { id:3, title:'Twin Cup Taste Trial', coop:false,
      longDesc:'Side‑by‑side comparison sharpens taste memory. By holding variables (drink style) constant while changing venue you generate a tiny controlled experiment—then test your palate with a blind preference reveal.',
      bonus:'If simultaneous completion, clearer latte art = brag only.',
      location:{ name:'Degraves / Centre Place', suggested:'Degraves St pair of small specialty cafes', address:'Degraves St, Melbourne VIC 3000', backups:[
        { name:'Centre Place cafe (Jungle Juice)', note:'If Degraves seats full' },
        { name:'Dukes Coffee Roasters (Flinders Ln)', note:'Higher-end espresso alt' }
      ]},
      targets:[
        { short:'Cup A', detail:'Purchase or obtain a coffee from Cafe A. Must be a different physical venue and brand than Cup B (logo / cup design distinct).'},
        { short:'Cup B', detail:'Second coffee from a different cafe (no shared franchise if possible). Should be comparable style (e.g., two flat whites) unless mutually agreed otherwise.'},
        { short:'Blind ranking', detail:'Each player tastes both (eyes closed / swapped position) then writes a secret A/B preference. On reveal both show ranking simultaneously. Completion = both rankings shown (agreement not required).'}
      ]
    },
    { id:4, title:'Dome & Detail Duel', coop:false,
      longDesc:'Train your eye to zoom out and in: capture grand architectural volume, then isolate repeating geometric texture. Switching scales builds spatial literacy and compositional agility.',
      location:{ name:'State Library Dome', suggested:'La Trobe Reading Room (dome) upper level rail', address:'328 Swanston St, Melbourne VIC 3000', backups:[
        { name:'Queens Hall / exterior façade', note:'If dome access restricted or queue high' },
        { name:'Front lawn architectural detail', note:'Fallback wide + detail outdoors' }
      ]},
      targets:[
        { short:'Wide dome shot', detail:'Capture a landscape/portrait photo from an upper level showing the dome volume and the curving balcony rail arc. Some desks acceptable; avoid heavy people blocking the architectural feel.'},
        { short:'Geometric detail', detail:'Close-up of a repeating pattern (bookshelves, baluster, ceiling panel, window or molding) with NO humans. Emphasize lines / symmetry / geometry.'}
      ]
    },
    { id:5, title:'Minotaur Multiverse Mix', coop:false,
      longDesc:'Nerd retail ecology safari: locate a specific character, assess cultural tone via a suggestive figurine, then time‑travel with a retro franchise artifact. You’re sampling breadth of pop‑culture eras fast.',
      bonus:'First to complete all three items = brag only.',
      location:{ name:'Minotaur Entertainment', suggested:'Main comics & figurines floor', address:'264 Little Collins St, Melbourne VIC 3000', backups:[
        { name:'Critical Hit (Queen St)', note:'Alternate geek merch if Minotaur closed' },
        { name:'EB Games + Zing (Swanston St)', note:'For Constantine & retro item substitutes' }
      ]},
      targets:[
        { short:'Constantine comic', detail:'A Hellblazer / Constantine issue or collected edition with title readable. Spin‑off appearances count if Constantine clearly on cover.'},
        { short:'Suggestive figurine', detail:'Figurine whose pose/outfit is overtly sexualized or comedic in a horny way (maintain store etiquette: frame to avoid explicit packaging).'},
        { short:'Retro franchise item', detail:'Merch representing a franchise whose first release predates year 2000 (game, film, comic). Show item plus enough packaging/logo to confirm origin.'}
      ]
    },
    { id:6, title:'Pokémon Wearable Hunt', coop:false,
      longDesc:'Shift to apparel: seek an instantly recognisable character translation from media to wearable form. Observes merchandising design language (ears, silhouettes, fabric choices).',
      bonus:'If simultaneous, clearer official branding tag earns brag only.',
      location:{ name:'Pop culture/anime merch store', suggested:'Moko Select (anime/merch boutique)', address:'(Verify current CBD address for Moko Select)', backups:[
        { name:'Minotaur apparel/hat section', note:'If Moko lacks headgear' },
        { name:'EB Games + Zing (Swanston St)', note:'Fallback apparel' }
      ]},
      targets:[
        { short:'Pikachu/Eevee head wearable', detail:'A hat, headband, hood, beanie, cap, or ears featuring Pikachu OR Eevee (official branding tag or recognizable licensed design). Single photo with product context (shelf/rack).'}
      ]
    },
    { id:7, title:'Pokédex Character Trio', coop:false,
      longDesc:'Taxonomy challenge: gather three distinct category exemplars (starter line, elemental type, legendary/mythical). Reinforces classification & breadth searching within dense merchandise displays.',
      bonus:'Tie-break brag: item whose Pokémon debuted in the earliest generation.',
      location:{ name:'Figure / plush section', suggested:'Critical Hit (Queen St) collectibles area', address:'(Verify Critical Hit current address)', backups:[
        { name:'Minotaur figures & plush aisle', note:'If Critical Hit closed' },
        { name:'EB/Zing collectibles wall', note:'If needing more variety' }
      ]},
      targets:[
        { short:'Starter line', detail:'A Pokémon that is part of an official starter evolutionary line (any generation, any stage).'},
        { short:'Electric type', detail:'An Electric-type Pokémon merch item distinct from your starter pick if that starter is also Electric.'},
        { short:'Legendary/Mythical', detail:'Item depicting a Legendary or Mythical Pokémon (box art icon, label, or unmistakable design).'}
      ]
    },
    { id:8, title:'Dymocks Dash', coop:false,
      longDesc:'Targeted literary scavenging: precise title recognition, thematic genre identification (vampires), then pattern matching a specific author name. Exercises fast spine scanning and semantic filtering.',
      bonus:'If simultaneous, clearest non-fiction companion pick earns brag only.',
      location:{ name:'Dymocks Melbourne', suggested:'Primary floor (fantasy & graphic novel sections)', address:'234 Collins St, Melbourne VIC 3000', backups:[
        { name:'Readings Emporium', note:'If Dymocks unexpectedly closed' },
        { name:'Elizabeth St secondhand bookshop', note:'Adjust categories if needed' }
      ]},
      targets:[
        { short:'The Silmarillion', detail:'Locate any edition where the cover spine or front clearly reads “The Silmarillion”. Anthologies with excerpt don’t count.'},
        { short:'Vampire Manga or Graphic Novel', detail:'A bound volume (manga or Western GN) where vampires are central (title art, synopsis, or obvious character).'},
        { short:'Author is Mon', detail:'Book whose credited author first name is Mon or Monisha. Show cover with name legible.'}
      ]
    },
    { id:9, title:'Tram Quick Grab', coop:false,
      longDesc:'Inject a kinetic capture—timing + light + motion. You practice anticipating subject path and framing while extracting readable data (route number) from a moving object.',
      bonus:'Sharper/most legible route number in motion earns brag only.',
      location:{ name:'Tram stop', suggested:'Collins St (Town Hall / Swanston stop)', address:'Collins St & Swanston St, Melbourne VIC 3000', backups:[
        { name:'Bourke St Mall stop', note:'High tram frequency for quick capture' },
        { name:'Flinders & Swanston intersection', note:'If route timing shifts south' }
      ]},
      targets:[
        { short:'Moving tram + route', detail:'Action shot of a tram in motion (blur acceptable) where the route number (or code) is readable. Stationary at full stop does NOT count; slight roll acceptable.'}
      ]
    },
    { id:10, title:'Cozy Stop Rule', coop:true,
      longDesc:'A cooperative social constraint resets pace and creates a shared micro‑ritual. The invented rule injects playful mindfulness—turning an ordinary café pause into a designed experience.',
      location:{ name:'Laneway bar / tea / chocolate shop', suggested:'Hardware Lane small café/bar mid-block', address:'Hardware Ln, Melbourne VIC 3000', backups:[
        { name:'Patricia Coffee Brewers (Little Bourke)', note:'Standing quick reset if seating scarce' },
        { name:'Manchester Press (Rankins Ln)', note:'If you want bagel + space' }
      ]},
      targets:[
        { short:'Agree rule', detail:'Jointly decide and verbally lock a light constraint (e.g., no phones, only whisper metaphors, no using the letter “e”). Must be mutually acknowledged before ordering.'},
        { short:'Maintain rule', detail:'Both adhere to chosen rule from ordering start until leaving / finishing items. Any violation cancels this target for the violator only.'}
      ]
    },
    { id:11, title:'Metroidvania Finder Race', coop:false,
      longDesc:'Media genre literacy sprint: identify a qualifying Metroidvania swiftly based on progression gating and exploration loops—prioritizing breadth of genre recall.',
      bonus:'Most obscure qualifying Metroidvania title found earns bragging rights only.',
      location:{ name:'Video game retailer', suggested:'EB Games + Zing (Swanston St)', address:'67 Swanston St, Melbourne VIC 3000', backups:[
        { name:'JB Hi-Fi Games (Bourke St Mall)', note:'If EB crowded / stock thin' },
        { name:'Retro cabinet (Minotaur)', note:'Fallback if stock variance needed' }
      ]},
      targets:[
        { short:'Metroidvania title', detail:'Photo of game box / shelf label recognized as Metroidvania (progression via abilities unlocking earlier unreachable areas). Collections okay if one included qualifies.'}
      ]
    },
    { id:12, title:'Adult Novelty Oddity', coop:false,
      longDesc:'Humorous discomfort zone dip—observational neutrality in a niche retail context. Focus on design absurdity over explicitness; description fallback tests concise shared mental imagery.',
      location:{ name:'Adult toy store (discreet)', suggested:'ADG Adult Toys', address:'(Confirm exact current CBD address for ADG Adult Toys)', backups:[
        { name:'Club X Bourke St', note:'If ADG unavailable' },
        { name:'Describe-only fallback', note:'If photos disallowed, use description + mutual acceptance' }
      ]},
      targets:[
        { short:'Strange novelty item', detail:'Most unusual / themed / oddly engineered item (shape, gimmick, mash‑up). If photos disallowed: write a 1‑line description both agree accurately captures it.'}
      ]
    },
    { id:13, title:'Rooftop Contrast Pair', coop:false,
      longDesc:'Dual thematic photographic study: temporal contrast (heritage vs modern) and formal contrast (vertical vs horizontal lines). Encourages composing with layered urban geometry.',
      location:{ name:'Rooftop / upper-level view', suggested:'Rooftop Bar (Curtin House)', address:'252 Swanston St, Melbourne VIC 3000', backups:[
        { name:'QT Melbourne rooftop', note:'If Curtin House queue long' },
        { name:'Indoor atrium elevated view', note:'Weather fallback' }
      ]},
      targets:[
        { short:'Heritage vs modern', detail:'Single frame juxtaposing at least one older/heritage façade and a clearly modern structure. Both identifiable in same shot.'},
        { short:'Lines contrast', detail:'Photo emphasizing interplay of strong vertical lines versus horizontal. Angle should make both direction sets obvious.'}
      ]
    },
    { id:14, title:'Ice Cream Victory Lap', coop:true,
      longDesc:'Celebratory cooldown and reflective palate novelty. New flavour pushes exploration; shared cheers photo seals narrative arc and signals closure of the hunt journey.',
      location:{ name:'Gelato / dessert spot', suggested:'Pidapipó or Gelato Messina (central)', address:'Central CBD (confirm current operating site)', backups:[
        { name:'Gelatissimo Bourke St', note:'Extended hours backup' },
        { name:'Aqua S / alternate dessert bar', note:'If gelato lines extreme' }
      ]},
      targets:[
        { short:'New/recent flavour', detail:'Order a flavour (or combo) you have not had in ≥12 months. Mix-ins only new if base+mix combo novel to you.'},
        { short:'Cheers photo', detail:'Both players’ desserts in one celebratory frame (hands or cups/spoons) showing cooperative finale.'}
      ]
    }
  ]
};

// ---------- State Handling ----------
function defaultState(){
  return {
    version: huntData.version,
    bonusAwarded:false,
    challenges: huntData.challenges.map(c=>({
      id:c.id,
      skipped:false,
      targets:c.targets.map(()=>({ Tom:false, Mon:false })) // parallel array: one per target
    }))
  };
}

function loadState(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if(parsed.version !== huntData.version) return defaultState();
    // Basic shape normalisation
    return parsed;
  } catch(e){
    return defaultState();
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

// ---------- Scoring ----------
function countFullyCompletedChallenges(){
  return state.challenges.filter(sc => {
    const cfg = huntData.challenges.find(c=>c.id===sc.id);
    if(sc.skipped) return false;
    return sc.targets.every(t=>t.Tom && t.Mon);
  }).length;
}

function computeScores(){
  let tom = 0, mon = 0;
  for(const ch of state.challenges){
    for(const tgt of ch.targets){
      if(tgt.Tom) tom++;
      if(tgt.Mon) mon++;
    }
  }
  // Auto-award bonus when threshold reached (idempotent)
  const full = countFullyCompletedChallenges();
  if(!state.bonusAwarded && full >= huntData.completionBonus.requiredChallenges){
    state.bonusAwarded = true;
    saveState();
  }
  if(state.bonusAwarded){
    tom += huntData.completionBonus.points;
    mon += huntData.completionBonus.points;
  }
  return { tom, mon, full };
}

// ---------- Rendering ----------
const listEl = document.getElementById('challengeList');
const scoreTomEl = document.getElementById('score-tom');
const scoreMonEl = document.getElementById('score-mon');
// Replace finish bonus toggle UI with dynamic indicator (reuse existing element container if present)
const finishBonusContainer = document.querySelector('.bonus-control');
if(finishBonusContainer){
  finishBonusContainer.innerHTML = `<span id="bonusStatus" class="bonus-status" aria-live="polite">Bonus: not yet</span>`;
}

function render(){
  listEl.innerHTML = '';
  for(const challenge of huntData.challenges){
    const st = state.challenges.find(c=>c.id===challenge.id);
    const doneCount = st.targets.reduce((a,t)=> a + (t.Tom?1:0) + (t.Mon?1:0),0);
    const totalTargets = challenge.targets.length * huntData.players.length; // total ticks possible per challenge
    const allTargetsCompletedByBoth = st.targets.every(t => t.Tom && t.Mon);

    const card = document.createElement('section');
    card.className = 'challenge' + (challenge.coop?' coop':'') + (st.skipped?' skip':'');
    card.dataset.id = challenge.id;

    const header = document.createElement('div');
    header.className = 'challenge-header';
    // Build location pill (primary + Google Maps link). Use address if available, else suggested.
    let locHTML = '';
    if(challenge.location){
      const q = encodeURIComponent(challenge.location.address || challenge.location.suggested || challenge.location.name);
      locHTML = `<a class="location-pill" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener" title="Open in Google Maps">📍 ${challenge.location.name}</a>`;
    }
    header.innerHTML = `
      <div class="challenge-header-row">
        <h2 class="challenge-title" tabindex="0">#${challenge.id} ${challenge.title}</h2>
        <button class="collapse-toggle" aria-label="Collapse challenge">-</button>
      </div>
      <div class="badges">
        ${locHTML}
        ${challenge.coop?'<span class="badge coop">Co-op</span>':''}
        ${st.skipped?'<span class="badge skipped">Skipped</span>':''}
        ${allTargetsCompletedByBoth?'<span class="badge done">Done</span>':''}
      </div>
    `;

    const targetsWrap = document.createElement('div');
    targetsWrap.className = 'targets';

    challenge.targets.forEach((tgt, idx)=>{
      const tgtState = st.targets[idx];
      const row = document.createElement('div');
      row.className = 'target';

      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'toggle';
      toggleBtn.type = 'button';
      toggleBtn.textContent = idx+1;
      toggleBtn.addEventListener('click',()=>{
        // Quick toggle cycles through: none -> Tom -> Mon -> both -> none
        if(!tgtState.Tom && !tgtState.Mon){ tgtState.Tom = true; }
        else if(tgtState.Tom && !tgtState.Mon){ tgtState.Mon = true; }
        else if(tgtState.Tom && tgtState.Mon){ tgtState.Tom = false; tgtState.Mon = false; }
        else if(!tgtState.Tom && tgtState.Mon){ tgtState.Tom = true; }
        saveState();
        updateScores();
        render();
      });

  const text = document.createElement('div');
  text.className = 'text';
  // Support legacy string targets (if any) by normalizing
  const shortLabel = typeof tgt === 'string' ? tgt : tgt.short;
  const detail = typeof tgt === 'string' ? tgt : tgt.detail;
  const labelDiv = document.createElement('div');
  labelDiv.textContent = shortLabel;
  labelDiv.className = 'target-label';
  labelDiv.tabIndex = 0;
  // Full-row detail activation handled below; keep label focusable for accessibility
  labelDiv.addEventListener('keydown',e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); showTargetDetail(challenge, shortLabel, detail); }});
  text.appendChild(labelDiv);

      const playersDiv = document.createElement('div');
      playersDiv.className = 'players';

      huntData.players.forEach(p=>{
        const chip = document.createElement('button');
        chip.type='button';
        chip.className = 'player-chip' + (tgtState[p]?' active':'');
        chip.textContent = p;
        chip.addEventListener('click',()=>{
          tgtState[p] = !tgtState[p];
          saveState();
          updateScores();
          render();
        });
        playersDiv.appendChild(chip);
      });

  text.appendChild(playersDiv);
      row.appendChild(toggleBtn);
      row.appendChild(text);
      targetsWrap.appendChild(row);

      // Row click for detail (exclude toggle button & player chips)
      row.addEventListener('click', e => {
        if(e.target === toggleBtn) return; // toggle handled separately
        if(e.target.classList.contains('player-chip')) return; // don't open modal when clicking player chips
        // If clicking the toggle gradient state styling area or row background, show details
        showTargetDetail(challenge, shortLabel, detail);
      });

      // style state
      if(tgtState.Tom && tgtState.Mon){ toggleBtn.classList.add('done'); }
      else if(tgtState.Tom || tgtState.Mon){ toggleBtn.classList.add('done'); toggleBtn.style.background='linear-gradient(135deg,var(--accent) 50%, #1c2730 50%)'; }
    });

    // Inject bonus (unscored / brag) block below targets if present
    if(challenge.bonus){
      const bonusDiv = document.createElement('div');
      bonusDiv.className = 'bonus-block inline';
      bonusDiv.innerHTML = `<strong>Bonus:</strong> ${challenge.bonus} <span class="sc-tag" title="No points, brag only">(unscored)</span>`;
      targetsWrap.appendChild(bonusDiv);
    }

    const footer = document.createElement('div');
    footer.className = 'challenge-footer';

    const progressWrap = document.createElement('div');
    progressWrap.className = 'progress-bar-wrap';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const percent = (st.targets.filter(t=>t.Tom).length + st.targets.filter(t=>t.Mon).length) / (challenge.targets.length*2) * 100;
    progressBar.style.width = percent.toFixed(1)+'%';
    progressWrap.appendChild(progressBar);

    const btns = document.createElement('div');
    btns.className = 'footer-buttons';
    const skipBtn = document.createElement('button');
    skipBtn.textContent = st.skipped ? 'Unskip' : 'Skip';
    skipBtn.addEventListener('click',()=>{
      st.skipped = !st.skipped;
      saveState();
      render();
    });
    btns.appendChild(skipBtn);

    // Note button removed; note shown via title click inside modal.

    footer.appendChild(progressWrap);
    footer.appendChild(btns);

    card.appendChild(header);
    card.appendChild(targetsWrap);
    card.appendChild(footer);

    // collapse behavior (kept on the small button only)
    const collapseBtn = header.querySelector('.collapse-toggle');
    collapseBtn.addEventListener('click',()=>{ card.classList.toggle('collapsed'); });
    // challenge title click => open modal with overall challenge info & note
    const titleEl = header.querySelector('.challenge-title');
    const openChallengeDetail = ()=> showChallengeDetail(challenge);
    titleEl.addEventListener('click', openChallengeDetail);
    titleEl.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openChallengeDetail(); }});

    listEl.appendChild(card);
  }
  updateScores();
}

function updateScores(){
  const wasAwarded = state.bonusAwarded; // capture prior state
  const { tom, mon, full } = computeScores();
  scoreTomEl.textContent = tom;
  scoreMonEl.textContent = mon;
  const bonusStatusEl = document.getElementById('bonusStatus');
  if(bonusStatusEl){
    if(state.bonusAwarded){
      bonusStatusEl.textContent = `Bonus achieved (+${huntData.completionBonus.points}) via ${full} completed challenges`;
      bonusStatusEl.classList.add('achieved');
    } else {
      bonusStatusEl.textContent = `Bonus: ${full}/${huntData.completionBonus.requiredChallenges} fully completed`;
      bonusStatusEl.classList.remove('achieved');
    }
  }
  if(!wasAwarded && state.bonusAwarded){
    launchConfetti();
  }
}

// Filtering
const filterAllBtn = document.getElementById('filterAll');
const filterRemainingBtn = document.getElementById('filterRemaining');
filterAllBtn.addEventListener('click',()=>{ setFilter('all'); });
filterRemainingBtn.addEventListener('click',()=>{ setFilter('remaining'); });
let currentFilter='all';
function setFilter(mode){
  currentFilter = mode;
  filterAllBtn.classList.toggle('active', mode==='all');
  filterRemainingBtn.classList.toggle('active', mode==='remaining');
  Array.from(document.querySelectorAll('.challenge')).forEach(card=>{
    const id = Number(card.dataset.id);
    const st = state.challenges.find(c=>c.id===id);
    const challenge = huntData.challenges.find(c=>c.id===id);
    const allDone = st.targets.every(t=>t.Tom && t.Mon) || st.skipped;
    if(mode==='remaining' && allDone) card.style.display = 'none'; else card.style.display='flex';
  });
}

// (Reset/Export/Import removed by request)

// Long-press collapse/expand all
let pressTimer; let pressStart = 0;
window.addEventListener('pointerdown', e=>{
  if(e.target.closest('.challenge-title')){
    pressStart = Date.now();
    pressTimer = setTimeout(()=>{
      const anyCollapsed = Array.from(document.querySelectorAll('.challenge')).some(c=>c.classList.contains('collapsed'));
      document.querySelectorAll('.challenge').forEach(c=>{
        c.classList.toggle('collapsed', !anyCollapsed);
      });
    },650);
  }
});
window.addEventListener('pointerup',()=> clearTimeout(pressTimer));
window.addEventListener('pointerleave',()=> clearTimeout(pressTimer));

// ---------- Modal Detail Overlay ----------
function showTargetDetail(challenge, shortLabel, detail){
  let existing = document.querySelector('.detail-overlay');
  if(existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'detail-overlay';
  // Build location section for modal
  let locSection = '';
  if(challenge.location){
    const baseQuery = encodeURIComponent(challenge.location.address || challenge.location.suggested || challenge.location.name);
    locSection += `<div class="loc-block"><div class="loc-primary"><strong>Location:</strong> <a href=\"https://www.google.com/maps/search/?api=1&query=${baseQuery}\" target=\"_blank\" rel=\"noopener\">${challenge.location.name}</a></div>`;
    if(challenge.location.suggested){
      locSection += `<div class="loc-suggested">${challenge.location.suggested}</div>`;
    }
    if(challenge.location.address){
      locSection += `<div class="loc-address">${challenge.location.address}</div>`;
    }
    if(challenge.location.backups && challenge.location.backups.length){
      locSection += `<details class="loc-backups"><summary>Backups</summary><ul>`;
      locSection += challenge.location.backups.map(b=>{
        const bq = encodeURIComponent(b.name);
        return `<li><a href=\"https://www.google.com/maps/search/?api=1&query=${bq}\" target=\"_blank\" rel=\"noopener\">${b.name}</a>${b.note?` – <span class=\"note\">${b.note}</span>`:''}</li>`;
      }).join('');
      locSection += `</ul></details>`;
    }
    locSection += '</div>';
  }
  overlay.innerHTML = `
    <div class="detail-dialog" role="dialog" aria-modal="true" aria-label="Target detail">
      <button class="close-detail" aria-label="Close">×</button>
      <h3>#${challenge.id} ${challenge.title}</h3>
      ${locSection}
      <h4>${shortLabel}</h4>
      <p>${detail}</p>
      <p class="hint">(Esc to close)</p>
    </div>`;
  document.body.appendChild(overlay);
  const close = overlay.querySelector('.close-detail');
  const remove = ()=> overlay.remove();
  close.addEventListener('click', remove);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) remove(); });
  window.addEventListener('keydown', function escHandler(e){ if(e.key==='Escape'){ remove(); window.removeEventListener('keydown', escHandler);} });
  close.focus();
}

// Challenge-level modal (shows note + location overview)
function showChallengeDetail(challenge){
  let existing = document.querySelector('.detail-overlay');
  if(existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'detail-overlay';
  let locSection='';
  if(challenge.location){
    const baseQuery = encodeURIComponent(challenge.location.address || challenge.location.suggested || challenge.location.name);
    locSection += `<div class="loc-block"><div class="loc-primary"><strong>Location:</strong> <a href=\"https://www.google.com/maps/search/?api=1&query=${baseQuery}\" target=\"_blank\" rel=\"noopener\">${challenge.location.name}</a></div>`;
    if(challenge.location.suggested){ locSection += `<div class="loc-suggested">${challenge.location.suggested}</div>`; }
    if(challenge.location.address){ locSection += `<div class="loc-address">${challenge.location.address}</div>`; }
    if(challenge.location.backups && challenge.location.backups.length){
      locSection += `<details class="loc-backups"><summary>Backups</summary><ul>` + challenge.location.backups.map(b=>{
        const bq = encodeURIComponent(b.name);
        return `<li><a href=\"https://www.google.com/maps/search/?api=1&query=${bq}\" target=\"_blank\" rel=\"noopener\">${b.name}</a>${b.note?` – <span class=\"note\">${b.note}</span>`:''}</li>`;
      }).join('') + `</ul></details>`;
    }
    locSection += '</div>';
  }
  const descBlock = challenge.longDesc ? `<p class="challenge-long">${challenge.longDesc}</p>` : '';
  const noteBlock = challenge.notes ? `<div class="challenge-note"><strong>Note:</strong> ${challenge.notes}</div>` : '';
  overlay.innerHTML = `
    <div class="detail-dialog" role="dialog" aria-modal="true" aria-label="Challenge detail">
      <button class="close-detail" aria-label="Close">×</button>
      <h3>#${challenge.id} ${challenge.title}</h3>
      ${locSection}
    ${descBlock}
    ${noteBlock || ''}
    ${(!descBlock && !noteBlock) ? '<p class="hint">(No extra description)</p>' : ''}
      <p class="hint">(Esc to close)</p>
    </div>`;
  document.body.appendChild(overlay);
  const close = overlay.querySelector('.close-detail');
  const remove = ()=> overlay.remove();
  close.addEventListener('click', remove);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) remove(); });
  window.addEventListener('keydown', function escHandler(e){ if(e.key==='Escape'){ remove(); window.removeEventListener('keydown', escHandler);} });
  close.focus();
}

// ---------- Confetti ----------
function launchConfetti(){
  // Avoid duplicate overlays
  let layer = document.querySelector('.confetti');
  if(layer) layer.remove();
  layer = document.createElement('div');
  layer.className = 'confetti';
  document.body.appendChild(layer);
  const colors = ['#b18bff','#7da6ff','#5aa9ff','#c7a6ff','#99c9ff','#8b74ff'];
  const pieces = 80;
  for(let i=0;i<pieces;i++){
    const elm = document.createElement('i');
    const color = colors[i % colors.length];
    const delay = (Math.random()*0.2).toFixed(2);
    const duration = (3+Math.random()*2).toFixed(2);
    const x = (Math.random()*100).toFixed(2);
    const rotate = (Math.random()*360).toFixed(0);
    const scale = (0.6+Math.random()*0.8).toFixed(2);
    elm.style.left = x+'%';
    elm.style.background = color;
    elm.style.transform = `rotate(${rotate}deg) scale(${scale})`;
    elm.style.animation = `fall ${duration}s linear ${delay}s forwards`;
    layer.appendChild(elm);
  }
  // Auto-remove after max duration
  setTimeout(()=> layer && layer.remove(), 6500);
}

render();
setFilter('all');
updateScores();
