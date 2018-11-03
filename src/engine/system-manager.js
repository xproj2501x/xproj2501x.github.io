/**
 * System Manager
 * ===
 *
 * @module systemManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * SystemManager
 * @class
 */
class SystemManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _dataManager;

  /**
   * The logger for the entity manager.
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
   * The data manager for the simulation.
   * @private
   * @type {DataManager}
   */
  _dataManager;

  /**
   * @private
   * @type {number}
   */
  _elaspedTime;

  /**
   * A collection of systems used by the simulation.
   * @private
   * @type {array}
   */
  _systems;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * SystemManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {DataManager} dataManager - The data manager for the simulation.
   * @param {array} systems - The systems used by the simulation.
   *
   */
  constructor(logService, messageService, dataManager, systems) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._dataManager = dataManager;
    this._systems = systems;
    this._elapsedTime = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Calls the update method for each registered system.
   * @public
   * @param {number} delta - The time elapsed since the last call to update.
   */
  update(delta) {
    let assemblages;

    this._systems.forEach((system) => {
      assemblages = this._dataManager.findAssemblagesOfType(system.key);
      system.update(assemblages);
    });
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
   * @param {DataManager} dataManager - The data manager for the simulation.
   * @param {array} systems - The systems used by the simulation.
   *
   * @return {SystemManager} - A new system manager instance.
   */
  static createInstance(logService, messageService, dataManager, systems) {
    const SYSTEMS = [];

    systems.forEach((system) => {
      SYSTEMS.push(system.createInstance(logService, messageService));
    });
    return new SystemManager(logService, messageService, dataManager, SYSTEMS);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default SystemManager;
