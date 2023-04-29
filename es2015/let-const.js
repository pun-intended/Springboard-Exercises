```jsx
var PI = 3.14;
PI = 42; // stop me from doing this!
```

/* Write an ES2015 Version */

const PI = 3.14;
// PI = 42 --> results in TypeError

/**
- What is the difference between var and let?
    . var is function scoped, let is block scoped.
    . var allows for hoisting, let doesn't
    . var allows for redeclaring, let doesn't
- What is the difference between var and const?
    . var is function scoped, const is block scoped.
    . var allows for hoisting, const doesn't
    . var allows for both redeclaring and reassignment, const allows neither
- What is the difference between let and const?
    . let values can be rassigned, but const cant
- What is hoisting?
    . allows the variable to be visible from the beginning of the code as 'undeclared', 
    until it is given a value in its' original reference.
*/