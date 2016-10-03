/**
 * Doubly Linked List implemented in ES6:
 *   - shift
 *   - unshift
 *   - push
 *   - pop
 *   - insert
 *   - remove
 *   - get
 *   - set
 *   - contains
 *   - equals
 *   - clone
 *
 * To be transpiled to Javascript.
 */

import {IndexError} from './exceptions.js';


const dllmap = new WeakMap();

class Node {
  constructor(value=null, prev=null, next=null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export default class DoublyLinkedList {
  constructor() {
    dllmap.set(this, {
      head: null,
      tail: null,
      size: 0,
    });
  }

  get head() {
    return dllmap.get(this).head;
  }

  get tail() {
    return dllmap.get(this).tail;
  }

  get size() {
    return dllmap.get(this).size;
  }

  print() {
    let head = this.head;
    let res = "";
    while (head) {
      res += head.value + " ";
      head = head.next;
    }
    console.log(res);
  }

  empty() {
    return this.size == 0;
  }

  shift(value) {
    const node = new Node(value=value);
    if (this.tail == null) {
      dllmap.get(this).head = dllmap.get(this).tail = node;
    }
    else {
      node.prev = null;
      node.next = dllmap.get(this).head;
      dllmap.get(this).head.prev = node;
      dllmap.get(this).head = node;
    }
    dllmap.get(this).size++;
  }

  unshift(value) {
    return this.remove(0);
  }

  push(value) {
    const node = new Node(value=value);
    if (this.head == null) {
      dllmap.get(this).head = dllmap.get(this).tail = node;
    }
    else {
      node.prev = dllmap.get(this).tail;
      node.next = null;
      dllmap.get(this).tail.next = node;
      dllmap.get(this).tail = node;
    }
    dllmap.get(this).size++;
  }

  pop(value) {
    return this.remove(this.size-1);
  }

  insert(pos, value) {
    if (pos < 0 || pos > this.size) {
      throw new IndexError("Out of bounds.");
    }
    if (pos == 0) {
      this.shift(value);
    }
    else if (pos == this.size) {
      this.push(value);
    }
    else {
      let node = this.getNodeAt(pos);
      let pred = node.prev;
      let newNode = new Node(value=value);
      newNode.prev = pred;
      newNode.next = node;
      node.prev = newNode;
      pred.next = newNode;
      dllmap.get(this).size++;
    }
  }

  remove(pos) {
    if (pos < 0 || pos >= this.size) {
      throw new IndexError("Out of bounds.");
    }
    let node = this.getNodeAt(pos);
    let pred = node.prev;
    let succ = node.next;
    if (pred == null)
      dllmap.get(this).head = succ;
    else
      pred.next = succ;
    if (succ == null)
      dllmap.get(this).tail = pred;
    else
      succ.prev = pred;
    dllmap.get(this).size--;
  }

  set(pos, value) {
    if (pos < 0 || pos >= this.size) {
      throw new IndexError("Out of bounds.");
    }
    this.getNodeAt(pos).value = value;
  }

  get(pos) {
    if (pos < 0 || pos >= this.size) {
      throw new IndexError("Out of bounds.");
    }
    return this.getNodeAt(pos).value;
  }

  contains(value) {
    let head = this.head;
    while (head) {
      if (head.value == value) {
        return true;
      }
      head = head.next;
    }
    return false;
  }

  equals(that) {
    if (this == that) {
      return true;
    }
    else if (this.size != that.size) {
      return false;
    }
    else {
      let thisHead = this.head;
      let thatHead = that.head;
      while (thisHead != null && thatHead != null) {
        if (thisHead.value != thatHead.value) {
          return false;
        }
        thisHead = thisHead.next;
        thatHead = thatHead.next;
      }
      return true;
    }
  }

  clone() {
    let newList = new DoublyLinkedList();
    let head = this.head;
    while (head) {
      newList.push(head.value);
      head = head.next;
    }
    return newList;
  }

  getNodeAt(pos) {
    let cnt, node;
    if (pos < this.size / 2) {
      cnt = pos;
      node = dllmap.get(this).head;
      while (cnt > 0) {
        node = node.next;
        cnt--;
      }
    }
    else {
      cnt = this.size - 1 - pos;
      node = dllmap.get(this).tail;
      while (cnt > 0) {
        node = node.prev;
        cnt--;
      }
    }
    return node;
  }
}
