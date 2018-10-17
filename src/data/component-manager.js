/**
 * ComponentManager
 * ===
 *
 * @module componentManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {MESSAGE} from './constants';
import {ComponentAlreadyExists, ComponentNotFound, ComponentTemplateNotFound} from './exceptions';
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
   * The message service for the simulation.
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * A collection of component templates for the simulation.
   * @private
   * @type {object}
   */
  _templates;

  /**
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
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {Array} templates - The component templates for the simulation.
   */
  constructor(messageService, templates) {
    this._messageService = messageService;
    this._templates = templates;
    this._components = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new component.
   * @public
   * @param {number} id - The entity id.
   * @param {number} type - The component type.
   * @param {object} state - The initial state of the component.
   *
   * @throws {ComponentAlreadyExists}
   */
  createComponent(id, type, state) {
    if (this._components[type][id]) {
      throw ComponentAlreadyExists(`Error: Component type ${type} already attached to entity ${id}.`);
    }
    const TEMPLATE = this._getTemplate(type);
    const COMPONENT = Component.createInstance(id, type, TEMPLATE, state);

    this._components[type][id] = COMPONENT;
  }

  /**
   * Destroys a component with a matching id.
   * @public
   * @param {number} id - The entity id.
   * @param {number} type - The component type.
   *
   * @throws {ComponentNotFound}
   */
  destroyComponent(id, type) {
    if (this._components[type][id]) {
      throw ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    }
    this._components[type][id] = null;
  }

  /**
   * @public
   * @param {string} id
   * @param {string} type
   */
  findComponent(id, type) {

  }

  /**
   * Updates the state of a component with a matching id.
   * @public
   * @param {number} id - The entity id.
   * @param {number} type - The component type.
   * @param {object} state - The new state of the component.
   *
   * @throws {ComponentNotFound}
   */
  updateComponent(id, type, state) {
    if (this._components[type][id]) {
      throw ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
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
  _getTemplate(type) {
    if (!this._templates[type]) throw ComponentTemplateNotFound(`Error: Component template ${type} not found.`);
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {Array} templates - The component templates for the simulation.
   *
   * @return {ComponentManager} - A new component manager instance.
   */
  static createInstance(messageService, templates) {
    templates = templates || [];
    return new ComponentManager(messageService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;
