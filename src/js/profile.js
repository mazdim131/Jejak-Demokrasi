(function () {
  'use strict';

  const NAME_KEY = 'jejakDemokrasi.profile.name';

  function loadName() {
    try { return localStorage.getItem(NAME_KEY) || 'Pengguna Jejak Demokrasi'; }
    catch (e) { return 'Pengguna Jejak Demokrasi'; }
  }

  function saveName(name) {
    try { localStorage.setItem(NAME_KEY, name); } catch (e) {}
  }

  function initials(name) {
    return (name || '').trim().split(/\s+/).map(function (w) { return w.charAt(0).toUpperCase(); }).slice(0, 2).join('') || 'JD';
  }

  function updateStats() {
    let quizCount = 0;
    let pointCount = 0;
    if (window.quizStorage) {
      const all = window.quizStorage.getAll();
      Object.keys(all).forEach(function (k) {
        if (all[k] && all[k].attempts) {
          quizCount += 1;
          pointCount += all[k].bestScore || 0;
        }
      });
    }
    const readIds = window.readingStorage ? window.readingStorage.getReadIds() : [];
    const totalMaterials = (window.readingMaterials || []).length;
    const readCount = readIds.length;
    const unreadCount = Math.max(totalMaterials - readCount, 0);

    const elQuiz = document.getElementById('statQuiz');
    const elPoint = document.getElementById('statPoint');
    const elRead = document.getElementById('statRead');
    const elUnread = document.getElementById('statUnread');
    if (elQuiz) elQuiz.textContent = String(quizCount);
    if (elPoint) elPoint.textContent = String(pointCount);
    if (elRead) elRead.textContent = String(readCount);
    if (elUnread) elUnread.textContent = String(unreadCount);
  }

  function renderQuizProgress() {
    const list = document.getElementById('quizProgressList');
    const empty = document.getElementById('quizProgressEmpty');
    if (!list) return;
    const periods = (window.quizPeriods && Object.keys(window.quizPeriods)) || [];
    const all = window.quizStorage ? window.quizStorage.getAll() : {};
    let hasAny = false;
    list.innerHTML = '';

    periods.forEach(function (key) {
      const p = (window.quizPeriods || {})[key];
      if (!p || key === 'final') return;
      const data = all[key] || null;
      const attempts = data ? (data.attempts || 0) : 0;
      const best = data ? (data.bestScore || 0) : 0;
      const total = data ? (data.total || p.questionCount || 0) : (p.questionCount || 0);
      if (attempts > 0) hasAny = true;

      const item = document.createElement('div');
      item.className = 'profile-item';
      item.innerHTML = `
        <div class="profile-item__main">
          <div class="profile-item__title">${p.title || key}</div>
          <div class="profile-item__meta">${attempts} percobaan · skor terbaik ${best}/${total}</div>
        </div>
        <div class="profile-item__actions">
          <a class="btn btn--secondary" href="/src/page/quiz.html?id=${encodeURIComponent(key)}">Latih lagi</a>
        </div>
      `;
      list.appendChild(item);
    });

    // Final quiz
    const finalData = all['final'] || null;
    if (finalData && (finalData.attempts || 0) > 0) hasAny = true;
    const finalItem = document.createElement('div');
    finalItem.className = 'profile-item';
    finalItem.innerHTML = `
      <div class="profile-item__main">
        <div class="profile-item__title">Kuis Final</div>
        <div class="profile-item__meta">${finalData ? (finalData.attempts || 0) : 0} percobaan · skor terbaik ${finalData ? (finalData.bestScore || 0) : 0}/${finalData ? (finalData.total || 0) : 15}</div>
      </div>
      <div class="profile-item__actions">
        <a class="btn btn--secondary" href="/src/page/quiz.html?id=final">Latih lagi</a>
      </div>
    `;
    list.appendChild(finalItem);

    if (empty) empty.hidden = hasAny;
  }

  function renderReadingProgress() {
    const list = document.getElementById('readingProgressList');
    if (!list) return;
    const materials = window.readingMaterials || [];
    const readIds = window.readingStorage ? window.readingStorage.getReadIds() : [];
    list.innerHTML = '';
    materials.forEach(function (m) {
      const isRead = readIds.indexOf(String(m.id)) !== -1;
      const item = document.createElement('div');
      item.className = 'profile-item';
      item.innerHTML = `
        <div class="profile-item__main">
          <div class="profile-item__title">${m.title}</div>
          <div class="profile-item__meta">${m.period} · ${isRead ? 'Sudah dibaca' : 'Belum dibaca'}</div>
        </div>
        <div class="profile-item__actions">
          <a class="btn btn--secondary" href="/src/page/reading-detail.html?id=${encodeURIComponent(m.id)}">${isRead ? 'Baca ulang' : 'Baca'}</a>
        </div>
      `;
      if (isRead) item.classList.add('profile-item--done');
      list.appendChild(item);
    });
  }

  function bindName() {
    const nameEl = document.getElementById('profileName');
    const avatarEl = document.getElementById('profileAvatar');
    const btn = document.getElementById('editNameBtn');
    const current = loadName();
    if (nameEl) nameEl.textContent = current;
    if (avatarEl) avatarEl.textContent = initials(current);

    if (btn) {
      btn.addEventListener('click', function () {
        const next = window.prompt('Masukkan nama Anda:', loadName());
        if (next && next.trim()) {
          const trimmed = next.trim();
          saveName(trimmed);
          if (nameEl) nameEl.textContent = trimmed;
          if (avatarEl) avatarEl.textContent = initials(trimmed);
        }
      });
    }
  }

  function bindReset() {
    const btn = document.getElementById('resetProgressBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Reset semua progres (kuis & bacaan)?')) return;
      if (window.quizStorage) window.quizStorage.clear();
      if (window.readingStorage) window.readingStorage.clear();
      saveName('Pengguna Jejak Demokrasi');
      bindName();
      updateStats();
      renderQuizProgress();
      renderReadingProgress();
    });
  }

  function init() {
    bindName();
    updateStats();
    renderQuizProgress();
    renderReadingProgress();
    bindReset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
