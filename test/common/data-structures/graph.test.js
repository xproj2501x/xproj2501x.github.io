////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {expect} from 'chai';
import Graph from '../../../src/common/data-structures/graph';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Graph', () => {
  const KEY_1 = 1;
  const KEY_2 = 2;
  let graph;

  describe('#ctor', () => {
    graph = new Graph();

    it('should have a size of 0', () => {
      expect(graph.size).to.equal(0);
    });
  });

  describe('#findNode', () => {

  });

  describe('#hasNode', () => {

  });

  describe('#insertNode', () => {
    beforeEach(() => {
      graph = new Graph();
      graph.insertNode(KEY_1, {});
    });

    it('should insert a new node', () => {
      expect(graph.size).to.equal(1);
      expect(graph.hasNode(KEY_1)).to.equal(true);
    });

    it('should throw when a node with the same key already exists', () => {
      expect(() => graph.insertNode(KEY_1, {})).to.throw(
        `Error: Node ${KEY_1} already exists in the graph.`);
    });
  });

  describe('#removeNode', () => {

  });

  describe('#addEdge', () => {

  });

  describe('#removeEdge', () => {

  });

  describe('#createInstance', () => {

  });
});
