/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {

    let pushedNode = new Node(val)
    if (this.isEmpty()){
      this.last = pushedNode
    }
    pushedNode.next = this.first
    this.first = pushedNode
    this.size++
    return
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty")
    }
    // if size == 0, throw error
    let poppedNode = this.first
    this.first = this.first.next
    poppedNode.next = null
    this.size--
    return poppedNode.val
    // poppedNode = stack.first
    // stackFirst = poppedNode.next
    // poppedNode.next = null
    // return poppedNode
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if (this.isEmpty()){
      return
    } else {
      return this.first.val
    }
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size == 0
  }
}

module.exports = Stack;
