const footer = document.getElementById("footer");
if (!footer) {
  // nothing to render
} else {
  footer.innerHTML = `
    <footer class="site-footer">
        <div class="site-footer__inner">
            <span>&copy; 2026 Kelompok5. All rights reserved.</span>
        </div>
    </footer>
`;
}