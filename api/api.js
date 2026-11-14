import { fetchImages } from './images.js';
import { fetchNames } from './names.js';
import { fetchAboutTexts } from './about-api.js';
import {
    MAX_PROJECT_IMAGES,
    MIN_PROJECT_IMAGES,
    PROJECT_COUNT,
    RANDOM_PROJECT_TAGS
} from './project-settings.js';
import { createProject } from './create-project.js';
import { getRandomIndex } from './get-random-index.js';

export async function fetchProjects() {
    const [images, names, aboutTexts] = await Promise.all([
        fetchImages(),
        fetchNames(),
        fetchAboutTexts(PROJECT_COUNT)
    ]);
    const projects = [];
    let imageIndex = 0;

    for (let index = 0; index < PROJECT_COUNT; index += 1) {
        const name = names[index];
        const category = RANDOM_PROJECT_TAGS[getRandomIndex(RANDOM_PROJECT_TAGS.length)];
        const imageCount = MIN_PROJECT_IMAGES
            + getRandomIndex(MAX_PROJECT_IMAGES - MIN_PROJECT_IMAGES + 1);
        const projectImages = images.slice(imageIndex, imageIndex + imageCount + 1);
        imageIndex += imageCount + 1;

        projects.push(createProject(
            name,
            category,
            2020 + getRandomIndex(7),
            projectImages,
            `project-${index + 1}`,
            aboutTexts[index]
        ));
    }

    return projects;
}
