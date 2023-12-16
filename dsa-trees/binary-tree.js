
/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(this.root === null) {return 0}

    let minDepth, rightPath, leftPath;
    function getPath(node, runningCount){
      let count = runningCount
      // cut off search if path longer than minDepth
      if(minDepth && runningCount > minDepth) {return}
      
      if(node.right !== null){
        rightPath = getPath(node.right, count+1)
      } 
      if(node.left !== null){
        leftPath = getPath(node.left, count+1)
      } 
      if(node.right == null && node.left == null){

        if (!minDepth || minDepth > count){
          minDepth = count;
          return;
        }
      }
    }

    getPath(this.root, 1)
    return minDepth
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(this.root === null) {return 0}

    let maxDepth, rightPath, leftPath;
    function getPath(node, runningCount){
      let count = runningCount
      
      if(node.right !== null){
        rightPath = getPath(node.right, count+1)
      } 
      if(node.left !== null){
        leftPath = getPath(node.left, count+1)
      } 
      if(node.right == null && node.left == null){

        if (!maxDepth || maxDepth < count){
          maxDepth = count;
          return;
        }
      }
    }
    
    getPath(this.root, 1)
    return maxDepth
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if(this.root === null) {return 0}
    let maxSum;

    function getSum(node) {
      let maxLeft = 0 
      let maxRight = 0 
      let throughSum = 0
      if(node.left !== null) {maxLeft = getSum(node.left)};
      if(node.right !== null) {maxRight = getSum(node.right)};
      throughSum = node.val + maxRight + maxLeft
      if(!maxSum || throughSum > maxSum) {maxSum = throughSum}
      let max =  Math.max(node.val + maxLeft, node.val + maxRight)
      return max
    }

    getSum(this.root)

    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(this.root === null) {return null}

    let path = [this.root];
    let nextLarger = this.root > lowerBound ? this.root : null;
    while(path.length){
      let node = path.pop()
      console.log(`${node.val} - ${nextLarger}`)

      if(node.left) {path.push(node.left)}
      if(node.right) {path.push(node.right)}
      if (node.val > lowerBound){
        if(nextLarger === null) {nextLarger = node.val}
        nextLarger = Math.min(nextLarger, node.val)
      }
    }
    return nextLarger;
  }

  // /** Further study!
  //  * areCousins(node1, node2): determine whether two nodes are cousins
  //  * (i.e. are at the same level but have different parents. ) */

  // areCousins(node1, node2) {

  // }

  // /** Further study!
  //  * serialize(tree): serialize the BinaryTree object tree into a string. */

  // static serialize() {

  // }

  // /** Further study!
  //  * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  // static deserialize() {

  // }

  // /** Further study!
  //  * lowestCommonAncestor(node1, node2): find the lowest common ancestor
  //  * of two nodes in a binary tree. */

  // lowestCommonAncestor(node1, node2) {
    
  // }
}

module.exports = { BinaryTree, BinaryTreeNode };
