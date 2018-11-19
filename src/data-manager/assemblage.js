/**
 * Assemblage
 * ===
 *
 * @module dataManager.Assemblage
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
   * The parent entity.
   * @private
   * @type {number}
   */
  _entity;

  /**
   * The type of the assemblage.
   * @private
   * @type {number}
   */
  _type;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _id
   * @public
   * @readonly
   * @return {number}
   */
  get id() {
    return this._entity.id;
  }

  /**
   * Get _type
   * @public
   * @readonly
   * @return {number}
   */
  get type() {
    return this._type;
  }

  /**
   * Assemblage
   * @constructor
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of the assemblage.
   * @param {object} state - The state of the assemblage.
   */
  constructor(entity, type) {
    this._entity = entity;
    this._type = type;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the component of the specified type.
   * @param {number} type -
   *
   * @return {object} The state of the component.
   */
  getComponent(type) {
    return this._entity.findComponent(type);
  }

  updateComponent(type, state) {
    this._entity.updateComponent(type, state);
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
   * @param {number} type - The type of the assemblage.
   * @param {array} template - The template for the assemblage.
   * @param {array} components - The components for the assemblage.
   *
   * @return {Assemblage} A new assemblage instance.
   */
  static createInstance(entity, type) {

    return new Assemblage(entity, type);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Assemblage;
