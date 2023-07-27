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
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
// add pointer to head
// change head to new node
// return head
  }

  /** pop(): return & remove last item. */

  pop() {
// traverse to 2nd last node
// hold "next"
// remove pointer to last node
// change tail to current node
  }

  /** shift(): return & remove first item. */

  shift() {
// save head
// set head to next node
// change set pointer of current node to null
// return node
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    // add traverse method?
// set counter to x
// start at head
// while counter is > 0, current node = current node.next
// return val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
// traverse list to idx
// node.val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
// create node
// traverse to idx - 1
// set new node.next to currentnode.next.next
// set current node.next to new node
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
// traverse to idx-1
// save node
// current node.next = current node.next.next
// saved node.next = null
// return savednode.val
  }

  /** average(): return an average of all values in the list */

  average() {
    // start counter, initialize aggregator to 0
    // start traversal at head
    // at each node, add val to aggregator
    // return agg / count
  }
}

module.exports = LinkedList;
