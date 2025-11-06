document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("[data-header]");
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navList = document.querySelector("#primary-menu");
    const focusableSelectors = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    const modals = new Map();
    let activeModal = null;

    const setHeaderState = () => {
        if (!header) return;
        const threshold = 32;
        if (window.scrollY > threshold) {
            header.classList.add("is-solid");
        } else {
            header.classList.remove("is-solid");
        }
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    if (navToggle && navList) {
        navToggle.addEventListener("click", () => {
            const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!isExpanded));
            navToggle.classList.toggle("is-active");
            navList.classList.toggle("is-open");
        });

        navList.querySelectorAll("a[href^='#']").forEach((link) => {
            link.addEventListener("click", () => {
                navList.classList.remove("is-open");
                navToggle.classList.remove("is-active");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const smoothLinks = document.querySelectorAll("a[href^='#']");
    smoothLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href").slice(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;
            event.preventDefault();
            const offset = header ? header.offsetHeight + 18 : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        });
    });

    document.querySelectorAll("[data-case-target]").forEach((card) => {
        const modalId = card.getAttribute("data-case-target");
        if (!modalId) return;
        const modalElement = document.getElementById(modalId);
        if (!modalElement) return;
        modals.set(modalId, modalElement);
        card.addEventListener("click", () => openModal(modalElement));
        const cta = card.querySelector(".case-card__cta");
        if (cta) {
            cta.addEventListener("click", (event) => {
                event.stopPropagation();
                openModal(modalElement);
            });
        }
    });

    function openModal(modalElement) {
        if (!modalElement) return;
        modalElement.classList.add("is-active");
        modalElement.setAttribute("aria-hidden", "false");
        activeModal = modalElement;
        trapFocus(modalElement);
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!activeModal) return;
        activeModal.classList.remove("is-active");
        activeModal.setAttribute("aria-hidden", "true");
        releaseFocus();
        activeModal = null;
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-modal-close]").forEach((trigger) => {
        trigger.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    document.querySelectorAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target.closest(".modal__content")) return;
            closeModal();
        });
    });

    let focusableElements = [];
    let firstFocusable = null;
    let lastFocusable = null;

    function trapFocus(modal) {
        focusableElements = Array.from(modal.querySelectorAll(focusableSelectors));
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
        if (firstFocusable) {
            firstFocusable.focus();
        }
        modal.addEventListener("keydown", handleFocusTrap);
    }

    function releaseFocus() {
        if (!activeModal) return;
        activeModal.removeEventListener("keydown", handleFocusTrap);
        focusableElements = [];
        firstFocusable = null;
        lastFocusable = null;
    }

    function handleFocusTrap(event) {
        if (event.key !== "Tab" || focusableElements.length === 0) return;
        if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable?.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable?.focus();
            }
        }
    }
    const footerYearElements = document.querySelectorAll("[data-current-year]");
    footerYearElements.forEach((el) => {
        el.textContent = new Date().getFullYear().toString();
    });
});
