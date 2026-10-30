(() => {
  'use strict';

  const scenarios = Array.isArray(window.PHISHSWIPE_SCENARIOS) ? window.PHISHSWIPE_SCENARIOS : [];
  const STORAGE_KEY = 'phishswipe.local.v1';
  const ROUND_LENGTH = 10;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const state = {
    route: 'home', queue: [], index: 0, score: 0, streak: 0, bestStreak: 0,
    answers: [], active: false, awaitingFeedback: false, drag: null, lastFocus: null,
    profile: 'Learner', history: []
  };

  const nodes = {
    pages: $$('.page'), navLinks: $$('.nav-link'), profileButton: $('#profile-button'),
    profileName: $('#profile-name'), avatarInitials: $('#avatar-initials'),
    homeStart: $('#home-start-button'), scenarioFilter: $('#scenario-filter'),
    restart: $('#restart-button'), card: $('#message-card'), cardStack: $('#card-stack'),
    phish: $('#phish-button'), safe: $('#safe-button'), next: $('#next-button'),
    feedbackModal: $('#feedback-modal'), resultsModal: $('#results-modal'),
    feedbackStatus: $('#feedback-status'), feedbackKicker: $('#feedback-kicker'),
    feedbackTitle: $('#feedback-title'), feedbackDescription: $('#feedback-description'),
    feedbackClues: $('#feedback-clues'), feedbackAction: $('#feedback-action'),
    feedbackPoints: $('#feedback-points'), modalClose: $('#modal-close'),
    resultScore: $('#result-score'), resultAccuracy: $('#result-accuracy'), resultStreak: $('#result-streak'),
    resultEmail: $('#result-email'), resultSms: $('#result-sms'), resultCorrect: $('#result-correct'),
    resultRank: $('#result-rank'), resultsTitle: $('#results-title'), resultsMessage: $('#results-message'),
    playAgain: $('#play-again-button'), viewScores: $('#view-scores-button'), resultsClose: $('#results-close'),
    leaderboardBody: $('#leaderboard-body'), toast: $('#toast')
  };

  function safeLoad() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      state.profile = typeof data.profile === 'string' && data.profile.trim() ? data.profile.trim().slice(0, 20) : 'Learner';
      state.history = Array.isArray(data.history) ? data.history.filter(item => item && Number.isFinite(item.score) && Number.isFinite(item.accuracy)).slice(0, 10) : [];
    } catch (_) {
      state.profile = 'Learner'; state.history = [];
    }
  }

  function safeSave() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile: state.profile, history: state.history })); }
    catch (_) { showToast('Browser storage is unavailable. Progress may not be saved.'); }
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function highlightText(text, clues) {
    const source = String(text || '');
    const ranges = [];
    (clues || []).forEach(clue => {
      if (!clue.text) return;
      let from = 0;
      const at = source.indexOf(clue.text, from);
      if (at >= 0) ranges.push({ start: at, end: at + clue.text.length });
    });
    ranges.sort((a, b) => a.start - b.start || b.end - a.end);
    let cursor = 0;
    let html = '';
    ranges.forEach(range => {
      if (range.start < cursor) return;
      html += escapeHtml(source.slice(cursor, range.start));
      html += `<mark>${escapeHtml(source.slice(range.start, range.end))}</mark>`;
      cursor = range.end;
    });
    html += escapeHtml(source.slice(cursor));
    return html;
  }

  function rankFor(score) {
    if (score >= 1250) return { name: 'Cyber Guardian', description: 'Excellent awareness. You consistently spotted the signals that matter.', next: 1500 };
    if (score >= 950) return { name: 'Threat Hunter', description: 'Strong instincts. Keep checking context, sender identity and links.', next: 1250 };
    if (score >= 600) return { name: 'Cyber Defender', description: 'You are building reliable habits. Keep practising the tricky examples.', next: 950 };
    if (score >= 250) return { name: 'Security Scout', description: 'You are learning to recognise common warning signs. Stay curious.', next: 600 };
    return { name: 'New recruit', description: 'Every expert starts somewhere. Practise and your confidence will grow.', next: 250 };
  }

  function showToast(message) {
    nodes.toast.textContent = message;
    nodes.toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => nodes.toast.classList.remove('show'), 2400);
  }

  function updateProfile() {
    nodes.profileName.textContent = state.profile;
    nodes.avatarInitials.textContent = state.profile.charAt(0).toUpperCase();
  }

  function setRouteHash(route) {
    if (location.hash !== `#${route}`) history.pushState({ route }, '', `#${route}`);
  }

  function navigate(route) {
    if (!['home', 'play', 'tips', 'leaderboard', 'about'].includes(route)) route = 'home';
    state.route = route;
    nodes.pages.forEach(page => page.classList.toggle('active', page.dataset.page === route));
    nodes.navLinks.forEach(link => {
      const active = link.dataset.route === route;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    if (route === 'play' && !state.active) startGame(nodes.scenarioFilter.value, false);
    if (route === 'leaderboard') renderLeaderboard();
    if (route === 'home') renderHomeStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startGame(filter = 'all', goToPlay = true) {
    const available = scenarios.filter(item => filter === 'all' || item.channel === filter);
    if (!available.length) { showToast('No scenarios found for this filter.'); return; }
    state.queue = shuffle(available).slice(0, Math.min(ROUND_LENGTH, available.length));
    state.index = 0; state.score = 0; state.streak = 0; state.bestStreak = 0;
    state.answers = []; state.active = true; state.awaitingFeedback = false;
    $('#max-score').textContent = String(state.queue.reduce((total, _, index) => total + 100 + Math.min(index * 10, 50), 0));
    if (goToPlay) navigate('play'); else {
      state.route = 'play';
      nodes.pages.forEach(page => page.classList.toggle('active', page.dataset.page === 'play'));
      nodes.navLinks.forEach(link => { const active = link.dataset.route === 'play'; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
    }
    renderGame();
    nodes.feedbackModal.hidden = true;
    nodes.resultsModal.hidden = true;
  }

  function renderGame() {
    if (!state.active || !state.queue[state.index]) return;
    const scenario = state.queue[state.index];
    const current = state.index + 1;
    $('#live-score').textContent = String(state.score);
    $('#live-streak').innerHTML = `${state.streak} <em>🔥</em>`;
    $('#round-count').textContent = `${state.index} / ${state.queue.length}`;
    $('#round-progress-fill').style.width = `${(state.index / state.queue.length) * 100}%`;
    $('#stage-channel').textContent = scenario.channel === 'email' ? 'INCOMING EMAIL' : 'INCOMING TEXT MESSAGE';
    $('#stage-counter').innerHTML = `${String(current).padStart(2, '0')} <i>/</i> ${String(state.queue.length).padStart(2, '0')}`;
    $('#dot-pagination').innerHTML = state.queue.map((_, index) => `<span class="${index < state.index ? 'done' : index === state.index ? 'current' : ''}" aria-hidden="true"></span>`).join('');
    nodes.card.className = 'message-card';
    nodes.card.style.transform = '';
    nodes.card.style.opacity = '1';
    nodes.card.innerHTML = scenario.channel === 'email' ? emailMarkup(scenario) : smsMarkup(scenario);
    nodes.card.setAttribute('aria-label', `${scenario.channel} from ${scenario.senderName}. ${scenario.subject}. Use left arrow for phishing or right arrow for safe.`);
    nodes.card.tabIndex = 0;
    nodes.card.setAttribute('role', 'group');
    nodes.phish.disabled = false; nodes.safe.disabled = false;
  }

  function emailMarkup(item) {
    const initials = escapeHtml(item.senderName.split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase());
    return `<div class="email-toolbar"><div class="email-toolbar-left"><span class="mail-app-icon">✉</span><small>Message preview</small></div><span class="mail-dots">•••</span></div>
      <div class="email-meta"><div class="sender-row"><div class="sender-avatar">${initials}</div><div class="sender-details"><div class="sender-name">${escapeHtml(item.senderName)}</div><div class="sender-address">From: ${escapeHtml(item.sender)}</div></div><div class="sender-time">${escapeHtml(item.date)}</div></div><div class="email-recipient">To: ${escapeHtml(item.recipient)}</div></div>
      <div class="email-subject">Subject: ${escapeHtml(item.subject)}</div><div class="message-body">${highlightText(item.body, item.clues)}</div><div class="message-footer"><span>✉ &nbsp; ${escapeHtml(item.channel.toUpperCase())}</span><span>Fictional training scenario</span></div>`;
  }

  function smsMarkup(item) {
    const contactInitial = escapeHtml(item.senderName.split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase());
    return `<div class="sms-card"><div class="sms-header"><div class="sms-contact-avatar">${contactInitial}</div><div class="sms-contact"><strong>${escapeHtml(item.senderName)}</strong><small>${escapeHtml(item.sender)}</small></div><span class="sms-date">${escapeHtml(item.date)}</span></div><div class="sms-bubble">${highlightText(item.body, item.clues)}</div><div class="sms-time">${escapeHtml(item.date)}</div><div class="sms-safety-note">Training preview only · Links are fictional placeholders and cannot be opened from this card.</div></div>`;
  }

  function submitAnswer(choice) {
    if (!state.active || state.awaitingFeedback) return;
    const scenario = state.queue[state.index];
    if (!scenario) return;
    const correct = choice === scenario.verdict;
    if (correct) {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      const points = 100 + Math.min((state.streak - 1) * 10, 50);
      state.score += points;
      openFeedback(scenario, true, points);
    } else {
      state.streak = 0;
      openFeedback(scenario, false, 0);
    }
    state.answers.push({ id: scenario.id, channel: scenario.channel, verdict: scenario.verdict, choice, correct });
    state.awaitingFeedback = true;
    nodes.phish.disabled = true; nodes.safe.disabled = true;
    $('#live-score').textContent = String(state.score);
    $('#live-streak').innerHTML = `${state.streak} <em>🔥</em>`;
    $('#round-count').textContent = `${state.index + 1} / ${state.queue.length}`;
    $('#round-progress-fill').style.width = `${((state.index + 1) / state.queue.length) * 100}%`;
    $('#dot-pagination').innerHTML = state.queue.map((_, index) => `<span class="${index <= state.index ? 'done' : ''}" aria-hidden="true"></span>`).join('');
  }

  function openFeedback(scenario, correct, points) {
    state.lastFocus = document.activeElement;
    nodes.feedbackStatus.className = `feedback-status${correct ? '' : ' incorrect'}`;
    nodes.feedbackStatus.textContent = correct ? '✓' : '✕';
    nodes.feedbackKicker.textContent = correct ? 'GOOD CATCH' : 'LEARNING MOMENT';
    nodes.feedbackTitle.textContent = correct ? (scenario.verdict === 'phishing' ? 'You spotted the phish.' : 'You spotted a safe message.') : (scenario.verdict === 'phishing' ? 'That one was phishing.' : 'That message was safe.');
    nodes.feedbackDescription.textContent = scenario.explanation;
    nodes.feedbackClues.innerHTML = (scenario.clues || []).map(clue => `<div class="feedback-clue"><strong>${escapeHtml(clue.text)}</strong><p>${escapeHtml(clue.reason)}</p></div>`).join('');
    nodes.feedbackAction.textContent = scenario.action;
    nodes.feedbackPoints.textContent = correct ? `+${points} points` : 'No points this time';
    nodes.next.textContent = state.index === state.queue.length - 1 ? 'See your results' : 'Next message';
    nodes.feedbackModal.hidden = false;
    nodes.next.focus();
  }

  function continueRound() {
    if (!state.awaitingFeedback) return;
    nodes.feedbackModal.hidden = true;
    state.awaitingFeedback = false;
    state.index += 1;
    if (state.index >= state.queue.length) finishRound();
    else { renderGame(); nodes.card.focus({ preventScroll: true }); }
  }

  function accuracyFor(channel) {
    const entries = channel ? state.answers.filter(answer => answer.channel === channel) : state.answers;
    if (!entries.length) return null;
    return Math.round(entries.filter(answer => answer.correct).length / entries.length * 100);
  }

  function finishRound() {
    state.active = false;
    state.lastFocus = nodes.restart;
    const correct = state.answers.filter(answer => answer.correct).length;
    const accuracy = Math.round(correct / state.answers.length * 100);
    const rank = rankFor(state.score);
    const record = { name: state.profile, score: state.score, accuracy, date: new Date().toISOString(), bestStreak: state.bestStreak, count: state.answers.length };
    state.history.push(record);
    state.history.sort((a, b) => b.score - a.score || b.accuracy - a.accuracy);
    state.history = state.history.slice(0, 10);
    safeSave();
    nodes.resultsTitle.textContent = accuracy >= 80 ? 'Excellent awareness.' : accuracy >= 60 ? 'You are getting sharper.' : 'Keep practising. You are learning.';
    nodes.resultsMessage.textContent = `${correct} of ${state.answers.length} decisions were correct. Read the explanations and try another round to improve.`;
    nodes.resultScore.textContent = String(state.score);
    nodes.resultAccuracy.textContent = `${accuracy}%`;
    nodes.resultStreak.textContent = String(state.bestStreak);
    nodes.resultEmail.textContent = accuracyFor('email') === null ? '—' : `${accuracyFor('email')}%`;
    nodes.resultSms.textContent = accuracyFor('sms') === null ? '—' : `${accuracyFor('sms')}%`;
    nodes.resultCorrect.textContent = `${correct} / ${state.answers.length}`;
    nodes.resultRank.textContent = rank.name;
    nodes.resultsModal.hidden = false;
    $('#round-count').textContent = `${state.queue.length} / ${state.queue.length}`;
    $('#round-progress-fill').style.width = '100%';
    $('#live-score').textContent = String(state.score);
    renderHomeStats(); renderLeaderboard();
    nodes.playAgain.focus();
  }

  function renderHomeStats() {
    const best = state.history[0];
    const bestAccuracy = state.history.reduce((value, item) => Math.max(value, item.accuracy || 0), 0);
    const totalRuns = state.history.length;
    const bestStreak = state.history.reduce((value, item) => Math.max(value, item.bestStreak || 0), 0);
    const totalPoints = state.history.reduce((value, item) => value + item.score, 0);
    const maxBest = state.history.reduce((value, item) => Math.max(value, item.score), 0);
    $('#home-score').textContent = String(maxBest);
    $('#home-accuracy').textContent = best ? `${bestAccuracy}%` : '—';
    $('#home-streak').textContent = String(bestStreak);
    $('#home-runs').textContent = totalRuns ? `${totalRuns} round${totalRuns === 1 ? '' : 's'} completed` : 'Ready for your first round?';
    $('#home-runs-caption').textContent = totalRuns ? `${totalPoints.toLocaleString()} total points earned on this device.` : 'Your training history stays on this device.';
    const degrees = Math.round(Math.min(maxBest / 1500, 1) * 360);
    $('#progress-ring').style.background = `conic-gradient(#25b8c5 0deg,#2871d3 ${degrees}deg,#eaf0f7 ${degrees}deg)`;
    $('#level-pill').innerHTML = `${maxBest >= 950 ? 'Level 3' : maxBest >= 250 ? 'Level 2' : 'Level 1'} <span>›</span>`;
  }

  function renderLeaderboard() {
    if (!state.history.length) {
      nodes.leaderboardBody.innerHTML = '<tr><td colspan="4" class="empty-state">No rounds completed yet. Play a round to add your first score.</td></tr>';
    } else {
      nodes.leaderboardBody.innerHTML = state.history.map((item, index) => `<tr><td>#${index + 1}</td><td>${escapeHtml(item.name || 'Learner')}</td><td>${item.accuracy}%</td><td>${Number(item.score).toLocaleString()}</td></tr>`).join('');
    }
    const best = state.history[0];
    const rank = rankFor(best ? best.score : 0);
    $('#current-rank').textContent = best ? rank.name : 'New recruit';
    $('#rank-description').textContent = best ? rank.description : 'Complete a training round to earn your first cyber awareness rank.';
    $('#rank-progress-fill').style.width = `${Math.min((best ? best.score : 0) / rank.next, 1) * 100}%`;
    $('#rank-progress-label').textContent = best ? `${best.score.toLocaleString()} points · next milestone ${rank.next.toLocaleString()}` : '0 points earned';
  }

  function closeModal(modal) {
    modal.hidden = true;
    if (state.lastFocus && typeof state.lastFocus.focus === 'function') state.lastFocus.focus();
  }

  // Navigation links
  nodes.navLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const route = link.dataset.route;
    if (route === 'play' && !state.active) startGame(nodes.scenarioFilter.value, true);
    else navigate(route);
    setRouteHash(route);
  }));
  $$('a[data-route]:not(.nav-link)').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const route = link.dataset.route;
    if (route === 'play' && !state.active) startGame(nodes.scenarioFilter.value, true);
    else navigate(route);
    setRouteHash(route);
  }));

  nodes.homeStart.addEventListener('click', () => { startGame('all', true); setRouteHash('play'); });
  nodes.scenarioFilter.addEventListener('change', () => startGame(nodes.scenarioFilter.value, false));
  nodes.restart.addEventListener('click', () => { startGame(nodes.scenarioFilter.value, false); showToast('New round started.'); });
  nodes.phish.addEventListener('click', () => submitAnswer('phishing'));
  nodes.safe.addEventListener('click', () => submitAnswer('safe'));
  nodes.next.addEventListener('click', continueRound);
  nodes.modalClose.addEventListener('click', continueRound);
  nodes.resultsClose.addEventListener('click', () => closeModal(nodes.resultsModal));
  nodes.playAgain.addEventListener('click', () => { nodes.resultsModal.hidden = true; startGame(nodes.scenarioFilter.value, true); });
  nodes.viewScores.addEventListener('click', () => { nodes.resultsModal.hidden = true; navigate('leaderboard'); setRouteHash('leaderboard'); });
  nodes.profileButton.addEventListener('click', () => {
    const next = window.prompt('What name should appear in your training profile?', state.profile);
    if (next === null) return;
    const name = next.trim().replace(/\s+/g, ' ').slice(0, 20);
    if (!name) { showToast('Please enter a name with at least one character.'); return; }
    state.profile = name; updateProfile(); safeSave(); showToast('Profile name updated.');
  });

  // Drag-to-swipe support. Vertical movement is left to normal page scrolling.
  nodes.cardStack.addEventListener('pointerdown', event => {
    if (!state.active || state.awaitingFeedback || event.button !== 0) return;
    if (event.target.closest('button, a, input, select')) return;
    state.drag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, dx: 0, horizontal: false };
    nodes.card.classList.add('dragging');
    try { nodes.card.setPointerCapture(event.pointerId); } catch (_) { /* pointer capture not available */ }
  });
  nodes.cardStack.addEventListener('pointermove', event => {
    if (!state.drag || event.pointerId !== state.drag.pointerId) return;
    const dx = event.clientX - state.drag.startX;
    const dy = event.clientY - state.drag.startY;
    if (!state.drag.horizontal && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 9) { state.drag = null; nodes.card.classList.remove('dragging'); return; }
    if (Math.abs(dx) > 8) state.drag.horizontal = true;
    if (!state.drag.horizontal) return;
    state.drag.dx = dx;
    const rotate = Math.max(-15, Math.min(15, dx / 17));
    nodes.card.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
    nodes.card.style.opacity = String(Math.max(.68, 1 - Math.abs(dx) / 520));
  });
  function finishDrag(event) {
    if (!state.drag || event.pointerId !== state.drag.pointerId) return;
    const dx = state.drag.dx;
    const horizontal = state.drag.horizontal;
    state.drag = null;
    nodes.card.classList.remove('dragging');
    if (horizontal && Math.abs(dx) > 95) {
      nodes.card.classList.add(dx < 0 ? 'swipe-left' : 'swipe-right');
      window.setTimeout(() => submitAnswer(dx < 0 ? 'phishing' : 'safe'), 100);
    } else { nodes.card.style.transform = ''; nodes.card.style.opacity = '1'; }
  }
  nodes.cardStack.addEventListener('pointerup', finishDrag);
  nodes.cardStack.addEventListener('pointercancel', finishDrag);

  // Keyboard controls. Do not intercept keys while typing or while feedback is open.
  document.addEventListener('keydown', event => {
    if (nodes.feedbackModal.hidden === false || nodes.resultsModal.hidden === false) {
      if (event.key === 'Escape') { if (!nodes.feedbackModal.hidden) continueRound(); else closeModal(nodes.resultsModal); }
      return;
    }
    if (state.route !== 'play' || !state.active || state.awaitingFeedback) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); submitAnswer('phishing'); }
    if (event.key === 'ArrowRight') { event.preventDefault(); submitAnswer('safe'); }
  });

  // Close dialogs when clicking the backdrop, but not when clicking the dialog itself.
  nodes.resultsModal.addEventListener('click', event => { if (event.target === nodes.resultsModal) closeModal(nodes.resultsModal); });

  window.addEventListener('popstate', () => {
    const route = location.hash.replace('#', '') || 'home';
    navigate(route);
  });

  // Boot
  safeLoad(); updateProfile(); renderHomeStats(); renderLeaderboard();
  $('#footer-year').textContent = String(new Date().getFullYear());
  const initialRoute = location.hash.replace('#', '');
  if (initialRoute && ['home', 'play', 'tips', 'leaderboard', 'about'].includes(initialRoute)) {
    if (initialRoute === 'play') startGame('all', true);
    else navigate(initialRoute);
  }
})();
