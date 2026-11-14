import { animateProjectCount } from './animate-project-count.js';
import { keepFilterInPlace } from './keep-filter-in-place.js';
import { setFilterToggleState } from './set-filter-toggle-state.js';
import { updateYearGroups } from './update-year-groups.js';

export function applyProjectFilter(filter, elements, state) {
    const {
        filterToggle,
        filterLabel,
        filterIcon,
        filterOptions,
        projectCount,
        projectItems,
        projectCards,
        yearGroups
    } = elements;
    const filterTop = filterToggle.getBoundingClientRect().top;

    state.activeFilter = filter;
    projectItems.forEach((item) => {
        const isFiltered = filter !== state.allProjectsFilter
            && item.dataset.projectCategory !== filter;
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
        const isFiltered = filter !== state.allProjectsFilter
            && card.dataset.projectCategory !== filter;
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

    updateYearGroups(yearGroups);
    const visibleProjects = projectItems.filter((item) => !item.classList.contains('is-filtered')).length;
    animateProjectCount(projectCount, visibleProjects, state.countAnimation);
    setFilterToggleState(filterToggle, filterLabel, filterIcon, filterOptions, state.activeFilter, false);
    keepFilterInPlace(filterToggle, filterTop);
}
