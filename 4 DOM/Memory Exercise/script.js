const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
// Initialize variables used in functions
var cardCount = 0;
var score = 0;
var flipped = [];
var matched = [];
var shuffledColors = shuffle(COLORS);

// returns the same array with values shuffled
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// loop over array of colors, create a new div and gives it a class 
// with the value of the color. Add an event listener for a click for each card
function createDivsForColors(colorArray) {

  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  var card = event.target;
  if (cardCount < 2){
    console.log(cardCount)
    if(!card.classList.contains("open") 
    && flipped[flipped.length - 1] != card
    && flipped.length < 2){
      openCard(card);
      if (cardCount == 2) {
        checkMatch();
      }
    }
  }
}

function openCard(card){
  score++;
  cardCount++;
  card.classList.add("open");
  card.style.backgroundColor = card.classList[0];
  flipped.push(card);
}

function checkMatch(){
  var card1 = flipped[flipped.length - 1];
  var card2 = flipped[flipped.length - 2];
  if (card1.classList[0] == card2.classList[0]){
    console.log("its a match!")
    matched.push(flipped.pop());
    matched.push(flipped.pop());
  } else {
    setTimeout(function(){
      card1.style.backgroundColor = "white";
      card2.style.backgroundColor = "white";
      card1.classList.remove("open");
      card2.classList.remove("open");
      flipped.pop();
      flipped.pop();
    }, 1000)
  }
  cardCount -= 2
  checkEndgame();
}
function checkEndgame(){
  if(matched.length == COLORS.length){
    runEndGame();
  }
}
function runEndGame(){
  console.log("you win!!");
  console.log(parseInt(score)/2);
}

// when the DOM loads
createDivsForColors(shuffledColors);

