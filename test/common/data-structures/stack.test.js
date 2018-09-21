////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {expect} from 'chai';
import Stack from '../../../src/common/data-structures/stack';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Stack', () => {

  describe('#ctor', () => {

  });

  describe('#push', () => {
    const STACK = new Stack();

    STACK.push(1);

    it('should have a length of 1', () => {
      expect(STACK.length).to.equal(1);
    });
  });

  describe('#pop', () => {
    const STACK = new Stack();

    STACK.push(1);
    STACK.pop();

    it('should have a length of 0', () => {
      expect(STACK.length).to.equal(0);
    });

    it('should pop the last element added', () => {
      STACK.push(1);
      STACK.push(2);
      const DATA = STACK.pop();

      expect(STACK.length).to.equal(1);
      expect(DATA).to.equal(2);
    });
  });

  describe('#peek', () => {
    const STACK = new Stack();

  });

  describe('#clear', () => {
    const STACK = new Stack();

    it('should be empty', () => {

    });
  });

  describe('#createInstance', () => {

  });
});
