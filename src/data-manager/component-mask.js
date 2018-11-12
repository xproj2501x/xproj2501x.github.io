/**
 * Component Mask
 * ===
 *
 * @module componentMask
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
 * ComponentMask
 * @class
 */
class ComponentMask {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The value of the component mask.
   * @private
   * @type {number}
   */
  _value;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _value
   * @public
   * @readonly
   * @return {number}
   */
  get value() {
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
   * ComponentMask
   * @constructor
   * @param {number} id - The id of the entity.
   */
  constructor(id) {
    this._id = id;
    this._componentMask = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Attaches a component to the entity.
   * @param {number} type - The type of component to attach to the entity.
   *
   * @throws {ComponentAlreadyAttachedToComponentMask}
   */
  attachComponent(type) {
    if (this._hasComponent(type)) {
      throw new ComponentAlreadyAttachedToComponentMask(
        `Error: Component type ${type} is already attached to entity ${this._id}.`);
    }
    this._componentMask |= (1 << type);
  }

  /**
   * Detaches a component from the entity.
   * @param {number} type - The type of component to detach from the entity.
   *
   * @throws {ComponentNotAttachedToComponentMask}
   */
  detachComponent(type) {
    if (!this._hasComponent(type)) {
      throw new ComponentNotAttachedToComponentMask(`Error: Component type ${type} is not attached to entity ${this._id}.`);
    }
    this._componentMask ^= (1 << type);
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
   * @throws {InvalidComponentMaskId}
   * @return {ComponentMask} - A new entity instance.
   */
  static createInstance(id) {
    if (!id && id !== 0) throw new InvalidComponentMaskId(`Error: entity id cannot be null`);
    return new ComponentMask(id);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentMask;
