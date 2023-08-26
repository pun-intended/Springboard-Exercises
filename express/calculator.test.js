const calculator = require("./calculator")

//Test mean
describe("Test getMean method", () => {
    test("should produce accurate averages for set of numbers", () => {
        expect(calculator.getMean([1, 2, 3, 4, 5])).toEqual(expect.closeTo(3, 5))
        expect(calculator.getMean([100, 100, 100])).toEqual(100)
    })
})

//test median
describe("Test getMedian method", () => {
    test("should return accurate median for odd lengthed arrays",() => {
        expect(calculator.getMedian([1, 2, 3, 4, 5])).toEqual(3)
    })
    test("should return accurate median for even lengthed arrays",() => {
        expect(calculator.getMedian([1, 2, 2, 4, 5, 6])).toEqual(3)
    })
    test("should return accurate median for unordered arrays",() => {
        expect(calculator.getMedian([6, 2, 5, 2, 1, 4])).toEqual(3)
    })


})

//test mode
describe("Test getMode method", () => {
    test("should return the correct mode for an array", () => {
        expect(calculator.getMode([1, 3, 3, 3, 5])).toEqual(3)
    })
    test("Should return array of values, if more than one mode exists", () => {
        expect(calculator.getMode([2, 2, 3, 3, 5])).toEqual([2, 3])
    })
})