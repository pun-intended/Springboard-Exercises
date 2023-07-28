/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
// change tail pointer to new node
// change tail to new node
// return tail
    let n = new Node(val)
    this.tail.next = n
    this.tail = n
    this.length += 1
    }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
// add pointer to head
// change head to new node
// return head
    let n = new Node(val)
    n.next = this.head
    this.head = n
    this.length += 1
  }

  /** pop(): return & remove last item. */

  pop() {
// traverse to 2nd last node
// hold "next"
// remove pointer to last node
// change tail to current node
    let currentNode = this.head
    while (currentNode.next.next){
      currentNode = currentNode.next
    }
    let n = currentNode.next
    this.tail = currentNode
    currentNode.next = null
    this.length -= 1
    return n.val
  }

  /** shift(): return & remove first item. */

  shift() {
// save head
// set head to next node
// change set pointer of current node to null
// return node
    let n = this.head
    this.head = this.head.next
    n.next = null
    this.length -= 1
    return n.val
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    // add traverse method?
// set counter to x
// start at head
// while counter is > 0, current node = current node.next
// return val
    let counter = 0
    let currentNode = this.head
    while(counter < idx){
      currentNode = currentNode.next
      counter += 1
  }
    if (currentNode){
      return currentNode.val
    }
    else{
      throw error;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

    let counter = 0
    let currentNode = this.head
    while(counter < idx){
      currentNode = currentNode.next
      counter += 1
    }
    if (currentNode){
      return currentNode.val = val;
    }
    else{
      throw error;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
// create node
// traverse to idx - 1
// set new node.next to currentnode.next.next
// set current node.next to new node
    let n = new Node(val)
    let counter = 0
    let currentNode = this.head
    while(counter < idx - 1){
      currentNode = currentNode.next
      counter += 1
    }
    n.next = currentNode.next
    currentNode.next = n
    this.length += 1
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
// traverse to idx-1
// save node
// current node.next = current node.next.next
// saved node.next = null
// return savednode.val
    let counter = 0
    let currentNode = this.head
    while(counter < idx - 1){
      currentNode = currentNode.next
      counter += 1
    }
    let n = currentNode.next
    currentNode.next = n.next
    n.next = null
    this.length -= 1
    return n.val
  }

  /** average(): return an average of all values in the list */

  average() {
    // start counter, initialize aggregator to 0
    // start traversal at head
    // at each node, add val to aggregator
    // return agg / count

    let tally = 0
    let currentNode = this.head
    while (currentNode){
      tally += currentNode.val
    }
    return tally/this.length
  }
}

module.exports = LinkedList;
