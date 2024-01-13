class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val)
    if (!this.root){
      this.root = newNode;
      return this;
    }
    let current = this.root
    let nextNode = this.root

    while(nextNode){
      current = nextNode;
      nextNode = current.val > val ?
        current.left :
        current.right
    }
    if(current.val > val){
      current.left = newNode;
    } else {
      current.right = newNode
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    
    if (this.root === null){
      this.root = new Node(val)
      return this;
    }
    // if (current === null) {
    //   current = new Node(val)
    //   return current
    // }

    // if(current.val > val){
    //   current.left = this.insertRecursively(val, current.left);
    // } else if (current.val < val) {
    //   current.right = this.insertRecursively(val, current.right)
    // }

    // return this;

    if(val < current.val) {
      if(current.left === null){
        current.left = new Node(val)
        return this;
      } else {
        this.insertRecursively(val, current.left)
      }
    } else {
      if (current.right === null){
        current.right = new Node(val)
        return this;
      } else {
        this.insertRecursively(val, current.right)
      }
    }

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root
    let nextNode = this.root

    while(nextNode){
      current = nextNode;
      nextNode = current.val > val ?
        current.left :
        current.right
    }
    if (current.val == val){
      return current
    } else {
      return undefined
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (current === null) {
      return undefined
    }
    if (val == current.val){
      return current
    } else if (val < current.val){
      return this.findRecursively(val, current.left)
    } else {
      return this.findRecursively(val, current.right)
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const valArray = []
    let current = this.root
    
    function traverse(node) {
      valArray.push(node.val)
      if(node.left){
        traverse(node.left)
      }
      if(node.right){
        traverse(node.right)
      }
    }

    traverse(current)
    return valArray
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const valArray = []
    let current = this.root

    function traverse(node) {
      if(node.left){
        traverse(node.left)
      }
      valArray.push(node.val)
      if(node.right){
        traverse(node.right)
      }
    }

    traverse(current)
    return valArray
  }


  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const valArray = []
    let current = this.root

    function traverse(node) {
      if(node.left){
        traverse(node.left)
      }
      if(node.right){
        traverse(node.right)
      }
      valArray.push(node.val)
    }
    traverse(current)
    return valArray
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const nodeQueue = [this.root]
    const data = []
    let current;

    while(nodeQueue.length > 0){
      console.log(nodeQueue)
      current = nodeQueue.shift()
      data.push(current.val)
      current.left && nodeQueue.push(current.left)
      current.right && nodeQueue.push(current.right)
    }

    return data;

    /**
     * start at root
     * add root to nodeQueue
     * while nodeQueue.length > 0
     *  node = nodeQueue.unshift
     * push node.left, node.right
     * data.push(node)
     */
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
