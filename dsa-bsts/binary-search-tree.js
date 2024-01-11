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
    let nextNode = this.root
    /**
     * insert clause for null
     * compare newNode to nextNode
     * if nextNode > newNode -> nextNode = nextNode.right else .left
     * continue while there is a nextNode
     * return this
     */
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    /**
     * insert clause for null current
     *  create node, append node, return this
     * if root, check left or right
     * set current appropriately
     * recursive call to insert
     */


  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root
    /**
     * while current
     *  if current.val === val, return current
     *  if current.val > val current = nextnode.right else left
     * return current
     */
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
   /**
     * while current
     *  if current.val === val, return current
     *  if current.val > val findRecursively(current.right) else findRecursively(current.left)
     * return nextNode
     */
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const valArray = []
    let current = this.root
    /**
     * push val to node array
     * if left, visit left node
     * if right, visit right node 
     */
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const valArray = []
    let current = this.root
    /**
     * push val to node array
     * if left, visit left node
     * if right, visit right node 
     */
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const valArray = []
    let current = this.root
    /**
     * push val to node array
     * if left, visit left node
     * if right, visit right node 
     */
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const nodeQueue = []
    const data = []
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
