/*----- constants -----*/
const words = ['space', 'earth', 'planet', 'universe', 'solar', 'sun', 'moon']; // Word library!
const MAX_WRONG = 6; // the amount body parts(6)



/*----- state variables -----*/
//let spaceman; //Marty(character) 
let wrongGuesses; // array that holds wrong guesses letters
let guess; // player Guess
let gameStatus; // determines winner with "W" or "L"
let randWord; //generated random word




/*----- stored elements  -----*/
const playBtn = document.getElementById('newgamebtn');
const messageEl = document.getElementsByClassName('message');
const attempts = document.getElementsByClassName('lives');
const letters = [...document.querySelectorAll('section > button')];
const secretWord = document.getElementsByClassName('secretWord');




  /*----- event listeners -----*/
document.querySelector('section').addEventListener('click', handleChoice);
playBtn.addEventListener('click', init);




  /*----- functions -----*/

  init();

  function init() {
    wrongGuesses = [];
    const maxIdx = Math.floor(Math.random * words.length);
    randWord = words[maxIdx].toUpperCase().split('');
    guess = randWord.map(ltr => ltr === ' ' ? ' ' : '_');
    gameStatus = null;
    render();
  }
  
  function render() {
    renderMessage();
    secretWord.textContent = guess.join('');
    renderBtn();
  }
  
  function renderMessage() {
    if (gameStatus === 'W') {
      messageEl.textContent = 'You guessed right!'
    } else if (gameStatus === 'L') {
      messageEl.textContent = 'you ran out of guesses, play again!'
    } else {
      messageEl.textContent = `${MAX_WRONG - wrongGuesses.length} wrong guesses left`;
    }
  }
  
  function renderBtn() {
    letterBtn.forEach(function(btn) {
      const ltr = btn.textContent;
      // if wrongGuesses includes letter set letter to active
      if (wrongGuesses.includes(ltr)) {
        btn.className = 'wrong';
      } else if (guess.includes(ltr)) {
        btn.className = 'correct';
      } else {
        btn.className = '';
      }
    })
    playBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
  }
  
  function handleChoice(evt) {
    const letters = evt.target.textContent
    console.log(guess);
    if (
      gameStatus ||
      // Guards
      !letters.includes(evt.target) ||
      wrongGuesses.includes(letters) ||
      guess.includes(letters)
    ) return;
  
    if (randWord.includes(letters)) {
      //if guess is correct
      randWord.forEach(function(char, idx) {
        if (char === letters) guess[idx] = ltr
      }); 
      } else {
        wrongGuesses.push(letters);
      }
      gameStatus = getGameStatus()
      render();
    }

    // minion robot that checks 
    function getGameStatus() {
      if (!guess.includes('_')) return 'W';
      /*if wrong guesses.length is > MAX_WRONG return 'L' */
      //(MAX_WRONG === 0)
      //gameStatus = 'L';
      if (wrongGuesses.length > MAX_WRONG) return 'L'
      return null;
    }

