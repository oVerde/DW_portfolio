import { INTERACTIVE_SELECTOR } from './cursor-settings.js';

export function handleCursorMove(event, cursor, cursorLabel, state) {
    state.targetX = event.clientX;
    state.targetY = event.clientY;

    if (!state.isVisible) {
        state.isVisible = true;
        cursor.classList.add('is-visible');
    }

    const element = event.target instanceof Element ? event.target : null;
    const interactiveElement = element?.closest(INTERACTIVE_SELECTOR);
    const projectCard = element?.closest('.project-card');
    cursor.classList.toggle('is-interactive', Boolean(interactiveElement));
    cursorLabel.textContent = projectCard?.dataset.projectName ?? '';

    if (!projectCard) {
        cursor.classList.remove('is-flipped', 'is-shifted-right');
        if (state.isProject) {
            state.isProject = false;
            cursor.classList.remove('is-project');
            cursor.style.removeProperty('--cursor-tooltip-width');
        }
        return;
    }

    const tooltipWidth = cursorLabel.getBoundingClientRect().width + 32;
    const isFlipped = event.clientX + tooltipWidth / 2 > window.innerWidth - 16;
    const isShiftedRight = event.clientX - tooltipWidth / 2 < 16 && !isFlipped;
    cursor.style.setProperty('--cursor-tooltip-width', `${tooltipWidth}px`);
    cursor.classList.toggle('is-flipped', isFlipped);
    cursor.classList.toggle('is-shifted-right', isShiftedRight);

    if (!state.isProject) {
        state.isProject = true;
        cursor.classList.add('is-project');
    }
}
