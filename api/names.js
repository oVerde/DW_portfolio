const NAME_SOURCE_URL = 'https://randomuser.me/api/?results=14&inc=name';
const REQUEST_TIMEOUT = 10000;

export async function fetchNames() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    let response;

    try {
        response = await fetch(NAME_SOURCE_URL, { signal: controller.signal });
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('The external names API timed out.');
        }

        throw error;
    } finally {
        clearTimeout(timeout);
    }

    if (!response.ok) {
        throw new Error(`Unable to load external names: ${response.status}`);
    }

    const data = await response.json();
    const names = Array.isArray(data?.results)
        ? data.results.map(({ name }) => `${name?.first ?? ''} ${name?.last ?? ''}`.trim())
        : [];

    if (names.length === 0 || names.some((name) => !name)) {
        throw new Error('The external names API returned no names.');
    }

    return names;
}
