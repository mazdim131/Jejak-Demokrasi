const footer = document.getElementById("footer");
if (!footer) {
  // nothing to render
} else {
  footer.innerHTML = `
    <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__brand">
                <span class="site-footer__logo">Jejak Demokrasi</span>
                <span class="site-footer__copy">&copy; 2026 Kelompok5. All rights reserved.</span>
            </div>
            <nav class="site-footer__nav" aria-label="Footer">
                <a href="/index.html">Home</a>
                <a href="/src/page/reading.html">Membaca</a>
                <a href="/src/page/quiz-select.html">Berlatih</a>
            </nav>
        </div>
    </footer>
  `;
}