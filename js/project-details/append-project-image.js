export function appendProjectImage(container, image) {
    if (!container || !image) {
        return;
    }

    const imageElement = document.createElement('img');
    imageElement.className = 'project-detail-image';
    imageElement.src = image.url;
    imageElement.alt = image.alt;
    imageElement.loading = 'lazy';
    container.append(imageElement);
}
