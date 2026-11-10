export function renderHeader(target = document.querySelector('[data-component="header"]')) {
    if (!target) {
        return;
    }

    target.outerHTML = `
        <header class="site-header">
            <div class="logo">joão verde</div>
            <nav class="main-nav">
                <ul>
                    <li><a href="#work">work</a></li>
                    <li><a href="#about">about</a></li>
                    <li><a href="#contact">contact</a></li>
                </ul>
            </nav>
        </header>
    `;
}