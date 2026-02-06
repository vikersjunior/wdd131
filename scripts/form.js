// Product data array
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
 * Populate the product select dropdown with options from the products array
 */
function populateProductSelect() {
    const selectElement = document.getElementById('productName');
    
    if (!selectElement) {
        console.error('Product select element not found');
        return;
    }
    
    // Create and append option elements
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id; // Use id as the value
        option.textContent = product.name; // Display name as text
        selectElement.appendChild(option);
    });
}

/**
 * Add animation classes to form elements on load
 */
function initializeAnimations() {
    const formGroups = document.querySelectorAll('.form-group, fieldset');
    
    formGroups.forEach((group, index) => {
        group.style.animation = `slideUp 0.6s ease ${0.5 + (index * 0.1)}s both`;
    });
}

/**
 * Add focus effects to form inputs
 */
function initializeFocusEffects() {
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Add shake animation to empty required fields on submit
 */
function validateFormWithAnimation(event) {
    const form = document.getElementById('reviewForm');
    const requiredInputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value || (input.type === 'radio' && !form.querySelector(`input[name="${input.name}"]:checked`))) {
            isValid = false;
            const formGroup = input.closest('.form-group') || input.closest('fieldset');
            
            if (formGroup) {
                formGroup.classList.add('shake');
                formGroup.style.animation = 'shake 0.5s ease';
                
                setTimeout(() => {
                    formGroup.classList.remove('shake');
                    formGroup.style.animation = '';
                }, 500);
            }
        }
    });
    
    return isValid;
}

/**
 * Add custom shake animation keyframes
 */
function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Populate product dropdown
    populateProductSelect();
    
    // Initialize animations and effects
    initializeAnimations();
    initializeFocusEffects();
    addShakeAnimation();
    
    // Add form validation with animation
    const form = document.getElementById('reviewForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!validateFormWithAnimation(event)) {
                event.preventDefault();
            }
        });
    }
    
    console.log('Product Review Form initialized successfully');
});