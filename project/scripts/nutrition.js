function calculateDailyWater(weightKg, activityMultiplier) {
    const baseLiters = weightKg * 0.033;
    return baseLiters * activityMultiplier;
}

function displayWaterResult(liters) {
    const waterResult = document.getElementById('waterResult');
    const rounded = liters.toFixed(1);

    waterResult.classList.add('show');
    waterResult.innerHTML = `<p>Aim for about <strong>${rounded} liters</strong> of water today.</p>`;
}

function generateMealIdea() {
    const proteins = ['Grilled chicken breast', 'Baked salmon', 'Greek yogurt bowl', 'Tofu stir-fry'];
    const carbs = ['Brown rice', 'Sweet potato', 'Quinoa', 'Whole-grain pasta'];
    const vegetables = ['Broccoli + carrots', 'Mixed salad greens', 'Roasted peppers + onions', 'Spinach + cucumber'];
    const fats = ['Olive oil drizzle', 'Avocado slices', 'Handful of nuts', 'Chia seeds'];

    const pick = list => list[Math.floor(Math.random() * list.length)];

    const mealResult = document.getElementById('mealResult');
    mealResult.innerHTML = `
        <h3>Your Meal Idea</h3>
        <ul>
            <li><strong>Protein:</strong> ${pick(proteins)}</li>
            <li><strong>Carb:</strong> ${pick(carbs)}</li>
            <li><strong>Vegetables:</strong> ${pick(vegetables)}</li>
            <li><strong>Healthy Fat:</strong> ${pick(fats)}</li>
        </ul>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const waterForm = document.getElementById('waterForm');
    const generateMealButton = document.getElementById('generateMeal');

    waterForm.addEventListener('submit', event => {
        event.preventDefault();

        const bodyWeight = Number(document.getElementById('bodyWeight').value);
        const activityLevel = Number(document.getElementById('activityLevel').value);

        const liters = calculateDailyWater(bodyWeight, activityLevel);
        displayWaterResult(liters);
    });

    generateMealButton.addEventListener('click', generateMealIdea);
});
