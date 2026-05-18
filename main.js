/* Preloader — backup only; inline script in HTML dismisses it first */
(function initPreloaderBackup() {
    const preloader = document.getElementById('site-preloader');
    if (!preloader) {
        document.body.classList.remove('is-loading');
        return;
    }

    function dismissPreloader() {
        document.body.classList.remove('is-loading');
        if (!preloader.parentNode) return;
        preloader.classList.add('preloader-hidden');
        setTimeout(function() {
            if (preloader.parentNode) preloader.remove();
        }, 500);
    }

    /* Hard failsafe if inline script did not run */
    setTimeout(dismissPreloader, 4000);
})();

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }
    const currentPageNormalized = currentPage.replace(/\.html$/, '');

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        const linkPath = link.getAttribute('href').split('/').pop();
        const linkPathNormalized = linkPath.replace(/\.html$/, '');

        if (linkPathNormalized === currentPageNormalized ||
            (currentPageNormalized === 'index' && linkPathNormalized === 'index') ||
            (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    });

    document.querySelectorAll(
        '.glass-card, .service-card, .featured-card, .value-card, .case-study-card, .process-step, .info-card, .stat-card'
    ).forEach(function(card) {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
});
