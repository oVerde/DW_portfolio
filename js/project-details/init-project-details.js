import { findRelatedProject } from './find-related-project.js';
import { populateProjectDetail } from './populate-project-detail.js';

const PANEL_TRANSITION_DURATION = 700;

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

        const nextProject = findRelatedProject(project, projects);
        if (!nextProject) {
            console.error(`Unable to find a next project for "${project.id}".`);
            return;
        }

        activeProject = project;
        detail.scrollTop = 0;
        const closeButton = populateProjectDetail(project, nextProject, detail, detailTemplate);
        panelTop = collapsedTop;
        detail.style.top = `${panelTop}px`;
        detail.classList.remove('is-expanded');
        detail.classList.add('is-open');
        detail.setAttribute('aria-hidden', 'false');
        closeButton.focus({ preventScroll: true });
    };

    const openNextProject = (projectId) => {
        closeDetail();
        window.setTimeout(() => openDetail(projectId), PANEL_TRANSITION_DURATION);
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
        if (!(event.target instanceof Element)) {
            return;
        }

        const nextProjectLink = event.target.closest('.next-project-link');
        if (nextProjectLink instanceof HTMLButtonElement) {
            openNextProject(nextProjectLink.dataset.projectId);
            return;
        }

        if (event.target.closest('.project-detail-close')) {
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
