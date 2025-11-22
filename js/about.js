document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18 }
        );
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const counterGroups = document.querySelectorAll('[data-counter-group]');

    const animateCounter = (element) => {
        const target = Number(element.getAttribute('data-counter')) || 0;
        const duration = 1600;
        const startTime = performance.now();

        const step = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const initCounters = () => {
        counterGroups.forEach((group) => {
            const counters = group.querySelectorAll('[data-counter]');
            counters.forEach((counter) => {
                if (!counter.dataset.initialized) {
                    counter.dataset.initialized = 'true';
                    animateCounter(counter);
                }
            });
        });
    };

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        initCounters();
                        counterObserver.disconnect();
                    }
                });
            },
            { threshold: 0.35 }
        );
        counterGroups.forEach((group) => counterObserver.observe(group));
    } else {
        initCounters();
    }
});
