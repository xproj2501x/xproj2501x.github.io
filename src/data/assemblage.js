/**
 * Assemblage
 * ===
 *
 * @module assemblage
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
import {InvalidAssemblageState} from './exceptions';

/**
 * Assemblage
 * @class
 */
class Assemblage {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The id of the parent entity.
   * @private
   * @type {string}
   */
  _id;

  /**
   * The type of the assemblage.
   * @private
   * @type {string}
   */
  _type;

  /**
   * A collection of components attached to the assemblage.
   * @private
   * @type {object}
   */
  _state;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _id
   * @public
   * @readonly
   * @return {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Get _type
   * @public
   * @readonly
   * @return {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Assemblage
   * @constructor
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the assemblage.
   * @param {object} state - The state of the assemblage.
   */
  constructor(id, type, state) {
    this._id = id;
    this._type = type;
    this._components = {};
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
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the assemblage.
   * @param {object} template - The template for the assemblage.
   * @param {object} state - The state of the assemblage.
   *
   * @return {Assemblage} A new assemblage instance.
   */
  static createInstance(id, type, template, state) {
    for (const KEY in state) {
      if (state.hasOwnProperty(KEY)) {
        if (!template.hasOwnProperty(KEY)) {
          throw new InvalidAssemblageState(`Error: Component ${KEY} is not valid for assemblage type ${type}.`);
        }
      }
    }
    return new Assemblage(id, type, state);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Assemblage;
