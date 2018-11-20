/**
 * Entity
 * ===
 *
 * @module dataManager.Entity
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {ComponentAlreadyAttachedToEntity, ComponentNotAttachedToEntity, InvalidEntityId} from './exceptions';

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
   * @private
   * @type {number}
   */
  _componentMask;

  /**
   * @private
   * @type {array}
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
   * Get _componentMask
   * @public
   * @readonly
   * @return {number}
   */
  get componentMask() {
    return this._componentMask;
  }

  /**
   * Entity
   * @constructor
   * @param {number} id - The id of the entity.
   */
  constructor(id) {
    this._id = id;
    this._components = [];
    this._componentMask = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Attaches a component to the entity.
   * @param {number} type - The type of component to attach to the entity.
   *
   * @throws {ComponentAlreadyAttachedToEntity}
   */
  attachComponent(component) {
    if (this._hasComponent(component.type)) {
      throw new ComponentAlreadyAttachedToEntity(
        `Error: Component type ${component.type} is already attached to entity ${this._id}.`);
    }
    this._components[component.type] = component;
    this._componentMask |= (1 << component.type);
  }

  /**
   * Detaches a component from the entity.
   * @param {number} type - The type of component to detach from the entity.
   *
   * @throws {ComponentNotAttachedToEntity}
   */
  detachComponent(type) {
    if (!this._hasComponent(type)) {
      throw new ComponentNotAttachedToEntity(`Error: Component type ${type} is not attached to entity ${this._id}.`);
    }
    this._components[type] = null;
    this._componentMask ^= (1 << type);
  }

  findComponent(type) {
    return this._components[type];
  }

  updateComponent(type, state) {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @private
   * @param {number} type - The type of the component.
   *
   * @return {number}
   */
  _hasComponent(type) {
    return (this._componentMask >> type) & 1;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Static factory method.
   * @static
   * @param {number} id - The id of the entity.
   *
   * @throws {InvalidEntityId}
   * @return {Entity} - A new entity instance.
   */
  static createInstance(id) {
    if (!id && id !== 0) throw new InvalidEntityId(`Error: entity id cannot be null`);
    return new Entity(id);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Entity;
