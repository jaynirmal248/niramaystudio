// Handles the flowing data-servicess menu interactions, animations, and content swaps.
(() => {
    const menu = document.querySelector('[data-flowing-menu]');
    if (!menu) return;

    const items = Array.from(menu.querySelectorAll('[data-flowing-menu-item]'));
    if (!items.length) return;

    const display = document.querySelector('[data-services-display]');
    // On the page these elements use the "services" data-* names (renamed from testimonial)
    const displayBg = display?.querySelector('[data-services-visual]');
    const content = display?.querySelector('[data-services-content]');
    const summaryEl = display?.querySelector('[data-services-summary]');
    const quoteEl = display?.querySelector('[data-services-quote]');
    const nameEl = display?.querySelector('[data-services-name]');
    const roleEl = display?.querySelector('[data-services-role]');

    const hasGSAP = typeof window.gsap !== 'undefined';
    const overlayAnimation = { duration: 0.6, ease: 'expo.out' };
    const transitionAnimation = { duration: 0.32, ease: 'power3.out' };

    const state = {
        active: items.find(item => item.classList.contains('is-active')) || items[0]
    };

    if (!state.active) {
        state.active = items[0];
        state.active.classList.add('is-active');
    }

    items.forEach(item => {
        item.setAttribute('aria-selected', item === state.active ? 'true' : 'false');
        item.setAttribute('tabindex', item === state.active ? '0' : '-1');
        item.addEventListener('click', () => setActiveItem(item));
        item.addEventListener('keydown', handleKeydown);
        item.addEventListener('mouseenter', event => handleHover(event, item, true));
        item.addEventListener('mouseleave', event => handleHover(event, item, false));
        item.addEventListener('focus', () => handleFocus(item, true));
        item.addEventListener('blur', () => handleFocus(item, false));
    });

    updateDisplay(state.active, false);
    syncOverlay(state.active, { immediate: true });

    function handleKeydown(event) {
        const { key } = event;
        const current = event.currentTarget;

        if (key === 'Enter' || key === ' ') {
            event.preventDefault();
            setActiveItem(current);
            return;
        }

        if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(key)) {
            return;
        }

        event.preventDefault();
        const index = items.indexOf(current);
        if (index === -1) return;

        const direction = key === 'ArrowDown' || key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (index + direction + items.length) % items.length;
        const target = items[nextIndex];
        setActiveItem(target);
        target.focus();
    }

    function handleHover(event, item, entering) {
        if (event.type === 'mouseleave' && item === state.active) {
            return;
        }

        const edge = findClosestEdge(event, item);
        animateOverlay(item, { show: entering, edge });
    }

    function handleFocus(item, entering) {
        if (!entering && item === state.active) {
            return;
        }
        animateOverlay(item, { show: entering, edge: 'top' });
    }

    function setActiveItem(item) {
        if (item === state.active) {
            return;
        }

        const previous = state.active;
        state.active = item;

        if (previous) {
            previous.classList.remove('is-active');
            previous.setAttribute('aria-selected', 'false');
            previous.setAttribute('tabindex', '-1');
            hideOverlay(previous);
        }

        item.classList.add('is-active');
        item.setAttribute('aria-selected', 'true');
        item.setAttribute('tabindex', '0');

        syncOverlay(item, { immediate: false });
        updateDisplay(item, true);
    }

    function updateDisplay(item, animate = true) {
        if (!display || !content) return;

        const { quote = '', summary = '', name = '', role = '', image = '' } = item.dataset;

        const applyContent = () => {
            if (summaryEl) summaryEl.textContent = summary;
            if (quoteEl) quoteEl.textContent = formatQuote(quote);
            if (nameEl) nameEl.textContent = name;
            if (roleEl) roleEl.textContent = role;
            if (displayBg) {
                displayBg.style.backgroundImage = image ? `url('${image}')` : '';
            }

            // populate Visit site button (data-site preferred, fallback to data-link)
            const siteUrl = item.dataset.site || item.dataset.link || '';
            // page uses data-services-visit for the visit link (fallbacks kept)
            const visitEl = display.querySelector('[data-services-visit], [data-case-visit], [data-visit]');
            if (visitEl && visitEl.tagName === 'A') {
                if (siteUrl) {
                    visitEl.href = siteUrl;
                    visitEl.style.display = '';
                } else {
                    visitEl.href = '#';
                    visitEl.style.display = 'none';
                }
            }

            if (content && item.id) {
                content.setAttribute('aria-labelledby', item.id);
            }
        };

        if (!animate || !hasGSAP) {
            applyContent();
            return;
        }

                        const tl = window.gsap.timeline();
                        tl.to(content, { opacity: 0, y: 14, duration: 0.24, ease: transitionAnimation.ease }, 0);

                        if (displayBg) {
                                tl.to(displayBg, { opacity: 0, duration: 0.24, ease: transitionAnimation.ease }, 0);
                        }

                        tl.add(applyContent)
                            .to(content, { opacity: 1, y: 0, duration: transitionAnimation.duration, ease: transitionAnimation.ease }, 0.24);

                        if (displayBg) {
                                tl.to(displayBg, { opacity: 0.28, duration: 0.48, ease: 'power2.out' }, 0.24)
                                    .fromTo(displayBg, { scale: 1.05 }, { scale: 1, duration: 0.6, ease: 'power3.out' }, 0.24);
                        }
                    
    }

    function syncOverlay(item, { immediate = false } = {}) {
        const elements = getOverlayElements(item);
        if (!elements) return;

        if (hasGSAP) {
            if (immediate) {
                window.gsap.set([elements.overlay, elements.motion], { y: 0 });
            } else {
                window.gsap.timeline({ defaults: overlayAnimation })
                    .to(elements.overlay, { y: 0 }, 0)
                    .to(elements.motion, { y: 0 }, 0);
            }
        } else {
            elements.overlay.style.transform = 'translateY(0)';
            elements.motion.style.transform = 'translateY(0)';
        }
    }

    function hideOverlay(item) {
        const elements = getOverlayElements(item);
        if (!elements) return;

        if (hasGSAP) {
            window.gsap.timeline({ defaults: overlayAnimation })
                .to(elements.overlay, { y: '101%' }, 0)
                .to(elements.motion, { y: '-101%' }, 0);
        } else {
            elements.overlay.style.transform = 'translateY(101%)';
            elements.motion.style.transform = 'translateY(-101%)';
        }
    }

    function animateOverlay(item, { show, edge }) {
        const elements = getOverlayElements(item);
        if (!elements) return;

        const offsets = getOffsets(edge);

        if (hasGSAP) {
            const tl = window.gsap.timeline({ defaults: overlayAnimation });
            if (show) {
                tl.set(elements.overlay, { y: offsets.overlay })
                  .set(elements.motion, { y: offsets.motion })
                  .to(elements.overlay, { y: 0 }, 0)
                  .to(elements.motion, { y: 0 }, 0);
            } else {
                tl.to(elements.overlay, { y: offsets.overlay }, 0)
                  .to(elements.motion, { y: offsets.motion }, 0);
            }
        } else {
            elements.overlay.style.transform = show ? 'translateY(0)' : `translateY(${offsets.overlay})`;
            elements.motion.style.transform = show ? 'translateY(0)' : `translateY(${offsets.motion})`;
        }
    }

    function getOverlayElements(item) {
        const overlay = item.querySelector('[data-menu-overlay]');
        const motion = overlay?.querySelector('.flowing-menu__overlay-motion');
        if (!overlay || !motion) return null;
        return { overlay, motion };
    }

    function findClosestEdge(event, item) {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const distanceTop = distanceMetric(x, y, rect.width / 2, 0);
        const distanceBottom = distanceMetric(x, y, rect.width / 2, rect.height);
        return distanceTop < distanceBottom ? 'top' : 'bottom';
    }

    function distanceMetric(x, y, targetX, targetY) {
        const dx = x - targetX;
        const dy = y - targetY;
        return dx * dx + dy * dy;
    }

    function getOffsets(edge) {
        if (edge === 'top') {
            return { overlay: '-101%', motion: '101%' };
        }
        return { overlay: '101%', motion: '-101%' };
    }

    function formatQuote(raw) {
        const trimmed = (raw || '').trim();
        if (!trimmed) return '';
        const normalized = trimmed.replace(/^[“”"]+/, '').replace(/[“”"]+$/, '');
        return `“${normalized}”`;
    }
})();
