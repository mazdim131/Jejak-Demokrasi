(async function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const materials = window.readingMaterials || [];
  const material = materials.find(function (m) { return String(m.id) === String(id); });

  const label = document.getElementById('materialLabel');
  const title = document.getElementById('materialTitle');
  const period = document.getElementById('materialPeriod');
  const content = document.getElementById('materialContent');
  const tags = document.getElementById('materialTags');
  const backBtn = document.getElementById('backBtn');

  if (!material) {
    if (title) title.textContent = 'Materi tidak ditemukan';
    if (content) content.textContent = 'Materi dengan id tersebut tidak tersedia.';
  } else {
    if (label) label.textContent = 'MATERI - ' + (material.period || '');
    if (title) title.textContent = material.title || '';
    if (period) period.textContent = material.period || '';
    if (content) 
      {
        content.innerHTML = (material.content ? '<p style="margin-bottom: 16px; font-weight: bold;">' + material.content + '</p>' : '') + 
        '<div style="white-space: pre-line; line-height: 1.8; font-weight: normal; font-size: 0.9rem;">' + (material.details || material.desc || '') + '</div>';
      }
    if (tags) {
      tags.innerHTML = (material.tags || []).map(function (t) {
        return '<span class="tag">' + t + '</span>';
      }).join(' ');
    }
    if (window.readingStorage) {
      window.readingStorage.markRead(material.id);
    }
  }

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.location.href = '/src/page/reading.html';
    });
  }
})();