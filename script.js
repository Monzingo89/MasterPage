// Configuration object for subdomain URLs
const config = {
    subdomains: {
        1: 'https://subdomain1.example.com',
        2: 'https://subdomain2.example.com',
        3: 'https://subdomain3.example.com',
        4: 'https://subdomain4.example.com',
        5: 'https://subdomain5.example.com',
        6: 'https://subdomain6.example.com',
        7: 'https://subdomain7.example.com',
        8: 'https://subdomain8.example.com',
        9: 'https://subdomain9.example.com'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeCards();
    addKeyboardNavigation();
});

// Initialize card click handlers
function initializeCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const domain = card.getAttribute('data-domain');
        const url = config.subdomains[domain];
        
        // Set the href attribute
        if (url) {
            card.setAttribute('href', url);
        }
        
        // Add click handler for analytics or custom behavior
        card.addEventListener('click', (e) => {
            handleCardClick(e, domain, url);
        });

        // Add hover effect enhancement
        card.addEventListener('mouseenter', () => {
            card.style.setProperty('--hover-scale', '1.02');
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--hover-scale', '1');
        });
    });
}

// Handle card clicks
function handleCardClick(event, domain, url) {
    // Add your custom logic here (e.g., analytics tracking)
    console.log(`Navigating to Platform ${domain}: ${url}`);
    
    // Optional: Add loading state
    const card = event.currentTarget;
    card.classList.add('loading');
    
    // If URL is not configured yet, prevent navigation
    if (!url || url.includes('example.com')) {
        event.preventDefault();
        alert(`Please configure the URL for Platform ${domain} in script.js`);
        card.classList.remove('loading');
        return;
    }
    
    // Optional: Track analytics
    trackNavigation(domain, url);
}

// Add keyboard navigation support
function addKeyboardNavigation() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextCard = cards[index + 1] || cards[0];
                nextCard.focus();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevCard = cards[index - 1] || cards[cards.length - 1];
                prevCard.focus();
            }
        });
    });
}

// Optional: Analytics tracking function
function trackNavigation(domain, url) {
    // Add your analytics tracking code here
    // Example: Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation', {
            'event_category': 'subdomain_navigation',
            'event_label': `Platform ${domain}`,
            'value': domain
        });
    }
}

// Optional: Add smooth scroll behavior
function smoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Optional: Detect if user prefers reduced motion
function respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
}

// Initialize additional features
smoothScroll();
respectMotionPreferences();

// Export config for external use if needed
window.siteConfig = config;
