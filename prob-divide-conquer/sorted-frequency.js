function sortedFrequency(array, num) {
    let first = findFirst(array, num)
    if (first === -1 ) return first
    let last = findLast(array, num, first)
    let count = last - first +1
    return count
}

function findFirst(array, num, low=0, high=array.length - 1){
    if(high >= low){
        let mid = low + Math.floor((high - low)/2)
        if((mid === 0 || array[mid - 1] < num) && array[mid] === num){
            return mid
        } else if (array[mid] < num) {
            return findFirst(array, num, mid + 1, high)
        }
        return findFirst(array, num, low, mid - 1)
    }
    return - 1
}

function findLast(array, num, low=0, high=array.length - 1){
    if(high >= low){
        let mid = low + Math.floor((high - low)/2)
        if((mid === array.length-1 || array[mid + 1] > num) && array[mid] === num){
            return mid
        } else if (array[mid] > num) {
            return findLast(array, num, low, mid - 1)
        }
        return findLast(array, num, mid + 1, high)
    }
    return - 1
}

module.exports = sortedFrequency