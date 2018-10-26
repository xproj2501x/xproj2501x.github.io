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
   * A collection component managers for the simulation.
   * @private
   * @type {array}
   */
  _componentManagers;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * DataManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   */
  constructor(logService, messageService) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._entityManager = {};
    this._componentManagers = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new game object with the specified settings.
   * @param {string} type - The type of game object to create.
   * @param {object} settings - The settings for the game object.
   */
  createGameObject(type, settings) {

  }

  /**
   *
   * @param {string} id - The id of the parent entity.
   * @param {type} type - The type of the game object.
   */
  findGameObject(id, type) {

  }

  findGameObjectsOfType(type) {

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
   *
   * @return {DataManager} A new data manager instance.
   */
  static createInstance(logService, messageService) {
    const ENTITY_MANAGER = EntityManager.createInstance(logService);
    const COMPONENT_MANAGER = ComponentManager.createInstance(logService);

    return new DataManager(logService, messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DataManager;
