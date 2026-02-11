// ========================================
// MAIN NAVIGATION & UTILITIES
// ========================================

// Function: Toggle mobile navigation
function toggleNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Function: Close navigation when clicking outside
function closeNavOnOutsideClick(event) {
    const nav = document.getElementById('mainNav');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!nav.contains(event.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Function: Smooth scroll to section
function smoothScrollTo(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Function: Highlight links that match the current page
function setActivePageLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const pageLinks = document.querySelectorAll('.nav-menu a, .footer-col ul a');

    pageLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.includes('://')) return;

        const targetPath = href.split('#')[0];
        link.classList.toggle('active', targetPath === currentPath);
    });
}

// Function: Toggle transparent nav while hero is in view
function setupHeroNavigationState() {
    const nav = document.getElementById('mainNav');
    const hero = document.querySelector('.hero');

    if (!nav || !hero) return;

    const updateNavState = () => {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const shouldBeTransparent = heroBottom > nav.offsetHeight;
        nav.classList.toggle('nav-transparent', shouldBeTransparent);
    };

    nav.classList.add('nav-overlay');
    updateNavState();

    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setActivePageLinks();
    
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleNavigation);
    }
    
    // Close nav on outside click
    document.addEventListener('click', closeNavOnOutsideClick);
    
    // Close nav when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    setupHeroNavigationState();
});
