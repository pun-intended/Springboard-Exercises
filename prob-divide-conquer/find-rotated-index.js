function findRotatedIndex(array, num) {
 let pivot = findPivot(array)
//  if pivot >0, num is > 0, num < pivot-1, start on right side, else left
if(pivot > 0 && num >= array[0] && num <= array[pivot - 1]){
    return binarySearch(array, num, 0, pivot - 1)
} else{
    return binarySearch(array, num, pivot, array.length - 1)}
}

function binarySearch(array, num, start, end){
    if(array.length === 0) return -1
    if(num < array[0] && num > array[array.length - 1]) return -1
    while(start <= end){
        let mid = Math.floor((start + end)/2);
        if (array[mid] === num) {
            return mid;
        } else if (num < array[mid]) {
            end = mid - 1
        } else {
            start = mid + 1
        }
    }
    return - 1;
}

function findPivot(array){
    // check if actually pivoted
    if(array.length <= 1 || array[0] < array[array.length -1]) return 0;
    // define start/end
    let start = 0
    let end = array.length - 1
    // while start <= end, binary hop to pivot
    while(start <= end){
        let mid = Math.floor((end + start)/2)
        if(array[mid] > array[mid + 1]) {
            return mid + 1
        } else if (array[start] <= array[mid])
            start = mid + 1 
        else{
            end = mid - 1
        }
        
    }
}

module.exports = findRotatedIndex