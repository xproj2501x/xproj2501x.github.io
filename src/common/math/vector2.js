/**
 * Vector2
 * ===
 *
 * @module vector2
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * Vector2
 * @class
 */
class Vector2 {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The x coordinate for the vector.
   * @protected
   * @type {number}
   */
  _xCoordinate;

  /**
   * The y coordinate for the vector.
   * @protected
   * @type {number}
   */
  _yCoordinate;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get this._xCoordinate
   * @public
   * @readonly
   *
   * @return {number}
   */
  get xCoordinate() {
    return this._xCoordinate;
  }

  /**
   * Get this._yCoordinate
   * @public
   * @readonly
   *
   * @return {number}
   */
  get yCoordinate() {
    return this._yCoordinate;
  }

  /**
   * The magnitude of the vector
   * @public
   * @readonly
   *
   * @return {number}
   */
  get magnitude() {
    return Math.abs(Math.sqrt((this._x * this._x) + (this._y * this._y)));
  }

  /**
   * Vector2
   * @constructor
   * @param {number} xCoordinate - The x coordinate for the vector.
   * @param {number} yCoordinate - The y coordinate for the vector.
   */
  constructor(xCoordinate, yCoordinate) {
    this._xCoordinate = xCoordinate;
    this._yCoordinate = yCoordinate;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Adds a vector2 object to this.
   * @public
   * @param {Vector2} vector - The vector to add.
   *
   * @return {Vector2} A new vector2 instance.
   */
  add(vector) {
    return Vector2.createInstance(this._xCoordinate + vector.xCoordinate, this._yCoordinate + vector.yCoordinate);
  }

  /**
   * Subtracts a vector2 object from this.
   * @public
   * @param {Vector2} vector - The vector to subtract.
   *
   * @return {Vector2} A new vector2 instance.
   */
  subtract(vector) {
    return Vector2.createInstance(this._xCoordinate - vector.xCoordinate, this._yCoordinate - vector.yCoordinate);
  }

  /**
   * Multiplies the vector by a scalar value.
   * @public
   * @param {number} scalar - The scalar to multiply.
   *
   * @return {Vector2}
   */
  multiply(scalar) {
    return Vector2.create(this._xCoordinate * scalar, this._yCoordinate * scalar);
  }

  /**
   * Divides the vector by a scalar value.
   * @public
   * @param {number} scalar - The scalar to divide.
   *
   * @return {Vector2} A new vector2 instance.
   */
  divide(scalar) {
    return Vector2.createInstance(this._xCoordinate / scalar, this._yCoordinate / scalar);
  }

  /**
   * Creates a copy of the vector.
   * @public
   *
   * @return {Vector2} A new vector2 instance.
   */
  copy() {
    return Vector2.createInstance(this._xCoordinate, this._yCoordinate);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {number} xCoordinate - The x coordinate for the vector.
   * @param {number} yCoordinate - The y coordinate for the vector.
   *
   * @return {Vector2} A new vector2 instance.
   */
  static createInstance(xCoordinate, yCoordinate) {
    return new Vector2(xCoordinate, yCoordinate);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Vector2;
