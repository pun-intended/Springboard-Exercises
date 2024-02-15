function findRotatedIndex() {
 
}

function findPivot(array){
    // check if actually pivoted
    if(array.length <= 1 || array[0] < array[array.length -1]) return 0;
    // define start/end
    let start = 0
    let end = array.length - 1
    // while start <= end, binary hop to pivot
    while(start <= end){
        let mid = start + Math.floor((end - start)/2)
        if(array[mid] > array[mid + 1]) {
            return mid + 1
        } else if (array[start] <= array[mid])
            start = mid + 1 
        
    }
}

module.exports = findRotatedIndex