/**
 * Blueprint
 * ===
 *
 * @module game.Models.Blueprint
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
 * Blueprint
 * @class
 */
class Blueprint {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  _id;

  /**
   * @private
   * @type {string}
   */
  _name;

  /**
   * @private
   * @type {array}
   */
  _tiles;

  /**
   * @private
   * @type {array}
   */
  _entities;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Blueprint
   * @constructor
   */
  constructor() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   *
   * @return {Blueprint} A new blueprint instance.
   */
  static createInstance() {
    return new Blueprint();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Blueprint;