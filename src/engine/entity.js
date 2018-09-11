/**
 * Entity
 * ===
 *
 * @module entity
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import UUID from '../common/utilities/uuid';

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
   * The identifier for the entity.
   * @private
   * @type {string}
   */
  _id;

  /**
   * A collection of components attached to the entity.
   * @private
   * @type {object}
   */
  _components;

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
   * Entity
   * @param {string} id - The identifier for the entity.
   */
  constructor(id) { // eslint-disable-line id-length
    if (!id) throw new Error(`The entity id cannot be null`);
    this._id = id;
    this._components = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Attaches a component to the entity.
   * @param {string} type - The component type.
   * @param {Component} component - The component to be be attached.
   */
  attachComponent(type, component) {
    if (this.hasComponent(type)) throw new Error(`Component type ${type} already attached to game object ${this.id}`);
    this._components[type] = component;
  }

  /**
   * Checks to see if the component type is attached to the entity.
   * @param {string} type - The component type.
   * @return {boolean}
   */
  hasComponent(type) {
    return (type in this._components);
  }

  /**
   * Gets a component of the specified type.
   * @param {string} type - The component type.
   * @return {Component}
   */
  getComponent(type) {
    if (!this.hasComponent(type)) throw new Error(`Component type ${type} not attached to game object ${this.id}`);
    return this._components[type];
  }

  /**
   * Detaches a component from the entity.
   * @param {string} type - The component type.
   */
  detachComponent(type) {
    if (!this.hasComponent(type)) throw new Error(`Component type ${type} not attached to game object ${this.id}`);
    delete this._components[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {string} id - The identifier for the entity.
   * @return {Entity}
   */
  static create(id) { // eslint-disable-line id-length
    id = id || UUID.create();
    return new Entity(id);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Entity;
