import { createCursorElement } from './cursor/create-cursor-element.js';
import { handleCursorMove } from './cursor/handle-cursor-move.js';
import { renderCursorPosition } from './cursor/render-cursor-position.js';

export function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const { cursor, cursorLabel } = createCursorElement();
    const state = {
        targetX: -100,
        targetY: -100,
        currentX: -100,
        currentY: -100,
        velocityX: 0,
        velocityY: 0,
        isVisible: false,
        isProject: false
    };

    document.addEventListener('pointermove', (event) => {
        handleCursorMove(event, cursor, cursorLabel, state);
    });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
    document.addEventListener('pointerenter', () => cursor.classList.add('is-visible'));
    window.requestAnimationFrame(() => renderCursorPosition(cursor, state));
}
