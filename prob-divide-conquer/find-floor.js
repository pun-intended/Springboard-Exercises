// find the largest number less than or equal to num in an array
function findFloor(array, num) {
    // set high/low
    // start loop ( high >= low)
    // set exit conditions
    // set new high/low conditions
    //return -1 if not found
    let low = 0;
    let high = array.length - 1;
    while(high >= low){
        if (num >= array[high]) return array[high];
        let mid = Math.floor((high + low) / 2);
        if (array[mid] === num) return array[mid];
        if(mid > 0 && num >= array[mid-1] && num < array[mid]) {
            return array[mid-1];
        }
        if(num < array[mid]){
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}

module.exports = findFloor