/**
 * Profile Card Interaction
 *
 * This script handles the interactive elements of the profile cards,
 * including the mail button and the profile picture click to reveal more details.
 * It's designed to work with multiple profile cards on the same page.
 */
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Function to handle the mail icon click
        function onMailClick(event) {
            // Find the closest parent .card element
            const card = event.currentTarget.closest('.card');
            if (!card) return;

            // Retrieve the email address from a data attribute
            const email = card.dataset.email || 'hello@novastack.digital'; // Fallback email

            // Create a mailto link and trigger it
            window.location.href = `mailto:${email}`;
        }

        // Function to toggle the 'is-open' state of the card
        function toggleProfileOpen(event) {
            const card = event.currentTarget.closest('.card');
            if (card) {
                card.classList.toggle('is-open');
                const isPressed = card.classList.contains('is-open');
                // Update ARIA attribute for accessibility
                event.currentTarget.setAttribute('aria-pressed', isPressed);
            }
        }

        // Attach event listeners to all profile cards on the page
        const profileCards = document.querySelectorAll('.card');

        profileCards.forEach(card => {
            const mailButton = card.querySelector('.mail');
            const profilePic = card.querySelector('.profile-pic');
            const contactButton = card.querySelector('.button'); // The "Contact Me" button

            if (mailButton) {
                mailButton.addEventListener('click', onMailClick);
            }

            // The profile picture and "Contact Me" button both toggle the card open state
            if (profilePic) {
                profilePic.addEventListener('click', toggleProfileOpen);
            }
            if (contactButton) {
                contactButton.addEventListener('click', toggleProfileOpen);
            }
        });
    });
})();
