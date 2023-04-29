/**
function double(arr) {
    return arr.map(function(val) {
      return val * 2;
    });
}
*/

  /* Write an ES2015 Version */
/*Refactor the above code to use two arrow functions. 
turn it into a one-liner.*/
let double = (arr) => arr.map((val) => (val * 2));


/**
Replace ALL functions with arrow functions:

function squareAndFindEvens(numbers){
    var squares = numbers.map(function(num){
      return num ** 2;
    });
    var evens = squares.filter(function(square){
      return square % 2 === 0;
    });
    return evens;
}
 */
squareAndFindEvens = (numbers) => {
    let squares = numbers.map((num) => (num ** 2));
    let evens = squares.filter((square) => (square % 2 === 0));
    return evens;
};