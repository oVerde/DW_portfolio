import { findRelatedProject } from './find-related-project.js';
import { populateProjectDetail } from './populate-project-detail.js';

const PROJECT_CONTENT_TRANSITION_DURATION = 300;
export function initProjectDetails(projects) {
    const detail = document.querySelector('[data-project-detail]');
    const detailTemplate = document.querySelector('#project-detail-template');
    const header = document.querySelector('.site-header');
    const projectTriggers = document.querySelectorAll('.project-button, .project-card');

    if (!detail || !detailTemplate || !header || !projectTriggers.length) {
        return;
    }

    const backdrop = document.createElement('div');
    backdrop.className = 'project-detail-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    detail.before(backdrop);

    const projectsById = new Map(projects.map((project) => [String(project.id), project]));
    let activeProject;
    let touchStartY = 0;
    let panelTop = 0;
    let collapsedTop = 0;
    let headerTop = 0;
    let scrollingTimeout;
    let touchStartedInAbout = false;

    const updateHeaderHeight = () => {
        headerTop = header.getBoundingClientRect().height;
        collapsedTop = Math.max(headerTop, window.innerHeight * 0.3);
        document.documentElement.style.setProperty('--site-header-height', `${headerTop}px`);
        detail.style.setProperty('--project-header-height', `${headerTop}px`);
        backdrop.style.setProperty('--project-header-height', `${headerTop}px`);

        if (activeProject) {
            panelTop = Math.min(Math.max(panelTop, headerTop), collapsedTop);
            detail.style.top = `${panelTop}px`;
        }
    };

    const closeDetail = () => {
        setAboutState(false);
        detail.classList.remove('is-scrolling', 'is-project-changing');
        window.clearTimeout(scrollingTimeout);
        detail.classList.remove('is-open-stable');
        detail.classList.remove('is-expanded', 'is-open');
        detail.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('project-detail-open');
        document.documentElement.style.removeProperty('--site-header-height');
        document.body.classList.remove('project-detail-open');
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

    const updateProjectHeaderHeight = () => {
        const projectHeader = detail.querySelector('.page > .project-header');
        if (projectHeader) {
            detail.style.setProperty(
                '--project-content-header-height',
                `${projectHeader.getBoundingClientRect().height}px`
            );
        }
    };

    const setAboutState = (isOpen) => {
        detail.classList.toggle('is-about-open', isOpen);
        const aboutButton = detail.querySelector('.project-detail-about');
        if (aboutButton instanceof HTMLButtonElement) {
            aboutButton.setAttribute('aria-expanded', String(isOpen));
        }
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
        const topbar = detail.querySelector('.topbar');
        if (topbar) {
            detail.style.setProperty('--project-topbar-height', `${topbar.getBoundingClientRect().height}px`);
        }
        updateProjectHeaderHeight();
        setAboutState(false);
        panelTop = collapsedTop;
        detail.style.top = `${panelTop}px`;
        detail.classList.remove('is-expanded');
        detail.classList.remove('is-open-stable');
        detail.classList.add('is-open');
        detail.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('project-detail-open');
        document.body.classList.add('project-detail-open');
        closeButton.focus({ preventScroll: true });
    };

    const openNextProject = (projectId) => {
        const project = projectsById.get(String(projectId));
        if (!project) {
            console.error(`Unable to open project details for "${projectId}".`);
            return;
        }

        const nextProject = findRelatedProject(project, projects, [activeProject?.id]);
        if (!nextProject) {
            console.error(`Unable to find a next project for "${project.id}".`);
            return;
        }

        detail.classList.add('is-project-changing');
        window.setTimeout(() => {
            activeProject = project;
            detail.scrollTop = 0;
            const closeButton = populateProjectDetail(project, nextProject, detail, detailTemplate);
            updateProjectHeaderHeight();
            setAboutState(false);
            window.requestAnimationFrame(() => {
                detail.classList.remove('is-project-changing');
            });
            closeButton.focus({ preventScroll: true });
        }, PROJECT_CONTENT_TRANSITION_DURATION);
    };

    const markScrolling = () => {
        detail.classList.add('is-scrolling');
        window.clearTimeout(scrollingTimeout);
        scrollingTimeout = window.setTimeout(() => {
            detail.classList.remove('is-scrolling');
        }, 180);
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
            return;
        }

        const aboutButton = event.target.closest('.project-detail-about');
        if (aboutButton instanceof HTMLButtonElement) {
            setAboutState(!detail.classList.contains('is-about-open'));
        }
    });

    backdrop.addEventListener('click', closeDetail);

    const handleWheel = (event) => {
        if (!activeProject) {
            return;
        }

        markScrolling();

        const isInsideDetail = event.target instanceof Element && detail.contains(event.target);
        const isInsideAbout = event.target instanceof Element
            && event.target.closest('.project-detail-content');

        const canMoveUp = event.deltaY > 0 && panelTop > headerTop;
        const canMoveDown = event.deltaY < 0 && detail.scrollTop === 0 && panelTop < collapsedTop;
        if ((canMoveUp || canMoveDown) && movePanel(event.deltaY)) {
            event.preventDefault();
            return;
        }

        if (!isInsideDetail || isInsideAbout) {
            detail.scrollTop += event.deltaY;
            event.preventDefault();
        }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    detail.addEventListener('scroll', markScrolling);

    detail.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
        touchStartedInAbout = event.target instanceof Element
            && Boolean(event.target.closest('.project-detail-content'));
    }, { passive: true });

    detail.addEventListener('touchmove', (event) => {
        const touchDelta = touchStartY - event.touches[0].clientY;
        markScrolling();

        const canMoveUp = touchDelta > 0 && panelTop > headerTop;
        const canMoveDown = touchDelta < 0 && detail.scrollTop === 0 && panelTop < collapsedTop;
        if ((canMoveUp || canMoveDown) && movePanel(touchDelta)) {
            event.preventDefault();
            touchStartY = event.touches[0].clientY;
            return;
        }

        if (touchStartedInAbout) {
            detail.scrollTop += touchDelta;
            event.preventDefault();
            touchStartY = event.touches[0].clientY;
            return;
        }

        touchStartY = event.touches[0].clientY;
    }, { passive: false });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeProject) {
            closeDetail();
        }
    });
}
