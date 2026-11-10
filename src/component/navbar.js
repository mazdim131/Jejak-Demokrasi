const ICONS = {
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1.5 8.25 12 13.5l9-4.5V15a.75.75 0 0 0 1.5 0V8.25L12 3Z"/><path d="M3.75 10.5v5.25c0 1.657 3.694 3 8.25 3s8.25-1.343 8.25-3V10.5l-8.25 4.125L3.75 10.5Z"/></svg>`,
    book: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"/></svg>`,
    graduate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.39.99l-10.05 4.23a.75.75 0 0 1-.58 0L1.77 9.71a.75.75 0 0 1-.39-.99A60.65 60.65 0 0 1 11.7 2.805Z"/><path d="M13.06 12.76a2.25 2.25 0 0 0-2.12 0l-4.68 2.48A3.75 3.75 0 0 0 4.5 18.75v.69c0 .83.53 1.56 1.32 1.82A59.5 59.5 0 0 0 12 22.5c2.09 0 4.14-.2 6.18-.59.79-.15 1.32-.88 1.32-1.82v-.69a3.75 3.75 0 0 0-1.76-3.24l-4.68-2.39Z"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
</svg>`
};

const NAV_LINKS = [
    { id: 'home', label: 'Home', icon: ICONS.home, href: '/index.html', active: true },
    { id: 'membaca', label: 'Membaca', icon: ICONS.book, href: '/src/page/reading.html', active: false },
    { id: 'berlatih', label: 'Berlatih', icon: ICONS.graduate, href: '/src/page/quiz-select.html', active: false }
];

function renderLinks() {
    return NAV_LINKS.map(link => `
        <a class="nav-link${link.active ? ' is-active' : ''}" href="${link.href}" data-link="${link.id}" ${link.active ? 'aria-current="page"' : ''}>
            ${link.icon}
            <span>${link.label}</span>
        </a>
    `).join('');
}

const navbarRoot = document.getElementById('navbar');
if (!navbarRoot) {
    throw new Error('Komponen navbar tidak ada / hilang!');
}

navbarRoot.innerHTML = `
    <nav class="navbar" role="navigation" aria-label="Navigasi utama">
        <div class="navbar__container">
            <a class="navbar__brand" href="/index.html" aria-label="Jejak Demokrasi beranda">
                <span class="navbar__brand-mark">${ICONS.logo}</span>
                <span>Jejak Demokrasi</span>
            </a>

            <div class="navbar__links" role="menubar">
                ${renderLinks()}
            </div>

            <div class="navbar__actions">
                <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navbarDrawer" aria-label="Buka menu navigasi">
                    ${ICONS.menu}
                </button>

                <a class="navbar__profile" href="#profil" aria-label="Profil pengguna">
                    ${ICONS.user}
                </a>
            </div>
        </div>
    </nav>

    <div class="drawer-backdrop" data-drawer-backdrop></div>
    <aside class="drawer" id="navbarDrawer" aria-hidden="true" aria-label="Menu navigasi">
        <div class="drawer__header">
            <h2 class="drawer__title">Menu</h2>
            <button class="drawer__close" type="button" aria-label="Tutup menu">
                ${ICONS.close}
            </button>
        </div>
        <div class="drawer__body" role="menu">
            ${renderLinks()}
        </div>
        <div class="drawer__footer">
            <a class="navbar__profile" href="#profil" aria-label="Profil pengguna">
                ${ICONS.user}
                <span>Profil</span>
            </a>
        </div>
    </aside>
`;

/* ---------------- Behavior ---------------- */

const navbarEl = navbarRoot.querySelector('.navbar');
const toggleBtn = navbarRoot.querySelector('.menu-toggle');
const drawer = navbarRoot.querySelector('.drawer');
const backdrop = navbarRoot.querySelector('.drawer-backdrop');
const closeBtn = navbarRoot.querySelector('.drawer__close');

function openDrawer() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

toggleBtn.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
    }
});

/* Active link handling (both desktop + drawer) */
navbarRoot.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navbarRoot.querySelectorAll('.nav-link').forEach((l) => {
            l.classList.remove('is-active');
            l.removeAttribute('aria-current');
        });
        navbarRoot.querySelectorAll(`[data-link="${link.dataset.link}"]`).forEach((l) => {
            l.classList.add('is-active');
            l.setAttribute('aria-current', 'page');
        });
        closeDrawer();
    });
});

/* Scroll shadow */
let ticking = false;
window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        navbarEl.classList.toggle('scrolled', window.scrollY > 4);
        ticking = false;
    });
}, { passive: true });