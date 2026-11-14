export function createCursorElement() {
    const cursor = document.createElement('span');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    const cursorLabel = document.createElement('span');
    cursorLabel.className = 'custom-cursor-label';
    cursor.append(cursorLabel);
    document.body.append(cursor);

    return { cursor, cursorLabel };
}
