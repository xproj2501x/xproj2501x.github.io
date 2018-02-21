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
   * The identifier for the parent entity.
   * @private
   * @type {string}
   */
  _id;

  /**
   * The current state of the component.
   * @private
   * @type {object}
   */
  _state;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _id
   * @readonly
   * @return {string}
   */
  get id() { // eslint-disable-line id-length
    return this._id;
  }

  /**
   * Get _state
   * @readonly
   * @return {object}
   */
  get state() {
    return Object.assign({}, this._state);
  }

  /**
   * Component
   * @constructor
   * @param {string} id - The identifier for the parent entity.
   * @param {object} state - The initial state of the component.
   */
  constructor(id, state) { // eslint-disable-line id-length
    if (!id) throw new Error(`The component id cannot be null`);
    if (!state) throw new Error(`The component state cannot be null`);
    this._id = id;
    this._state = state;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Updates the state of the component
   * @param {object} state - The new state of the component.
   */
  update(state) {
    for (const KEY in state) {
      if (!this._state.hasOwnProperty(KEY)) {
        throw new Error(`Invalid property ${KEY} for component type ${this.constructor.name}`);
      }
    }
    this._state = Object.assign({}, this._state, state);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {string} id - The identifier for the parent entity.
   * @param {object} state - The initial state of the component.
   * @return {Component}
   */
  static create(id, state) { // eslint-disable-line id-length
    return new Component(id, state);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Component;
