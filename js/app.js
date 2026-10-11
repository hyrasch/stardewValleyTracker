/* global ITEMS, ROOMS, SEASONS, MODS, TYPE_LABELS, TYPE_ICONS, Q */
(function () {
  'use strict';

  const STORE_KEY = 'sdv-cccb-tracker-v1';
  const SEASON_LABEL = { spring: 'Spring', summer: 'Summer', fall: 'Fall', winter: 'Winter' };
  const SEASON_ICON = { spring: '🌸', summer: '☀️', fall: '🍂', winter: '❄️' };
  const GATED_PLACES = ['Calico Desert', 'The Sewers', 'Secret Woods', 'Skull Cavern', 'Aguar Cave', 'Fable Reef', 'Highlands', 'Crimson Badlands', 'Junimo Woods', 'Summit Farm', 'Greenhouse', 'Ridge Pond'];
  const DAYS_RE = /\bdays?\b[^.]*\d|\b(spring|summer|fall|winter) \d/i;
  const GROUPS = {
    rain: { icon: '🌧', title: 'Rainy days', hint: 'Only while it rains or storms.' },
    sun: { icon: '☀️', title: 'Sunny days only', hint: 'Gone as soon as it rains.' },
    night: { icon: '🌙', title: 'Evenings and nights', hint: 'Stay out late.' },
    window: { icon: '🕒', title: 'Daytime windows', hint: 'Only during part of the day.' },
    days: { icon: '📅', title: 'Specific days', hint: 'Check the calendar.' },
    gated: { icon: '🔒', title: 'Needs an unlocked area', hint: 'Desert bus, Sewers, Secret Woods, Ridgeside caves, Fable Reef, Highlands…' },
    'single-spring': { icon: '🌸', title: 'Spring only', hint: 'No other season has it.' },
    'single-summer': { icon: '☀️', title: 'Summer only', hint: 'No other season has it.' },
    'single-fall': { icon: '🍂', title: 'Fall only', hint: 'No other season has it.' },
    'single-winter': { icon: '❄️', title: 'Winter only', hint: 'No other season has it.' },
    unsure: { icon: '❓', title: 'Verify in game', hint: 'Sources I could not confirm in the mod files.' },
  };

  /* ---------------- state ---------------- */
  const defaults = () => ({
    done: {},
    prefs: { view: 'overview', season: 'spring', weather: 'any', onlyNow: false, hideDone: false, group: 'conditions', q: '', openGroups: {}, guideDay: 1 },
  });
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaults();
      const parsed = JSON.parse(raw);
      const d = defaults();
      return { done: parsed.done || {}, prefs: Object.assign(d.prefs, parsed.prefs || {}) };
    } catch (e) { return defaults(); }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  /* ---------------- derived data ---------------- */
  const BUNDLES = [];
  const USES = {}; // itemId -> [{room, bundle, idx, qty, q}]
  ROOMS.forEach(room => room.bundles.forEach(bundle => {
    bundle.room = room;
    BUNDLES.push(bundle);
    bundle.items.forEach((slot, idx) => {
      (USES[slot.id] = USES[slot.id] || []).push({ room, bundle, idx, qty: slot.qty, q: slot.q });
    });
  }));
  const ITEM_IDS = Object.keys(USES).filter(id => ITEMS[id]);
  Object.keys(USES).forEach(id => { if (!ITEMS[id]) console.warn('Missing item data for', id); });

  const slotKey = (bundle, idx) => bundle.id + '|' + idx;
  const isDone = (bundle, idx) => !!state.done[slotKey(bundle, idx)];
  function bundleStatus(bundle) {
    const n = bundle.items.reduce((acc, _, i) => acc + (isDone(bundle, i) ? 1 : 0), 0);
    return { n, need: bundle.need, complete: n >= bundle.need };
  }
  function roomStatus(room) {
    const done = room.bundles.filter(b => bundleStatus(b).complete).length;
    return { done, total: room.bundles.length, complete: done === room.bundles.length };
  }
  function itemDone(id) {
    const uses = USES[id] || [];
    const done = uses.filter(u => isDone(u.bundle, u.idx)).length;
    return { done, total: uses.length, all: done === uses.length && uses.length > 0 };
  }
  const slotRelevant = (u) => !isDone(u.bundle, u.idx) && !bundleStatus(u.bundle).complete;
  const itemRelevant = (id) => (USES[id] || []).some(slotRelevant);

  function srcAvailable(src, season, weather) {
    if (src.seasons && !src.seasons.includes(season)) return false;
    if (weather !== 'any' && src.weather && src.weather !== weather) return false;
    return true;
  }
  const srcNow = (src) => srcAvailable(src, state.prefs.season, state.prefs.weather);
  const itemAvailableNow = (item) => item.how.some(srcNow);
  function itemSeasons(item) {
    if (item.how.some(s => !s.seasons)) return null;
    const set = new Set();
    item.how.forEach(s => s.seasons.forEach(x => set.add(x)));
    return SEASONS.filter(s => set.has(s));
  }
  const nextSeason = (s) => SEASONS[(SEASONS.indexOf(s) + 1) % 4];
  function lastChance(item, season) {
    const seasons = itemSeasons(item);
    return !!seasons && seasons.includes(season) && !seasons.includes(nextSeason(season));
  }
  const isGated = (src) => (src.where || []).some(w => GATED_PLACES.some(gp => w.includes(gp)));

  /* ---------------- search ---------------- */
  function matchesQuery(id) {
    const q = state.prefs.q.trim().toLowerCase();
    if (!q) return true;
    const item = ITEMS[id];
    const hay = [item.name, MODS[item.mod].label,
      ...item.how.map(s => s.text + ' ' + (s.note || '') + ' ' + (s.where || []).join(' ') + ' ' + TYPE_LABELS[s.type]),
      ...(USES[id] || []).map(u => u.bundle.name + ' ' + u.room.name)].join(' ').toLowerCase();
    return hay.includes(q);
  }
  function bundleMatchesQuery(bundle) {
    const q = state.prefs.q.trim().toLowerCase();
    if (!q) return true;
    if ((bundle.name + ' ' + bundle.reward + ' ' + bundle.room.name).toLowerCase().includes(q)) return true;
    return bundle.items.some(s => ITEMS[s.id] && matchesQuery(s.id));
  }

  /* ---------------- html helpers ---------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const modTag = (item) => `<span class="mod ${item.mod}" title="${esc(MODS[item.mod].label)}">${MODS[item.mod].short}</span>`;
  const qualTag = (q) => q ? `<span class="qual ${Q[q]}">${Q[q]}</span>` : '';
  const verifyTag = (item) => item.how.some(s => s.unsure) ? '<span class="chip unsure" title="Could not be verified in the mod data files">verify</span>' : '';

  function seasonStrip(seasons) {
    if (!seasons) return '<span class="allyear">All year</span>';
    const title = seasons.map(s => SEASON_LABEL[s]).join(', ');
    return `<span class="sstrip" title="${title}" aria-label="${title}">` +
      SEASONS.map(s => `<b class="${s} ${seasons.includes(s) ? 'on' : ''}">${SEASON_LABEL[s].slice(0, 2)}</b>`).join('') + '</span>';
  }
  function srcMeta(src) {
    let h = seasonStrip(src.seasons);
    if (src.weather === 'rain') h += '<span class="wx rain">🌧 Rain</span>';
    if (src.weather === 'sun') h += '<span class="wx sun">☀️ Sunny</span>';
    if (src.time) h += `<span class="tm ${src.night ? 'night' : ''}">${src.night ? '🌙' : '🕒'} ${esc(src.time)}</span>`;
    if (src.where && src.where.length) h += `<span class="loc">📍 ${src.where.map(esc).join(' · ')}</span>`;
    return `<div class="src-meta">${h}</div>`;
  }
  function srcHtml(src) {
    const now = srcNow(src);
    return `<div class="src ${now ? 'now' : 'off'}"${now ? '' : ' title="Not possible with the current Season / Weather filter"'}>
      <div class="src-main"><span class="how"><i>${TYPE_ICONS[src.type]}</i>${esc(TYPE_LABELS[src.type])}</span><span class="fact">${esc(src.text)}</span>
        ${src.note ? '<button class="note-btn" data-note type="button" title="More details" aria-label="More details">i</button>' : ''}</div>
      ${srcMeta(src)}
      ${src.note ? `<p class="note">${esc(src.note)}</p>` : ''}
    </div>`;
  }
  function useChips(id, { exceptBundle } = {}) {
    return (USES[id] || []).filter(u => !exceptBundle || u.bundle !== exceptBundle).map(u => {
      const d = isDone(u.bundle, u.idx);
      return `<button class="use ${d ? 'done' : ''}" data-toggle="${esc(slotKey(u.bundle, u.idx))}" title="Toggle this slot" type="button">` +
        `<span class="room-tag">${esc(u.room.name)}</span> ${esc(u.bundle.name)}${u.qty > 1 ? ` <span class="qty">×${u.qty}</span>` : ''}${qualTag(u.q)}</button>`;
    }).join('');
  }

  /* ---------------- views ---------------- */
  function renderOverview() {
    const totalBundles = BUNDLES.length;
    const doneBundles = BUNDLES.filter(b => bundleStatus(b).complete).length;
    const totalSlots = BUNDLES.reduce((a, b) => a + b.items.length, 0);
    const doneSlots = Object.keys(state.done).filter(k => state.done[k]).length;
    const roomsDone = ROOMS.filter(r => roomStatus(r).complete).length;
    const season = state.prefs.season;

    const relevant = ITEM_IDS.filter(itemRelevant).filter(matchesQuery);
    const thisSeason = relevant.filter(id => ITEMS[id].how.some(s => s.seasons && s.seasons.includes(season)));
    const last = thisSeason.filter(id => lastChance(ITEMS[id], season));
    const rainy = relevant.filter(id => ITEMS[id].how.some(s => s.weather === 'rain' && (!s.seasons || s.seasons.includes(season))));
    const shared = ITEM_IDS.filter(id => (USES[id] || []).length > 1);

    let h = `<section class="stats">
      <div class="card stat"><div class="n">${doneBundles}<span class="l"> / ${totalBundles}</span></div><div class="l">bundles complete</div></div>
      <div class="card stat"><div class="n">${roomsDone}<span class="l"> / ${ROOMS.length}</span></div><div class="l">rooms complete</div></div>
      <div class="card stat"><div class="n">${doneSlots}<span class="l"> / ${totalSlots}</span></div><div class="l">items donated</div></div>
      <div class="card stat"><div class="n">${last.length}</div><div class="l">last chance this ${SEASON_LABEL[season].toLowerCase()}</div></div>
    </section>`;

    h += `<section class="section"><div class="section-head"><h2>Rooms</h2><span class="meta">click a room to open it</span></div><div class="grid">`;
    ROOMS.forEach(room => {
      const rs = roomStatus(room);
      h += `<div class="card room-card" data-goto-room="${room.id}">
        <header><h3>${room.icon} ${esc(room.name)}</h3><span class="pill ${rs.complete ? 'ok' : ''}">${rs.done}/${rs.total}</span></header>
        <div class="bar ${rs.complete ? 'complete' : ''}"><i style="width:${(rs.done / rs.total) * 100}%"></i></div>
        <div class="mini">${room.bundles.map(b => { const s = bundleStatus(b); return `<span class="pill ${s.complete ? 'ok' : ''}">${esc(b.name)} ${s.n}/${s.need}</span>`; }).join('')}</div>
      </div>`;
    });
    h += '</div></section>';

    h += `<section class="section"><div class="section-head"><h2>${SEASON_ICON[season]} Last chance this ${SEASON_LABEL[season].toLowerCase()}</h2><span class="meta">available now but not next season (uses the Season filter above)</span></div>`;
    h += last.length ? `<div class="todo-list">${last.map(id => itemCard(id, { filterSeason: season })).join('')}</div>` : '<div class="empty">Nothing expires at the end of this season. 🎉</div>';
    h += '</section>';

    h += `<section class="section"><div class="section-head"><h2>🌧 Save for a rainy day</h2><span class="meta">${rainy.length} item${rainy.length === 1 ? '' : 's'} need rain this season</span></div>`;
    h += rainy.length ? `<div class="todo-list">${rainy.map(id => itemCard(id, { onlyWeather: 'rain' })).join('')}</div>` : '<div class="empty">No rain-dependent items left this season.</div>';
    h += '</section>';

    h += `<section class="section"><div class="section-head"><h2>Items used by several bundles</h2><span class="meta">collect extras</span></div><div class="todo-list">`;
    h += shared.map(id => itemCard(id, { compact: true })).join('');
    h += '</div></section>';
    return h;
  }

  function itemCard(id, opts = {}) {
    const item = ITEMS[id];
    const st = itemDone(id);
    let how = item.how;
    if (opts.filterSeason) how = how.filter(s => !s.seasons || s.seasons.includes(opts.filterSeason));
    if (opts.onlyWeather) how = how.filter(s => s.weather === opts.onlyWeather);
    if (opts.filterFn) how = how.filter(opts.filterFn);
    if (!how.length) how = item.how;
    const now = itemAvailableNow(item);
    return `<div class="card item-card ${st.all ? 'alldone' : ''}" data-item="${esc(id)}">
      <div class="head"><span class="name">${esc(item.name)}</span>${modTag(item)}${verifyTag(item)}
        ${opts.filterSeason && lastChance(item, opts.filterSeason) ? '<span class="chip last">last chance</span>' : ''}
        ${state.prefs.onlyNow && !now ? '<span class="chip muted">not now</span>' : ''}
        <span class="mark qty">${st.done}/${st.total} slot${st.total === 1 ? '' : 's'}</span></div>
      ${opts.compact ? '' : `<div class="sources">${how.map(srcHtml).join('')}</div>`}
      <div class="uses">${useChips(id)}</div>
    </div>`;
  }

  function renderBundles() {
    let h = '';
    ROOMS.forEach(room => {
      const rs = roomStatus(room);
      const bundles = room.bundles.filter(b => (!state.prefs.hideDone || !bundleStatus(b).complete) && bundleMatchesQuery(b));
      if (!bundles.length) return;
      h += `<section class="room" id="room-${room.id}"><div class="room-head"><h2>${room.icon} ${esc(room.name)}</h2>
        <div class="bar ${rs.complete ? 'complete' : ''}"><i style="width:${(rs.done / rs.total) * 100}%"></i></div><span class="meta">${rs.done}/${rs.total} bundles</span></div><div class="grid">`;
      bundles.forEach(b => {
        const s = bundleStatus(b);
        h += `<article class="card bundle ${s.complete ? 'complete' : ''}">
          <header><div class="title"><h3>${esc(b.name)}</h3><span class="count">${s.complete ? '✓ ' : ''}${s.n}/${s.need}${b.need < b.items.length ? ` <span class="qty">of ${b.items.length}</span>` : ''}</span></div>
          <div class="reward">Reward: <b>${esc(b.reward)}</b>${b.need < b.items.length ? ` · any ${b.need} of ${b.items.length}` : ''}</div>
          <div class="bar ${s.complete ? 'complete' : ''}"><i style="width:${Math.min(100, (s.n / s.need) * 100)}%"></i></div></header>
          <ul class="slots">`;
        b.items.forEach((slot, idx) => {
          const item = ITEMS[slot.id];
          if (!item) return;
          const d = isDone(b, idx);
          if (state.prefs.hideDone && d) return;
          if (state.prefs.q && !matchesQuery(slot.id) && !(b.name + ' ' + b.reward).toLowerCase().includes(state.prefs.q.toLowerCase())) return;
          const now = itemAvailableNow(item);
          if (state.prefs.onlyNow && !now && !d) return;
          const others = useChips(slot.id, { exceptBundle: b });
          h += `<li class="slot ${d ? 'done' : ''} ${now ? '' : 'not-now'}">
            <label><input type="checkbox" data-slot="${esc(slotKey(b, idx))}" ${d ? 'checked' : ''}>
              <span class="name">${esc(item.name)}</span>${modTag(item)}${slot.qty > 1 ? `<span class="qty">×${slot.qty}</span>` : ''}${qualTag(slot.q)}${verifyTag(item)}</label>
            <div class="sources">${item.how.map(srcHtml).join('')}
              ${others ? `<div class="uses"><span class="qty">also in:</span>${others}</div>` : ''}</div>
          </li>`;
        });
        h += '</ul></article>';
      });
      h += '</div></section>';
    });
    return h || '<div class="empty">Nothing matches the current filters.</div>';
  }

  /* --- planner groupings --- */
  function plannerGroups() {
    const g = state.prefs.group;
    const season = state.prefs.season;
    const weather = state.prefs.weather;
    const ids = ITEM_IDS.filter(matchesQuery).filter(id => !state.prefs.hideDone || itemRelevant(id));
    const groups = [];
    const add = (key, meta, id, filterFn) => {
      let grp = groups.find(x => x.key === key);
      if (!grp) { grp = Object.assign({ key, items: [] }, meta); groups.push(grp); }
      if (!grp.items.find(x => x.id === id)) grp.items.push({ id, filterFn });
    };
    const sourcesOf = (id) => ITEMS[id].how.filter(s => !state.prefs.onlyNow || srcAvailable(s, season, weather));

    ids.forEach(id => {
      const srcs = sourcesOf(id);
      if (!srcs.length) return;
      if (g === 'conditions') {
        if (srcs.some(s => s.weather === 'rain')) add('rain', GROUPS.rain, id, s => s.weather === 'rain');
        if (srcs.some(s => s.weather === 'sun')) add('sun', GROUPS.sun, id, s => s.weather === 'sun');
        if (srcs.some(s => s.night)) add('night', GROUPS.night, id, s => s.night);
        if (srcs.some(s => s.time && !s.night)) add('window', GROUPS.window, id, s => s.time && !s.night);
        if (srcs.some(s => DAYS_RE.test(s.text))) add('days', GROUPS.days, id, s => DAYS_RE.test(s.text));
        if (srcs.some(isGated)) add('gated', GROUPS.gated, id, isGated);
        const seasonal = itemSeasons(ITEMS[id]);
        if (seasonal && seasonal.length === 1) add('single-' + seasonal[0], GROUPS['single-' + seasonal[0]], id, null);
        if (srcs.some(s => s.unsure)) add('unsure', GROUPS.unsure, id, s => s.unsure);
      } else if (g === 'season') {
        SEASONS.forEach(s => {
          if (srcs.some(x => x.seasons && x.seasons.includes(s))) add(s, { icon: SEASON_ICON[s], title: SEASON_LABEL[s], hint: 'Items marked "last chance" are gone next season.' }, id, x => x.seasons && x.seasons.includes(s));
        });
        if (srcs.some(x => !x.seasons)) add('any', { icon: '🔁', title: 'Any season', hint: 'No seasonal restriction.' }, id, x => !x.seasons);
      } else if (g === 'location') {
        srcs.forEach(s => (s.where || ['Anywhere']).forEach(w => add(w, { icon: '📍', title: w, hint: '' }, id, x => (x.where || ['Anywhere']).includes(w))));
      } else if (g === 'activity') {
        srcs.forEach(s => add(s.type, { icon: TYPE_ICONS[s.type], title: TYPE_LABELS[s.type], hint: '' }, id, x => x.type === s.type));
      }
    });

    const order = ['rain', 'sun', 'night', 'window', 'days', 'gated', 'single-spring', 'single-summer', 'single-fall', 'single-winter', 'unsure'];
    if (g === 'conditions') {
      groups.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
      groups.forEach(grp => {
        if (weather === 'rain' && grp.key === 'rain') grp.now = true;
        if (weather === 'sun' && grp.key === 'sun') grp.now = true;
        if (weather === 'rain' && grp.key === 'sun') grp.notToday = true;
        if (weather === 'sun' && grp.key === 'rain') grp.notToday = true;
        if (grp.key.startsWith('single-') && grp.key !== 'single-' + season) grp.notToday = grp.key !== 'single-' + season;
      });
      groups.sort((a, b) => (b.now ? 1 : 0) - (a.now ? 1 : 0) || (a.notToday ? 1 : 0) - (b.notToday ? 1 : 0) || order.indexOf(a.key) - order.indexOf(b.key));
    } else if (g === 'season') {
      groups.sort((a, b) => [...SEASONS, 'any'].indexOf(a.key) - [...SEASONS, 'any'].indexOf(b.key));
      groups.forEach(grp => { if (grp.key === season) grp.now = true; });
    } else {
      groups.sort((a, b) => b.items.length - a.items.length || a.title.localeCompare(b.title));
    }
    groups.forEach(grp => grp.items.sort((a, b) => {
      const la = lastChance(ITEMS[a.id], season) ? 0 : 1, lb = lastChance(ITEMS[b.id], season) ? 0 : 1;
      return la - lb || ITEMS[a.id].name.localeCompare(ITEMS[b.id].name);
    }));
    return groups;
  }

  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-');

  function renderPlanner() {
    const g = state.prefs.group;
    let h = `<div class="planner-bar"><span class="qty">Group by</span><div class="seg">
      ${[['conditions', 'Conditions'], ['season', 'Season'], ['location', 'Location'], ['activity', 'Activity']].map(([k, l]) => `<button type="button" data-group="${k}" class="${g === k ? 'active' : ''}">${l}</button>`).join('')}
    </div><span class="spacer"></span>
    <button type="button" class="btn small" data-expand="1">Expand all</button><button type="button" class="btn small" data-expand="0">Collapse all</button></div>`;
    const groups = plannerGroups();
    if (!groups.length) return h + '<div class="empty">Nothing matches the current filters.</div>';
    const openGroups = state.prefs.openGroups || {};

    h += `<nav class="jumpbar" aria-label="Groups">${groups.map(grp =>
      `<button type="button" class="jump ${grp.now ? 'now' : ''} ${grp.notToday ? 'dim' : ''}" data-jump="grp-${slug(grp.key)}">${grp.icon} ${esc(grp.title)} <b>${grp.items.length}</b></button>`).join('')}</nav>`;

    groups.forEach(grp => {
      const gk = g + ':' + grp.key;
      const open = gk in openGroups ? openGroups[gk] : !!grp.now;
      h += `<details class="group k-${slug(grp.key)}" id="grp-${slug(grp.key)}" data-gkey="${esc(gk)}" ${open ? 'open' : ''}>
        <summary><span class="g-icon">${grp.icon}</span><span class="g-title">${esc(grp.title)}</span>
          <span class="g-count">${grp.items.length} item${grp.items.length === 1 ? '' : 's'}</span>
          ${grp.now ? '<span class="chip now">now</span>' : ''}${grp.notToday ? '<span class="chip muted">not today</span>' : ''}
          ${grp.hint ? `<span class="g-hint">${esc(grp.hint)}</span>` : ''}<span class="g-caret" aria-hidden="true">▾</span></summary>
        <div class="grid">`;
      grp.items.forEach(({ id, filterFn }) => {
        const opts = { filterFn: filterFn || undefined };
        if (g === 'season' && SEASONS.includes(grp.key)) opts.filterSeason = grp.key;
        h += itemCard(id, opts);
      });
      h += '</div></details>';
    });
    return h;
  }

  function renderItems() {
    const ids = ITEM_IDS.filter(matchesQuery).filter(id => !state.prefs.hideDone || itemRelevant(id))
      .filter(id => !state.prefs.onlyNow || itemAvailableNow(ITEMS[id]))
      .sort((a, b) => ITEMS[a].name.localeCompare(ITEMS[b].name, undefined, { numeric: true }));
    let h = `<div class="section-head"><h2>All items</h2><span class="meta">${ids.length} of ${ITEM_IDS.length}</span></div><div class="table-wrap"><table class="table"><thead><tr>
      <th>Item</th><th>How</th><th>When</th><th>Where</th><th>Needed by</th></tr></thead><tbody>`;
    ids.forEach(id => {
      const item = ITEMS[id];
      const st = itemDone(id);
      const how = item.how.map(s => `<div class="cell-line"><span class="how"><i>${TYPE_ICONS[s.type]}</i>${esc(TYPE_LABELS[s.type])}</span> <span class="fact">${esc(s.text)}</span></div>`).join('');
      const when = item.how.map(s => `<div class="cell-line src-meta">${seasonStrip(s.seasons)}${s.weather === 'rain' ? '<span class="wx rain">🌧</span>' : ''}${s.weather === 'sun' ? '<span class="wx sun">☀️</span>' : ''}${s.time ? `<span class="tm ${s.night ? 'night' : ''}">${esc(s.time)}</span>` : ''}</div>`).join('');
      const where = item.how.map(s => `<div class="cell-line loc">${(s.where || []).map(esc).join(' · ')}</div>`).join('');
      h += `<tr class="${st.all ? 'alldone' : ''}"><td><b>${esc(item.name)}</b> ${modTag(item)}${verifyTag(item)}</td>
        <td>${how}</td><td>${when}</td><td>${where}</td><td><div class="uses">${useChips(id)}</div></td></tr>`;
    });
    h += '</tbody></table></div>';
    return h;
  }

  /* ---------------- guide (Markdown, rendered with marked) ---------------- */
  let guideCache = null; // { html, toc: [{id, text, depth}], days: [{season, day, id}] }
  function ghSlug(text, used) {
    let s = text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s/g, '-');
    const base = s; let i = 1;
    while (used.has(s)) s = base + '-' + i++;
    used.add(s);
    return s;
  }
  function buildGuide() {
    if (guideCache) return guideCache;
    if (typeof GUIDE_MD === 'undefined' || typeof marked === 'undefined') return null;
    const used = new Set(), toc = [], days = [];
    marked.use({
      gfm: true,
      renderer: {
        heading(token) {
          const html = this.parser.parseInline(token.tokens);
          const plain = token.text.replace(/[*_`]/g, '');
          const id = ghSlug(plain, used);
          toc.push({ id, text: plain, depth: token.depth });
          const m = /^(Spring|Summer|Fall|Winter) (\d+)/.exec(plain);
          if (m && token.depth === 3) days.push({ season: m[1].toLowerCase(), day: +m[2], id });
          return `<h${token.depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${html}</h${token.depth}>`;
        },
        link(token) {
          const html = this.parser.parseInline(token.tokens);
          const ext = /^https?:/i.test(token.href);
          return `<a href="${esc(token.href)}"${token.title ? ` title="${esc(token.title)}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${html}</a>`;
        },
      },
    });
    guideCache = { html: marked.parse(GUIDE_MD), toc, days };
    return guideCache;
  }
  function renderGuide() {
    const g = buildGuide();
    if (!g) return '<div class="empty">The guide could not be loaded (js/guide-data.js or marked is missing).</div>';
    const day = state.prefs.guideDay || 1;
    const toc = g.toc.filter(t => t.depth === 2 || t.depth === 3)
      .map(t => `<li class="d${t.depth}"><a href="#${t.id}">${esc(t.text)}</a></li>`).join('');
    const meta = typeof GUIDE_META !== 'undefined' ? GUIDE_META : {};
    return `<div class="guide-wrap">
      <aside class="guide-side">
        <div class="guide-jump card">
          <span class="qty">Go to</span>
          <select data-guide-season aria-label="Season">${SEASONS.map(s => `<option value="${s}" ${s === state.prefs.season ? 'selected' : ''}>${SEASON_LABEL[s]}</option>`).join('')}</select>
          <input type="number" min="1" max="28" value="${day}" data-guide-day aria-label="Day">
          <button type="button" class="btn small" data-guide-go>Go</button>
          <span class="qty" data-match-count></span>
        </div>
        <nav class="guide-toc card" aria-label="Guide contents"><ul>${toc}</ul></nav>
      </aside>
      <article class="md card">
        <div class="guide-head">
          <b>${esc(meta.title || 'Min-Max Guide')}</b> by ${esc(meta.authors || '')} ·
          <a href="${esc(meta.source || '#')}" target="_blank" rel="noopener">source on GitHub</a> ·
          <a href="${esc(meta.licenseUrl || '#')}" target="_blank" rel="noopener">${esc(meta.license || '')}</a> · snapshot ${esc(meta.snapshot || '')}.
          Written for vanilla 1.6: with SVE, Ridgeside and Cornucopia installed some prices, spawns and bundles differ.
        </div>
        ${g.html}
      </article>
    </div>`;
  }
  function guideJump() {
    const g = buildGuide(); if (!g) return;
    const season = state.prefs.season;
    const day = Math.min(28, Math.max(1, +state.prefs.guideDay || 1));
    const before = g.days.filter(d => d.season === season && d.day <= day).sort((a, b) => b.day - a.day);
    const target = before[0] || g.days.find(d => d.season === season);
    if (!target) { toast('The route has no entry for that season.'); return; }
    const el = document.getElementById(target.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    }
    if (target.day !== day) toast(`No entry for ${SEASON_LABEL[season]} ${day}, showing ${SEASON_LABEL[season]} ${target.day}.`);
  }
  function highlightGuide() {
    const q = state.prefs.q.trim();
    const art = app.querySelector('article.md');
    if (!art || !q) return 0;
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const test = new RegExp(re.source, 'i');
    const walker = document.createTreeWalker(art, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (test.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
    let n = 0;
    nodes.forEach(node => {
      const s = node.nodeValue, frag = document.createDocumentFragment();
      let last = 0;
      s.replace(re, (m, idx) => {
        frag.appendChild(document.createTextNode(s.slice(last, idx)));
        const mk = document.createElement('mark'); mk.textContent = m; frag.appendChild(mk);
        last = idx + m.length; n++;
        return m;
      });
      frag.appendChild(document.createTextNode(s.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
    return n;
  }
  function afterGuideRender() {
    const n = highlightGuide();
    const c = app.querySelector('[data-match-count]');
    if (c) c.textContent = state.prefs.q.trim() ? (n ? `${n} match${n === 1 ? '' : 'es'}` : 'no matches') : '';
    const first = app.querySelector('article.md mark');
    if (first) first.scrollIntoView({ block: 'center' });
  }

  /* ---------------- render + events ---------------- */
  const app = document.getElementById('app');
  function render() {
    const v = state.prefs.view;
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === v));
    document.body.classList.toggle('guide-mode', v === 'guide');
    app.innerHTML = v === 'overview' ? renderOverview() : v === 'bundles' ? renderBundles() : v === 'planner' ? renderPlanner() : v === 'guide' ? renderGuide() : renderItems();
    if (v === 'guide') afterGuideRender();
  }
  function syncControls() {
    document.getElementById('season').value = state.prefs.season;
    document.getElementById('weather').value = state.prefs.weather;
    document.getElementById('onlyNow').checked = state.prefs.onlyNow;
    document.getElementById('hideDone').checked = state.prefs.hideDone;
    document.getElementById('search').value = state.prefs.q;
  }
  function setPref(k, v) {
    state.prefs[k] = v; save(); render();
    if (k === 'view' || k === 'group') window.scrollTo({ top: 0 });
  }
  function toggleSlot(key) {
    if (state.done[key]) delete state.done[key]; else state.done[key] = true;
    save();
    const [bid] = key.split('|');
    const b = BUNDLES.find(x => x.id === bid);
    if (b && bundleStatus(b).complete && state.done[key]) toast(`${b.name} bundle complete! Reward: ${b.reward}`);
    render();
  }

  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => setPref('view', t.dataset.view)));
  document.getElementById('season').addEventListener('change', e => setPref('season', e.target.value));
  document.getElementById('weather').addEventListener('change', e => setPref('weather', e.target.value));
  document.getElementById('onlyNow').addEventListener('change', e => setPref('onlyNow', e.target.checked));
  document.getElementById('hideDone').addEventListener('change', e => setPref('hideDone', e.target.checked));
  let searchTimer;
  document.getElementById('search').addEventListener('input', e => { clearTimeout(searchTimer); searchTimer = setTimeout(() => setPref('q', e.target.value), 120); });

  app.addEventListener('change', e => {
    const slot = e.target.closest('[data-slot]');
    if (slot) { toggleSlot(slot.dataset.slot); return; }
    const gd = e.target.closest('[data-guide-day]');
    if (gd) { state.prefs.guideDay = Math.min(28, Math.max(1, +gd.value || 1)); save(); return; }
    const gs = e.target.closest('[data-guide-season]');
    if (gs) { state.prefs.season = gs.value; save(); document.getElementById('season').value = gs.value; }
  });
  app.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.closest('[data-guide-day]')) {
      state.prefs.guideDay = Math.min(28, Math.max(1, +e.target.value || 1)); save(); guideJump();
    }
  });
  // Remember which planner groups the user opened or closed (capture: toggle doesn't bubble).
  app.addEventListener('toggle', e => {
    const d = e.target;
    if (d && d.matches && d.matches('details[data-gkey]')) {
      state.prefs.openGroups = state.prefs.openGroups || {};
      state.prefs.openGroups[d.dataset.gkey] = d.open;
      save();
    }
  }, true);
  app.addEventListener('click', e => {
    const note = e.target.closest('[data-note]');
    if (note) {
      const src = note.closest('.src');
      const open = src.classList.toggle('show-note');
      note.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    const use = e.target.closest('[data-toggle]');
    if (use) { toggleSlot(use.dataset.toggle); return; }
    const grp = e.target.closest('[data-group]');
    if (grp) { setPref('group', grp.dataset.group); return; }
    const jump = e.target.closest('[data-jump]');
    if (jump) {
      const el = document.getElementById(jump.dataset.jump);
      if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      return;
    }
    if (e.target.closest('[data-guide-go]')) { guideJump(); return; }
    // The guide has a few links to headings whose slug differs; fall back to the closest heading id.
    const anchor = e.target.closest('article.md a[href^="#"], .guide-toc a[href^="#"]');
    if (anchor) {
      const id = decodeURIComponent(anchor.getAttribute('href').slice(1));
      let el = document.getElementById(id);
      if (!el) el = app.querySelector(`article.md [id^="${CSS.escape(id)}"]`) || app.querySelector(`article.md [id*="${CSS.escape(id.split('-')[0])}"]`);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
    }
    const expand = e.target.closest('[data-expand]');
    if (expand) {
      const open = expand.dataset.expand === '1';
      app.querySelectorAll('details[data-gkey]').forEach(d => { d.open = open; });
      return;
    }
    const room = e.target.closest('[data-goto-room]');
    if (room) {
      state.prefs.view = 'bundles'; save(); render();
      const el = document.getElementById('room-' + room.dataset.gotoRoom);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), done: state.done }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'bundle-progress.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
  document.getElementById('importFile').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (!data || typeof data.done !== 'object') throw new Error('bad file');
        state.done = data.done; save(); render(); toast('Progress imported.');
      } catch (err) { toast('That file is not a progress export.'); }
      e.target.value = '';
    };
    r.readAsText(f);
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Clear all donated items? Filters are kept.')) { state.done = {}; save(); render(); }
  });

  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  syncControls();
  render();
})();
