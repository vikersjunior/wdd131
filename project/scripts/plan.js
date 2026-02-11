const PLAN_STORAGE_KEY = 'fitstart_weekly_plan';
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function loadPlan() {
    const rawData = localStorage.getItem(PLAN_STORAGE_KEY);
    if (!rawData) return [];

    try {
        return JSON.parse(rawData);
    } catch (_error) {
        return [];
    }
}

function savePlan(plan) {
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
}

function removeSession(id) {
    const plan = loadPlan().filter(session => session.id !== id);
    savePlan(plan);
    renderPlan(plan);
}

function createSessionMarkup(session) {
    const noteMarkup = session.notes ? `<p>${session.notes}</p>` : '';

    return `
        <article class="session-card">
            <p><strong>${session.workout}</strong></p>
            <p class="session-meta">${session.duration} minutes</p>
            ${noteMarkup}
            <button type="button" class="remove-session" data-id="${session.id}">Remove</button>
        </article>
    `;
}

function renderPlan(plan) {
    const plannerBoard = document.getElementById('plannerBoard');
    const planSummary = document.getElementById('planSummary');

    const totalMinutes = plan.reduce((sum, session) => sum + Number(session.duration), 0);
    planSummary.textContent = `${plan.length} session${plan.length === 1 ? '' : 's'} planned • ${totalMinutes} total minutes`;

    plannerBoard.innerHTML = WEEK_DAYS.map(day => {
        const sessions = plan.filter(session => session.day === day);
        const content = sessions.length
            ? sessions.map(createSessionMarkup).join('')
            : '<p class="day-empty">No sessions yet.</p>';

        return `
            <section class="day-column">
                <h3>${day}</h3>
                ${content}
            </section>
        `;
    }).join('');

    const removeButtons = plannerBoard.querySelectorAll('.remove-session');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => removeSession(button.dataset.id));
    });
}

function clearPlan() {
    localStorage.removeItem(PLAN_STORAGE_KEY);
    renderPlan([]);
}

function handlePlanSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const newSession = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        day: formData.get('day'),
        workout: formData.get('workout').trim(),
        duration: Number(formData.get('duration')),
        notes: formData.get('notes').trim()
    };

    const plan = loadPlan();
    plan.push(newSession);
    savePlan(plan);
    renderPlan(plan);

    form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const plannerForm = document.getElementById('plannerForm');
    const clearButton = document.getElementById('clearPlan');

    plannerForm.addEventListener('submit', handlePlanSubmit);
    clearButton.addEventListener('click', clearPlan);

    renderPlan(loadPlan());
});
