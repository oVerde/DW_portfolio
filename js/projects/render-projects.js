import { createProjectCard } from './create-project-card.js';
import { createProjectList } from './create-project-list.js';
import { groupProjectsByYear } from './group-projects-by-year.js';

export function renderProjects(projects) {
    const grid = document.querySelector('[data-project-grid]');
    const list = document.querySelector('[data-project-list]');

    if (!grid || !list) {
        return;
    }

    const groupedProjects = groupProjectsByYear(projects);
    grid.replaceChildren(...projects.map(createProjectCard));
    list.replaceChildren(...Object.entries(groupedProjects)
        .map(([year, yearProjects]) => createProjectList(yearProjects, year)));
}
