import { CURSOR_ACCELERATION, CURSOR_DELAY } from './cursor-settings.js';

export function renderCursorPosition(cursor, state) {
    state.velocityX += (state.targetX - state.currentX) * CURSOR_ACCELERATION;
    state.velocityY += (state.targetY - state.currentY) * CURSOR_ACCELERATION;
    state.velocityX *= CURSOR_DELAY;
    state.velocityY *= CURSOR_DELAY;
    state.currentX += state.velocityX;
    state.currentY += state.velocityY;

    if (Math.abs(state.targetX - state.currentX) < 0.1
        && Math.abs(state.targetY - state.currentY) < 0.1) {
        state.currentX = state.targetX;
        state.currentY = state.targetY;
        state.velocityX = 0;
        state.velocityY = 0;
    }

    cursor.style.setProperty('--cursor-x', `${state.currentX}px`);
    cursor.style.setProperty('--cursor-y', `${state.currentY}px`);
    window.requestAnimationFrame(() => renderCursorPosition(cursor, state));
}
