export function renderProjectTags(container, tags) {
    container.replaceChildren(...tags.map((tag) => {
        const item = document.createElement('li');
        item.className = 'tag';
        item.textContent = tag;
        return item;
    }));
}
