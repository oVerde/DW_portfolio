const NAMES = [
    'Quiet Geometry', 'Soft Collision', 'Hidden Structure', 'Afterlight',
    'Open Frequency', 'Second Nature', 'Parallel Lines', 'Familiar Distance',
    'Slow Bloom', 'Raw Material', 'New Ritual', 'Common Ground',
    'Moving Image', 'Bright Noise'
];

export function fetchNames() {
    return Promise.resolve([...NAMES]);
}
