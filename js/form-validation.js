document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("project-form");
    if (!form) return;

    const feedback = document.getElementById("form-feedback");

    const setFeedback = (message, type) => {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.classList.remove("is-error", "is-success");
        if (type) {
            feedback.classList.add(type);
        }
    };

    const validators = {
        name: (value) => value.trim().length >= 2,
        email: (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(value.trim()),
        services: (value) => value.trim().length > 0,
        message: (value) => value.trim().length >= 24,
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const errors = [];

        Object.entries(validators).forEach(([field, validator]) => {
            const fieldElement = form.elements[field];
            const value = String(formData.get(field) ?? "");
            const isValid = validator(value);
            fieldElement.classList.toggle("is-invalid", !isValid);
            if (!isValid) {
                errors.push(field);
            }
        });

        if (errors.length > 0) {
            setFeedback("Please review the highlighted fields.", "is-error");
            return;
        }

        setFeedback("Thank you! Your message is on its way.", "is-success");
        form.reset();
    });

    form.querySelectorAll("input, textarea, select").forEach((field) => {
        field.addEventListener("input", () => {
            field.classList.remove("is-invalid");
            if (feedback) {
                feedback.textContent = "";
                feedback.classList.remove("is-error", "is-success");
            }
        });
    });
});
