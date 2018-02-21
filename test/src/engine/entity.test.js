////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Entity from '../../../src/js/engine/entity';
import Component from '../../../src/js/engine/component';
let chai = require('chai');
let sinon = require('sinon');

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const COMPONENT_TYPE = 'component';
const COMPONENT = sinon.mock(Component);

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Entity', () => {
 let entity;

  describe('#ctor', () => {

    it('throw an error if the id parameter is missing', () => {
      chai.expect(() => new Entity()).to.throw();
    });
  });

  describe('#ctor', () => {
    const ID = '1234';

    it('should have the id passed to the constructor', () => {
      entity = new Entity(ID);
      chai.expect(entity.id).to.equal(ID);
    });
  });

  describe('#attachComponent', () => {
    it('should attach the component to the game object', () => {
      entity.attachComponent(COMPONENT_TYPE, COMPONENT);
      const RESPONSE = entity.hasComponent(COMPONENT_TYPE);

      chai.expect(RESPONSE).to.equal(true);
    });
  });

  describe('#attachComponent', () => {
    it('should throw an error when attaching the same type of component to the game object', () => {
      chai.expect(() => entity.attachComponent(COMPONENT_TYPE, COMPONENT)).to.throw();
    });
  });

  describe('#hasComponent', () => {
    it('should have the component of type attached', () => {
      const RESPONSE = entity.hasComponent(COMPONENT_TYPE);

      chai.expect(RESPONSE).to.equal(true);
    });
  });

  describe('#getComponent', () => {
    it('should return the component of type', () => {
      const RESPONSE = entity.getComponent(COMPONENT_TYPE);

      chai.expect(RESPONSE).to.equal(COMPONENT);
    });
  });

  describe('#detachComponent', () => {

    it('should detach the component of type', () => {
      entity.detachComponent(COMPONENT_TYPE);
      const RESPONSE = entity.hasComponent(COMPONENT_TYPE);

      chai.expect(RESPONSE).to.equal(false);
    });
  });

  describe('#create', () => {
    it('should have an id', () => {
      const ENTITY = Entity.create();
      chai.expect(ENTITY.id).to.not.equal(undefined);
    });
  });
});
