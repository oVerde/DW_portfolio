import { createHeaderMarkup } from './layout/create-header-markup.js';
import { initializeHeaderMenu } from './layout/initialize-header-menu.js';

export function renderHeader(target = document.querySelector('[data-component="header"]')) {
    if (!target) {
        return;
    }

    target.outerHTML = createHeaderMarkup();
    const header = document.querySelector('.site-header');
    if (header) {
        initializeHeaderMenu(header);
    }
}
