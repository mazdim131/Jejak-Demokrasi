/* ============================================================
   Jejak Demokrasi - Reading page (search + materials)
   ============================================================ */

const materials = (window.readingMaterials || []);

const els = {
  input: document.getElementById("searchInput"),
  clear: document.getElementById("searchClear"),
  btn: document.getElementById("searchBtn"),
  grid: document.getElementById("materialsGrid"),
  empty: document.getElementById("materialsEmpty"),
  count: document.getElementById("resultsCount"),
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "gi");
  return safe.replace(re, "<mark>$1</mark>");
}

function filterMaterials(keyword) {
  const term = (keyword || "").trim().toLowerCase();
  if (term === "") {
    return materials.slice();
  }
  const hasil = [];
  for (const item of materials) {
    const gabungan = [item.title, item.desc, item.period, ...(item.tags || [])]
      .join(" ")
      .toLowerCase();
    if (gabungan.includes(term)) {
      hasil.push(item);
    }
  }
  return hasil;
}

function render(list, query) {
  const q = (query || "").trim();
  if (!list.length) {
    els.grid.innerHTML = "";
    els.empty.hidden = q === "";
    els.count.textContent = q === "" ? "" : "0 materi ditemukan";
    return;
  }
  els.empty.hidden = true;
  els.count.textContent = `${list.length} materi ditemukan`;
  els.grid.innerHTML = list
    .map((m) => {
      const read = (window.readingStorage && window.readingStorage.isRead(m.id)) ? ' (Sudah dibaca)' : '';
      return `
      <article class="material-card" data-id="${escapeHtml(m.id)}">
        <div class="material-card__thumb">
          <img src="${escapeHtml(m.image)}" alt="${escapeHtml(m.title)}" loading="lazy" />
        </div>
        <div class="material-card__body">
          <span class="material-card__period">${escapeHtml(m.period)}</span>
          <h3 class="material-card__title">${highlight(m.title, q)}${read}</h3>
          <p class="material-card__desc">${highlight(m.desc, q)}</p>
          <div class="material-card__tags">
            ${(m.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
          <button class="btn btn--primary" style="margin-top:12px;width:100%;" data-read-id="${escapeHtml(m.id)}">Baca Materi</button>
        </div>
      </article>`;
    })
    .join("");

  els.grid.querySelectorAll('button[data-read-id]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-read-id');
      window.location.href = '/src/page/reading-detail.html?id=' + encodeURIComponent(id);
    });
  });
}

let debounceTimer = null;
function handleSearch() {
  const q = els.input.value;
  els.clear.hidden = !q;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => render(filterMaterials(q), q), 120);
}

function runSearch() {
  const q = els.input.value;
  render(filterMaterials(q), q);
}

if (els.input) {
  els.input.addEventListener("input", handleSearch);
  els.input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
    if (e.key === "Escape") {
      els.input.value = "";
      handleSearch();
      els.input.blur();
    }
  });
}
if (els.clear) {
  els.clear.addEventListener("click", () => {
    els.input.value = "";
    els.clear.hidden = true;
    els.input.focus();
    render(materials, "");
  });
}
if (els.btn) {
  els.btn.addEventListener("click", runSearch);
}

render(materials, "");
if (els.clear) els.clear.hidden = true;