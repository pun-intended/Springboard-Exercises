const express = require('express')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class ExpressError extends Error {
    constructor(msg, status){
        super();
        this.message = msg;
        this.status = status;
        console.error(this.stack);
    }
}

function parseIntArray(arr){
    intArray = arr.map(num => parseInt(num))
    return intArray;
}

function getMode(numArray){
    let mode = {}
    let max = []
    let count = 0

    for (num of numArray){

        if (mode[num]){
            mode[num]++
        } else {
            mode[num] = 1
        }

        if (count == mode[num] && !(num in max)){
            max.push(num)
        }
        if (count < mode[num]){
            count = mode[num]
            max = [num]
        }
    }
    if (max.length > 1)
        return max;
    else 
        return max[0]
}

function getMedian(numArray){
    let val;
    nums = numArray.sort((a, b) => { return a - b})

    if (nums.length %2 == 0){
        x = nums[nums.length/2]
        y = nums[nums.length/2 - 1]
        val = (x + y)/2
    } else {
        val = nums[Math.floor(nums.length/2)]
    }
    return val;
}

function getMean(numArray){
    total = numArray.reduce((total, num) => num + total)
    avg = total/numArray.length
    return avg
}

app.get('/mean', (req, res, next) => {
    numsRaw = req.query.nums
    nums = numsRaw.split(',')
    try{
        if (nums.length < 1){
            throw new ExpressError(`must have at least one number`, 400)
        }
        for (num of nums){
            if (isNaN(num)){
                throw new ExpressError(`All items must be numbers`, 400)
            }
        }
    } catch (err){
        return next(err)
    }
    nums = parseIntArray(nums)
    val = getMean(nums)
    mean = {operation: 'mean', value: val}
    return res.send(mean)
})

app.get('/median', (req, res, next) => {

    numsRaw = req.query.nums
    nums = numsRaw.split(',')
    try{
        if (nums.length < 1){
            throw new ExpressError(`must have at least one number`, 400)
        } 
        for (num of nums){
            if (isNaN(num)){
                throw new ExpressError(`All items must be numbers`, 400)
            }
        }
    } catch (err){
        return next(err)
    }
    nums = parseIntArray(nums)
    console.log(nums)
    let val = getMedian(nums);
    median = {operation: 'Median', value: val}
    return res.send(median)
})

app.get('/mode', (req, res, next) => {
    numsRaw = req.query.nums
    nums = numsRaw.split(',')
    try{
        if (nums.length < 1){
            throw new ExpressError(`must have at least one number`, 400)
        } 
        for (num of nums){
            if (isNaN(num)){
                throw new ExpressError(`All items must be numbers`, 400)
            }
        }
    } catch (err){
        return next(err)
    }
    nums = parseIntArray(nums)
    let val = getMode(nums);
    mode = {operation: 'Mode', value: val}
    return res.send(mode)
})

app.use((err, res, req, next) => {
    let message = err.message;
    let status = err.status || 500;

    return res.status.json({error: {message, status}});
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})

module.exports = {
    getMean: getMean,
    getMedian: getMedian,
    getMode: getMode
}