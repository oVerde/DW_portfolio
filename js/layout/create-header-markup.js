export function createHeaderMarkup() {
    return `
        <header class="site-header">
            <a class="logo logo-desktop" href="index.html">joão verde</a>
            <a class="logo logo-mobile" href="index.html">jv</a>
            <nav class="nav" aria-label="Main navigation">
                <ul class="nav-main">
                    <li><a href="index.html">work</a></li>
                    <li><a href="#about">about</a></li>
                    <li><a href="#curriculum">curriculum</a></li>
                </ul>
                <a class="nav-contact" href="#contacts">contact</a>
            </nav>
            <button class="burger" type="button" aria-expanded="false" aria-controls="main-navigation">
                <span></span>
                <span></span>
                <span></span>
                <span class="sr-only">Open menu</span>
            </button>
        </header>
    `;
}
