export function renderFooter(target = document.querySelector('[data-component="footer"]')) {
    if (!target) {
        return;
    }

    target.outerHTML = `
        <footer class="site-footer">
            <div class="footer-bio">
                <p>Multidisciplinary visual designer and storyteller. Currently doing Master's degree in Coimbra University. Take a look at my skills!</p>
            </div>
            <div class="footer-badges">
                <div class="badge badge-pattern"></div>
                <div class="badge badge-signature"></div>
            </div>
        </footer>
    `;
}