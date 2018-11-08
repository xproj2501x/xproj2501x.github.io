/**
 * Linked List
 * ===
 *
 * @module linkedList
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LinkedListNode from './linked-list-node';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * LinkedList
 * @class
 */
class LinkedList {
  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {LinkedListNode}
   */
  _head;

  /**
   * The size of the linked list.
   * @private
   * @type {number}
   */
  _size;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _size
   * @public
   * @readonly
   * @return {number}
   */
  get size() {
    return this._size;
  }

  /**
   * LinkedList
   * @constructor
   */
  constructor() {
    this._size = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Finds a node in the linked list with a matching key.
   * @public
   * @param {number} key - The key of the node.
   *
   * @throws {Error}
   * @return {LinkedListNode}
   */
  findNode(key) {
    let currentNode = this._head;

    while (currentNode) {
      if (currentNode.key === key) return currentNode;
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  /**
   * Inserts a new node at the end of the linked list.
   * @public
   * @param {number} key - The key for the new node.
   * @param {object} data - The data for the new node.
   */
  insertNode(key, data) {
    const NEW_NODE = LinkedListNode.createInstance(key, data);

    if (!this._head) {
      this._head = NEW_NODE;
    } else {
      let currentNode = this._head;

      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = NEW_NODE;
    }
    this._size++;
  }

  /**
   * Removes a node with a matching key from the linked list.
   * @public
   * @param {number} key - The key of the node.
   */
  removeNode(key) {
    let currentNode = this._head;

    if (currentNode.key === key) {
      this._head = currentNode.nextNode;
      return;
    }
    while (currentNode.next) {
      if (currentNode.next.key === key) {
        currentNode.next = currentNode.next.next;
        break;
      }
      currentNode = currentNode.next;
    }
    this._size--;
  }

  /**
   * Reverses the order of the linked list.
   * @public
   */
  reverseList() {

  }

  /**
   * @public
   */
  toString() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   *
   * @return {LinkedList} A new linked list instance.
   */
  static createInstance() {
    return new LinkedList();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default LinkedList;
