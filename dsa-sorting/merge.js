function merge(array1, array2) {
    let i = 0
    let j = 0
    const merged = []
    while(i < array1.length && j < array2.length) {
        if (array1[i] <= array2[j]){
        merged.push(array1[i])
        i++
    } else {
        merged.push(array2[j])
        j++
    }}
    while(i < array1.length){
        merged.push(array1[i])
        i++
    }
    while(j < array2.length){
        merged.push(array2[j])
        j++
    }
    // console.log(merged)
    return merged
}

function mergeSort(arr) {
    if(arr.length <= 1){
        return arr
    }
    let mid = Math.floor(arr.length/2)
    const arr1 = mergeSort(arr.slice(0, mid))
    const arr2 = mergeSort(arr.slice(mid))
    
    return merge(arr1, arr2)

}

module.exports = { merge, mergeSort};