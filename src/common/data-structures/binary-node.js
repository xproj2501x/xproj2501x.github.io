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
   * @private
   * @type {number}
   */
  _key;

  /**
   * @private
   * @type {object}
   */
  _data;

  /**
   * @private
   * @type {BinaryNode}
   */
  _parent;

  /**
   * @private
   * @type {BinaryNode}
   */
  _leftChild;

  /**
   * @private
   * @type {BinaryNode}
   */
  _rightChild;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @readonly
   *
   * @return {number}
   */
  get key() {
    return this._key;
  }

  /**
   * @readonly
   *
   * @return {object}
   */
  get data() {
    return this._data;
  }

  /**
   * @readonly
   *
   * @return {BinaryNode}
   */
  get leftChild() {
    return this._leftChild;
  }

  set leftChild(node) {
    this._leftChild = node;
  }

  get rightChild() {
    return this._rightChild;
  }

  set rightChild(node) {
    this._rightChild = node;
  }

  /**
   * @private
   * @type {boolean}
   */
  get isRootNode() {
    return this._parent === null;
  }

  /**
   * @private
   * @type {boolean}
   */
  get isRightNode() {
    return this._parent.rightChild === this;
  }

  /**
   * @private
   * @type {boolean}
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
   * @param {number} key -
   * @param {object} data -
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
