const IMAGE_COUNT = 126;
const IMAGE_COLOURS = ['00C760', '6A836E', '18211D', 'C1D8B3', 'FCFDFF'];

const shuffle = (items) => {
    const shuffledItems = [...items];

    for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
    }

    return shuffledItems;
};

const createImageUrl = (index) => {
    const firstColour = IMAGE_COLOURS[index % IMAGE_COLOURS.length];
    const secondColour = IMAGE_COLOURS[(index + 2) % IMAGE_COLOURS.length];
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 760">
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#${firstColour}"/>
                    <stop offset="100%" stop-color="#${secondColour}"/>
                </linearGradient>
            </defs>
            <rect width="600" height="760" fill="url(#gradient)"/>
            <circle cx="${100 + (index * 47) % 400}" cy="${150 + (index * 61) % 500}" r="${80 + (index * 13) % 180}" fill="#FCFDFF" fill-opacity=".18"/>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export function fetchImages() {
    const images = Array.from({ length: IMAGE_COUNT }, (_, index) => ({
        id: `local-image-${index + 1}`,
        url: createImageUrl(index),
        author: 'Local image generator'
    }));

    return Promise.resolve(shuffle(images));
}
