/**
 * Vector2
 * ===
 *
 * @module common.Math.Vector2
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
   * The x coordinate of the vector.
   * @protected
   * @type {number}
   */
  _x;

  /**
   * The y coordinate of the vector.
   * @protected
   * @type {number}
   */
  _y;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The x coordinate of the vector.
   * @public
   * @readonly
   * @return {number}
   */
  get x() {
    return this._x;
  }

  /**
   * The y coordinate of the vector.
   * @public
   * @readonly
   * @return {number}
   */
  get y() {
    return this._y;
  }

  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get magnitudeSquared() {
    return (this._x * this._x) + (this._y * this._y);
  }

  /**
   * The magnitude of the vector.
   * @public
   * @readonly
   *
   * @return {number}
   */
  get magnitude() {
    return Math.sqrt(this.magnitudeSquared);
  }

  /**
   * @public
   * @readonly
   *
   * @return {Vector2}
   */
  get unit() {
    return Vector2.createInstance(this._x / this.magnitude, this._y / this.magnitude);
  }

  /**
   * @public
   * @readonly
   * @return {Vector2}
   */
  get normal() {
    return Vector2.createInstance(this._y, -this._x);
  }

  /**
   * Vector2
   * @constructor
   * @param {number} x - The x coordinate of the vector.
   * @param {number} y - The y coordinate of the vector.
   */
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Adds a
   * @public
   * @param {Vector2} vector - The vector to add.
   */
  add(vector) {
    this._x += vector.x;
    this._y += vector.y;
  }

  /**
   *
   * @public
   * @param {Vector2} vector - The vector to subtract.
   */
  subtract(vector) {
    this._x -= vector.x;
    this._y -= vector.y;
  }

  /**
   *
   * @public
   * @param {number} scalar - The scalar to multiply.
   */
  multiply(scalar) {
    this._x *= scalar;
    this._y *= scalar;
  }

  /**
   *
   * @public
   * @param {Vector2} vector
   */
  piecewiseMultiply(vector) {
    this._x *= vector.x;
    this._y *= vector.y;
  }

  /**
   *
   * @public
   * @param {number} scalar - The scalar to divide.
   */
  divide(scalar) {
    this._x /= scalar;
    this._y /= scalar;
  }

  /**
   *
   * @public
   * @param {Vector2} vector -
   */
  piecewiseDivide(vector) {
    this._x /= vector.x;
    this._y /= vector.y;
  }

  /**
   * Limits the magnitude of the vector the specified value.
   * @param {number} max - the maximum value for the magnitude.
   */
  limit(max) {
    if (this.magnitudeSquared > (max * max)) {
      this.divide(this.magnitude);
      this.multiply(max);
    }
  }

  /**
   *
   * @public
   * @param {Vector2} vector -
   *
   * @return {number}
   */
  distanceTo(vector) {
    return Math.sqrt(Math.pow((this._x - vector.x), 2) + Math.pow((this._y - vector.y), 2));
  }

  /**
   *
   * @public
   * @param {Vector2} vector -
   *
   * @return {number}
   */
  dot(vector) {
    return (this._x * vector.x) + (this._y * vector.y);
  }

  /**
   *
   * @public
   * @param {Vector2} vector -
   *
   * @return {number}
   */
  angleTo(vector) {
    return Math.acos(this.dot(vector) / (this.magnitude * vector.magnitude));
  }

  /**
   *
   * @public
   * @param {Vector2} vector -
   *
   * @return {boolean}
   */
  equals(vector) {
    return (this._x === vector.x) && (this._y === vector.y);
  }

  /**
   * Creates a new clone of the vector.
   * @public
   *
   * @return {Vector2}
   */
  clone() {
    return Vector2.createInstance(this._x, this._y);
  }

  /**
   * @public
   *
   * @return {number[]}
   */
  toArray() {
    return [this._x, this._y];
  }

  /**
   * @public
   *
   * @return {string}
   */
  toString() {
    return `${this._x},${this._y}`;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {number} x - The x coordinate of the vector.
   * @param {number} y - The y coordinate of the vector.
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
