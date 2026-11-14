export function setFilterToggleState(filterToggle, filterLabel, filterIcon, filterOptions, activeFilter, isOpen) {
    filterLabel.textContent = isOpen ? 'Close' : activeFilter;
    filterIcon.textContent = isOpen ? '×' : '↓';
    filterToggle.setAttribute('aria-expanded', String(isOpen));
    filterOptions.setAttribute('aria-hidden', String(!isOpen));
    filterOptions.classList.toggle('is-open', isOpen);
}
