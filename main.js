// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    // Handle both clean URLs (/about) and .html extensions (/about.html)
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Normalize: remove .html extension for comparison and handle root path
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }
    const currentPageNormalized = currentPage.replace(/\.html$/, '');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        const linkPathNormalized = linkPath.replace(/\.html$/, '');
        
        // Match if normalized paths are the same, or if current page is root/index
        if (linkPathNormalized === currentPageNormalized || 
            (currentPageNormalized === 'index' && linkPathNormalized === 'index') ||
            (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Simple fade-in on scroll functionality
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe service cards for fade-in effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Smooth scroll for anchor links (if needed in future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

