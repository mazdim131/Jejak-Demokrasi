(function () {
  'use strict';

  const STORAGE_KEY = 'jejakDemokrasi.reading';

  function readAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { read: [] };
    } catch (e) {
      return { read: [] };
    }
  }

  function writeAll(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function isRead(id) {
    const data = readAll();
    return Array.isArray(data.read) && data.read.indexOf(String(id)) !== -1;
  }

  function markRead(id) {
    const data = readAll();
    if (!Array.isArray(data.read)) data.read = [];
    const sid = String(id);
    if (data.read.indexOf(sid) === -1) data.read.push(sid);
    writeAll(data);
    return data;
  }

  function getReadIds() {
    const data = readAll();
    return Array.isArray(data.read) ? data.read : [];
  }

  function clearAll() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  window.readingStorage = {
    key: STORAGE_KEY,
    isRead: isRead,
    markRead: markRead,
    getReadIds: getReadIds,
    clear: clearAll,
  };
})();