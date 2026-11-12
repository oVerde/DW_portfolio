// Change this value to control how many project images are displayed.
const projectImageCount = 8;

const PROJECTS = [
    { name: 'Editorial project 01', category: 'Editorial', year: 2026 },
    { name: 'Editorial project 02', category: 'Editorial', year: 2026 },
    { name: 'Editorial project 03', category: 'Editorial', year: 2026 },
    { name: 'UX/UI project 01', category: 'UX/UI', year: 2026 },
    { name: 'Web project 01', category: 'Web', year: 2025 },
    { name: 'Web project 02', category: 'Web', year: 2025 },
    { name: 'Creative Code project 01', category: 'Creative Code', year: 2025 },
    { name: 'Graphic Design project 01', category: 'Graphic Design', year: 2025 }
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function renderProjects(imageCount = projectImageCount) {
    const grid = document.querySelector('[data-project-grid]');
    const list = document.querySelector('[data-project-list]');

    if (!grid || !list) {
        return;
    }

    const projects = PROJECTS.slice(0, Math.max(1, Math.floor(Number(imageCount) || 1)));
    const groupedProjects = projects.reduce((groups, project) => {
        (groups[project.year] ??= []).push(project);
        return groups;
    }, {});

    grid.replaceChildren(...projects.map((project) => {
        const slug = slugify(project.name);
        const card = document.createElement('article');
        card.className = `project-card project-card--${slug}`;
        card.dataset.projectName = project.name;
        card.dataset.projectYear = project.year;
        card.dataset.projectCategory = project.category;

        const image = document.createElement('div');
        image.className = `project-image project-image--${slug}`;
        image.setAttribute('role', 'img');
        image.setAttribute('aria-label', `${project.name}, ${project.year}`);
        card.append(image);
        return card;
    }));

    list.replaceChildren(...Object.entries(groupedProjects).map(([year, yearProjects]) => {
        const group = document.createElement('div');
        group.className = 'year-group';
        group.dataset.projectYear = year;
        group.innerHTML = `<h3 class="year-title">${year}</h3>`;

        const items = document.createElement('ul');
        items.className = 'projects-list-items';
        items.append(...yearProjects.map((project) => {
            const slug = slugify(project.name);
            const item = document.createElement('li');
            item.className = `project-item project-item--${slug}`;
            item.dataset.projectName = project.name;
            item.dataset.projectYear = project.year;
            item.dataset.projectCategory = project.category;

            const button = document.createElement('button');
            button.className = 'project-button';
            button.type = 'button';
            button.innerHTML = `<span class="project-name">${project.name}</span><span class="project-category">${project.category}</span>`;
            item.append(button);
            return item;
        }));

        group.append(items);
        return group;
    }));
}
