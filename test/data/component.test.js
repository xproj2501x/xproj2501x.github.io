////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {expect} from 'chai';
import Component from '../../src/data/component';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Component', () => {
  const ENTITY_ID = 0;
  const COMPONENT_TYPE = 0;
  const TEMPLATE = {
    x: 'number',
    y: 'number'
  };
  const STATE = {
    x: 0,
    y: 0
  };
  let component;

  describe('#ctor', () => {
    component = new Component(ENTITY_ID, COMPONENT_TYPE, STATE);

    it('should have an id, type, and state', () => {
      expect(component.id).to.equal(ENTITY_ID);
      expect(component.type).to.equal(COMPONENT_TYPE);
      expect(component.state.x).to.equal(STATE.x);
      expect(component.state.y).to.equal(STATE.y);
    });
  });

  describe('#update', () => {
    beforeEach(() => {
      component = new Component(ENTITY_ID, COMPONENT_TYPE, STATE);
    });

    it('should update the state of the component', () => {
      component.update({x: 1, y: 1});
      expect(component.state.x).to.equal(1);
      expect(component.state.y).to.equal(1);
    });

    it('should throw an error for an invalid state', () => {
      expect(() => component.update({z: 1})).to.throw(
        `Error: Invalid property z for component type ${COMPONENT_TYPE}.`);
    });
  });

  describe('#createInstance', () => {

    it('should have an id, type, and state', () => {
      component = Component.createInstance(ENTITY_ID, COMPONENT_TYPE, TEMPLATE, STATE);

      expect(component.id).to.equal(ENTITY_ID);
      expect(component.type).to.equal(COMPONENT_TYPE);
      expect(component.state.x).to.equal(STATE.x);
      expect(component.state.y).to.equal(STATE.y);
    });

    it('should throw an error for an invalid property in the state', () => {
      expect(() => Component.createInstance(ENTITY_ID, COMPONENT_TYPE, TEMPLATE, {z: 1})).to.throw(
        `Error: Property z is not valid for component type ${COMPONENT_TYPE}.`);
    });

    it('should throw an error for an invalid property type in the state', () => {
      expect(() => Component.createInstance(ENTITY_ID, COMPONENT_TYPE, TEMPLATE, {x: 'string', y: 0})).to.throw(
        `Error: Property type string is not valid for property x of component type ${COMPONENT_TYPE}.`);
    });
  });

});
