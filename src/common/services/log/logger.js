/**
 * Logger
 * ===
 *
 * @module logger
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @enum {string}
 */
const LEVEL = {
  LOG: 'LOG',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Logger
 * @class
 */
class Logger {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The name of the constructor for the calling class
   * @private
   * @type {string}
   */
  _context;

  /**
   *
   * @private
   * @type {Log}
   */
  _log;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Logger
   * @constructor
   * @param {string} context - the name of the constructor for the calling class
   * @param {Log} log - The log for the application.
   */
  constructor(context, log) {
    this._log = log;
    this._context = context;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Writes a log message to the log.
   * @public
   * @param {string} message - The message to be written.
   */
  writeLogMessage(message) {
    this._log.writeMessage(this._context, LEVEL.LOG, message);
  }

  /**
   * Writes a debug message to the log.
   * @public
   * @param {string} message - The message to be written.
   */
  writeDebugMessage(message) {
    this._log.writeMessage(this._context, LEVEL.DEBUG, message);
  }

  /**
   * Writes a warning message to the log.
   * @public
   * @param {string} message - The message to be written.
   */
  writeWarningMessage(message) {
    this._log.writeMessage(this._context, LEVEL.WARN, message);
  }

  /**
   * Writes an info message to the log.
   * @public
   * @param {string} message - The message to be written.
   */
  writeInfoMessage(message) {
    this._log.writeMessage(this._context, LEVEL.INFO, message);
  }

  /**
   * Writes an error message to the log.
   * @public
   * @param {string} message - The message to be written.
   */
  writeErrorMessage(message) {
    this._log.writeMessage(this._context, LEVEL.ERROR, message);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // Static Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {string} context - The name of the constructor for the calling class.
   * @param {Log} log - The log for application.
   *
   * @return {Logger} - A new logger instance.
   */
  static createInstance(context, log) {
    return new Logger(context, log);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Logger;
