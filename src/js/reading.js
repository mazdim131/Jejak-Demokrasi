/* ============================================================
   Jejak Demokrasi — Reading page (search + materials)
   ============================================================ */

const materials = [
  {
    id: 1,
    title: "Demokrasi Masa Revolusi Kemerdekaan",
    period: "1945 – 1949",
    desc: "Masa awal kemerdekaan Indonesia, di mana demokrasi berjuang tumbuh di tengah revolusi dan ancaman kembalinya penjajah.",
    tags: ["revolusi", "kemerdekaan", "proklamasi", "pancasila"],
    image: "https://placehold.co/600x320/6c9bcf/ffffff?text=Revolusi+Kemerdekaan",
  },
  {
    id: 2,
    title: "Demokrasi Liberal (Parlementer)",
    period: "1950 – 1959",
    desc: "Sistem demokrasi parlementer dengan kabinet yang sering berganti, mencerminkan dinamika politik pasca-kemerdekaan.",
    tags: ["liberal", "parlementer", "kabinet", "pemilu"],
    image: "https://placehold.co/600x320/5a8abf/ffffff?text=Demokrasi+Liberal",
  },
  {
    id: 3,
    title: "Demokrasi Terpimpin",
    period: "1959 – 1965",
    desc: "Peralihan ke sistem demokrasi terpimpin di bawah Presiden Soekarno dengan konsep Nasakom.",
    tags: ["terpimpin", "soekarno", "nasakom", "dekrit"],
    image: "https://placehold.co/600x320/4b7aae/ffffff?text=Demokrasi+Terpimpin",
  },
  {
    id: 4,
    title: "Demokrasi Pancasila (Orde Baru)",
    period: "1966 – 1998",
    desc: "Stabilitas politik dan pembangunan ekonomi, namun dengan pembatasan kebebasan berpolitik dan pers.",
    tags: ["orde baru", "pancasila", "soeharto", "stabilitas"],
    image: "https://placehold.co/600x320/3c6a9d/ffffff?text=Orde+Baru",
  },
  {
    id: 5,
    title: "Demokrasi Reformasi",
    period: "1998 – Sekarang",
    desc: "Era reformasi dengan amendemen UUD 1945, pemilihan langsung, dan penguatan lembaga demokrasi.",
    tags: ["reformasi", "amendemen", "pemilu langsung", "desentralisasi"],
    image: "https://placehold.co/600x320/2d5a8c/ffffff?text=Demokrasi+Reformasi",
  },
  {
    id: 6,
    title: "Indikator Demokrasi",
    period: "Lintas Periode",
    desc: "Lima indikator utama: partisipasi, kompetisi, akuntabilitas, supremasi hukum, dan perlindungan hak asasi.",
    tags: ["indikator", "partisipasi", "akuntabilitas", "ham"],
    image: "https://placehold.co/600x320/1e4a7b/ffffff?text=Indikator+Demokrasi",
  },
];

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

// Fungsi filter dengan alur sederhana:
// 1. Normalisasi keyword -> 2. Filter data -> 3. Kembalikan hasil
function filterMaterials(keyword) {
  // Langkah 1: bersihkan & kecilkan huruf keyword
  const term = (keyword || "").trim().toLowerCase();

  // Langkah 2: jika kosong, tampilkan semua materi
  if (term === "") {
    return materials.slice();
  }

  // Langkah 3: saring materi yang mengandung keyword
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
    // Empty state hanya muncul saat benar-benar melakukan pencarian
    // dan tidak ada yang cocok. Saat tidak search, sembunyikan.
    els.empty.hidden = q === "";
    els.count.textContent = q === "" ? "" : "0 materi ditemukan";
    return;
  }
  els.empty.hidden = true;
  els.count.textContent = `${list.length} materi ditemukan`;
  els.grid.innerHTML = list
    .map(
      (m) => `
      <article class="material-card">
        <div class="material-card__thumb">
          <img src="${escapeHtml(m.image)}" alt="${escapeHtml(m.title)}" loading="lazy" />
        </div>
        <div class="material-card__body">
          <span class="material-card__period">${escapeHtml(m.period)}</span>
          <h3 class="material-card__title">${highlight(m.title, q)}</h3>
          <p class="material-card__desc">${highlight(m.desc, q)}</p>
          <div class="material-card__tags">
            ${(m.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
      </article>`
    )
    .join("");
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

// Initial render
render(materials, "");
if (els.clear) els.clear.hidden = true;
