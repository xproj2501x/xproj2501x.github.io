/**
 * Component
 * ===
 *
 * @module component
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {InvalidComponentState} from './exceptions';

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
   * @type {string}
   */
  _id;

  /**
   * The type of the component
   * @private
   * @type {string}
   */
  _type;

  /**
   * The state of the component
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
   * Get _state
   * @public
   * @readonly
   * @return {object}
   */
  get state() {
    return Object.assign({}, this._state);
  }

  /**
   * Component
   * @constructor
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the component.
   * @param {object} state - The state of the component.
   */
  constructor(id, type, state) {
    this._id = id;
    this._type = type;
    this._state = state;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Updates the state of the component.
   * @public
   * @param {object} state - The new state of the component.
   *
   * @throws {InvalidComponentState}
   */
  update(state) {
    for (const KEY in state) {
      if (!this._state.hasOwnProperty(KEY)) {
        throw new InvalidComponentState(`Error: Invalid property ${KEY} for component type ${this._type}`);
      }
    }
    this._state = Object.assign({}, this._state, state);
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
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the component.
   * @param {object} state - The state of the component.
   *
   * @throws {InvalidComponentState}
   * @return {Component} - A new component instance.
   */
  static createInstance(id, type, state) {
    if (!id) throw new Error(`Error: The entity id cannot be null`);
    if (!type) throw new Error(`Error: The component type cannot be null`);
    if (!state) throw new Error(`Error: The component state cannot be null`);
    return new Component(id, type, state);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Component;
