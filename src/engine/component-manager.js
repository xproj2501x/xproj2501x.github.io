/**
 * ComponentManager
 * ===
 *
 * @module componentManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {COMMAND, EVENT, MESSAGE} from './constants';
import {ComponentAlreadyExists, ComponentNotFound, ComponentTemplateNotFound, InvalidComponentState,
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
    this._components = {};
    this._messageService.subscribe(COMMAND.CREATE_COMPONENT, (command) => this.onCreateComponent(command));
    this._messageService.subscribe(COMMAND.DESTROY_COMPONENT, (command) => this.onDestroyComponent(command));
    this._messageService.subscribe(COMMAND.UPDATE_COMPONENT, (command) => this.onUpdateComponent(command));
    this._messageService.subscribe(EVENT.ENTITY_DESTROYED, (event) => this.onEntityDestroyed(event));
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Message handler for the create component command.
   * @param {object} command - The create component command message.
   *
   * @throws {InvalidComponentState}
   */
  onCreateComponent(command) {
    if (!command.id) throw new InvalidComponentState(`Error: The entity id cannot be null`);
    if (!command.type) throw new InvalidComponentState(`Error: The component type cannot be null`);
    if (!command.state) throw new InvalidComponentState(`Error: The component state cannot be null`);
    this._createComponent(command.id, command.type, command.state);
    this._messageService.send(EVENT.COMPONENT_CREATED, command);
  }

  /**
   * Message handler for the destroy component command.
   * @param {object} command - The destroy component command message.
   */
  onDestroyComponent(command) {
    this._destroyComponent(command.id, command.type);
    this._messageService.send(EVENT.COMPONENT_DESTROYED, command);
  }

  /**
   * Message handler for the update component command.
   * @param {object} command - The update component command message.
   */
  onUpdateComponent(command) {
    this._updateComponent(command.id, command.type, command.state);
    this._messageService.send(EVENT.COMPONENT_UPDATED, command);
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
   * @param {string} id - The entity id.
   * @param {string} type - The component type.
   * @param {object} state - The initial state of the component.
   *
   * @throws {ComponentAlreadyExists}
   */
  _createComponent(id, type, state) {
    this._components[type] = this._components[type] || {};
    if (this._components[type][id]) {
      throw ComponentAlreadyExists(`Error: Component type ${type} already attached to entity ${id}.`);
    }
    const TEMPLATE = this._getTemplate(type);

    this._components[type][id] = Component.createInstance(id, type, TEMPLATE, state);
  }

  /**
   * Destroys a component with a matching id.
   * @private
   * @param {string} id - The entity id.
   * @param {string} type - The component type.
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
   * @param {string} id - The entity id.
   * @param {string} type - The component type.
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
   * @param {string} type - The type of component.
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
    templates = templates || {};
    return new ComponentManager(messageService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;
