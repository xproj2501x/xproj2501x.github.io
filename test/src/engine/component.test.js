////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Component from '../../../src/js/engine/component';
let chai = require('chai');

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const ID = '1234';
const STATE = {
  foo: 1,
  bar: 2
};
const NEW_STATE = {
  foo: 4,
  bar: 5
};
const INVALID_STATE = {
  foo: 1,
  bar: 2,
  baz: 3
};

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Component', () => {
  let component;

  describe('#ctor', () => {

    it('throw an error if the id parameter is missing', () => {
      chai.expect(() => new Component()).to.throw();
    });
  });

  describe('#ctor', () => {

    it('throw an error if the state parameter is missing', () => {
      chai.expect(() => new Component(ID)).to.throw();
    });
  });

  describe('#ctor', () => {
    it('should have the id and state passed to the constructor', () => {
      component = new Component(ID, STATE);

      chai.expect(component.id).to.equal(ID);
      chai.expect(component.state.foo).to.equal(STATE.foo);
      chai.expect(component.state.bar).to.equal(STATE.bar);
    });
  });

  describe('#update', () => {
    it('should update the state of the component', () => {
      component.update(NEW_STATE);
      chai.expect(component.state.foo).to.equal(NEW_STATE.foo);
      chai.expect(component.state.bar).to.equal(NEW_STATE.bar);
    });
  });

  describe('#update', () => {
    it('should throw an error for an invalid state', () => {
      chai.expect(() => component.update(INVALID_STATE)).to.throw();
    });
  });


  describe('#create', () => {
    it('create a new component', () => {
      const COMPONENT = Component.create(ID, STATE);

      chai.expect(COMPONENT instanceof Component).to.equal(true);
    });
  });

});
