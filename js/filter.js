// Add or remove filter names in this list.
const FILTERS = ['All projects', 'Universitário'];
const ALL_PROJECTS = 'All projects';

const filterToggle = document.querySelector('.filter-toggle');
const filterOptions = document.querySelector('.filter-options');
const filterLabel = document.querySelector('[data-filter-label]');
const filterIcon = document.querySelector('[data-filter-icon]');
const projectItems = [...document.querySelectorAll('.project-item')];
const projectCount = document.querySelector('[data-project-count]');

if (filterToggle && filterOptions && filterLabel && filterIcon && projectCount) {
    const updateProjectCount = () => {
        projectCount.textContent = projectItems.filter((item) => !item.hidden).length;
    };

    updateProjectCount();

    filterOptions.replaceChildren(
        ...FILTERS.map((filter) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'filter-option';
            button.textContent = filter;
            button.dataset.filter = filter;
            return button;
        })
    );

    let activeFilter = ALL_PROJECTS;

    const setFilterToggleState = (isOpen) => {
        filterLabel.textContent = isOpen ? 'Close' : activeFilter;
        filterIcon.textContent = isOpen ? '×' : '↕';
        filterToggle.setAttribute('aria-expanded', String(isOpen));
        filterOptions.setAttribute('aria-hidden', String(!isOpen));
        filterOptions.classList.toggle('is-open', isOpen);
    };

    const applyFilter = (filter) => {
        activeFilter = filter;
        projectItems.forEach((item) => {
            const category = item.querySelector('.project-category')?.textContent.trim();
            item.hidden = filter !== ALL_PROJECTS && category !== filter;
        });
        updateProjectCount();
        setFilterToggleState(false);
    };

    filterToggle.addEventListener('click', () => {
        const isOpen = filterToggle.getAttribute('aria-expanded') === 'true';
        setFilterToggleState(!isOpen);
    });

    filterOptions.addEventListener('click', (event) => {
        const option = event.target.closest('.filter-option');
        if (option) {
            applyFilter(option.dataset.filter);
        }
    });
}