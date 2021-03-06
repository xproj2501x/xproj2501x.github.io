/**
 * System
 * ===
 *
 * @module engine.System
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
 * System
 * @class
 */
class System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Type definition for data used by the system.
   * @private
   * @type {object}
   */
  _type;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _type;
   * @public
   * @readonly
   * @return {object}
   */
  get type() {
    return this._type;
  }

  /**
   * System
   * @constructor
   * @param {object} type - Type definition for data used by the system.
   */
  constructor(type) {
    if (new.target === System) throw new Error('Error: Cannot construct system instance directly.');
    this._type = type;

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Update routine for the system.
   * @public
   * @abstract
   */
  update() {
    throw new Error(`Error: Update method called from system base class`);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default System;
