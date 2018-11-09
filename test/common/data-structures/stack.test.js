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
  let stack;

  describe('#ctor', () => {
    stack = new Stack();

    it('should be an instance of Stack', () => {
      expect(stack instanceof Stack).to.equal(true);
    });

    it('should have a length of 0', () => {
      expect(stack.size).to.equal(0);
    });
  });

  describe('#peek', () => {

  });

  describe('#clear', () => {

    it('should be empty', () => {

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

  describe('#push', () => {
    const STACK = new Stack();

    STACK.push(1);

    it('should have a length of 1', () => {
      expect(STACK.length).to.equal(1);
    });
  });

  describe('#createInstance', () => {

  });
});
