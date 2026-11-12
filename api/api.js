import { fetchImages } from './images.js';
import { fetchNames } from './names.js';

const RANDOM_TAGS = ['Editorial', 'UX/UI', 'Web', 'Creative Code', 'Graphic Design'];
const PROJECT_COUNT = 14;
const MIN_PROJECT_IMAGES = 3;
const MAX_PROJECT_IMAGES = 8;
const randomValue = (max) => Math.floor(Math.random() * max);

export async function fetchProjects() {
    const [images, names] = await Promise.all([fetchImages(), fetchNames()]);
    const projects = [];
    let imageIndex = 0;

    for (let index = 0; index < PROJECT_COUNT; index += 1) {
        const name = names[index];
        const category = RANDOM_TAGS[randomValue(RANDOM_TAGS.length)];
        const imageCount = MIN_PROJECT_IMAGES + randomValue(MAX_PROJECT_IMAGES - MIN_PROJECT_IMAGES + 1);
        const projectImages = images.slice(imageIndex, imageIndex + imageCount + 1);
        const cover = projectImages[0];
        imageIndex += imageCount + 1;

        projects.push({
            id: cover.id,
            name,
            category,
            year: 2020 + randomValue(7),
            cover: {
                url: cover.url,
                alt: `${name} project cover by ${cover.author}`
            },
            images: projectImages.slice(1).map((image) => ({
                url: image.url,
                alt: `${name} project image by ${image.author}`
            }))
        });
    }

    return projects;
}