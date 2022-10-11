/*----- constants -----*/
const words = [space, earth, planet, ]; // Word library!
const MAX_WRONG = 6; // the amount body parts(6)



/*----- state variables -----*/
//let spaceman; //Marty(character) 
let wrongGuesses; // array that holds wrong guesses letters
let guess;
let answer;
let gameStatus;





/*----- stored elements  -----*/
const playBtn = document.querySelector('newgamebtn');
const MessageEl = document.querySelector('.message');
const attempts = document.querySelector('.lives');
const letters = [...document.querySelectorAll('main > button')];
const secretWo = document.querySelector('.secretWord');








  /*----- event listeners -----*/
playBtn.addEventListener('click', init);
document.querySelector('letters').addEventListener('click', handleChoice);







  /*----- functions -----*/

  init();

  function init() {
    wrongGuesses = [];
    const randWord = Math.floor(Math.random * words.length);
    randWord = words[randWord].split('');
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
      MessageEl.textContent = 'You guessed right!'
    } else if (gameStatus === 'L') {
      MessageEl.textContent = 'you ran out of guesses, play again!'
    } else {
      messageEl.textContent = `${MAX_WRONG - wrongGuesses.length + 1} wrong guesses left`;
    }
  }
  
  function renderBtn() {
    letterBtn.forEach(function(btn) {
      const letter = btn.textContent;
      // if wrongGuesses includes letter set letter to active
      if (wrongGuesses.includes()) {
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
    const ltr = evt.target.textContent
    if (
      gameStatus ||
      !letters.includes(evt.target) ||
      wrongGuesses.includes(ltr) ||
      guess.includes(ltr)
    ) return;
  
    if (randomWord.includes(ltr)) {
      randomWord.forEach(function(char, idx) {
        if (char === ltr) guess[idx] = ltr
      }); 
      } else {
        wrongGuesses.push(ltr);
      } 
      gameStatus = getGameStatus()
      render();
    }
    function getGameStatus() {
      if (!guess.includes('_')) return 'W';
      /*if wrong guesses.length is > MAX_WRONG return 'L' */
      //(MAX_WRONG === 0)
      //gameStatus = 'L';
      if (wrongGuesses.length > MAX_WRONG) return 'L'
      return null;
    }

