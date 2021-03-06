/**
 * Entity
 * ===
 *
 * @module entity
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
 * Entity
 * @class
 */
class Entity {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The id of the entity.
   * @private
   * @type {number}
   */
  _id;

  /**
   * A collection of components attached to the entity.
   * @private
   * @type {Array}
   */
  _components;

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
   * Entity
   * @constructor
   */
  constructor(id) {
    this._id = id;
    this._components = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Attaches a component to the entity.
   * @public
   */
  attachComponent() {

  }

  /**
   * Detaches a component from the entity.
   * @public
   * @param {number} type - The type of component to detach from the entity.
   */
  detachComponent(type) {

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
   * @param {number} id - The id of the entity.
   *
   * @return {Entity} - A new entity instance.
   */
  static createInstance(id) {
    if (!id && id !== 0) throw new Error(`Error: entity id cannot be null`);
    return new Entity(id);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Entity;
