// ===== GAME STATE =====
const gameState = {
    currentMode: null,
    score: 0,
    level: 1,
    questionsAnswered: 0,
    correctAnswers: 0,
    currentQuestion: null,
    gameActive: false
};

// ===== GAME DATA =====
const gameData = {
    shapes: [
        { icon: '🔷', name: 'Blue Square' },
        { icon: '🔴', name: 'Red Circle' },
        { icon: '🟢', name: 'Green Circle' },
        { icon: '🟡', name: 'Yellow Circle' },
        { icon: '🟣', name: 'Purple Circle' },
        { icon: '🟠', name: 'Orange Circle' },
        { icon: '⭐', name: 'Star' },
        { icon: '❤️', name: 'Heart' }
    ],
    colors: [
        { icon: '🔴', name: 'Red', color: '#ef4444' },
        { icon: '🟠', name: 'Orange', color: '#f97316' },
        { icon: '🟡', name: 'Yellow', color: '#eab308' },
        { icon: '🟢', name: 'Green', color: '#4ade80' },
        { icon: '🔵', name: 'Blue', color: '#3b82f6' },
        { icon: '🟣', name: 'Purple', color: '#a855f7' }
    ],
    numbers: [
        { icon: '1️⃣', name: 'One', value: 1 },
        { icon: '2️⃣', name: 'Two', value: 2 },
        { icon: '3️⃣', name: 'Three', value: 3 },
        { icon: '4️⃣', name: 'Four', value: 4 },
        { icon: '5️⃣', name: 'Five', value: 5 },
        { icon: '6️⃣', name: 'Six', value: 6 }
    ]
};

// ===== UTILITY FUNCTIONS =====
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function updateScore(points = 10) {
    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    updateLevel();
}

function updateLevel() {
    const newLevel = Math.floor(gameState.score / 50) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        document.getElementById('level').textContent = gameState.level;
    }
}

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startGame(mode) {
    gameState.currentMode = mode;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.gameActive = true;
    showScreen('gameScreen');
    generateQuestion();
}

function goBack() {
    gameState.gameActive = false;
    showScreen('modeScreen');
}

function returnToMenu() {
    gameState.score = 0;
    gameState.level = 1;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    document.getElementById('score').textContent = '0';
    document.getElementById('level').textContent = '1';
    showScreen('modeScreen');
}

// ===== QUESTION GENERATION =====
function generateQuestion() {
    const modeData = gameData[gameState.currentMode];
    const target = getRandomElement(modeData);
    
    // Get options
    let options = [target];
    const availableOptions = modeData.filter(item => item !== target);
    
    // Determine number of options based on level
    const numOptions = Math.min(3 + Math.floor(gameState.level / 2), modeData.length);
    
    while (options.length < numOptions && availableOptions.length > 0) {
        const randomOption = getRandomElement(availableOptions);
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    
    options = shuffleArray(options);
    
    gameState.currentQuestion = {
        target: target,
        options: options,
        answered: false
    };
    
    renderQuestion();
}

// ===== RENDERING =====
function renderQuestion() {
    const target = gameState.currentQuestion.target;
    const questionText = getQuestionText();
    
    // Set target item
    document.getElementById('targetItem').textContent = target.icon;
    
    // Clear feedback
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    
    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    gameState.currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.icon;
        btn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(btn);
    });
}

function getQuestionText() {
    const mode = gameState.currentMode;
    if (mode === 'shapes') {
        return `Find the same shape`;
    } else if (mode === 'colors') {
        return `Find the same color`;
    } else if (mode === 'numbers') {
        return `Count the number`;
    }
}

// ===== ANSWER CHECKING =====
function checkAnswer(selectedOption) {
    if (gameState.currentQuestion.answered || !gameState.gameActive) return;
    
    gameState.currentQuestion.answered = true;
    gameState.questionsAnswered++;
    
    const isCorrect = selectedOption === gameState.currentQuestion.target;
    const feedbackEl = document.getElementById('feedback');
    
    if (isCorrect) {
        gameState.correctAnswers++;
        feedbackEl.textContent = '✓ Correct! Great Job! 🎉';
        feedbackEl.className = 'feedback correct';
        updateScore(10 + (gameState.level - 1) * 5);
        
        setTimeout(() => {
            if (gameState.questionsAnswered < 10) {
                generateQuestion();
            } else {
                showResults();
            }
        }, 1500);
    } else {
        feedbackEl.textContent = '✗ Try Again! 💪';
        feedbackEl.className = 'feedback incorrect';
        updateScore(2);
        
        setTimeout(() => {
            generateQuestion();
        }, 1500);
    }
    
    disableAllButtons();
}

function disableAllButtons() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
}

// ===== RESULTS =====
function showResults() {
    gameState.gameActive = false;
    
    const accuracy = Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100);
    
    let resultTitle = 'Great Job!';
    let resultMessage = `You got ${gameState.correctAnswers} out of ${gameState.questionsAnswered} correct!<br>`;
    resultMessage += `Accuracy: ${accuracy}%<br>`;
    
    if (accuracy === 100) {
        resultTitle = '🌟 Perfect! 🌟';
        resultMessage += 'Outstanding performance!';
    } else if (accuracy >= 80) {
        resultTitle = '👏 Excellent! 👏';
        resultMessage += 'You did very well!';
    } else if (accuracy >= 60) {
        resultTitle = '😊 Good Job! 😊';
        resultMessage += 'Keep practicing!';
    } else {
        resultTitle = '💪 Keep Trying! 💪';
        resultMessage += 'You\'re learning! Keep playing to improve!';
    }
    
    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultMessage').innerHTML = resultMessage;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalLevel').textContent = gameState.level;
    
    showScreen('resultsScreen');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    showScreen('modeScreen');
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
});
