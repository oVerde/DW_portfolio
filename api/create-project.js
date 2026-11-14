export function createProject(name, category, year, projectImages) {
    const cover = projectImages[0];

    return {
        id: cover.id,
        name,
        category,
        year,
        cover: {
            url: cover.url,
            alt: `${name} project cover by ${cover.author}`
        },
        images: projectImages.slice(1).map((image) => ({
            url: image.url,
            alt: `${name} project image by ${image.author}`
        }))
    };
}
