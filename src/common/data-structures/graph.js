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
   * @type {object}
   */
  _nodes;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @readonly
   * @return {number}
   */
  get size() {
    return Object.keys(this._nodes).length;
  }
  /**
   * Graph
   * @constructor
   */
  constructor() {
    this._nodes = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Adds a node to the graph.
   * @public
   * @param {number} key - The key for the node.
   * @param {object} data - The data for the node.
   */
  addNode(key, data) {
    if (this.hasNode(key)) throw Error(`Node ${key} already exists in the graph`);
    this._nodes[key] = GraphNode.create(key, data);
  }

  /**
   * Removes a node from the graph and all edges connected to it.
   * @public
   * @param {number} key - The key for the node to remove.
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
   * 
   * @public
   * @param {number} key - The index of the node.
   *
   * @return {boolean}
   */
  hasNode(key) {
    return !!this._nodes[key];
  }

  /**
   * @public
   * @param {number} key - The index of the node.
   *
   * @return {GraphNode}
   */
  findNode(key) {
    if (!this.hasNode(key)) throw Error(`Node ${key} does not exist in the graph`);
    return this._nodes[key];
  }

  /**
   * Adds an edge between two graph nodes.
   * @param {number} key1 - The key for the first graph node.
   * @param {number} key2 - The key for the second graph node.
   * @param {number} weight - The weight of the edge. (Default: 0)
   */
  addEdge(key1, key2, weight=0) {
    if (!this.hasNode(key1)) throw Error(`Node ${key1} does not exist in the graph`);
    if (!this.hasNode(key2)) throw Error(`Node ${key2} does not exist in the graph`);
    const NODE_ONE = this._nodes[key1];
    const NODE_TWO = this._nodes[key2];

    NODE_ONE.addEdge(key2, weight);
    NODE_TWO.addEdge(key1, weight);
  }

  /**
   * Removes an edge between two graph nodes.
   * @param {number} key1 - The key for the first graph node.
   * @param {number} key2 - The key for the second graph node.
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
   *
   * @param {number} key1
   * @param {number} key2
   * @return {boolean}
   */
  hasEdge(key1, key2) {
    if (!this.hasNode(key1)) throw Error(`Node ${key1} does not exist in the graph`);
    if (!this.hasNode(key2)) throw Error(`Node ${key2} does not exist in the graph`);
    const NODE_ONE = this._nodes[key1];
    const NODE_TWO = this._nodes[key2];

    return (NODE_ONE.hasEdge(key2) && NODE_TWO.hasEdge(key1));
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
