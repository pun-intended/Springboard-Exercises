/*
Write a function called randomGame that selects a random number between 0 and 1 every 
1000 milliseconds and each time that a random number is picked, add 1 to a counter. 
If the number is greater than .75, stop the timer and console.log the number of tries 
it took before we found a number greater than .75.
*/
function randomGame(){
    let counter = 0
    function pushYourLuck(){
        if (Math.random() <= .75){
            counter++;
        }
        else {
            clearInterval(timerId);
            console.log(counter);
        }
    }
    timerId = setInterval(pushYourLuck, 1000);
}

randomGame();