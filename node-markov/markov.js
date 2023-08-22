/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
  
    let chains = {}
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]
      let nextWord = this.words[i + 1]
      if (!nextWord){
        nextWord = null
      }
      if (this.words[i] in chains) {
        let current  = chains[word]
        current.push(nextWord)
      }
      else {
        chains[word] = [nextWord]
      }
    }
    this.chains = chains
  }

  getRandomWord() {
    let keys = Object.keys(this.chains)
    let key = keys[Math.floor(Math.random() * keys.length)]
    return key
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let counter = numWords - 1;
    let current = this.getRandomWord()
    let text = current
    let next;
    while (counter > 0){
      
      next = this.chains[current][Math.floor(Math.random() * this.chains[current].length)]
      if (next == null){
        next = this.getRandomWord()
      } 
      console.log("\nAdding:", next)
      text += " "
      text += next
      current = next
      counter--
    } 
    console.log(text)
    return text 
  }
  

}

