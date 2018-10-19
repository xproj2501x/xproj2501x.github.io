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
   * @param {object} template - The template for the component.
   * @param {object} state - The state of the component.
   *
   * @throws {InvalidComponentState}
   * @return {Component} A new component instance.
   */
  static createInstance(id, type, template, state) {
    for (const KEY in state) {
      if (state.hasOwnProperty(KEY)) {
        if (!template.hasOwnProperty(KEY)) {
          throw new InvalidComponentState(`Error: Property ${KEY} is not valid for component type ${type}.`);
        }
        if (typeof state[KEY] !== template[KEY]) {
          throw new InvalidComponentState(
            `Error: Property type ${typeof state[KEY]} is not valid for property ${KEY} of component type ${type}.`);
        }
      }
    }
    return new Component(id, type, state);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Component;
