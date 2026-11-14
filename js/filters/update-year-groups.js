export function updateYearGroups(yearGroups) {
    yearGroups.forEach((group) => {
        const hasVisibleProjects = group.querySelector('.project-item:not(.is-filtered)');
        group.classList.toggle('is-filtered', !hasVisibleProjects);
    });
}
