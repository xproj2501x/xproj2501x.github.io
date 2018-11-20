/**
 * Component Manager
 * ===
 *
 * @module dataManager.ComponentManager
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
        this._components[KEY] = [];
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
    if (this._components[type][id]) {
      throw new ComponentAlreadyExists(`Error: Component type ${type} already attached to entity ${id}.`);
    }
    const TEMPLATE = this._findTemplate(type);
    const COMPONENT = TEMPLATE.createInstance(id, type, state);

    this._components[type][id] = COMPONENT;
    return COMPONENT;
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
    COMPONENTS[id] = null;
  }

  /**
   * Finds a component with matching type and parent entity.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The component type.
   *
   * @throws {ComponentNotFound}
   * @return {Component} A component with a matching id and type.
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
   * @throws {InvalidComponentType}
   * @return {array} A collection of components of the specified type.
   */
  findComponentsOfType(type) {
    if (!this._components[type]) throw new InvalidComponentType(`Error: Component type ${type} is not valid.`);
    return this._components[type];
  }

  /**
   * Finds all components for the specified entity.
   * @param {number} id - The id of the parent entity.
   *
   * @return {array}
   */
  findComponentsForEntity(id) {
    const COMPONENTS = [];

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
    if (!this._components[type][id]) {
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
    templates = templates || [];
    return new ComponentManager(logService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;
