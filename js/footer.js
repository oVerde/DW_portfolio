import { createFooterMarkup } from './layout/create-footer-markup.js';
import { startFooterClock } from './layout/start-footer-clock.js';

export function renderFooter(target = document.querySelector('[data-component="footer"]')) {
    if (!target) {
        return;
    }

    target.outerHTML = createFooterMarkup();
    const clock = document.querySelector('#clock');
    if (clock) {
        startFooterClock(clock);
    }
}
