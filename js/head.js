(() => {
    'use strict';

    const stylesheets = [
        'css/variables.css',
        'css/global.css',
        'css/cursor.css',
        'css/animations.css',
        'css/intro_anim.css',
        'css/header_footer/header.css',
        'css/header_footer/footer.css',
        'css/projects.css'
    ];

    stylesheets.forEach((href) => {
        if (document.head.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
            return;
        }

        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;
        document.head.appendChild(stylesheet);
    });
})();