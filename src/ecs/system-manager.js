/**
 * SystemManager
 * ===
 *
 * @module engine.SystemManager
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
  /**
   * The logger for the class.
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * @private
   * @type {StateManager}
   */
  _stateManager;

  /**
   * A collection of systems used in the simulation.
   * @type {System[]}
   */
  _systems;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * SystemManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {StateManager} stateManager -
   */
  constructor(logService, stateManager) {
    this._logger = logService.register(this.constructor.name);
    this._stateManager = stateManager;
    this._systems = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  registerSystem(system) {
    this._systems.push(system);
    this._logger.writeInfoLog(`${system.constructor.name} registered.`);
  }

  update() {
    this._systems.forEach((system) => {
      const SYSTEM_DATA = this._stateManager.getSystemData(system.type);
      const RESULTS = system.update(SYSTEM_DATA);

      RESULTS.forEach((result) => {
        if (result.action === 'update') {
          this._stateManager.updateEntity(result.id, [{type: result.type, state: result.state}]);
        } else if (result.action === 'delete') {
          this._stateManager.destroyComponent(result.id, result.type);
        }
      });
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
   * @param {StateManager} stateManager -
   * @param {object[]} systems - A collection of templates for the systems used by the simulation.
   *
   * @return {SystemManager} A new system manager instance.
   */
  static createInstance(logService, stateManager, systems) {
    const SYSTEM_MANAGER = new SystemManager(logService, stateManager);

    systems.forEach((system) => {
      SYSTEM_MANAGER.registerSystem(system.createInstance());
    });
    return SYSTEM_MANAGER;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default SystemManager;
