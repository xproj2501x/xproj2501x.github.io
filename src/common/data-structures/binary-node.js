/**
 * Binary Node
 * ===
 *
 * @module binaryNode
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * BinaryNode
 * @class
 */
class BinaryNode {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The index of the node.
   * @private
   * @type {number}
   */
  _key;

  /**
   * The data of the node.
   * @private
   * @type {object}
   */
  _data;

  /**
   * The parent of the node.
   * @private
   * @type {BinaryNode}
   */
  _parent;

  /**
   * The left child of the node.
   * @private
   * @type {BinaryNode}
   */
  _leftChild;

  /**
   * The right child of the node.
   * @private
   * @type {BinaryNode}
   */
  _rightChild;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get key() {
    return this._key;
  }

  /**
   * @public
   * @readonly
   *
   * @return {object}
   */
  get data() {
    return this._data;
  }

  /**
   * @public
   * @readonly
   *
   * @return {BinaryNode}
   */
  get leftChild() {
    return this._leftChild;
  }

  /**
   * @public
   * @readonly
   *
   * @return {BinaryNode}
   */
  set leftChild(node) {
    this._leftChild = node;
  }

  /**
   * @public
   * @readonly
   *
   * @return {BinaryNode}
   */
  get rightChild() {
    return this._rightChild;
  }

  /**
   * @public
   * @readonly
   *
   * @return {BinaryNode}
   */
  set rightChild(node) {
    this._rightChild = node;
  }

  /**
   * @public
   * @readonly
   *
   * @return {boolean}
   */
  get isRootNode() {
    return this._parent === null;
  }

  /**
   * @public
   * @readonly
   *
   * @return {boolean}
   */
  get isRightNode() {
    return this._parent.rightChild === this;
  }

  /**
   * @public
   * @readonly
   *
   * @return {boolean}
   */
  get isLeftNode() {
    return this._parent.leftChild === this;
  }

  /**
   * BinaryNode
   * @constructor
   */
  constructor(key, data) {
    this._key = key;
    this._data = data;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  remove() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {int} key - The index of the node.
   * @param {object} data - The data of the node.
   *
   * @return {BinaryNode} A new binary node instance.
   */
  static createInstance(key, data) {
    return new BinaryNode(key, data);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default BinaryNode;
