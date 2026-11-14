import { appendProjectImage } from './append-project-image.js';
import { renderProjectTags } from './render-project-tags.js';

export function populateProjectDetail(project, nextProject, detail, detailTemplate) {
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
    const nextLink = detailFragment.querySelector('.next-project-link');

    title.textContent = project.name;
    summary.textContent = `${project.category} project from ${project.year}`;
    renderProjectTags(tags, [project.category, project.year]);
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
    renderProjectTags(nextTags, [nextProject.category, nextProject.year]);
    nextLink.dataset.projectId = nextProject.id;

    detail.replaceChildren(detailFragment);
    return detail.querySelector('.project-detail-close');
}
