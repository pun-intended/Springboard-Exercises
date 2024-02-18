// rotated array - shifts last element to start
// rotates like last and first elements are connected
function findRotationCount(array) {
    let low = 0;
    let high = array.length -1

    while(high >= low){
        if(high === low) return low
        let mid = Math.floor((low + high)/2)
        // check if next value is lowest
        if(mid < high && array[mid + 1] < array[mid]){
            return mid + 1
        }
        // check if mid is lowest value
        if(mid > low && array[mid] < array[mid - 1]){
            return mid
        }
        // set new high/low
        if (array[mid] < array[high]){
            high = mid - 1
        } else {
            low = mid + 1
        }
    }
  return 0
}

module.exports = findRotationCount