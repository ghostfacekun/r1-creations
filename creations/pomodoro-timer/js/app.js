let workDuration = 25;
let breakDuration = 5;
let isWorking = true;
let timerInterval;

function updateTimer() {
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const modeIndicator = document.getElementById('mode-indicator');

    let minutes = Math.floor(timerDuration / 60);
    let seconds = timerDuration % 60;

    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    if (isWorking) {
        modeIndicator.textContent = 'WORK';
    } else {
        modeIndicator.textContent = 'BREAK';
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerDuration--;
        updateTimer();

        if (timerDuration === 0) {
            stopTimer();
            switchMode();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function switchMode() {
    isWorking = !isWorking;

    if (isWorking) {
        timerDuration = workDuration * 60;
    } else {
        timerDuration = breakDuration * 60;
    }

    updateTimer();
    startTimer();
}

function resetTimer() {
    stopTimer();
    timerDuration = workDuration * 60;
    isWorking = true;
    updateTimer();
}

let timerDuration = workDuration * 60;

document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        // Scroll up
        workDuration = Math.max(1, workDuration + 5);
        timerDuration = workDuration * 60;
        updateTimer();
    } else {
        // Scroll down
        workDuration = Math.max(1, workDuration - 5);
        timerDuration = workDuration * 60;
        updateTimer();
    }
});

document.addEventListener('click', (event) => {
    if (event.button === 1) {
        // Side click
        if (timerInterval) {
            stopTimer();
        } else {
            startTimer();
        }
    }
});

document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        // Long press start
        document.addEventListener('mouseup', handleLongPressEnd);
        setTimeout(() => {
            resetTimer();
        }, 1000);
    }
});

function handleLongPressEnd() {
    document.removeEventListener('mouseup', handleLongPressEnd);
}

updateTimer();