export function startFooterClock(clock) {
    const updateClock = () => {
        clock.textContent = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Europe/Lisbon',
            hour: 'numeric',
            minute: '2-digit'
        }).format(new Date());
    };

    updateClock();
    window.setInterval(updateClock, 60_000);
}
