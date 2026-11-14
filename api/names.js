import { PROJECT_COUNT } from './project-settings.js';
import { formatProjectWord } from './format-project-word.js';

const NAME_API_URL = 'https://random-word-api.herokuapp.com/word?number=28';
const NAME_API_TIMEOUT = 5000;
const FALLBACK_PROJECT_NAMES = [
    'Project One',
    'Project Two',
    'Project Three',
    'Project Four',
    'Project Five',
    'Project Six',
    'Project Seven',
    'Project Eight',
    'Project Nine',
    'Project Ten',
    'Project Eleven',
    'Project Twelve',
    'Project Thirteen',
    'Project Fourteen'
];

export async function fetchNames() {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), NAME_API_TIMEOUT);

    try {
        const response = await fetch(NAME_API_URL, { signal: controller.signal });

        if (!response.ok) {
            throw new Error(`Unable to load external project names: ${response.status}`);
        }

        const words = await response.json();

        if (!Array.isArray(words) || words.length < PROJECT_COUNT * 2) {
            throw new Error('The external names API returned too few words.');
        }

        return Array.from({ length: PROJECT_COUNT }, (_, index) => {
            const firstWord = words[index * 2];
            const secondWord = words[index * 2 + 1];
            return `${formatProjectWord(firstWord)} ${formatProjectWord(secondWord)}`;
        });
    } catch (error) {
        console.error('Unable to load external project names. Using fallback names.', error);
        return Array.from(
            { length: PROJECT_COUNT },
            (_, index) => FALLBACK_PROJECT_NAMES[index] ?? `Project ${index + 1}`
        );
    } finally {
        window.clearTimeout(timeoutId);
    }
}
