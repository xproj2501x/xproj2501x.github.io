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
   * Message handler for the create component command.
   * @param {object} command - The create component command message.
   */
  onCreateComponent(command) {
    this._createComponent(command.id, command.type, command.state);
    this._messageService.send(MESSAGE.COMPONENT_CREATED, command);
  }

  /**
   * Message handler for the destroy component command.
   * @param {object} command - The destroy component command message.
   */
  onDestroyComponent(command) {
    this._destroyComponent(command.id, command.type);
    this._messageService.send(MESSAGE.COMPONENT_DESTROYED, command);
  }

  /**
   * Message handler for the update component command.
   * @param {object} command - The update component command message.
   */
  onUpdateComponent(command) {
    this._updateComponent(command.id, command.type, command.state);
    this._messageService.send(MESSAGE.COMPONENT_UPDATED, command);
  }

  /**
   * Message handler for the entity destroyed event.
   * @param {object} event - The entity destroyed event message.
   */
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
   * @throws {ComponentAlreadyExists}
   */
  _createComponent(id, type, state) {
    if (this._components[type][id]) {
      throw ComponentAlreadyExists(`Error: Component type ${type} already attached to entity ${id}.`);
    }
    const TEMPLATE = this._getTemplate(type);
    const COMPONENT = Component.createInstance(id, type, TEMPLATE, state);

    this._components[type][id] = COMPONENT;
  }

  /**
   * Destroys a component with a matching id.
   * @private
   * @param {number} id - The entity id.
   * @param {number} type - The component type.
   *
   * @throws {ComponentNotFound}
   */
  _destroyComponent(id, type) {
    if (this._components[type][id]) {
      throw ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    }
    this._components[type][id] = null;
  }

  /**
   * Updates the state of a component with a matching id.
   * @private
   * @param {number} id - The entity id.
   * @param {number} type - The component type.
   * @param {object} state - The new state of the component.
   *
   * @throws {ComponentNotFound}
   */
  _updateComponent(id, type, state) {
    if (this._components[type][id]) {
      throw ComponentNotFound(`Error: Component type ${type} is not attached to entity ${id}.`);
    }
    const COMPONENT = this._components[type][id];

    COMPONENT.update(state);
  }

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
