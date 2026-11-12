const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';
const CURSOR_ACCELERATION = 0.3;
const CURSOR_DELAY = 0.2;

export function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const cursor = document.createElement('span');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.append(cursor);

    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let velocityX = 0;
    let velocityY = 0;
    let isVisible = false;

    const render = () => {
        velocityX += (targetX - currentX) * CURSOR_ACCELERATION;
        velocityY += (targetY - currentY) * CURSOR_ACCELERATION;
        velocityX *= CURSOR_DELAY;
        velocityY *= CURSOR_DELAY;
        currentX += velocityX;
        currentY += velocityY;
        if (Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1) {
            currentX = targetX;
            currentY = targetY;
            velocityX = 0;
            velocityY = 0;
        }
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        window.requestAnimationFrame(render);
    };

    document.addEventListener('pointermove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        if (!isVisible) {
            isVisible = true;
            cursor.classList.add('is-visible');
        }

        const interactiveElement = event.target instanceof Element
            ? event.target.closest(INTERACTIVE_SELECTOR)
            : null;
        cursor.classList.toggle('is-interactive', Boolean(interactiveElement));
    });

    document.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-visible');
    });

    document.addEventListener('pointerenter', () => {
        cursor.classList.add('is-visible');
    });

    window.requestAnimationFrame(render);
}
