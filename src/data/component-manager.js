/**
 * ComponentManager
 * ===
 *
 * @module componentManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {ComponentAlreadyExists, ComponentNotFound, InvalidComponentState,
  InvalidComponentType} from './exceptions';
import Component from './component';

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
   * The logger for the component manager.
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * The type of component manager.
   * @private
   * @type {number}
   */
  _type;

  /**
   * The template for the type of component the manager creates.
   * @private
   * @type {object}
   */
  _templates;

  /**
   * A collection of activate components used by the simulation.
   * @private
   * @type {object}
   */
  _components;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ComponentManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {object} templates - The component templates for the simulation.
   */
  constructor(logService, templates) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._templates = templates;
    this._components = [];
    for (const KEY in this._templates) {
      if (this._templates.hasOwnProperty(KEY)) {
        this._components[KEY] = {};
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new component.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The component type.
   * @param {object} state - The initial state of the component.
   *
   * @throws {ComponentAlreadyExists}
   */
  createComponent(id, type, state) {
    const TEMPLATE = this._findTemplate(type);

    if (this._components[type][id]) {
      throw new ComponentAlreadyExists(`Error: Component type ${type} already attached to entity ${id}.`);
    }
    for (const KEY in TEMPLATE) {
      if (TEMPLATE.hasOwnProperty(KEY) && !state.hasOwnProperty(KEY)) {
        throw new InvalidComponentState(`Error: Property ${KEY} missing for component type ${type}.`);
      }
    }
    this._components[type][id] = Component.createInstance(id, type, TEMPLATE, state);
  }

  /**
   * Destroys a component with a matching id.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The component type.
   *
   * @throws {ComponentNotFound}
   */
  destroyComponent(id, type) {
    const COMPONENTS = this.findComponentsOfType(type);

    if (!COMPONENTS[id]) throw new ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    delete COMPONENTS[id];
  }

  /**
   * Finds a component with matching type and parent entity.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The component type.
   *
   * @throws {ComponentNotFound}
   * @return {Component}
   */
  findComponent(id, type) {
    const COMPONENTS = this.findComponentsOfType(type);

    if (!COMPONENTS[id]) throw new ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    return COMPONENTS[id];
  }

  /**
   * Finds all components of a specified type.
   * @param {number} type - The component type.
   *
   * @return {object}
   */
  findComponentsOfType(type) {
    if (!this._components[type]) throw new InvalidComponentType(`Error: Component type ${type} is not valid.`);
    return this._components[type];
  }

  /**
   * Finds all components for the specified entity.
   * @param {number} id - The id of the parent entity.
   *
   * @return {object}
   */
  findComponentsForEntity(id) {
    const COMPONENTS = {};

    for (const TYPE in this._components) {
      if (this._components.hasOwnProperty(TYPE)) {
        if (id in this._components[TYPE]) {
          COMPONENTS[TYPE] = this._components[TYPE][id];
        }
      }
    }
    return COMPONENTS;
  }

  /**
   * Updates the state of a component with a matching id.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The component type.
   * @param {object} state - The new state of the component.
   *
   * @throws {ComponentNotFound}
   */
  updateComponent(id, type, state) {
    if (this._components[type][id]) {
      throw new ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    }
    const COMPONENT = this._components[type][id];

    COMPONENT.update(state);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the template for the specified component type.
   * @private
   * @param {number} type - The type of component.
   *
   * @return {object} The component template.
   * @throws {ComponentTemplateNotFound}
   */
  _findTemplate(type) {
    if (!this._templates[type]) throw new InvalidComponentType(`Error: Component type ${type} is not valid.`);
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @param {LogService} logService - The log service for the simulation.
   * @param {object} templates - The component templates for the simulation.
   *
   * @return {ComponentManager} - A new component manager instance.
   */
  static createInstance(logService, templates) {
    templates = templates || {};
    return new ComponentManager(logService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;
