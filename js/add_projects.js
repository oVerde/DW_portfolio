const projectImageCount = 6;

export function renderProjectGrid(imageCount = projectImageCount) {
    const grid = document.querySelector('[data-project-grid]');

    if (!grid) {
        return;
    }

    const totalImages = Math.max(1, Math.floor(Number(imageCount) || 1));

    grid.replaceChildren(
        ...Array.from({ length: totalImages }, (_, index) => {
            const item = document.createElement('article');
            item.className = 'project-card';
            item.setAttribute('aria-label', `Project image ${index + 1}`);

            const image = document.createElement('div');
            image.className = 'project-image';
            image.setAttribute('role', 'img');
            image.setAttribute('aria-label', `Project image ${index + 1} placeholder`);

            item.append(image);
            return item;
        })
    );
}

renderProjectGrid();