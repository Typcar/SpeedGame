const easyWords = [
    'cat', 'dog', 'fish', 'bird', 'tree', 'bush', 'sky', 'blue', 'red', 'green'
];
const mediumWords = [
    'flower', 'garden', 'animal', 'planet', 'ocean', 'mountain', 'valley', 'river', 'forest', 'desert'
];
const hardWords = [
    'difficult', 'challenge', 'complexity', 'intricate', 'perseverance', 'concentration', 'accuracy', 'improvement', 'coordination', 'dexterity'
];
const extremeWords = [
    'extraordinary', 'unprecedented', 'incomprehensible', 'misunderstanding', 'phenomenon', 'disestablishmentarianism', 'antidisestablishmentarianism', 'floccinaucinihilipilification', 'pseudopseudohypoparathyroidism', 'supercalifragilisticexpialidocious'
];

let currentWord = '';
let score = 0;
let time = 60; // Default time for easy level
let timerInterval;
let playerName = '';
let currentDifficulty = 'easy';

const wordElement = document.getElementById('word');
const inputElement = document.getElementById('input');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const endButton = document.getElementById('end-button');
const highscoreTableBody = document.querySelector('#highscore-table tbody');
const difficultySelect = document.getElementById('difficulty');

function getRandomWord() {
    let wordsArray;
    switch (currentDifficulty) {
        case 'medium':
            wordsArray = mediumWords;
            break;
        case 'hard':
            wordsArray = hardWords;
            break;
        case 'extreme':
            wordsArray = extremeWords;
            break;
        default:
            wordsArray = easyWords;
            break;
    }
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
}

function updateWord() {
    currentWord = getRandomWord();
    wordElement.textContent = currentWord;
    inputElement.value = '';
}

function updateScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
}

function updateTimer() {
    if (time > 0) {
        time--;
        timerElement.textContent = `Time: ${time}`;
    } else {
        clearInterval(timerInterval);
        addHighscore(playerName, score);
        resetGame();
    }
}

function addHighscore(name, score) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const scoreCell = document.createElement('td');
    nameCell.textContent = name;
    scoreCell.textContent = score;
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    highscoreTableBody.appendChild(row);
}

function resetGame() {
    score = 0;
    scoreElement.textContent = 'Score: 0';
    inputElement.disabled = true; // Disable input until the game starts again
    startButton.disabled = false; // Enable the start button
    endButton.disabled = true; // Disable the end button
    timerElement.textContent = `Time: ${time}`; // Reset the timer display
}

function startGame() {
    if (!playerName) {
        playerName = prompt('Enter your name:');
        if (!playerName || playerName.trim() === '') {
            alert('Name cannot be empty. Please enter your name.');
            playerName = ''; // Reset playerName to ensure prompt appears again
            return;
        }
    }

    currentDifficulty = difficultySelect.value;
    switch (currentDifficulty) {
        case 'medium':
            time = 45;
            break;
        case 'hard':
            time = 30;
            break;
        case 'extreme':
            time = 30;
            break;
        default:
            time = 60;
            break;
    }

    score = 0;
    scoreElement.textContent = 'Score: 0';
    timerElement.textContent = `Time: ${time}`;
    updateWord();
    inputElement.disabled = false; // Enable input for typing
    inputElement.focus(); // Focus on the input field
    startButton.disabled = true; // Disable the start button
    endButton.disabled = false; // Enable the end button
    startTimer();
}

function endGame() {
    clearInterval(timerInterval);
    addHighscore(playerName, score);
    resetGame();
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);

inputElement.addEventListener('input', () => {
    if (inputElement.value === currentWord) {
        updateScore();
        updateWord();
    }
});

// Initial setup
resetGame();
