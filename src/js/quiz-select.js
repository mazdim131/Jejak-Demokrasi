(function () {
  'use strict';

  function ensureData() {
    if (window.quizPeriods) return window.quizPeriods;
    return {};
  }

  function colorClass(color) {
    return color === 'peach' ? 'icon-box--peach' : 'icon-box--blue';
  }

  function badgeFor(stat) {
    if (!stat || !stat.attempts) {
      return '<span class="badge badge--neutral">Belum dikerjakan</span>';
    }
    return '<span class="badge badge--score">Skor terbaik: ' + stat.bestScore + '</span>';
  }

  function metaFor(period, stat) {
    const count = period.questionCount || (period.questions ? period.questions.length : 0);
    if (!stat || !stat.attempts) {
      return count + ' soal - belum dikerjakan';
    }
    return count + ' soal - sudah dikerjakan ' + stat.attempts + 'x';
  }

  function buttonFor(stat) {
    if (!stat || !stat.attempts) {
      return '<button class="btn btn--primary" style="width:100%;" data-action="start">Mulai Kuis</button>';
    }
    return '<button class="btn btn--secondary" style="width:100%;" data-action="repeat">Ulangi Kuis</button>';
  }

  function renderCards() {
    const container = document.getElementById('quizCards');
    if (!container) return;
    const periods = ensureData();
    const storage = window.quizStorage;
    const ids = Object.keys(periods).filter(function (k) { return k !== 'final'; });

    container.innerHTML = ids.map(function (id) {
      const p = periods[id];
      const stat = storage ? storage.get(id) : null;
      return (
        '<div class="card">' +
          '<div class="card__top">' +
            '<div class="icon-box ' + colorClass(p.iconColor) + '">' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
            '</div>' +
            badgeFor(stat) +
          '</div>' +
          '<div class="card__title">' + p.title + '</div>' +
          '<div class="card__meta">' + metaFor(p, stat) + '</div>' +
          buttonFor(stat) +
        '</div>'
      );
    }).join('');

    // attach click handlers
    container.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const card = btn.closest('.card');
        const title = card.querySelector('.card__title').textContent;
        // find id by title
        let foundId = null;
        Object.keys(periods).forEach(function (id) {
          if (periods[id].title === title) foundId = id;
        });
        if (foundId) {
          window.location.href = '/src/page/quiz.html?id=' + encodeURIComponent(foundId);
        }
      });
    });

    // final banner
    const finalBtn = document.querySelector('.banner__btn');
    if (finalBtn) {
      finalBtn.addEventListener('click', function () {
        window.location.href = '/src/page/quiz.html?id=final';
      });
    }
  }

  function updateStats() {
    // optional: update index? not here
  }

  function init() {
    renderCards();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();