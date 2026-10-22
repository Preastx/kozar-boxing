/* Kozar Boxing – page behaviour
   Loaded with `defer`, so the DOM is ready when this runs. */

/* ---------- Mobile menu ---------- */
(function initMobileMenu() {
    const menu = document.getElementById('site-menu');
    const openButton = document.querySelector('.site-nav__toggle--open');
    const closeButton = document.querySelector('.site-nav__toggle--close');

    function setMenuOpen(isOpen) {
        menu.classList.toggle('is-open', isOpen);
        openButton.setAttribute('aria-expanded', String(isOpen));
    }

    openButton.addEventListener('click', () => setMenuOpen(true));
    closeButton.addEventListener('click', () => setMenuOpen(false));

    // Close the menu after picking a section
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });
})();

/* ---------- Plan tabs (Services section) ---------- */
(function initPlanTabs() {
    const tabs = document.querySelectorAll('.tabs__tab');
    const panels = document.querySelectorAll('.tabs__panel');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => {
                t.classList.remove('is-active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach((panel) => panel.classList.remove('is-active'));

            tab.classList.add('is-active');
            tab.setAttribute('aria-selected', 'true');
            document.getElementById(tab.dataset.tab).classList.add('is-active');
        });
    });
})();

/* ---------- Sliders (gallery + testimonials) ---------- */
(function initSliders() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.js-slider').forEach((slider) => {
        new Swiper(slider, {
            slidesPerView: 1,
            grabCursor: true,
            loop: true,
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev'),
            },
        });
    });
})();

/* ---------- Reveal-on-scroll animation ---------- */
(function initReveal() {
    const REVEAL_OFFSET = 150; // px the element must be inside the viewport
    const elements = document.querySelectorAll('.reveal');

    function revealVisibleElements() {
        const windowHeight = window.innerHeight;
        elements.forEach((element) => {
            if (element.getBoundingClientRect().top < windowHeight - REVEAL_OFFSET) {
                element.classList.add('is-visible');
            }
        });
    }

    window.addEventListener('scroll', revealVisibleElements, { passive: true });
    revealVisibleElements(); // show whatever is already on screen at load
})();

/* ---------- Contact form result (set by mail.php redirect) ---------- */
(function showContactStatus() {
    const status = new URLSearchParams(window.location.search).get('contact');
    if (!status) return;

    const message = document.querySelector('.contact-form__status');
    message.textContent = status === 'sent'
        ? 'Thanks! Your message has been sent.'
        : 'Sorry, your message could not be sent. Please check the form and try again.';
    message.hidden = false;
})();
