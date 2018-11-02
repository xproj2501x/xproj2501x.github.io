////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {expect} from 'chai';
import {mock} from 'sinon';
import ComponentManager from '../../src/data/component-manager';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('ComponentManager', () => {

  describe('#ctor', () => {
    it('should create a new component manager instance', () => {

    });
  });

  describe('#createComponent', () => {
    it('should create a new component', () => {

    });

    it('should throw if the component type is already attached to the entity', () => {

    });

    it('should throw an error for a missing property in the state', () => {

    });
  });

  describe('#destroyComponent', () => {
    it('should destroy a component', () => {

    });

    it('should throw an error if the component does not exist', () => {

    });
  });

  describe('#findComponent', () => {
    it('should find a component with a matching id and type', () => {

    });

    it('should throw an error if the component type is not attached to the entity', () => {

    });
  });

  describe('#findComponentsOfType', () => {

  });

  describe('#findComponentsForEntity', () => {

  });

  describe('#updateComponent', () => {

  });

  describe('#createInstance', () => {

  });
});
