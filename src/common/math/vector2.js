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
  _x;

  /**
   * The y coordinate for the vector.
   * @protected
   * @type {number}
   */
  _y;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The x coordinate for the vector.
   * @readonly
   * @return {number}
   */
  get x() {
    return this._x;
  }

  /**
   * The y coordinate for the vector.
   * @readonly
   * @return {number}
   */
  get y() {
    return this._y;
  }

  /**
   * The magnitude of the vector
   * @readonly
   * @return {number}
   */
  get magnitude() {
    return Math.abs(Math.sqrt((this._x * this._x) + (this._y * this._y)));
  }

  /**
   * Vector2
   * @constructor
   * @param {number} x - The x coordinate for the vector.
   * @param {number} y - The y coordinate for the vector.
   */
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @param {Vector2} vector - The vector to add.
   * @return {Vector2}
   */
  add(vector) {
    return Vector2.createInstance(this._x + vector.x, this._y + vector.y);
  }

  /**
   *
   * @param {Vector2} vector - The vector to subtract.
   * @return {Vector2}
   */
  subtract(vector) {
    return Vector2.createInstance(this._x - vector.x, this._y - vector.y);
  }

  /**
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2}
   */
  multiply(scalar) {
    return Vector2.create(this._x * scalar, this._y * scalar);
  }

  /**
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2}
   */
  divide(scalar) {
    return Vector2.createInstance(this._x / scalar, this._y / scalar);
  }

  /**
   * Creates a new copy of the vector.
   * @return {Vector2}
   */
  copy() {
    return Vector2.createInstance(this._x, this._y);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {number} x - The x coordinate for the vector.
   * @param {number} y - The y coordinate for the vector.
   *
   * @return {Vector2}
   */
  static createInstance(x, y) {
    return new Vector2(x, y);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Vector2;
