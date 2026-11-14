export function createFilterOptions(filters) {
    return filters.map((filter) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'filter-option';
        button.textContent = filter;
        button.dataset.filter = filter;
        return button;
    });
}
