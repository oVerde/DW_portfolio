import { slugifyProjectName } from './slugify-project-name.js';

export function createProjectList(yearProjects, year) {
    const group = document.createElement('div');
    group.className = 'year-group';
    group.dataset.projectYear = year;
    group.innerHTML = `<h3 class="year-title">${year}</h3>`;

    const items = document.createElement('ul');
    items.className = 'projects-list-items';
    items.append(...yearProjects.map((project) => {
        const slug = slugifyProjectName(project.name);
        const item = document.createElement('li');
        item.className = `project-item project-item--${slug}`;
        item.dataset.projectName = project.name;
        item.dataset.projectYear = project.year;
        item.dataset.projectCategory = project.category;
        item.dataset.projectId = project.id;

        const button = document.createElement('button');
        button.className = 'project-button';
        button.type = 'button';
        button.dataset.projectId = project.id;
        button.innerHTML = `<span class="project-name">${project.name}</span><span class="project-category">${project.category}</span>`;
        item.append(button);
        return item;
    }));

    group.append(items);
    return group;
}
