import { slugifyProjectName } from './slugify-project-name.js';

export function createProjectCard(project) {
    const slug = slugifyProjectName(project.name);
    const card = document.createElement('article');
    card.className = `project-card project-card--${slug}`;
    card.dataset.projectName = project.name;
    card.dataset.projectYear = project.year;
    card.dataset.projectCategory = project.category;
    card.dataset.projectId = project.id;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open ${project.name} project`);

    const image = document.createElement('img');
    image.className = `project-image project-image--${slug}`;
    image.src = project.cover.url;
    image.alt = project.cover.alt;
    image.loading = 'lazy';
    card.append(image);
    return card;
}
