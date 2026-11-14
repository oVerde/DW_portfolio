import { ALL_PROJECTS_FILTER } from './filter-constants.js';
import { applyProjectFilter } from './apply-project-filter.js';
import { animateProjectCount } from './animate-project-count.js';
import { createFilterOptions } from './create-filter-options.js';
import { setFilterToggleState } from './set-filter-toggle-state.js';

export function initProjectFilters() {
    const filterToggle = document.querySelector('.filter-toggle');
    const filterOptions = document.querySelector('.filter-options');
    const filterLabel = document.querySelector('[data-filter-label]');
    const filterIcon = document.querySelector('[data-filter-icon]');
    const projectCount = document.querySelector('[data-project-count]');

    if (!filterToggle || !filterOptions || !filterLabel || !filterIcon || !projectCount) {
        return;
    }

    const projectItems = [...document.querySelectorAll('.project-item')];
    const projectCards = [...document.querySelectorAll('.project-card')];
    const yearGroups = [...document.querySelectorAll('.year-group')];
    const filters = [ALL_PROJECTS_FILTER, ...new Set(
        projectItems.map((item) => item.dataset.projectCategory)
    )];
    const state = {
        activeFilter: ALL_PROJECTS_FILTER,
        allProjectsFilter: ALL_PROJECTS_FILTER,
        countAnimation: { id: undefined }
    };
    const elements = {
        filterToggle,
        filterLabel,
        filterIcon,
        filterOptions,
        projectCount,
        projectItems,
        projectCards,
        yearGroups
    };

    animateProjectCount(projectCount, projectItems.length, state.countAnimation);
    filterOptions.replaceChildren(...createFilterOptions(filters));
    setFilterToggleState(filterToggle, filterLabel, filterIcon, filterOptions, state.activeFilter, false);

    filterToggle.addEventListener('click', () => {
        const isOpen = filterToggle.getAttribute('aria-expanded') === 'true';
        setFilterToggleState(
            filterToggle,
            filterLabel,
            filterIcon,
            filterOptions,
            state.activeFilter,
            !isOpen
        );
    });

    filterOptions.addEventListener('click', (event) => {
        const option = event.target.closest('.filter-option');
        if (option) {
            applyProjectFilter(option.dataset.filter, elements, state);
        }
    });
}
