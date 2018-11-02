/**
 * Data Manager
 * ===
 *
 * @module dataManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import EntityManager from './entity-manager';
import ComponentManager from './component-manager';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * DataManager
 * @class
 */
class DataManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger for the class.
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * The message service for the simulation.
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * The entity manager for the simulation.
   * @private
   * @type {EntityManager}
   */
  _entityManager;

  /**
   * The component manager for the simulation.
   * @private
   * @type {ComponentManager}
   */
  _componentManager;

  /**
   * A collection of assemblage templates for the simulation.
   * @private
   * @type {array}
   */
  _templates;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * DataManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {EntityManager} entityManager - The entity manager for the simulation.
   * @param {ComponentManager} componentManager -
   * @param {array} templates -
   */
  constructor(logService, messageService, entityManager, componentManager, templates) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._entityManager = entityManager;
    this._componentManager = componentManager;
    this._templates = templates;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  createAssemblage(type, settings) {

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
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {array} componentTemplates -
   * @param {array} assemblageTemplates -
   *
   * @return {DataManager} A new data manager instance.
   */
  static createInstance(logService, messageService, componentTemplates, assemblageTemplates) {
    const ENTITY_MANAGER = EntityManager.createInstance(logService);
    const COMPONENT_MANAGER = ComponentManager.createInstance(logService, componentTemplates);

    return new DataManager(logService, messageService, ENTITY_MANAGER, COMPONENT_MANAGER, assemblageTemplates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DataManager;
