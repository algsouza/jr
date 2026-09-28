// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Reveal-on-scroll
const revealTargets = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
} else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Hero video: only activate once a source actually loads, and never
// against the user's reduced-motion preference, a constrained connection,
// or on small/mobile viewports (poster image carries the visual there —
// a 7MB autoplay video on mobile data is not an appropriate trade-off).
const heroVideo = document.getElementById('hero-video');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const savesData = navigator.connection && navigator.connection.saveData;
const isMobileViewport = window.matchMedia('(max-width: 860px)').matches;

if (heroVideo && !prefersReducedMotion && !savesData && !isMobileViewport) {
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.classList.add('is-active');
        heroVideo.closest('.hero').classList.add('has-video');
    });
    heroVideo.addEventListener('error', () => {
        heroVideo.remove();
    });
    heroVideo.load();
} else if (heroVideo) {
    heroVideo.remove();
}
