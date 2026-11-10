(function () {
  'use strict';

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateStats);
  } else {
    updateStats();
  }
})();