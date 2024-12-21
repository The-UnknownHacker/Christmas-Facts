let score = 0;
let currentTree = null;
let gameInterval = null;
let timerInterval = null;
let timeLeft = 30;

const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');

function getRandomHole() {
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function showTree() {
  if (currentTree) {
    currentTree.classList.remove('active'); 
    currentTree.querySelector('.tree').classList.add('hidden'); 
  }

  const hole = getRandomHole();
  const tree = hole.querySelector('.tree');
  hole.classList.add('active');
  tree.classList.remove('hidden'); 
  currentTree = hole;

  setTimeout(() => {
    if (hole === currentTree) {
      hole.classList.remove('active');
      tree.classList.add('hidden');
      currentTree = null;
    }
  }, 1000);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  clearInterval(gameInterval);
  clearInterval(timerInterval);

  gameInterval = setInterval(showTree, 1000);
  timerInterval = setInterval(updateTimer, 1000);

  startButton.disabled = true;

  setTimeout(() => {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    alert(`Game Over! Your score: ${score}`);
    startButton.disabled = false;
  }, 30000);
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
}

holes.forEach((hole) => {
  hole.addEventListener('click', () => {
    if (hole.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      hole.classList.remove('active');
      hole.querySelector('.tree').classList.add('hidden');
      currentTree = null;
    }
  });
});

startButton.addEventListener('click', startGame);
