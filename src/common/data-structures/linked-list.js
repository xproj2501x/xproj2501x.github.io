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
   * The length of the linked list.
   * @private
   * @type {number}
   */
  _length;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The length of the linked list.
   * @public
   * @readonly
   *
   * @return {number}
   */
  get length() {
    return this._length;
  }
  /**
   * LinkedList
   * @constructor
   * @param {object} data - The data for head node of the linked list.
   */
  constructor(data) {
    this._length = 0;
    if (data) this.insertNode(data);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Inserts a new node into the linked list.
   * @public
   * @param {object} data - The data for the new node to be inserted.
   */
  insertNode(data) {
    const NEW_NODE = LinkedListNode.createInstance(data);

    if (this._head) {
      let currentNode = this._head;

      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = NEW_NODE;
    } else {
      this._head = NEW_NODE;
    }
    this._length++;
  }

  /**
   * Finds the node with matching data.
   * @public
   * @param {object} data - The data for the node.
   *
   * @return {LinkedListNode} The matching node.
   */
  findNode(data) {
    let currentNode = this._head;

    while (currentNode.data !== data) {
      currentNode = currentNode.next;
      if (currentNode.next === null) return null;
    }
    return currentNode;
  }

  findPreviousNode(data) {
    let currentNode = this._head;

    while ((currentNode.nextNode) && (currentNode.nextNode.data !== data)) {
      currentNode = currentNode.nextNode;
    }
  }

  /**
   * Removes a node from the linked list.
   * @param {object} data - The data for the node to be removed.
   */
  removeNode(data) {

  }

  /**
   * Clears the linked list.
   */
  clear() {
    this._head = null;
    this._length = 0;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {?object} data - The data for the head node of the linked list. (Default: null)
   *
   * @return {LinkedList} A new linked list instance.
   */
  static createInstance(data = null) {
    return new LinkedList(data);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default LinkedList;
