/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length === 0)
    return 
  return nums[0] * product(nums.slice(1))
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 0)
    return
  return Math.max(words[0].length, longest(words.slice(1)));
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length < 2)
    return
  return str[1] + everyOther(str.slice(2))
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length > 2)
    return true;
  if (str[0] != str[-1])
    return false;
  isPalindrome(str.slice(1, -1))
  return true;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  if (arr.length === 0)
    return -1
  if (arr[0] == val)
    return 0
  return findIndex(arr.slice(1)) + 1 || -1
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if (str.length === 1)
    return str[0]
  return revString(str.slice(1)) + str[0]
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  arr = []
  for (key in obj) {
    if (typeof obj[key === "string"]) arr.push(obj[key])
    if (typeof obj[key] === "object") arr.push(...gatherStrings(obj[key]))
  }
  return arr
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length) {
  if (left > right) return -1
  middle = Math.floor((right + left) / 2)
  if (val === arr[middle]) return middle
  
  if (arr[middle] > val)
    return binarySearch(arr, val, left, middle - 1)
  return binarySearch(arr, val, middle +1, right)
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
