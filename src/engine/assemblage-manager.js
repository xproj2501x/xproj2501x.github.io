/**
 * Assemblage Manager
 * ===
 *
 * @module assemblageManager
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
 * AssemblageManager
 * @class
 */
class AssemblageManager {

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


  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * AssemblageManager
   * @constructor
   */
  constructor(messageService, templates) {
    this._messageService = messageService;
    this._templates = templates;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  onCreateAssemblage(command) {

  }

  onComponentCreated(event) {

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
   * @return {AssemblageManager} - A new component manager instance.
   */
  static createInstance(messageService, templates) {
    templates = templates || [];
    return new AssemblageManager(messageService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default AssemblageManager;
