function guessingGame() {
    let secretNum = Math.floor(Math.random()*100);
    let count = 0;
    let isOver = false;
    return function guess(num) {
        if (isOver) return "The game is over, you already won!"
        count ++;
        if(num === secretNum){
            isOver = true;
            return `You win! You found ${secretNum} in ${count} guesses.`;
        } else if (num > secretNum) {
            return `${num} is too high!`;
        } else {
            return `${num} is too low!`;
        } 
    }
}

module.exports = { guessingGame };
