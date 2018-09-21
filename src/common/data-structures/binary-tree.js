/**
 * Binary Tree
 * ===
 *
 * @module binaryTree
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import BinaryNode from './binary-node';

////////////////////////////////////////////////////////////////////////////////
// Class
///////////////////////////////////////////////////////////////////////////////

/**
 * BinaryTree
 * @class
 */
class BinaryTree {
  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The root node of the tree.
   * @private
   * @type {BinaryNode}
   */
  _root;

  /**
   * The total number of nodes in the tree.
   * @private
   * @type {number}
   */
  _size;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * BinaryTree
   * @constructor
   */
  constructor() {
    this._root = null;
    this._size = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Inserts a new node into the binary tree.
   * @public
   * @param {number} key -
   * @param {object} data -
   */
  insertNode(key, data) {
    const NEW_NODE = BinaryNode.createInstance(key, data);

    if (!this._root) {
      this._root = NEW_NODE;
    } else {
      this._insertNode(this._root, NEW_NODE);
    }
    this._size++;
  }

  /**
   * Finds the node with a matching key.
   * @public
   * @param {number} key - The index of the node.
   *
   * @return {BinaryNode}
   */
  findNode(key) {
    if (this._root) {
      return this._findNode(key, this._root);
    } else {
      return null;
    }
  }

  /**
   * Removes the node with a matching key.
   * @public
   * @param {number} key - The index of the node.
   */
  removeNode(key) {
    if (this._size > 1) {
      const NODE = this._findNode(key, this._root);

      if (NODE) {
        this._removeNode(NODE);
      } else {
        throw new Error(``);
      }
    } else if (this._size === 1 && this._root.key === key) {
      this._root = null;
    } else {
      throw new Error(``);
    }
    this._size--;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @private
   * @param {BinaryNode} currentNode -
   * @param {BinaryNode} newNode -
   */
  _insertNode(currentNode, newNode) {
    if (newNode.key < currentNode.key) {
      if (currentNode.leftChild) {
        this._insertNode(currentNode.leftChild, newNode);
      } else {
        currentNode.leftChild = newNode;
      }
    } else {
      if (currentNode.rightChild) {
        this._insertNode(currentNode.rightChild, newNode);
      } else {
        currentNode.rightChild = newNode;
      }
    }
  }

  /**
   *
   * @private
   * @param {number} key - The index of the node.
   * @param {BinaryNode} currentNode -
   *
   * @return {BinaryNode}
   */
  _findNode(key, currentNode) {
    if (!currentNode) {
      return null;
    } else if (currentNode.key === key) {
      return currentNode;
    } else if (key < currentNode.key) {
      return self._findNode(key, currentNode.leftChild);
    } else {
      return self._findNode(key, currentNode.rightChild);
    }
  }

  /**
   *
   * @private
   * @param {BinaryNode} node
   */
  _removeNode(node) {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   *
   * @return {BinaryTree} A new binary tree instance.
   */
  static createInstance() {
    return new BinaryTree();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default BinaryTree;
