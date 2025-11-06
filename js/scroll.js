document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        return;
    }

    if (typeof ScrollReveal === "undefined") {
        console.warn("ScrollReveal library not loaded.");
        return;
    }

    const sr = ScrollReveal({
        distance: "40px",
        duration: 900,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        interval: 120,
        opacity: 0,
        cleanup: true,
    });

    sr.reveal("[data-sr='fade-up']", {
        origin: "bottom",
    });

    sr.reveal("[data-sr='fade-right']", {
        origin: "left",
    });

    sr.reveal("[data-sr='fade-left']", {
        origin: "right",
    });

    sr.reveal("[data-sr='zoom-in']", {
        origin: "bottom",
        scale: 0.94,
    });

    document.querySelectorAll("[data-sr-delay]").forEach((el) => {
        const delay = Number(el.getAttribute("data-sr-delay"));
        if (!Number.isFinite(delay)) return;
        sr.reveal(el, {
            delay,
        });
    });
});
