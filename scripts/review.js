// Product data array - must match form.js
const products = [
    {
        id: "fc-1888",
        name: "Flux Capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "Power Laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "Time Circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "Low Voltage Reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "Warp Equalizer",
        averagerating: 5.0
    }
];

/**
 * Get URL parameters from the query string
 */
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const reviewData = {};
    
    // Extract all parameters
    for (const [key, value] of params.entries()) {
        if (key === 'features') {
            // Handle multiple checkbox values
            if (!reviewData.features) {
                reviewData.features = [];
            }
            reviewData.features.push(value);
        } else {
            reviewData[key] = value;
        }
    }
    
    return reviewData;
}

/**
 * Get product name from product ID
 */
function getProductNameById(productId) {
    const product = products.find(p => p.id === productId);
    return product ? product.name : productId;
}

/**
 * Display review details on the page
 */
function displayReviewDetails() {
    const reviewData = getURLParameters();
    const detailsContainer = document.getElementById('reviewDetails');
    
    if (!detailsContainer) {
        console.error('Review details container not found');
        return;
    }
    
    // Clear existing content
    detailsContainer.innerHTML = '';
    
    // Product Name - convert ID to name
    if (reviewData.productName) {
        const productName = getProductNameById(reviewData.productName);
        addDetailItem('Product Name', productName);
    }
    
    // Overall Rating
    if (reviewData.rating) {
        const stars = '★'.repeat(parseInt(reviewData.rating));
        addDetailItem('Overall Rating', `<span class="rating-stars">${stars}</span> (${reviewData.rating}/5)`);
    }
    
    // Date of Installation
    if (reviewData.installDate) {
        const date = new Date(reviewData.installDate);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        addDetailItem('Date of Installation', formattedDate);
    }
    
    // Useful Features
    if (reviewData.features && reviewData.features.length > 0) {
        const featuresList = reviewData.features.join(', ');
        addDetailItem('Useful Features', featuresList);
    } else {
        addDetailItem('Useful Features', 'None selected');
    }
    
    // Written Review
    if (reviewData.writtenReview && reviewData.writtenReview.trim() !== '') {
        addDetailItem('Written Review', reviewData.writtenReview);
    } else {
        addDetailItem('Written Review', 'No written review provided');
    }
    
    // User Name
    if (reviewData.userName && reviewData.userName.trim() !== '') {
        addDetailItem('Your Name', reviewData.userName);
    } else {
        addDetailItem('Your Name', 'Anonymous');
    }
}

/**
 * Helper function to add a detail item to the review summary
 */
function addDetailItem(label, value) {
    const detailsContainer = document.getElementById('reviewDetails');
    
    const detailItem = document.createElement('div');
    detailItem.className = 'detail-item';
    
    const detailLabel = document.createElement('div');
    detailLabel.className = 'detail-label';
    detailLabel.textContent = label;
    
    const detailValue = document.createElement('div');
    detailValue.className = 'detail-value';
    
    // Check if value contains HTML (for rating stars)
    if (label === 'Overall Rating') {
        detailValue.innerHTML = value;
    } else {
        detailValue.textContent = value;
    }
    
    detailItem.appendChild(detailLabel);
    detailItem.appendChild(detailValue);
    detailsContainer.appendChild(detailItem);
}

/**
 * Increment and display the review counter using localStorage
 */
function updateReviewCounter() {
    const counterElement = document.getElementById('reviewCount');
    
    if (!counterElement) {
        console.error('Review counter element not found');
        return;
    }
    
    // Get current count from localStorage
    let reviewCount = localStorage.getItem('reviewCount');
    
    // Initialize if doesn't exist
    if (reviewCount === null) {
        reviewCount = 0;
    } else {
        reviewCount = parseInt(reviewCount);
    }
    
    // Increment the count
    reviewCount += 1;
    
    // Store back in localStorage
    localStorage.setItem('reviewCount', reviewCount.toString());
    
    // Display the count with animation
    animateCounter(counterElement, 0, reviewCount, 1000);
}

/**
 * Animate the counter from start to end value
 */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        const currentValue = Math.floor(start + (range * easeProgress));
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Add confetti effect on page load
 */
function createConfetti() {
    const colors = ['#FFE608', '#000000', '#F5F5F5'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const duration = 2000 + Math.random() * 2000;
        const startTime = performance.now();
        
        function animateConfetti(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                confetti.style.top = (progress * 100) + 'vh';
                confetti.style.opacity = 1 - progress;
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animateConfetti);
    }
}

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Display review details
    displayReviewDetails();
    
    // Update and display review counter
    updateReviewCounter();
    
    // Add confetti effect
    setTimeout(createConfetti, 500);
    
    console.log('Review page initialized successfully');
});