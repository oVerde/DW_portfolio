const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';
const CURSOR_ACCELERATION = 0.8;
const CURSOR_DELAY = 0.2;

export function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const cursor = document.createElement('span');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    const cursorLabel = document.createElement('span');
    cursorLabel.className = 'custom-cursor-label';
    cursor.append(cursorLabel);
    document.body.append(cursor);

    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let velocityX = 0;
    let velocityY = 0;
    let isVisible = false;
    let isProject = false;
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
        cursor.style.setProperty('--cursor-x', `${currentX}px`);
        cursor.style.setProperty('--cursor-y', `${currentY}px`);
        window.requestAnimationFrame(render);
    };

    document.addEventListener('pointermove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        if (!isVisible) {
            isVisible = true;
            cursor.classList.add('is-visible');
        }

        const element = event.target instanceof Element ? event.target : null;
        const interactiveElement = element?.closest(INTERACTIVE_SELECTOR);
        const projectCard = element?.closest('.project-card');
        cursor.classList.toggle('is-interactive', Boolean(interactiveElement));
        cursorLabel.textContent = projectCard?.dataset.projectName ?? '';

        if (projectCard) {
            const tooltipWidth = cursorLabel.getBoundingClientRect().width + 32;
            const isFlipped = event.clientX + tooltipWidth / 2 > window.innerWidth - 16;
            const isShiftedRight = event.clientX - tooltipWidth / 2 < 16 && !isFlipped;
            cursor.style.setProperty('--cursor-tooltip-width', `${tooltipWidth}px`);
            cursor.classList.toggle('is-flipped', isFlipped);
            cursor.classList.toggle('is-shifted-right', isShiftedRight);
            if (!isProject) {
                isProject = true;
                cursor.classList.add('is-project');
            }
        } else {
            cursor.classList.remove('is-flipped');
            cursor.classList.remove('is-shifted-right');
            if (isProject) {
                isProject = false;
                cursor.classList.remove('is-project');
                cursor.style.removeProperty('--cursor-tooltip-width');
            }
        }
    });

    document.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-visible');
    });

    document.addEventListener('pointerenter', () => {
        cursor.classList.add('is-visible');
    });

    window.requestAnimationFrame(render);
}
