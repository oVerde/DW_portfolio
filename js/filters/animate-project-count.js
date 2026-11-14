export function animateProjectCount(projectCount, targetCount, frameState) {
    window.cancelAnimationFrame(frameState.id);

    const startCount = Number(projectCount.textContent) || 0;
    const startTime = performance.now();
    const duration = 500;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        projectCount.textContent = targetCount;
        return;
    }

    const updateCount = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = progress < 0.5
            ? 4 * progress ** 3
            : 1 - ((-2 * progress + 2) ** 3) / 2;
        const currentCount = Math.round(startCount + (targetCount - startCount) * easedProgress);
        projectCount.textContent = currentCount;

        if (progress < 1) {
            frameState.id = window.requestAnimationFrame(updateCount);
        }
    };

    frameState.id = window.requestAnimationFrame(updateCount);
}
