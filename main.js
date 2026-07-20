/* Logo preloader — plays on every page load */
(function initPreloader() {
    const preloader = document.getElementById('site-preloader');
    const MIN_DISPLAY_MS = 2200;
    const FADE_MS = 600;
    let done = false;

    function revealSite() {
        if (done) return;
        done = true;
        document.body.classList.remove('is-loading');
        document.body.classList.add('site-ready');

        if (!preloader) return;

        preloader.classList.add('preloader-hidden');
        setTimeout(function () {
            if (preloader.parentNode) preloader.remove();
        }, FADE_MS);
    }

    if (!preloader) {
        document.body.classList.remove('is-loading');
        document.body.classList.add('site-ready');
        return;
    }

    const startedAt = Date.now();

    function startReveal() {
        const elapsed = Date.now() - startedAt;
        const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(revealSite, delay);
    }

    if (document.readyState === 'complete') {
        startReveal();
    } else {
        window.addEventListener('load', startReveal);
    }

    /* Failsafe */
    setTimeout(revealSite, 5000);
})();

document.addEventListener('DOMContentLoaded', function () {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    let currentPage = pathParts[pathParts.length - 1] || '';

    if (currentPage === '' || currentPage === 'index.html') {
        currentPage = 'index';
    }
    const currentPageNormalized = currentPage.replace(/\.html$/, '');

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        const href = link.getAttribute('href') || '';
        let linkPath = href.split('/').filter(Boolean).pop() || '';
        if (href === '/' || linkPath === '') {
            linkPath = 'index';
        }
        const linkPathNormalized = linkPath.replace(/\.html$/, '');

        if (linkPathNormalized === currentPageNormalized) {
            link.classList.add('active');
        }
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll(
        '.glass-card, .service-card, .featured-card, .value-card, .case-study-card, .process-step, .info-card, .service-detail-card, .solution-card, .stat-card'
    ).forEach(function (card) {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        document.addEventListener('click', function (event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
});
