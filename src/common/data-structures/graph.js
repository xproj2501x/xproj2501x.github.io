/**
 * Graph
 * ===
 *
 * @module graph
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import GraphNode from './graph-node';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * Graph
 * @class
 */
class Graph {
  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {boolean}
   */
  _isDirected;

  /**
   * @private
   * @type {object}
   */
  _nodes;

  /**
   * @private
   * @type {object}
   */
  _edges;

  /**
   * The total number of nodes in the graph.
   * @private
   * @type {number}
   */
  _size;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @public
   * @readonly
   *
   * @return {array}
   */
  get nodes() {
    return Object.values(this._nodes);
  }

  /**
   * @public
   * @readonly
   *
   * @return {array}
   */
  get edges() {
    return Object.values(this._edges);
  }

  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get size() {
    return Object.keys(this._nodes).length;
  }

  /**
   * @public
   * @readonly
   *
   * @return number;
   */
  get weight() {
    return 1;
  }

  /**
   * Graph
   * @constructor
   * @param {boolean} isDirected - (Default: false)
   */
  constructor(isDirected = false) {
    this._isDirected = isDirected;
    this._nodes = {};
    this._edges = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Finds a graph node with a matching key.
   * @param {number} key - The key of the graph node.
   *
   * @throws {Error}
   * @return {GraphNode}
   */
  findNode(key) {
    if (!this.hasNode(key)) throw Error(`Node ${key} does not exist in the graph`);
    return this._nodes[key];
  }
  
  /**
   *
   * @param {number} key - The key of the graph node.
   *
   * @return {boolean}
   */
  hasNode(key) {
    return key in this._nodes;
  }

  /**
   * Inserts a new node into the graph.
   * @param {number} key - The key for the node.
   * @param {object} data - The data for the node.
   *
   * @throws {Error}
   */
  insertNode(key, data) {
    if (this.hasNode(key)) throw Error(`Error: Node ${key} already exists in the graph.`);
    this._nodes[key] = GraphNode.createInstance(key, data);
  }

  /**
   * Removes a node from the graph and all edges connected to it.
   * @param {number} key - The key of the node to remove.
   *
   * @throws {Error}
   */
  removeNode(key) {
    if (!this.hasNode(key)) throw Error(`Node ${key} does not exist in the graph`);
    const NODE = this._nodes[key];

    NODE.edges.forEach((edge) => {
      this.removeEdge(key, edge);
    });
    delete this._nodes[key];
  }

  /**
   * Adds an edge between two graph nodes.
   * @param {number} key1 - The key for the first graph node.
   * @param {number} key2 - The key for the second graph node.
   * @param {number} weight - The weight of the edge. (Default: 0)
   */
  addEdge(key1, key2, weight = 0) {
    if (!this.hasNode(key1)) throw Error(`Node ${key1} does not exist in the graph`);
    if (!this.hasNode(key2)) throw Error(`Node ${key2} does not exist in the graph`);
    const NODE_ONE = this._nodes[key1];
    const NODE_TWO = this._nodes[key2];

    NODE_ONE.addEdge(key2, weight);
    NODE_TWO.addEdge(key1, weight);
  }

  /**
   *
   * @param {number} key1 - The key for the first graph node.
   * @param {number} key2 - The key for the second graph node.
   *
   * @throws {Error}
   * @return {boolean}
   */
  hasEdge(key1, key2) {
    if (!this.hasNode(key1)) throw Error(`Node ${key1} does not exist in the graph`);
    if (!this.hasNode(key2)) throw Error(`Node ${key2} does not exist in the graph`);
    const NODE_ONE = this._nodes[key1];
    const NODE_TWO = this._nodes[key2];

    return (NODE_ONE.hasEdge(key2) && NODE_TWO.hasEdge(key1));
  }
  
  /**
   * Removes an edge between two graph nodes.
   * @param {number} key1 - The key for the first graph node.
   * @param {number} key2 - The key for the second graph node.
   *
   * @throws {Error}
   */
  removeEdge(key1, key2) {
    if (!this.hasNode(key1)) throw Error(`Node ${key1} does not exist in the graph`);
    if (!this.hasNode(key2)) throw Error(`Node ${key2} does not exist in the graph`);
    const NODE_ONE = this._nodes[key1];
    const NODE_TWO = this._nodes[key2];

    NODE_ONE.removeEdge(key2);
    NODE_TWO.removeEdge(key1);
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
   * @return {Graph} A new graph instance.
   */
  static createInstance() {
    return new Graph();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Graph;
