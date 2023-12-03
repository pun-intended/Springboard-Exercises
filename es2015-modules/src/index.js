import { choice, remove } from "./helpers.js"
import fruit from "./foods.js"
const item = choice(fruit)
console.log(`I'd like one ${ item } please`)
console.log(`Here you go: ${remove(fruit, item)}`)
console.log(`Delicious! May I have another?`)
console.log(`I'm sorry, we're all out. We have ${fruit.length} left`)
