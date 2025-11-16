// Services Data
const servicesData = [
    {
        id: 1,
        title: "Product & Brand Strategy",
        description: "Customer journey mapping, positioning, and roadmaps that align leadership and unlock focus.",
        fullDescription: "Customer journey mapping, positioning, and roadmaps that align leadership and unlock focus. We help you understand your market, define your unique value, and build a clear path forward.",
        icon: "fa-solid fa-compass-drafting",
        tags: ["Strategy", "Positioning", "Roadmaps"],
        features: [
            "Customer research & insights",
            "Competitive analysis",
            "Brand positioning",
            "Product roadmap planning",
            "Go-to-market strategy"
        ]
    },
    {
        id: 2,
        title: "Experience Design",
        description: "User research, UX/UI, and design systems crafted to elevate conversion and brand affinity.",
        fullDescription: "User research, UX/UI, and design systems crafted to elevate conversion and brand affinity. We create interfaces that feel intuitive, look beautiful, and drive results.",
        icon: "fa-solid fa-shapes",
        tags: ["UX", "UI", "Design Systems"],
        features: [
            "User research & testing",
            "UX/UI design",
            "Design systems",
            "Prototyping & iteration",
            "Accessibility compliance"
        ]
    },
    {
        id: 3,
        title: "Full-Stack Engineering",
        description: "Composable architectures, performant builds, and scalable infrastructure for rapid iteration.",
        fullDescription: "Composable architectures, performant builds, and scalable infrastructure for rapid iteration. We build products that scale with your business.",
        icon: "fa-solid fa-code",
        tags: ["Frontend", "Backend", "Architecture"],
        features: [
            "Frontend development",
            "Backend architecture",
            "API design & integration",
            "DevOps & deployment",
            "Performance optimization"
        ]
    },
    {
        id: 4,
        title: "Growth Enablement",
        description: "Data-driven optimization, experimentation, and lifecycle programs that transform insights into measurable growth.",
        fullDescription: "Data-driven optimization, experimentation, and lifecycle programs that transform insights into measurable growth. We help you scale what works.",
        icon: "fa-solid fa-chart-line",
        tags: ["Analytics", "Optimization", "Experimentation"],
        features: [
            "Analytics & tracking",
            "A/B testing & experimentation",
            "Conversion optimization",
            "Lifecycle marketing",
            "Revenue operations"
        ]
    },
    {
        id: 5,
        title: "Web Development",
        description: "Create stunning, responsive websites tailored to your business needs.",
        fullDescription: "Our web development services encompass everything from simple landing pages to complex web applications. We use the latest technologies and best practices to ensure your website is fast, secure, and scalable. Our team specializes in creating responsive designs that work seamlessly across all devices.",
        icon: "fas fa-code",
        tags: ["Frontend", "Backend", "Responsive"],
        features: [
            "Custom responsive design for all devices",
            "Modern JavaScript frameworks (React, Vue, Angular)",
            "Backend API development and integration",
            "Performance optimization and SEO",
            "Content Management System (CMS) integration",
            "Ongoing maintenance and support"
        ]
    },
    {
        id: 6,
        title: "Mobile App Development",
        description: "Build native and cross-platform mobile applications for iOS and Android.",
        fullDescription: "Transform your ideas into powerful mobile applications that engage users and drive business growth. We develop both native and cross-platform apps using cutting-edge technologies like React Native and Flutter, ensuring optimal performance and user experience across all devices.",
        icon: "fas fa-mobile-alt",
        tags: ["iOS", "Android", "Cross-platform"],
        features: [
            "Native iOS and Android development",
            "Cross-platform solutions with React Native/Flutter",
            "Intuitive UI/UX design",
            "Backend and API integration",
            "App Store and Google Play deployment",
            "Post-launch support and updates"
        ]
    },
    {
        id: 7,
        title: "Digital Marketing",
        description: "Boost your online presence with strategic digital marketing campaigns.",
        fullDescription: "Our comprehensive digital marketing services help businesses reach their target audience and achieve measurable results. From SEO and content marketing to social media management and PPC advertising, we create data-driven strategies that deliver real ROI.",
        icon: "fas fa-bullhorn",
        tags: ["SEO", "Social Media", "PPC"],
        features: [
            "Search Engine Optimization (SEO)",
            "Social media marketing and management",
            "Pay-per-click (PPC) advertising campaigns",
            "Content marketing and strategy",
            "Email marketing automation",
            "Analytics and performance tracking"
        ]
    },
    {
        id: 8,
        title: "UI/UX Design",
        description: "Design beautiful and intuitive user interfaces that delight users.",
        fullDescription: "Great design is at the heart of every successful digital product. Our UI/UX designers create visually stunning and highly functional interfaces that provide exceptional user experiences. We conduct thorough user research, create wireframes and prototypes, and iterate based on feedback.",
        icon: "fas fa-paint-brush",
        tags: ["Design", "Prototyping", "User Research"],
        features: [
            "User research and persona development",
            "Wireframing and prototyping",
            "High-fidelity UI design",
            "Usability testing and iteration",
            "Design system creation",
            "Responsive design for all devices"
        ]
    }
];

// State Management
let currentServices = [...servicesData];
let searchTimeout;

// DOM Elements
let searchInput, clearSearchBtn, servicesContainer, noResults;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    searchInput = document.getElementById('searchInput');
    clearSearchBtn = document.getElementById('clearSearch');
    servicesContainer = document.getElementById('servicesContainer');
    noResults = document.getElementById('noResults');
    
    renderServices(servicesData);
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }
}

// Render Services
function renderServices(services) {
    if (!servicesContainer) return;
    
    servicesContainer.innerHTML = '';

    if (services.length === 0) {
        if (noResults) noResults.classList.add('show');
        return;
    }

    if (noResults) noResults.classList.remove('show');

    services.forEach((service, index) => {
        const serviceCard = createServiceCard(service, index);
        servicesContainer.appendChild(serviceCard);
    });
}

// Create Service Card
function createServiceCard(service, index) {
    const card = document.createElement('article');
    card.className = 'service-card';
    card.setAttribute('data-sr', 'fade-up');
    card.setAttribute('data-sr-delay', (140 + index * 40).toString());

    card.innerHTML = `
        <div class="service-card__header">
            <div class="service-card__icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-card__title">${service.title}</h3>
        </div>
        <p class="service-card__description">${service.fullDescription}</p>
        <ul class="service-card__features">
            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <a href="contact.html" class="service-card__cta">Get Started <i class="fa-solid fa-arrow-right"></i></a>
    `;

    return card;
}

// Search Handler
function handleSearch(e) {
    const searchTerm = e.target.value.trim();
    if (searchTerm) {
        clearSearchBtn.classList.add('show');
    } else {
        clearSearchBtn.classList.remove('show');
    }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch(searchTerm);
    }, 300);
}

// Perform Search
function performSearch(searchTerm) {
    if (!searchTerm) {
        currentServices = [...servicesData];
        renderServices(currentServices);
        return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    currentServices = servicesData.filter(service => {
        return (
            service.title.toLowerCase().includes(lowerSearchTerm) ||
            service.description.toLowerCase().includes(lowerSearchTerm) ||
            service.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)) ||
            service.features.some(feature => feature.toLowerCase().includes(lowerSearchTerm))
        );
    });

    renderServices(currentServices);
}

// Clear Search
function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.classList.remove('show');
    currentServices = [...servicesData];
    renderServices(currentServices);
    searchInput.focus();
}

document.documentElement.style.scrollBehavior = 'smooth';
