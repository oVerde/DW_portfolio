export function createProject(
    name,
    category,
    year,
    projectImages,
    projectId = projectImages[0].id,
    about = []
) {
    const cover = projectImages[0];

    return {
        id: projectId,
        name,
        category,
        year,
        about,
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
