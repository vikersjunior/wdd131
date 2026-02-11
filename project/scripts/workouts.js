const workouts = [
    {
        name: 'Morning Stretch Routine',
        goal: 'mobility',
        level: 'beginner',
        duration: '10 minutes',
        equipment: 'No equipment',
        description: 'Gentle stretching to wake up your body and improve flexibility.',
        exercises: ['Neck circles', 'Cat-cow', 'Hip opener stretch', 'Child\'s pose']
    },
    {
        name: 'Beginner Cardio Blast',
        goal: 'endurance',
        level: 'easy',
        duration: '20 minutes',
        equipment: 'Bodyweight',
        description: 'Low-impact cardio to raise your heart rate safely.',
        exercises: ['March in place', 'Step jacks', 'Mountain climbers', 'Bodyweight squats']
    },
    {
        name: 'Core Strength Builder',
        goal: 'strength',
        level: 'beginner',
        duration: '15 minutes',
        equipment: 'Mat',
        description: 'Build core strength and stability with beginner-focused moves.',
        exercises: ['Dead bug', 'Bird-dog', 'Forearm plank', 'Glute bridge']
    },
    {
        name: 'Fat Burn Circuit',
        goal: 'weight-loss',
        level: 'intermediate',
        duration: '25 minutes',
        equipment: 'No equipment',
        description: 'A circuit format designed to increase calorie burn.',
        exercises: ['Jumping jacks', 'Alternating lunges', 'Pushups', 'High knees']
    },
    {
        name: 'Walking Recovery Flow',
        goal: 'mobility',
        level: 'easy',
        duration: '18 minutes',
        equipment: 'No equipment',
        description: 'Recovery session to stay active while reducing joint stress.',
        exercises: ['Brisk walk', 'Calf stretch', 'Quad stretch', 'Hamstring reach']
    },
    {
        name: 'Starter Strength Session',
        goal: 'strength',
        level: 'beginner',
        duration: '22 minutes',
        equipment: 'Light dumbbells',
        description: 'Simple full-body workout to build a strength foundation.',
        exercises: ['Goblet squat', 'Dumbbell row', 'Shoulder press', 'Romanian deadlift']
    }
];

function createWorkoutCard(workout) {
    const exercises = workout.exercises.map(exercise => `<li>${exercise}</li>`).join('');

    return `
        <article class="workout-card">
            <h3>${workout.name}</h3>
            <div class="workout-meta">
                <span>⏱ ${workout.duration}</span>
                <span>🏋️ ${workout.equipment}</span>
            </div>
            <p>${workout.description}</p>
            <div class="workout-tags">
                <span class="tag">${workout.level}</span>
                <span class="tag">${workout.goal.replace('-', ' ')}</span>
            </div>
            <ul class="workout-exercises">${exercises}</ul>
        </article>
    `;
}

function applyFilters() {
    const goal = document.getElementById('goalFilter').value;
    const level = document.getElementById('levelFilter').value;
    const search = document.getElementById('searchFilter').value.trim().toLowerCase();

    const filtered = workouts.filter(workout => {
        const goalMatch = goal === 'all' || workout.goal === goal;
        const levelMatch = level === 'all' || workout.level === level;
        const searchMatch =
            workout.name.toLowerCase().includes(search) ||
            workout.description.toLowerCase().includes(search) ||
            workout.exercises.some(exercise => exercise.toLowerCase().includes(search));

        return goalMatch && levelMatch && searchMatch;
    });

    renderWorkouts(filtered);
}

function renderWorkouts(items) {
    const library = document.getElementById('workoutLibrary');
    const resultCount = document.getElementById('resultCount');

    resultCount.textContent = `${items.length} routine${items.length === 1 ? '' : 's'} found`;

    if (items.length === 0) {
        library.innerHTML = '<div class="empty-state">No workouts match your filters yet. Try broadening your selection.</div>';
        return;
    }

    library.innerHTML = items.map(createWorkoutCard).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workoutFilterForm');
    const goalFilter = document.getElementById('goalFilter');
    const levelFilter = document.getElementById('levelFilter');
    const searchFilter = document.getElementById('searchFilter');

    form.addEventListener('input', applyFilters);
    goalFilter.addEventListener('change', applyFilters);
    levelFilter.addEventListener('change', applyFilters);
    searchFilter.addEventListener('input', applyFilters);

    renderWorkouts(workouts);
});
