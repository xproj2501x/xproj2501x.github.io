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
  const ID = '1234';

  describe('#ctor', () => {

    it('should have the id passed to the constructor', () => {
      const ENTITY = new Entity(ID);

      expect(ENTITY.id).to.equal(ID);
    });
  });

  describe('#createInstance', () => {
    it('should have the id passed to the constructor', () => {
      const ENTITY = Entity.createInstance(ID);

      expect(ENTITY.id).to.equal(ID);
    });

    it('should throw when an id is not passed to the constructor', () => {
      expect(() => Entity.createInstance()).to.throw('Error: entity id cannot be null');
    });
  });
});
