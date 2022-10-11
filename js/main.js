/*----- constants -----*/
const words = [space, earth, planet, ]; // Word library!
const MAX_WRONG = 6;
// the amount body parts(6)



/*----- state variables -----*/
let spaceman; //Marty(character) 
let wrongGuesses;





/*----- stored elements  -----*/
let playBtn = document.querySelector('newgamebtn');








  /*----- event listeners -----*/








  /*----- functions -----*/

init();

function init() {
  let randWord = Math.floor(Math.random * words);
}
