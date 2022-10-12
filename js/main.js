/*----- constants -----*/
const words = ['space', 'earth', 'planet', 'universe', 'sun', 'moon', 'supernova', 'star']; // Word library!
const MAX_WRONG = 5; // the amount body parts(6)
// const IMGS = [
// "IMG/SPACEMANIMG/spaceman-0.jpg",
// "IMG/SPACEMANIMG/spaceman-1.jpg",
// "IMG/SPACEMANIMG/spaceman-2.jpg",
// "IMG/SPACEMANIMG/spaceman-3.jpg",
// "IMG/SPACEMANIMG/spaceman-4.jpg",
// "IMG/SPACEMANIMG/spaceman-5.jpg",
// "IMG/SPACEMANIMG/spaceman-6.jpg"
// ];


/*----- state variables -----*/
//let spaceman; //Marty(character) 
let wrongGuesses; // array that holds wrong guesses letters
let guess; // player Guess
let gameStatus; // determines winner with "W" or "L"
let randWord; //generated random word




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
  console.log(guess);
  randWord = words[maxIdx].toUpperCase().split('')
  guess = randWord.map(ltr => ltr === ' ' ? ' ' : ' _ ');
  gameStatus = null;
  render();
}

function render() {
  renderMessage();
  imgEl.src = `IMG/SPACEMANIMG/spaceman-${wrongGuesses.length}.jpg`;
  secretWord.textContent = guess.join('');
  renderBtn();
}

function renderMessage() {
  if (gameStatus === 'W') {
    messageEl.textContent = `You guessed right!`
  } else if (gameStatus === 'L') {
    messageEl.textContent = `you ran out of guesses, the word was ${randWord.join('')}, play again!`
  } else {
    messageEl.textContent = `${MAX_WRONG - wrongGuesses.length + 1} lives left`;
  }
}

function renderBtn() {
  letters.forEach(function (btn) {
    const ltr = btn.textContent;
    // if wrongGuesses includes letter set letter to active
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
  console.log(ltr);
  if (
    gameStatus ||
    // Guards in order to not return value, if not clicking letter button
    // !ltr.includes(evt.target) || 
    //better guard than ^
    evt.target.tagName !== 'BUTTON' ||
    //Guards in order to not return value if letter already selected is wrong
    wrongGuesses.includes(ltr) ||
    //Guards in order to not return value if letter already selected is correct
    guess.includes(ltr)
  ) return;

  //randWord is variable of the randWord picked
  if (randWord.includes(ltr)) {
    //if guess is correct. if (ltrs) is correctly picked
    randWord.forEach(function (char, idx) {
      if (char === ltr) guess[idx] = ltr
    });
  } else {
    //if our guess(ltrs) is not part of our word
    wrongGuesses.push(ltr);
  }
  gameStatus = getGameStatus();
  render();
}

// minion robot that checks 
function getGameStatus() {
  if (!guess.includes(' _ ')) return 'W';
  /*if wrong guesses.length is > MAX_WRONG return 'L' */
  //(MAX_WRONG === 0)
  //gameStatus = 'L';
  if (wrongGuesses.length > MAX_WRONG) return 'L'
  return null;
}
