const ABOUT_API_URL = 'https://baconipsum.com/api/?type=meat-and-filler&paras=56&format=json';
const ABOUT_API_TIMEOUT = 5000;
const PARAGRAPHS_PER_PROJECT = 4;

const FALLBACK_PARAGRAPH = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    + 'Integer vitae neque at nunc consequat feugiat. '
    + 'Mauris non sem sed libero consequat tincidunt.';

export async function fetchAboutTexts(projectCount) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), ABOUT_API_TIMEOUT);

    try {
        const response = await fetch(ABOUT_API_URL, { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`Unable to load project descriptions: ${response.status}`);
        }

        const paragraphs = await response.json();
        if (!Array.isArray(paragraphs) || paragraphs.length < projectCount * PARAGRAPHS_PER_PROJECT) {
            throw new Error('The descriptions API returned too few paragraphs.');
        }

        return Array.from({ length: projectCount }, (_, projectIndex) => {
            const start = projectIndex * PARAGRAPHS_PER_PROJECT;
            return paragraphs
                .slice(start, start + PARAGRAPHS_PER_PROJECT)
                .filter((paragraph) => typeof paragraph === 'string' && paragraph.trim());
        });
    } catch (error) {
        console.error('Unable to load project descriptions. Using fallback text.', error);
        return Array.from(
            { length: projectCount },
            (_, projectIndex) => Array.from(
                { length: PARAGRAPHS_PER_PROJECT },
                (_, paragraphIndex) => `${FALLBACK_PARAGRAPH} Project ${projectIndex + 1}, paragraph ${paragraphIndex + 1}.`
            )
        );
    } finally {
        window.clearTimeout(timeoutId);
    }
}