document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('team-search');
    const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
    const teamCards = Array.from(document.querySelectorAll('.team-card'));
    let activeFilter = 'all';

    const normalize = (value = '') => value.toLowerCase().trim();

    const applyFilters = () => {
        const query = normalize(searchInput ? searchInput.value : '');
        teamCards.forEach((card) => {
            const category = card.dataset.category || 'all';
            const name = card.dataset.name || '';
            const textMatch = card.textContent.toLowerCase().includes(query) || name.includes(query);
            const filterMatch = activeFilter === 'all' || category === activeFilter;
            const shouldShow = (!query || textMatch) && filterMatch;
            card.style.display = shouldShow ? '' : 'none';
            card.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
        });
    };

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            window.requestAnimationFrame(applyFilters);
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter || 'all';
            filterButtons.forEach((btn) => btn.classList.remove('is-active'));
            filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
            button.classList.add('is-active');
            button.setAttribute('aria-pressed', 'true');
            applyFilters();
        });
    });

    applyFilters();

    let previousFocusElement = null;

    const openModal = (modal) => {
        if (!modal) return;
        previousFocusElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        const closeButton = modal.querySelector('.team-modal__close');
        if (closeButton) {
            closeButton.focus();
        }
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (previousFocusElement) {
            previousFocusElement.focus();
            previousFocusElement = null;
        }
    };

    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach((trigger) => {
        if (!trigger.id) {
            trigger.id = `modal-trigger-${Math.random().toString(36).slice(2, 8)}`;
        }
        trigger.addEventListener('click', () => {
            const modal = document.querySelector(trigger.dataset.modalTarget);
            openModal(modal);
        });
    });

    document.querySelectorAll('[data-modal-close]').forEach((closer) => {
        closer.addEventListener('click', () => {
            const modal = closer.closest('.team-modal');
            closeModal(modal);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModalEl = document.querySelector('.team-modal[aria-hidden="false"]');
            if (openModalEl) {
                closeModal(openModalEl);
            }
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.dataset.modalClose !== undefined) {
            const modal = target.closest('.team-modal');
            closeModal(modal);
        }
        if (target instanceof HTMLElement && target.classList.contains('team-modal__overlay')) {
            const modal = target.closest('.team-modal');
            closeModal(modal);
        }
    });

    const revealItems = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }
});
