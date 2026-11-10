export function renderFooter(target = document.querySelector('[data-component="footer"]')) {
    if (!target) {
        return;
    }

    target.outerHTML = `
        <footer class="site-footer" id="contacts">
            <h2 class="footer-title">Get in Touch</h2>

            <div class="footer-body">
                <address class="footer-contacts">
                    <dl>
                        <div>
                            <dt>Email:</dt>
                            <dd><a href="mailto:atoj@vernovo.pt">atoj@vernovo.pt</a></dd>
                        </div>
                        <div>
                            <dt>Phone:</dt>
                            <dd><a href="tel:+351935529547">+351 935 529 547</a></dd>
                        </div>
                        <div>
                            <dt>Location:</dt>
                            <dd><a href="https://maps.google.com/?q=Coimbra,Portugal">Coimbra, Portugal</a></dd>
                        </div>
                    </dl>

                    <p class="local-time">
                        Location time (GMT +1):
                        <time id="clock">--:--</time>
                    </p>
                </address>

                <p class="footer-bio">
                    Multidisciplinary visual designer and storyteller.
                    Currently doing Master’s degree in Coimbra University.
                    Take a look at my skills!
                </p>
            </div>

            <p class="footer-thanks">Thank you for your visit!</p>
        </footer>
    `;

    const clock = document.querySelector('#clock');

    if (!clock) {
        return;
    }

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