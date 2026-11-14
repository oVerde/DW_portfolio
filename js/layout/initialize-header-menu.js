export function initializeHeaderMenu(header) {
    const navigation = header.querySelector('.nav');
    const burger = header.querySelector('.burger');

    if (!navigation || !burger) {
        return;
    }

    navigation.id = 'main-navigation';
    burger.addEventListener('click', () => {
        const isOpen = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!isOpen));
        navigation.classList.toggle('is-open', !isOpen);
    });
}
