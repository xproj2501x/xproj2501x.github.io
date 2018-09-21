/**
 * Extendable Error
 * ===
 *
 * @module extendableErrors
 */

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * ExtendableError
 * @class
 * @extends Error
 */
class ExtendableError extends Error {

  /**
   * ExtendableError
   * @constructor
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ExtendableError;
