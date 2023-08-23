const markov = require("./markov")

// - creates the correct length of text
describe("test text creation", () => {
    beforeEach(() => {
        text = "this is a sample text input"
        mm = new markov.MarkovMachine(text)
        
    })
    
    test("should produce text of the default length (100)", () => {
        markovChain = mm.makeText()
        mmArray = markovChain.split(" ")
        expect(mmArray.length).toEqual(100)
    })
    
    test("should produce text of the default given length", () => {
        markovChain = mm.makeText(10)
        mmArray = markovChain.split(" ")
        expect(mmArray.length).toEqual(10)
    })
    
    test("all words should be from the sample text", () => {
        mmArray = markovChain.split(" ")
        textArray = text.split(' ')
        result = mmArray.every(val => textArray.includes(val))
        expect(result).toBeTruthy()
    })
})

describe("test chains", () => {
    beforeAll(() => {
        text = "one two one three two three"
        mm = new markov.MarkovMachine(text)
    })
    
    test("Chain should have correct number of properties", () => {
        let keys = Object.keys(mm.chains)
        expect(keys.length).toEqual(3)
    })

    test("Chain should have the correct values for keys", () => {
        expect(mm.chains["one"]).toEqual(["two", "three"])
        expect(mm.chains["two"]).toEqual(["one", "three"])
        expect(mm.chains["three"]).toEqual(["two", null])
    })
})