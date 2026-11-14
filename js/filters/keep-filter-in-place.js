export function keepFilterInPlace(filterToggle, top) {
    const start = performance.now();
    const duration = 500;

    const adjustScroll = (now) => {
        const currentTop = filterToggle.getBoundingClientRect().top;
        window.scrollBy(0, currentTop - top);

        if (now - start < duration) {
            window.requestAnimationFrame(adjustScroll);
        }
    };

    window.requestAnimationFrame(adjustScroll);
}
