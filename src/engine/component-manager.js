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
   * @private
   * @type {Array}
   */
  _templates;

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
  onCreateComponent(command) {
    this._createComponent(command.id, command.type, command.state);
    this._messageService.send(MESSAGE.COMPONENT_CREATED, command);
  }

  onDestroyComponent(command) {
    this._destroyComponent(command.id, command.type, command.state);
    this._messageService.send(MESSAGE.COMPONENT_DESTROYED, command);
  }

  onUpdateComponent(command) {
    this._updateComponent(command.id, command.type, command.state);
    this._messageService.send(MESSAGE.COMPONENT_UPDATED, command);
  }

  onEntityDestroyed(event) {
    for (let idx = 0; idx < this._components.length; idx++) {
      try {
        this._destroyComponent(idx, event.id);
      }
      catch (error) {
        continue;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new component.
   * @private
   * @param {number} id - The entity id.
   * @param {number} type - The component type.
   * @param {object} state - The initial state of the component.
   *
   */
  _createComponent(id, type, state) {
    if (this._components[type][id]) {
      throw ComponentAlreadyExists(`Error: Component type ${type} already attached to entity ${id}.`);
    }
    const TEMPLATE = this._getTemplate(type);
    const COMPONENT = Component.createInstance(id, type, TEMPLATE, state);

    this._components[type][id] = COMPONENT;
  }

  _destroyComponent(id, type, state) {
    if (this._components[type][id]) {
      throw ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    }
    this._components[type][id] = null;
  }

  _updateComponent(id, type, state) {
    if (this._components[type][id]) {
      throw ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    }
    const COMPONENT = this._components[type][id];

    COMPONENT.update(state);
  }

  _getTemplate(type) {
    if (!this._templates[type]) throw ComponentTemplateNotFound(`Error: Component template ${type} not found.`);
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
