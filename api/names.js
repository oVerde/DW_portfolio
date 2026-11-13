const PROJECT_COUNT = 14;
const NAME_API_URL = 'https://random-word-api.herokuapp.com/word?number=28';

const formatWord = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export async function fetchNames() {
    const response = await fetch(NAME_API_URL);

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
        return `${formatWord(firstWord)} ${formatWord(secondWord)}`;
    });
}
