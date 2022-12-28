/*----- constants -----*/
const words = ['space', 'earth', 'planet', 'universe', 'sun', 'moon', 'supernova', 'star', 'uranus',
'neptune', 'mars', 'jupiter'];
const MAX_WRONG = 5;



/*----- state variables -----*/
let wrongGuesses;
let guess;
let gameStatus;
let randWord;




/*----- stored elements  -----*/
const imgEl = document.getElementById('spaceman');
const playBtn = document.getElementById('newgamebtn');
const messageEl = document.querySelector('.message');
const attempts = document.querySelector('.lives');
const letters = [...document.querySelectorAll('section > button')];
const secretWord = document.querySelector('.secretword');




/*----- event listeners -----*/
document.querySelector('section').addEventListener('click', handleChoice);
playBtn.addEventListener('click', init);



/*----- functions -----*/

init();

function init() {
  wrongGuesses = [];
  const maxIdx = Math.floor(Math.random() * words.length);
  randWord = words[maxIdx].toUpperCase().split('')
  guess = randWord.map(ltr => ltr === ' ' ? ' ' : ' _ ');
  gameStatus = null;
  render();
}

function render() {
  renderMessage();
  imgEl.src = `img/spaceman-${wrongGuesses.length}.jpg`;
  secretWord.textContent = guess.join('');
  renderBtn();
}

function renderMessage() {
  if (gameStatus === 'W') {
    messageEl.textContent = `Congrats, you guessed right! You Win!`
  } else if (gameStatus === 'L') {
    messageEl.textContent = `You ran out of guesses, the word was ${randWord.join('')}, Play Again!`
  } else {
    messageEl.textContent = `${MAX_WRONG - wrongGuesses.length + 1} Guesses left`;
  }
}

function renderBtn() {
  letters.forEach(function (btn) {
    const ltr = btn.textContent;
    if (wrongGuesses.includes(ltr)) {
      btn.className = 'wrong';
    } else if (guess.includes(ltr)) {
      btn.className = 'correct';
    } else {
      btn.className = '';
    }
  });
  playBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
}

function handleChoice(evt) {
  const ltr = evt.target.textContent
  if (
    gameStatus ||
    evt.target.tagName !== 'BUTTON' ||
    wrongGuesses.includes(ltr) ||
    guess.includes(ltr)
  ) return;

  if (randWord.includes(ltr)) {
    randWord.forEach(function (char, idx) {
      if (char === ltr) guess[idx] = ltr
    });
  } else {
    wrongGuesses.push(ltr);
  }
  gameStatus = getGameStatus();
  render();
}

function getGameStatus() {
  if (!guess.includes(' _ ')) return 'W';
  if (wrongGuesses.length > MAX_WRONG) return 'L'
  return null;
}
