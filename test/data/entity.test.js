////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {expect} from 'chai';
import Entity from '../../src/data/entity';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Entity', () => {
  const ENTITY_ID = 0;
  const COMPONENT_TYPE = 0;
  let entity;

  describe('#ctor', () => {
    entity = new Entity(ENTITY_ID);

    it('should have the id passed to the constructor', () => {
      expect(entity.id).to.equal(ENTITY_ID);
    });

    it('should have a default component mask of 0', () => {
      expect(entity.componentMask).to.equal(0);
    });
  });

  describe('#attachComponent', () => {
    beforeEach(() => {
      entity = new Entity(ENTITY_ID);
      entity.attachComponent(COMPONENT_TYPE);
    });

    it('should be able to attach a component', () => {
      expect(entity.componentMask).to.equal(1);
    });

    it('should throw when a component of the specified type is already attached', () => {
      expect(() => entity.attachComponent(COMPONENT_TYPE)).to.throw(
        `Error: Component type ${COMPONENT_TYPE} is already attached to entity ${ENTITY_ID}.`);
    });
  });

  describe('#detachComponent', () => {
    beforeEach(() => {
      entity = new Entity(ENTITY_ID);
      entity.attachComponent(COMPONENT_TYPE);
      entity.detachComponent(COMPONENT_TYPE);
    });

    it('should be able to detach a component', () => {
      expect(entity.componentMask).to.equal(0);
    });

    it('should throw when a component of specified type is not attached', () => {
      expect(() => entity.detachComponent(COMPONENT_TYPE)).to.throw(
        `Error: Component type ${COMPONENT_TYPE} is not attached to entity ${ENTITY_ID}.`
      );
    });
  });

  describe('#createInstance', () => {
    it('should have the id passed to the constructor', () => {
      entity = new Entity.createInstance(ENTITY_ID);

      expect(entity.id).to.equal(ENTITY_ID);
    });

    it('should throw when an id is not passed to the constructor', () => {
      expect(() => Entity.createInstance()).to.throw('Error: entity id cannot be null');
    });
  });
});
