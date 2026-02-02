let timerInterval;
let minutes = 0;
let seconds = 0;

const timerMinutesElement = document.getElementById('timer-minutes');
const timerSecondsElement = document.getElementById('timer-seconds');

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    timerMinutesElement.textContent = String(minutes).padStart(2, '0');
    timerSecondsElement.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    minutes = 0;
    seconds = 0;
    timerMinutesElement.textContent = '00';
    timerSecondsElement.textContent = '00';
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('timer-display')) {
        if (timerInterval) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
});

document.addEventListener('longpress', () => {
    resetTimer();
});

document.addEventListener('longpressstart', () => {
    document.body.classList.add('long-press');
});

document.addEventListener('longpressend', () => {
    document.body.classList.remove('long-press');
});