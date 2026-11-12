const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function renderProjects(projects) {
    const grid = document.querySelector('[data-project-grid]');
    const list = document.querySelector('[data-project-list]');

    if (!grid || !list) {
        return;
    }

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

        const image = document.createElement('img');
        image.className = `project-image project-image--${slug}`;
        image.src = project.cover.url;
        image.alt = project.cover.alt;
        image.loading = 'lazy';
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
