/**
 * Graph Node
 * ===
 *
 * @module graphNode
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * GraphNode
 * @class
 */
class GraphNode {
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
   * @type {object}
   */
  _edges;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The data for the node.
   * @public
   * @readonly
   *
   * @return {object}
   */
  get data() {
    return this._data;
  }

  /**
   * Returns an array of the edges for the node.
   * @public
   * @readonly
   *
   * @return {Array}
   */
  get edges() {
    return Object.keys(this._edges);
  }

  /**
   * GraphNode
   * @constructor
   * @param {number} key - The index for the node.
   * @param {object} data - The dat for the node.
   */
  constructor(key, data) {
    this._key = key;
    this._data = data;
    this._edges = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Adds an edge from the node to another node in the graph.
   * @public
   * @param {number} key - The key for the connected node.
   * @param {number} weight - The weight of the edge. (Default: 0}
   */
  addEdge(key, weight=0) {
    if (this.hasEdge(key)) throw Error(`Error: node ${this._key} is already connected to node ${key}`);
    this._edges[key] = weight;
  }

  /**
   * Removes a connection to the connected node with a matching key.
   * @public
   * @param {number} key - The index of the connected node.
   */
  removeEdge(key) {
    if (!this.hasEdge(key)) throw Error(`Error: node ${this._key} is not connected to node ${key}`);
    delete this._edges[key];
  }

  /**
   *
   * @public
   * @param {number} key - The index of the connected node.
   * @return {boolean}
   */
  hasEdge(key) {
    return key in this._edges;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {number} key - The index for the node.
   * @param {object} data - The data for the node.
   *
   * @return {GraphNode} - A new graph node instance.
   */
  static createInstance(key, data) {
    return new GraphNode(key, data);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default GraphNode;
