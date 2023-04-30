/**
function createInstructor(firstName, lastName){
    return {
      firstName: firstName,
      lastName: lastName
    }
  }
*/
  /* Write an ES2015 Version */

  const createInstructor = (firstName, lastName) => ({
    firstName, lastName
  });

/**
  var favoriteNumber = 42;

  var instructor = {
    firstName: "Colt"
  }
  
  instructor[favoriteNumber] = "That is my favorite!"
*/

  /* Write an ES2015 Version */
const favoriteNumber = 42;

const instructor = {
    [favoriteNumber]: 'That is my favorite!',
    firstName: 'Colt'
  };
/**
var instructor = {
    firstName: "Colt",
    sayHi: function(){
      return "Hi!";
    },
    sayBye: function(){
      return this.firstName + " says bye!";
    }
}
*/

/* Write an ES2015 Version */
const instructor = {
    firstName: 'Colt',
    sayHi() {
        return "Hi!"
    },
    sayBye() {
        return `${this.firstName} says bye!`
    }

}

/**
Write a function which generates an animal object. The function 
should accept 3 arguments:

- species: the species of animal (‘cat’, ‘dog’)
- verb: a string used to name a function (‘bark’, ‘bleet’)
- noise: a string to be printed when above function is called 
(‘woof’, ‘baaa’)

Use one or more of the object enhancements we’ve covered.
 */
const createAnimal = (species, verb, noise) => ({
    species,
    [verb]() {
        return noise;
    }
})


const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
d.bark()  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
s.bleet() //"BAAAAaaaa"