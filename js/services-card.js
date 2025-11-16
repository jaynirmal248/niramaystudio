// Spotlight Card Effect - Vanilla JavaScript Implementation
// Applies mouse-following spotlight effect to cards

(function() {
    'use strict';

    // Default spotlight color matching site theme
    const DEFAULT_SPOTLIGHT_COLOR = 'rgba(113, 99, 255, 0.15)';

    /**
     * Initialize spotlight effect on a card element
     * @param {HTMLElement} cardElement - The card element to apply spotlight to
     * @param {string} spotlightColor - Optional custom spotlight color
     */
    function initSpotlightCard(cardElement, spotlightColor = DEFAULT_SPOTLIGHT_COLOR) {
        if (!cardElement) return;

        // Add the card-spotlight class if not already present
        if (!cardElement.classList.contains('card-spotlight')) {
            cardElement.classList.add('card-spotlight');
        }

        // Set default spotlight color
        cardElement.style.setProperty('--spotlight-color', spotlightColor);

        // Handle mouse move to update spotlight position
        const handleMouseMove = (e) => {
            const rect = cardElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cardElement.style.setProperty('--mouse-x', `${x}px`);
            cardElement.style.setProperty('--mouse-y', `${y}px`);
        };

        // Handle mouse leave to reset spotlight
        const handleMouseLeave = () => {
            // Reset to center for smooth transition
            const rect = cardElement.getBoundingClientRect();
            cardElement.style.setProperty('--mouse-x', `${rect.width / 2}px`);
            cardElement.style.setProperty('--mouse-y', `${rect.height / 2}px`);
        };

        // Add event listeners
        cardElement.addEventListener('mousemove', handleMouseMove);
        cardElement.addEventListener('mouseleave', handleMouseLeave);

        // Store cleanup function on element for potential removal
        cardElement._spotlightCleanup = () => {
            cardElement.removeEventListener('mousemove', handleMouseMove);
            cardElement.removeEventListener('mouseleave', handleMouseLeave);
            delete cardElement._spotlightCleanup;
        };
    }

    /**
     * Initialize spotlight effect on all matching cards
     * @param {string} selector - CSS selector for cards (default: '.service-card')
     * @param {string} spotlightColor - Optional custom spotlight color
     */
    function initAllSpotlightCards(selector = '.service-card', spotlightColor = DEFAULT_SPOTLIGHT_COLOR) {
        const cards = document.querySelectorAll(selector);
        cards.forEach(card => {
            initSpotlightCard(card, spotlightColor);
        });
    }

    /**
     * Remove spotlight effect from a card
     * @param {HTMLElement} cardElement - The card element to remove spotlight from
     */
    function removeSpotlightCard(cardElement) {
        if (!cardElement || !cardElement._spotlightCleanup) return;
        cardElement._spotlightCleanup();
        cardElement.classList.remove('card-spotlight');
    }

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize service cards on index page
            initAllSpotlightCards('.service-card__grid .service-card');
            
            // Initialize service cards on services page
            initAllSpotlightCards('.services-grid .service-card');
            
            // Initialize service cards on all-services page
            initAllSpotlightCards('#servicesContainer .service-card');
        });
    } else {
        // DOM already loaded
        initAllSpotlightCards('.service-card__grid .service-card');
        initAllSpotlightCards('.services-grid .service-card');
        initAllSpotlightCards('#servicesContainer .service-card');
    }

    // Re-initialize when new cards are dynamically added (for all-services page)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check if it's a service card
                    if (node.classList && node.classList.contains('service-card') && !node.classList.contains('card-spotlight')) {
                        initSpotlightCard(node);
                    }
                    // Check children
                    const cards = node.querySelectorAll && node.querySelectorAll('.service-card:not(.card-spotlight)');
                    if (cards) {
                        cards.forEach(card => initSpotlightCard(card));
                    }
                }
            });
        });
    });

    // Observe the services container for dynamically added cards
    const servicesContainer = document.getElementById('servicesContainer');
    if (servicesContainer) {
        observer.observe(servicesContainer, {
            childList: true,
            subtree: true
        });
    }

    // Export functions for manual use if needed
    window.SpotlightCard = {
        init: initSpotlightCard,
        initAll: initAllSpotlightCards,
        remove: removeSpotlightCard
    };
})();
