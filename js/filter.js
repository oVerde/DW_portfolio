const ALL_PROJECTS = 'All projects';

const filterToggle = document.querySelector('.filter-toggle');
const filterOptions = document.querySelector('.filter-options');
const filterLabel = document.querySelector('[data-filter-label]');
const filterIcon = document.querySelector('[data-filter-icon]');
const projectCount = document.querySelector('[data-project-count]');

export function initProjectFilters() {
    if (!filterToggle || !filterOptions || !filterLabel || !filterIcon || !projectCount) {
        return;
    }

    const projectItems = [...document.querySelectorAll('.project-item')];
    const projectCards = [...document.querySelectorAll('.project-card')];
    const yearGroups = [...document.querySelectorAll('.year-group')];
    const filters = [ALL_PROJECTS, ...new Set(projectItems.map((item) => item.dataset.projectCategory))];
    const updateProjectCount = () => {
        projectCount.textContent = projectItems.filter((item) => !item.classList.contains('is-filtered')).length;
    };

    const updateYearGroups = () => {
        yearGroups.forEach((group) => {
            const hasVisibleProjects = group.querySelector('.project-item:not(.is-filtered)');
            group.classList.toggle('is-filtered', !hasVisibleProjects);
        });
    };

    updateProjectCount();

    filterOptions.replaceChildren(
        ...filters.map((filter) => {
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
        filterIcon.textContent = isOpen ? '×' : '↓';
        filterToggle.setAttribute('aria-expanded', String(isOpen));
        filterOptions.setAttribute('aria-hidden', String(!isOpen));
        filterOptions.classList.toggle('is-open', isOpen);
    };

    const keepFilterInPlace = (top) => {
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
    };

    const applyFilter = (filter) => {
        const filterTop = filterToggle.getBoundingClientRect().top;
        activeFilter = filter;
        projectItems.forEach((item) => {
            const category = item.dataset.projectCategory;
            const isFiltered = filter !== ALL_PROJECTS && category !== filter;
            item.hidden = false;
            item.classList.toggle('is-filtered', isFiltered);
            if (isFiltered) {
                window.setTimeout(() => {
                    if (item.classList.contains('is-filtered')) {
                        item.hidden = true;
                    }
                }, 500);
            }
        });
        projectCards.forEach((card) => {
            const isFiltered = filter !== ALL_PROJECTS && card.dataset.projectCategory !== filter;
            card.hidden = false;
            card.classList.toggle('is-filtered', isFiltered);
            if (isFiltered) {
                window.setTimeout(() => {
                    if (card.classList.contains('is-filtered')) {
                        card.hidden = true;
                    }
                }, 500);
            }
        });
        updateYearGroups();
        updateProjectCount();
        setFilterToggleState(false);
        keepFilterInPlace(filterTop);
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