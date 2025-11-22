// Services Data
const servicesData = [
    {
        id: 1,
        title: "Business Consultation & Strategic Clarity Kit",
        quote: "“Every business problem is a clarity problem. We fix that.”",
        description: "This kit transforms scattered operations into a sharp, focused, money-making system. Built for medium businesses that want control, order, and predictable profit.",
        fullDescription: "This kit transforms scattered operations into a sharp, focused, money-making system. Built for medium businesses that want control, order, and predictable profit.",
        icon: "fa-solid fa-chess",
        tags: ["Strategy", "Operations", "Profit"],
        delivery: "4 phases over 60 days",
        features: [
            "Complete business teardown",
            "Profit leak analysis",
            "Restructured operations",
            "Weekly “Hot Seat” performance calls",
            "Personalized battle plan until revenue doubles"
        ],
        price: "$27,000 flat",
        priceDetail: "or $14,997 upfront + $3,000/week until profits double (You stop paying the moment you hit 2×).",
        highlight: "👉 This offer triggers the strongest “performance-based” psychology — irresistible to CEOs."
    },
    {
        id: 2,
        title: "AI Automation Empire Kit",
        quote: "“Fire 80% of Your Busywork in 180 Days”",
        description: "We turn your business into an automated machine running on AI agents. AI is not the future. It’s the advantage.",
        fullDescription: "This kit integrates AI into the core of your operations to cut costs, save time, and increase output by 3×.",
        icon: "fa-solid fa-robot",
        tags: ["AI", "Automation", "Efficiency"],
        delivery: "6 months, with new automations every month",
        features: [
            "Workflow destruction + rebuild",
            "AI agents for sales, support, operations",
            "Monthly automation upgrades",
            "24/7 monitoring system",
            "Founder OS (AI-powered)"
        ],
        price: "$7,997/mo for 6 months",
        priceDetail: "After month 7 → $2,997/mo optional maintenance",
        highlight: "📌 Most clients recover the entire investment in payroll savings alone within 90 days."
    },
    {
        id: 3,
        title: "Growth Hacking Avalanche Kit",
        quote: "“Outsmart your competition, don’t outspend them.”",
        description: "Growth is science. This kit applies data-driven tactics to unlock hidden opportunities inside your market.",
        fullDescription: "Growth is science. This kit applies data-driven tactics to unlock hidden opportunities inside your market.",
        icon: "fa-solid fa-chart-line",
        tags: ["Growth", "Marketing", "Data"],
        delivery: "2 months",
        features: [
            "Underground customer acquisition playbooks",
            "Shadow marketing ops",
            "4 hidden campaigns",
            "Weekly growth audits",
            "Revenue performance dashboard"
        ],
        price: "$19,997 + 10% of all new revenue for 90 days",
        highlight: "👉 Faster growth, smarter moves, and the ability to stay ahead of trends — not behind them."
    },
    {
        id: 4,
        title: "Design Authority Kit",
        quote: "“Your design is your first impression. And first impressions decide everything.”",
        description: "We produce visuals that sell, convince, and build trust, all while upgrading your brand’s authority.",
        fullDescription: "We produce visuals that sell, convince, and build trust, all while upgrading your brand’s authority.",
        icon: "fa-solid fa-pen-nib",
        tags: ["Design", "Branding", "Visuals"],
        delivery: "4 phases in 28 days",
        features: [
            "World-class logo",
            "Full visual identity system",
            "Pitch decks",
            "Ad creatives",
            "Unlimited revisions"
        ],
        price: "$17,997 one-time",
        highlight: "🔥 For medium businesses, this feels cheap compared to hiring a design team. Risk Reversal: Redo FREE if you don’t love it on day 30."
    },
    {
        id: 5,
        title: "Branding Monopoly Kit",
        quote: "“Own the Mind of Your Customer”",
        description: "We engineer a brand people don’t just remember — they follow. Because “Branding is not how it looks. Branding is how it feels.”",
        fullDescription: "We engineer a brand people don’t just remember — they follow. Because “Branding is not how it looks. Branding is how it feels.”",
        icon: "fa-solid fa-crown",
        tags: ["Branding", "Storytelling", "Positioning"],
        delivery: "2 months",
        features: [
            "Core brand story",
            "Emotional positioning",
            "Archetype mapping",
            "Messaging matrix",
            "Lifetime refresh every 24 months"
        ],
        price: "$39,997",
        highlight: "This is your premium, psychological branding product — close to Apple-level narrative."
    },
    {
        id: 6,
        title: "Social Lead Machine Kit",
        quote: "“Smart content. Automated growth. Maximum visibility.”",
        description: "A system that generates leads every day — after setup, it's yours forever.",
        fullDescription: "A system that generates leads every day — after setup, it's yours forever.",
        icon: "fa-solid fa-share-nodes",
        tags: ["Social Media", "Leads", "Content"],
        delivery: "3 months",
        features: [
            "AI content system",
            "Auto-posting engine",
            "High-ROI content strategy",
            "90 days of done-for-you content",
            "Conversion scripts"
        ],
        price: "$9,997/mo × 3 = $29,991",
        highlight: "Corporate clients LOVE the “you own it forever after” hook."
    },
    {
        id: 7,
        title: "Personal Productivity Upgrade Kit",
        quote: "“The person you want to be is on the other side of better systems.”",
        description: "For founders, creators, CEOs who want to get their life back.",
        fullDescription: "For founders, creators, CEOs who want to get their life back. Rebuild your life in 30 days.",
        icon: "fa-solid fa-clock",
        tags: ["Productivity", "Coaching", "Systems"],
        delivery: "4 phases in 30 days",
        features: [
            "Custom personal OS",
            "Second brain system",
            "Daily routines",
            "1-on-1 weekly coaching"
        ],
        price: "$12,997",
        highlight: "(Only 8 clients per month — scarcity = conversions.)"
    },
    {
        id: 8,
        title: "Copywriting Closer Kit",
        quote: "“Words are your strongest business tool — if used correctly.”",
        description: "We create writing that convinces, sells, teaches, and inspires with professional structure and psychology.",
        fullDescription: "We create writing that convinces, sells, teaches, and inspires with professional structure and psychology.",
        icon: "fa-solid fa-feather-pointed",
        tags: ["Copywriting", "Sales", "Content"],
        delivery: "Min 3 months",
        features: [
            "Sales pages",
            "Ads",
            "Newsletter scripts",
            "Launch funnels",
            "Personal brand stories",
            "High-converting emails"
        ],
        price: "$12,997 per month",
        highlight: "👉 Retainers are where agencies build wealth."
    },
    {
        id: 9,
        title: "Deep Research Kit",
        quote: "“When the facts are clear, the decisions become easy.”",
        description: "A high-standard research service powered by structured methodology and deep analysis. For when businesses need the truth FAST.",
        fullDescription: "A high-standard research service powered by structured methodology and deep analysis. For when businesses need the truth FAST.",
        icon: "fa-solid fa-magnifying-glass-chart",
        tags: ["Research", "Analysis", "Strategy"],
        delivery: "2–3 days",
        features: [
            "Full research",
            "Insights",
            "Strategic recommendation",
            "Executive brief report",
            "(Maximum 4 per client/month)"
        ],
        price: "$5,997 per drop",
        highlight: "High urgency = high profitability."
    },
    {
        id: 10,
        title: "Market Intelligence Kit",
        quote: "“Information is the advantage. Insights are the weapon.”",
        description: "This kit gives founders and teams the ability to see the market before others do, making every move smarter.",
        fullDescription: "This kit gives founders and teams the ability to see the market before others do, making every move smarter.",
        icon: "fa-solid fa-globe",
        tags: ["Market Intelligence", "Trends", "Strategy"],
        delivery: "Every Monday",
        features: [
            "4-phase analysis",
            "Industry shifts",
            "Opportunity alerts",
            "Competitor activity",
            "Strategic moves"
        ],
        price: "$2,997/week",
        priceDetail: "OR $9,997/month prepaid (most popular)",
        highlight: "Perfect for CEOs who want to feel “ahead of the world.”"
    },
    {
        id: 11,
        title: "Custom Newsletter Empire Kit",
        quote: "“Daily Authority, Zero Work”",
        description: "We ghostwrite, design, optimize your daily newsletter.",
        fullDescription: "We ghostwrite, design, optimize your daily newsletter.",
        icon: "fa-solid fa-envelope-open-text",
        tags: ["Newsletter", "Content", "Growth"],
        delivery: "Daily",
        features: [
            "Daily newsletter",
            "Full design system",
            "Posting + scheduling",
            "Lead capture",
            "Growth hooks"
        ],
        price: "$6,897 per week",
        priceDetail: "Or $14,997/mo (12-month lock-in)"
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
            <div class="service-card__title-wrapper">
                <h3 class="service-card__title">${service.title}</h3>
                ${service.quote ? `<p class="service-card__quote">${service.quote}</p>` : ''}
            </div>
        </div>
        
        <div class="service-card__body">
            <p class="service-card__description">${service.description}</p>
            
            ${service.delivery ? `
            <div class="service-card__delivery">
                <i class="fa-regular fa-clock"></i>
                <span><strong>Delivery:</strong> ${service.delivery}</span>
            </div>
            ` : ''}

            <div class="service-card__features-container">
                <h4 class="service-card__features-title">You get:</h4>
                <ul class="service-card__features">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            ${service.highlight ? `<div class="service-card__highlight">${service.highlight}</div>` : ''}
        </div>

        <div class="service-card__footer">
            <div class="service-card__price-container">
                <div class="service-card__price">${service.price}</div>
                ${service.priceDetail ? `<div class="service-card__price-detail">${service.priceDetail}</div>` : ''}
            </div>
            <a href="contact.html" class="service-card__cta">Get Started <i class="fa-solid fa-arrow-right"></i></a>
        </div>
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
            (service.quote && service.quote.toLowerCase().includes(lowerSearchTerm)) ||
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
