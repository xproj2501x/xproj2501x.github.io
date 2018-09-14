////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {expect} from 'chai';
import Entity from '../../src/engine/entity';
import Component from '../../src/engine/component';
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
      expect(() => new Entity()).to.throw();
    });
  });

  describe('#ctor', () => {
    const ID = '1234';

    it('should have the id passed to the constructor', () => {
      entity = new Entity(ID);
      expect(entity.id).to.equal(ID);
    });
  });

  describe('#attachComponent', () => {
    it('should attach the component to the game object', () => {
      entity.attachComponent(COMPONENT_TYPE, COMPONENT);
      const RESPONSE = entity.hasComponent(COMPONENT_TYPE);

      expect(RESPONSE).to.equal(true);
    });
  });

  describe('#attachComponent', () => {
    it('should throw an error when attaching the same type of component to the game object', () => {
      expect(() => entity.attachComponent(COMPONENT_TYPE, COMPONENT)).to.throw();
    });
  });

  describe('#hasComponent', () => {
    it('should have the component of type attached', () => {
      const RESPONSE = entity.hasComponent(COMPONENT_TYPE);

      expect(RESPONSE).to.equal(true);
    });
  });

  describe('#getComponent', () => {
    it('should return the component of type', () => {
      const RESPONSE = entity.getComponent(COMPONENT_TYPE);

      expect(RESPONSE).to.equal(COMPONENT);
    });
  });

  describe('#detachComponent', () => {

    it('should detach the component of type', () => {
      entity.detachComponent(COMPONENT_TYPE);
      const RESPONSE = entity.hasComponent(COMPONENT_TYPE);

      expect(RESPONSE).to.equal(false);
    });
  });

  describe('#create', () => {
    it('should have an id', () => {
      const ENTITY = Entity.create();

      expect(ENTITY.id).to.not.equal(undefined);
    });
  });
});
