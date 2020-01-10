/**
 * ComponentManager
 * ===
 *
 * @module ComponentManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {ComponentAlreadyExistsError, ComponentNotFoundError, ComponentTypeAlreadyRegisteredError,
  InvalidComponentTypeError} from './errors';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * ComponentManager
 * @class
 */
class ComponentManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {Array}
   */
  _componentTypes;

  /**
   * @private
   * @type {Array}
   */
  _components;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ComponentManager
   * @constructor
   */
  constructor() {
    this._componentTypes = [];
    this._components = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Registers a constructor for a component type with the simulation.
   * @public
   * @param {object} type - The type of component to register.
   */
  registerComponentType(type) {
    if (this._componentTypes.includes(type)) {
      throw new ComponentTypeAlreadyRegisteredError(`Component type is already registered`);
    }
    this._componentTypes.push(type);
  }

  /**
   * Creates a new component.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of component to create.
   * @param {object} state - The initial state of the new component.
   */
  createComponent(id, type, state) {
    if (!this._componentTypes[type]) throw new InvalidComponentTypeError(`Invalid component type ${type} specified.`);
    if (!this._components[type]) this._components[type] = [];
    if (this._components[type][id]) {
      throw new ComponentAlreadyExistsError(`Component type ${type} is already attached to entity ${id}.`);
    }
    const TEMPLATE = this._componentTypes[type];

    this._components[type][id] = TEMPLATE.createInstance(id, type, state);
  }

  /**
   * Finds a component with a matching id and type.
   * @param {number} id -
   * @param {number} type -
   *
   * @return {Component}
   */
  findComponent(id, type) {
    if (!this._componentTypes[type]) throw new InvalidComponentTypeError(`Invalid component type ${type} specified.`);
    if (!this._components[type][id]) {
      throw new ComponentAlreadyExistsError(`Component type ${type} is already attached to entity ${id}.`);
    }
    return this._components[type][id];
  }

  /**
   * Finds all components of the specified type.
   * @param {number} type - The type of component to find.
   *
   * @return {Component[]}
   */
  findComponentsOfType(type) {
    if (!this._componentTypes[type]) throw new InvalidComponentTypeError(`Invalid component type ${type} specified.`);
    return this._components[type];
  }

  /**
   * Updates a component.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of component to update.
   * @param {object} state - The new state of the new component.
   */
  updateComponent(id, type, state) {
    if (!this._componentTypes[type]) throw new InvalidComponentTypeError(`Invalid component type ${type} specified.`);
    if (!this._components[type][id]) {
      throw new ComponentNotFoundError(`Component type ${type} is not attached to entity ${id}.`);
    }
    this._components[type][id].update(state);
  }

  /**
   * Destroys a component with a matching id and type.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of component to destroy.
   */
  destroyComponent(id, type) {
    if (!this._componentTypes[type]) throw new InvalidComponentTypeError(`Invalid component type ${type} specified.`);
    if (!this._components[type][id]) {
      throw new ComponentNotFoundError(`Component type ${type} is not attached to entity ${id}.`);
    }
    this._components[type][id] = null;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Static factory method.
   * @static
   * @param {Array} componentTypes -
   *
   * @return {ComponentManager}
   */
  static createInstance(componentTypes) {
    const COMPONENT_MANAGER = new ComponentManager();

    componentTypes.forEach((componentType) => {
      COMPONENT_MANAGER.registerComponentType(componentType);
    });
    return COMPONENT_MANAGER;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;
