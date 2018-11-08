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
   * The key for the graph node.
   * @private
   * @type {number}
   */
  _key;

  /**
   * The data for the graph node.
   * @private
   * @type {object}
   */
  _data;

  /**
   * A collection of edges connected to other graph nodes.
   * @private
   * @type {array}
   */
  _edges;

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
   * Returns an array of the edges for the node.
   * @public
   * @readonly
   *
   * @return {array}
   */
  get edges() {
    return this._edges;
  }

  /**
   *
   * @return {number}
   */
  get degree() {
    return this._edges.length;
  }

  /**
   * GraphNode
   * @constructor
   * @param {number} key - The key for the graph node.
   * @param {object} data - The data for the graph node.
   */
  constructor(key, data) {
    this._key = key;
    this._data = data;
    this._edges = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Adds an edge from the node to another node in the graph.
   * @param {number} key - The key for the connected node.
   * @param {number} weight - The weight of the edge. (Default: 0}
   *
   * @throws {Error}
   */
  addEdge(key, weight = 0) {
    if (this.hasEdge(key)) throw Error(`Error: node ${this._key} is already connected to node ${key}`);
    this._edges[key] = weight;
  }

  /**
   * Removes an edge from the node to another node in the graph.
   * @param {number} key - The key for the connected node.
   *
   * @throws {Error}
   */
  removeEdge(key) {
    if (!this.hasEdge(key)) throw Error(`Error: node ${this._key} is not connected to node ${key}`);
    delete this._edges[key];
  }

  /**
   *
   * @param {number} key - The key for the connected node.
   * @return {boolean}
   */
  hasEdge(key) {
    return key in this._edges;
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
   * @param {number} key - The key for the graph node.
   * @param {object} data - The data for the graph node.
   *
   * @return {GraphNode}
   */
  static createInstance(key, data) {
    return new GraphNode(key, data);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default GraphNode;
