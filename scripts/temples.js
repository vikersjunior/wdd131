// Footer - Current Year
const currentYearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Footer - Last Modified Date
const lastModifiedParagraph = document.getElementById('lastModified');
const lastModifiedDate = document.lastModified;
lastModifiedParagraph.textContent = `Last Modification: ${lastModifiedDate}`;

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    
    // Toggle hamburger icon between ☰ and ✕
    if (nav.classList.contains('open')) {
        hamburger.textContent = '✕';
        hamburger.setAttribute('aria-label', 'Close menu');
    } else {
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-label', 'Toggle menu');
    }
});