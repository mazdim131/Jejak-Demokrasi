(function () {
  'use strict';

  const STORAGE_KEY = 'jejakDemokrasi.quiz';

  function readAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeAll(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // ignore storage errors
    }
  }

  function getQuiz(id) {
    const all = readAll();
    return all[id] || null;
  }

  function saveQuiz(id, payload) {
    const all = readAll();
    const prev = all[id] || {};
    const attempts = (prev.attempts || 0) + (payload.attempt ? 1 : 0);
    const bestScore = Math.max(prev.bestScore || 0, payload.score || 0);
    all[id] = {
      id: id,
      period: payload.period || prev.period || id,
      attempts: attempts,
      bestScore: bestScore,
      lastScore: payload.score != null ? payload.score : (prev.lastScore || 0),
      total: payload.total != null ? payload.total : (prev.total || 0),
      lastAnswers: payload.answers || prev.lastAnswers || [],
      lastAttemptAt: Date.now(),
    };
    writeAll(all);
    return all[id];
  }

  function getAll() {
    return readAll();
  }

  function clearAll() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  window.quizStorage = {
    key: STORAGE_KEY,
    getAll: getAll,
    get: getQuiz,
    save: saveQuiz,
    clear: clearAll,
  };
})();