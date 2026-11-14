const appendProjectImage = (container, image) => {
    if (!container || !image) {
        return;
    }

    const imageElement = document.createElement('img');
    imageElement.className = 'project-detail-image';
    imageElement.src = image.url;
    imageElement.alt = image.alt;
    imageElement.loading = 'lazy';
    container.append(imageElement);
};

const renderTags = (container, tags) => {
    container.replaceChildren(...tags.map((tag) => {
        const item = document.createElement('li');
        item.className = 'tag';
        item.textContent = tag;
        return item;
    }));
};

const renderProjectDetail = (project, nextProject, detail, detailTemplate) => {
    const detailFragment = detailTemplate.content.cloneNode(true);
    const title = detailFragment.querySelector('.project-detail-title');
    const summary = detailFragment.querySelector('.project-detail-summary');
    const tags = detailFragment.querySelector('.project-detail-tags');
    const statements = detailFragment.querySelectorAll('.project-detail-statement');
    const hero = detailFragment.querySelector('.project-detail-hero');
    const gallery = detailFragment.querySelector('.project-detail-gallery');
    const secondaryMedia = detailFragment.querySelector('.project-detail-secondary-media');
    const description = detailFragment.querySelector('.project-detail-description');
    const imageTemplate = detailFragment.querySelector('#project-detail-image-template');
    const nextTitle = detailFragment.querySelector('.next-project-title');
    const nextSummary = detailFragment.querySelector('.next-project-summary');
    const nextTags = detailFragment.querySelector('.next-project-tags');

    title.textContent = project.name;
    summary.textContent = `${project.category} project from ${project.year}`;
    renderTags(tags, [project.category, project.year]);
    statements.forEach((statement) => {
        statement.textContent = `${project.name} — ${project.category}, ${project.year}.`;
    });
    description.textContent = `${project.name} is a ${project.category} project from ${project.year}.`;

    appendProjectImage(hero, project.cover);
    project.images.slice(0, 2).forEach((image) => {
        const media = imageTemplate.content.firstElementChild.cloneNode(true);
        appendProjectImage(media, image);
        gallery.append(media);
    });
    appendProjectImage(secondaryMedia, project.images[2]);
    project.images.slice(3).forEach((image) => appendProjectImage(gallery, image));
    imageTemplate.remove();

    nextTitle.textContent = nextProject.name;
    nextSummary.textContent = `${nextProject.category} project from ${nextProject.year}`;
    renderTags(nextTags, [nextProject.category, nextProject.year]);

    detail.replaceChildren(detailFragment);
    return detail.querySelector('.project-detail-close');
};

export function initProjectDetails(projects) {
    const detail = document.querySelector('[data-project-detail]');
    const detailTemplate = document.querySelector('#project-detail-template');
    const header = document.querySelector('.site-header');
    const projectTriggers = document.querySelectorAll('.project-button, .project-card');

    if (!detail || !detailTemplate || !header || !projectTriggers.length) {
        return;
    }

    const projectsById = new Map(projects.map((project) => [String(project.id), project]));
    let activeProject;
    let touchStartY = 0;
    let panelTop = 0;
    let collapsedTop = 0;
    let headerTop = 0;

    const updateHeaderHeight = () => {
        headerTop = header.getBoundingClientRect().height;
        collapsedTop = Math.max(headerTop, window.innerHeight * 0.3);
        detail.style.setProperty('--project-header-height', `${headerTop}px`);

        if (activeProject) {
            panelTop = Math.min(Math.max(panelTop, headerTop), collapsedTop);
            detail.style.top = `${panelTop}px`;
        }
    };

    const closeDetail = () => {
        detail.classList.remove('is-expanded', 'is-open');
        detail.setAttribute('aria-hidden', 'true');
        detail.style.removeProperty('top');
        activeProject = undefined;
    };

    const movePanel = (scrollDelta) => {
        const nextTop = Math.min(Math.max(panelTop - scrollDelta, headerTop), collapsedTop);
        const moved = nextTop !== panelTop;
        panelTop = nextTop;
        detail.style.top = `${panelTop}px`;
        detail.classList.toggle('is-expanded', panelTop === headerTop);
        return moved;
    };

    const openDetail = (projectId) => {
        const project = projectsById.get(String(projectId));
        if (!project) {
            console.error(`Unable to open project details for "${projectId}".`);
            return;
        }

        activeProject = project;
        const projectIndex = projects.indexOf(project);
        const nextProject = projects[(projectIndex + 1) % projects.length];
        const closeButton = renderProjectDetail(project, nextProject, detail, detailTemplate);
        panelTop = collapsedTop;
        detail.style.top = `${panelTop}px`;
        detail.classList.remove('is-expanded');
        detail.classList.add('is-open');
        detail.setAttribute('aria-hidden', 'false');
        closeButton.focus({ preventScroll: true });
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    projectTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => openDetail(trigger.dataset.projectId));
        if (trigger.classList.contains('project-card')) {
            trigger.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openDetail(trigger.dataset.projectId);
                }
            });
        }
    });

    detail.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('.project-detail-close')) {
            closeDetail();
        }
    });

    detail.addEventListener('wheel', (event) => {
        const canMoveUp = event.deltaY > 0 && panelTop > headerTop;
        const canMoveDown = event.deltaY < 0 && detail.scrollTop === 0 && panelTop < collapsedTop;

        if (activeProject && (canMoveUp || canMoveDown) && movePanel(event.deltaY)) {
            event.preventDefault();
        }
    }, { passive: false });

    detail.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    detail.addEventListener('touchmove', (event) => {
        const touchDelta = touchStartY - event.touches[0].clientY;
        const canMoveUp = touchDelta > 0 && panelTop > headerTop;
        const canMoveDown = touchDelta < 0 && detail.scrollTop === 0 && panelTop < collapsedTop;

        if (activeProject && (canMoveUp || canMoveDown) && movePanel(touchDelta)) {
            event.preventDefault();
        }
        touchStartY = event.touches[0].clientY;
    }, { passive: false });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeProject) {
            closeDetail();
        }
    });
}
