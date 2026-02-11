// ========================================
// HOME PAGE JAVASCRIPT
// Demonstrates: Functions, DOM Manipulation, Conditionals, 
// Objects, Arrays, Array Methods, Template Literals
// ========================================

// WORKOUT DATA - Array of Objects
const workouts = [
    {
        name: "Morning Stretch Routine",
        duration: "10 minutes",
        level: "beginner",
        exercises: ["Neck Rolls", "Shoulder Circles", "Torso Twists", "Hamstring Stretch"],
        description: "Gentle stretching to wake up your body"
    },
    {
        name: "Beginner Cardio",
        duration: "20 minutes",
        level: "beginner",
        exercises: ["Jumping Jacks", "High Knees", "Butt Kicks", "Arm Circles"],
        description: "Get your heart pumping with basic cardio"
    },
    {
        name: "Core Strengthening",
        duration: "15 minutes",
        level: "beginner",
        exercises: ["Planks", "Crunches", "Bicycle Crunches", "Leg Raises"],
        description: "Build a stronger core with simple exercises"
    },
    {
        name: "Full Body Blast",
        duration: "25 minutes",
        level: "beginner",
        exercises: ["Squats", "Push-ups", "Lunges", "Mountain Climbers"],
        description: "Complete body workout for beginners"
    },
    {
        name: "Lower Body Focus",
        duration: "20 minutes",
        level: "beginner",
        exercises: ["Squats", "Lunges", "Calf Raises", "Glute Bridges"],
        description: "Strengthen your legs and glutes"
    },
    {
        name: "Upper Body Builder",
        duration: "18 minutes",
        level: "beginner",
        exercises: ["Wall Push-ups", "Arm Circles", "Tricep Dips", "Shoulder Taps"],
        description: "Build upper body strength without equipment"
    }
];

// FITNESS TIPS - Array
const fitnessTips = [
    "Drink at least 8 glasses of water daily to stay hydrated",
    "Start small - 10 minutes of exercise is better than none",
    "Consistency beats intensity - show up every day",
    "Get 7-9 hours of sleep for optimal recovery",
    "Warm up before every workout to prevent injury",
    "Listen to your body and rest when needed",
    "Set realistic goals and celebrate small wins",
    "Find a workout buddy for accountability",
    "Mix cardio and strength training for best results",
    "Eat protein within 30 minutes after working out",
    "Track your progress to stay motivated",
    "Don't skip rest days - recovery is crucial"
];

// ========================================
// FUNCTION: BMI CALCULATOR
// Demonstrates: Functions, Conditionals, Objects, DOM Manipulation
// ========================================
function calculateBMI(height, weight) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Object to store result
    const result = {
        value: bmi.toFixed(1),
        category: "",
        message: "",
        color: ""
    };
    
    // Conditional branching
    if (bmi < 18.5) {
        result.category = "Underweight";
        result.message = "Consider consulting a healthcare provider about healthy weight gain.";
        result.color = "#3498db";
    } else if (bmi >= 18.5 && bmi < 25) {
        result.category = "Normal Weight";
        result.message = "Great! You're in a healthy weight range. Keep it up!";
        result.color = "#2ecc71";
    } else if (bmi >= 25 && bmi < 30) {
        result.category = "Overweight";
        result.message = "Consider a balanced diet and regular exercise routine.";
        result.color = "#f39c12";
    } else {
        result.category = "Obese";
        result.message = "Consult with a healthcare provider for a personalized plan.";
        result.color = "#e74c3c";
    }
    
    return result;
}

// Function to display BMI result
function displayBMIResult(result) {
    const resultDiv = document.getElementById('bmiResult');
    
    // Template literal for dynamic HTML
    resultDiv.innerHTML = `
        <div class="bmi-result-card" style="border-left: 4px solid ${result.color}">
            <h4>Your BMI: ${result.value}</h4>
            <p class="bmi-category" style="color: ${result.color}">${result.category}</p>
            <p class="bmi-message">${result.message}</p>
        </div>
    `;
    
    resultDiv.style.display = 'block';
}

// ========================================
// FUNCTION: WORKOUT GENERATOR
// Demonstrates: Functions, Arrays, Array Methods, Template Literals
// ========================================
function generateRandomWorkout() {
    // Array method: Get random workout
    const randomIndex = Math.floor(Math.random() * workouts.length);
    const workout = workouts[randomIndex];
    
    const displayDiv = document.getElementById('workoutDisplay');
    
    // Template literal with object properties
    // Array method: .map() to create exercise list
    const exerciseList = workout.exercises
        .map(exercise => `<li>${exercise}</li>`)
        .join('');
    
    displayDiv.innerHTML = `
        <div class="workout-card">
            <h4>${workout.name}</h4>
            <div class="workout-meta">
                <span class="workout-duration">⏱️ ${workout.duration}</span>
                <span class="workout-level">📊 ${workout.level}</span>
            </div>
            <p>${workout.description}</p>
            <h5>Exercises:</h5>
            <ul class="exercise-list">
                ${exerciseList}
            </ul>
        </div>
    `;
}

// ========================================
// FUNCTION: TIP GENERATOR
// Demonstrates: Functions, Arrays, Template Literals
// ========================================
function generateFitnessTip() {
    // Array method: Get random tip
    const randomIndex = Math.floor(Math.random() * fitnessTips.length);
    const tip = fitnessTips[randomIndex];
    
    const tipDisplay = document.getElementById('tipDisplay');
    
    // Template literal
    tipDisplay.innerHTML = `
        <div class="tip-card">
            <p class="tip-text">${tip}</p>
        </div>
    `;
}

// ========================================
// FUNCTION: LOAD WORKOUT PREVIEWS
// Demonstrates: Functions, Arrays, Array Methods (.slice, .forEach), Template Literals
// ========================================
function loadWorkoutPreviews() {
    const grid = document.getElementById('workoutsGrid');
    
    // Array method: .slice() to get first 4 workouts
    const previewWorkouts = workouts.slice(0, 4);
    
    // Array method: .forEach() to iterate
    let html = '';
    previewWorkouts.forEach(workout => {
        // Template literal for each workout card
        html += `
            <article class="workout-preview-card">
                <div class="workout-icon">🏋️</div>
                <h3>${workout.name}</h3>
                <p class="workout-duration">⏱️ ${workout.duration}</p>
                <p>${workout.description}</p>
                <div class="workout-tags">
                    <span class="tag">${workout.level}</span>
                    <span class="tag">${workout.exercises.length} exercises</span>
                </div>
            </article>
        `;
    });
    
    grid.innerHTML = html;
}

// ========================================
// FUNCTION: FORM SUBMISSION HANDLER
// Demonstrates: Functions, Objects, DOM Manipulation, Event Listening
// ========================================
function openNewsletterModal(message) {
    const modal = document.getElementById('newsletterModal');
    const messageEl = document.getElementById('newsletterModalMessage');

    if (!modal || !messageEl) return;

    messageEl.textContent = message;
    modal.hidden = false;
}

function closeNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    if (!modal) return;
    modal.hidden = true;
}

function setupNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    const closeButton = document.getElementById('newsletterModalClose');
    const closeTargets = document.querySelectorAll('[data-close-modal]');

    if (!modal || !closeButton) return;

    closeButton.addEventListener('click', closeNewsletterModal);
    closeTargets.forEach(target => {
        target.addEventListener('click', closeNewsletterModal);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeNewsletterModal();
        }
    });
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    // Get form data - creating an object
    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        goal: document.getElementById('goals').value,
        timestamp: new Date().toISOString()
    };

    const goalLabel = formData.goal.replace('-', ' ');
    const modalMessage = `Welcome to FitStart, ${formData.name}. Check your email for your personalized ${goalLabel} workout plan.`;
    openNewsletterModal(modalMessage);
    
    // Reset form
    document.getElementById('newsletterForm').reset();
}

// ========================================
// FUNCTION: ANIMATE STAT COUNTER
// Demonstrates: Functions, Conditional, DOM Manipulation
// ========================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        
        // Conditional: Stop when target reached
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// ========================================
// EVENT LISTENERS & INITIALIZATION
// Demonstrates: Event Listening, DOM Manipulation
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // BMI Form - Event Listener
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // DOM Selection
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            
            // Function call
            const result = calculateBMI(height, weight);
            displayBMIResult(result);
        });
    }
    
    // Workout Generator Button - Event Listener
    const generateBtn = document.getElementById('generateWorkout');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateRandomWorkout);
    }
    
    // Tip Generator Button - Event Listener
    const tipBtn = document.getElementById('generateTip');
    if (tipBtn) {
        tipBtn.addEventListener('click', generateFitnessTip);
    }
    
    // Newsletter Form - Event Listener
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    setupNewsletterModal();
    
    // Load workout previews on page load
    if (document.getElementById('workoutsGrid')) {
        loadWorkoutPreviews();
    }
    
    // Animate user count stat
    const userCountEl = document.getElementById('userCount');
    if (userCountEl) {
        animateCounter(userCountEl, 10000, 2000);
    }
});
