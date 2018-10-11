/**
 * Component
 * ===
 *
 * @module component
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
 * Component
 * @class
 */
class Component {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The id of the parent entity.
   * @private
   * @type {number}
   */
  _id;

  /**
   * The type of the component
   * @private
   * @type {number}
   */
  _type;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Component
   * @constructor
   * @param {number} id - The id of the parent entity.
   */
  constructor(id) {
    this._id = id;
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
   * @param {number} id - The id of the parent entity.
   *
   * @return {Component} - A new component instance.
   */
  static createInstance(id) {
    return new Component(id);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Component;
