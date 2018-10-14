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
  /**
   * A collection of systems used by the simulation.
   * @private
   * @type {Array}
   */
  _systems;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * SystemManager
   * @constructor
   * @param {Array} systems
   */
  constructor(systems) {
    this._systems = systems;
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
    this._systems.forEach((system) => {
      system.update(delta);
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
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {Array} systems -
   *
   * @return {SystemManager} - A new system manager instance.
   */
  static createInstance(messageService, systems) {
    const SYSTEMS = [];

    systems.forEach((system) => {
      SYSTEMS.push(system.createInstance(messageService));
    });
    return new SystemManager(SYSTEMS);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default SystemManager;