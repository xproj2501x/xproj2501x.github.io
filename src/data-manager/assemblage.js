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
   * The id of the parent entity.
   * @private
   * @type {number}
   */
  _id;

  /**
   * The type of the assemblage.
   * @private
   * @type {number}
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
   * @return {number}
   */
  get id() {
    return this._id;
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
  constructor(id, type, state, componentManager) {
    this._id = id;
    this._type = type;
    this._state = state;
    this._componentManager = componentManager;
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
    return this._state[type];
  }

  updateComponent(type, state) {
    this._componentManager.updateComponent(this._id, type, state);
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
  static createInstance(type, template, components, componentManager) {
    const STATE = {};
    const ID = components[0].id;

    for (let idx = 0; idx < components.length; idx++) {
      if (components[idx].id !== ID) {
        throw new Error(`Error: Entity mismatch.`);
      }
      STATE[template[idx]] = components[idx].state;
    }
    return new Assemblage(ID, type, STATE, componentManager);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Assemblage;
