/**
 * Linked List Node
 * ===
 *
 * @module linkedListNode
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * LinkedListNode
 * @class
 */
class LinkedListNode {
  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The key for the linked list node.
   * @private
   * @type {number}
   */
  _key;

  /**
   * The data for the linked list node.
   * @private
   * @type {object}
   */
  _data;

  /**
   * The next node in the linked list.
   * @private
   * @type {LinkedListNode}
   */
  _nextNode;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _key
   * @public
   * @readonly
   * @return {number}
   */
  get key() {
    return this._key;
  }

  /**
   * Get _data
   * @public
   * @readonly
   * @return {object}
   */
  get data() {
    return this._data;
  }

  /**
   * Get _nextNode
   * @public
   * @readonly
   * @return {LinkedListNode}
   */
  get nextNode() {
    return this._nextNode;
  }

  /**
   * Set _nextNode
   * @public
   * @param {LinkedListNode} value - The new node to add to the linked list.
   */
  set nextNode(value) {
    this._nextNode = value;
  }

  /**
   * LinkedListNode
   * @constructor
   * @param {number} key - The key for the linked list node.
   * @param {object} data - The data for the linked list node.
   */
  constructor(key, data) {
    this._key = key;
    this._data = data;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
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
   * @param {number} key - The key for the linked list node.
   * @param {object} data - The data for the linked list node.
   *
   * @return {LinkedListNode} A new linked list node instance.
   */
  static createInstance(key, data) {
    return new LinkedListNode(key, data);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default LinkedListNode;
