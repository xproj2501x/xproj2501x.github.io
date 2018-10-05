/**
 * Component Manager
 * ===
 *
 * @module componentManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Component from './component';
import {ENTITY_LIMIT, COMPONENT_LIMIT} from './constants';

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
   * A collection of components.
   *
   * @private
   * @type {Array}
   */
  _components;

  /**
   * A collection of component templates.
   *
   * @private
   * @type {Array}
   */
  _templates;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ComponentManager
   * @constructor
   * @param {Array} templates - A collection of component templates.
   */
  constructor(templates) {
    this._components = new Array(COMPONENT_LIMIT).fill(null);
    this._templates = templates;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new component instance of the specified type for the parent entity.
   *
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   * @param {object} state - The initial state for the component.
   */
  createComponent(type, entity, state) {
    const TEMPLATE = this._getTemplate(type);

    if (!this._components[type]) {
      this._components[type] = new Array(ENTITY_LIMIT).fill(null);
    }
    if (this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is already attached to entity id ${entity}.`)
    }
    this._components[type][entity] = TEMPLATE.create(entity, state);
  }

  /**
   * Gets the component of the parent entity and specified type.
   *
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   *
   * @return {Component}
   */
  getComponent(type, entity) {
    if (!this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is not attached to entity ${entity}.`);
    }
    return this._components[type][entity];
  }

  /**
   * Gets all components of the specified type.
   *
   * @param {int} type - The type of the component.
   *
   * @return {Array}
   */
  getComponentsOfType(type) {
    return this._components[type];
  }

  /**
   * Destroys a component with the parent entity and specified type.
   *
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   */
  destroyComponent(type, entity) {
    if (!this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is not attached to entity ${entity}.`);
    }
    this._components[type][entity] = null;
  }

  /**
   * Updates a component with the parent entity and specified type with the new state.
   *
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   * @param {object} state - The new state for the component.
   */
  updateComponent(type, entity, state) {
    if (!this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is not attached to entity ${entity}.`);
    }
    const COMPONENT = this.getComponent(type, entity);

    COMPONENT.update(state);
  }

  /**
   *
   *
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   *
   * @return {boolean}
   */
  hasComponent(type, entity) {
    if (!(type in this._components)) return false;
    return entity in this._components[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets a component template of the specified type.
   *
   * @private
   * @param {int} type - The type of the component template.
   *
   * @return {Component} The component template.
   */
  _getTemplate(type) {
    if (!this._templates[type]) throw new Error(`Error: Component template ${type} does not exist.`);
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   *
   * @static
   * @param {Array} templates - A collection of component templates
   *
   * @return {ComponentManager}
   */
  static create(templates) {
    return new ComponentManager(templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;
/**
 * Component Manager
 * ===
 *
 * @module componentManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Component from './component';
import {ENTITY_LIMIT, COMPONENT_LIMIT} from './constants';

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
   * @type {Logger}
   */
  _logger;

  /**
   * A collection of components.
   *
   * @private
   * @type {Array}
   */
  _components;

  /**
   * A collection of component templates.
   *
   * @private
   * @type {Array}
   */
  _templates;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ComponentManager
   * @constructor
   * @param {Array} templates - A collection of component templates.
   */
  constructor(templates) {
    this._components = new Array(COMPONENT_LIMIT).fill(null);
    this._templates = templates;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new component instance of the specified type for the parent entity.
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   * @param {object} state - The initial state for the component.
   */
  createComponent(type, entity, state) {
    const TEMPLATE = this._getTemplate(type);

    if (!this._components[type]) {
      this._components[type] = new Array(ENTITY_LIMIT).fill(null);
    }
    if (this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is already attached to entity id ${entity}.`)
    }
    this._components[type][entity] = TEMPLATE.create(entity, state);
  }

  /**
   * Gets the component of the parent entity and specified type.
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   *
   * @return {Component}
   */
  getComponent(type, entity) {
    if (!this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is not attached to entity ${entity}.`);
    }
    return this._components[type][entity];
  }

  /**
   * Gets all components of the specified type.
   * @public
   * @param {int} type - The type of the component.
   *
   * @return {Array}
   */
  getComponentsOfType(type) {
    return this._components[type];
  }

  /**
   * Destroys a component with the parent entity and specified type.
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   */
  destroyComponent(type, entity) {
    if (!this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is not attached to entity ${entity}.`);
    }
    this._components[type][entity] = null;
  }

  /**
   * Updates a component with the parent entity and specified type with the new state.
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   * @param {object} state - The new state for the component.
   */
  updateComponent(type, entity, state) {
    if (!this.hasComponent(type, entity)) {
      throw new Error(`Error: Component type ${type} is not attached to entity ${entity}.`);
    }
    const COMPONENT = this.getComponent(type, entity);

    COMPONENT.update(state);
  }

  /**
   *
   * @public
   * @param {int} type - The type of the component.
   * @param {int} entity - The identity of the parent entity.
   *
   * @return {boolean}
   */
  hasComponent(type, entity) {
    if (!(type in this._components)) return false;
    return entity in this._components[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets a component template of the specified type.
   * @private
   * @param {int} type - The type of the component template.
   *
   * @return {Component} The component template.
   */
  _getTemplate(type) {
    if (!this._templates[type]) throw new Error(`Error: Component template ${type} does not exist.`);
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {Array} templates - A collection of component templates
   *
   * @return {ComponentManager}
   */
  static create(templates) {
    return new ComponentManager(templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;
