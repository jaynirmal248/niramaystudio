# NovaStack Digital Website

A handcrafted, experience-first business website inspired by modern digital agencies. Built with semantic HTML5, modular CSS (Flexbox + Grid), and vanilla JavaScript to deliver a responsive, accessible, and high-performance user experience across devices.

## Project Structure

```
├── index.html            # Home page with hero, mission, services, case studies, proof, CTA, and modals
├── services.html         # Dedicated services overview with workshops and advisory retainers
├── about.html            # Story, leadership, milestones, and recognition page
├── contact.html          # Contact form with validation, studio details, and CTA
├── css/
│   ├── style.css         # Core design system, layout grid, typography, components
│   ├── animations.css    # Motion primitives and micro-interactions
│   └── responsive.css    # Breakpoints at 1440, 1200, 1024, 900, 768, 480
├── js/
│   ├── main.js           # Navigation, smooth scroll, modals, testimonial slider, footer year
│   ├── scroll.js         # ScrollReveal configuration and reusable animations
│   └── form-validation.js# Accessible client-side validation for the contact form
└── assets/
    ├── images/           # Drop-in slot for self-hosted imagery (currently using remote WebP placeholders)
    ├── icons/            # Brand and UI glyphs (optionally populated)
    └── fonts/            # Self-hosted font files (optional)
```

## Key Libraries & Assets

- **Google Fonts** – Inter and Poppins families for typography hierarchy
- **Font Awesome 6** – Iconography (served via CDN)
- **ScrollReveal** – Lightweight scroll-based reveal animations
- **OpenStreetMap Embed** – Studio location map on the contact page

All additional interactions (navigation toggle, smooth scrolling, modal handling, sliders, and form validation) are implemented via vanilla JavaScript.

## Development Notes

- Semantic HTML5 structure with ARIA where appropriate (modals, navigation, slider)
- BEM-inspired class naming for maintainable styling
- Global CSS variables for color, typography, spacing, and timing scales
- Adaptive 12-column grid and Flexbox helpers for layout consistency
- Motion tuned for accessibility (subtle durations, easing)
- `prefers-reduced-motion` respected through ScrollReveal defaults (auto-disables animations)
- Images are referenced as remote WebP assets with descriptive `alt` attributes; lazy loading enabled where feasible

## Responsive Breakpoints

- **>= 1920px** – Fluid layout with capped container width
- **1440px** – Enhanced container padding for large displays
- **1200px** – Desktop adjustments for grid spans
- **1024px** – Tablet landscape refinements
- **900px** – Mobile navigation, stacked hero layouts
- **768px** – Tablet portrait/mobile breakpoints, vertical stacking
- **480px** – Small-device tweak (full-width buttons, modal padding)

## Running & Editing

1. Serve the project from the repository root (e.g., using VS Code Live Server or `npx serve`).
2. Update content within the HTML files; global components live in `css/style.css` and `js/main.js`.
3. Add or replace imagery in `assets/images/` (ideal formats: WebP or AVIF at 1x/2x resolutions).
4. Adjust ScrollReveal sequences via `js/scroll.js` if you introduce new sections.

### Deploying

- Upload the project to any static host (GitHub Pages, Netlify, Vercel, etc.).
- Ensure the root directory mirrors this folder structure.
- Configure caching headers for `css/`, `js/`, and `assets/` for optimal Lighthouse scores.

## Accessibility & QA Checklist

- [x] Semantic landmark regions (`header`, `main`, `section`, `footer`)
- [x] Keyboard accessible navigation, modals, and slider controls
- [x] Sufficient color contrast and rem-based typography scaling
- [x] Client-side validation with inline feedback
- [x] Lazy loading and preloading to improve performance

For additional enhancements (analytics, blog, CMS integration), extend the structure with new sections or pages and reuse existing component patterns.
