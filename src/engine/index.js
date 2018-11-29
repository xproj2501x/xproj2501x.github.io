/**
 * Engine
 * ===
 *
 * @module engine
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {FRAME_DURATION, MAX_SKIP_DURATION} from './constants';
import SystemManager from './system-manager';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Engine
 * @class
 */
class Engine {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger for the entity manager.
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * The message service for the simulation.
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * @private
   * @type {boolean}
   */
  _isLocked;

  _frameId;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Engine
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   */
  constructor(logService, messageService) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._isRunning = false;
    this._time = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Starts the engine for the simulation.
   * @public
   */
  start() {
    this._isRunning = true;
    this._lastTick = Date.now();
    this._frameId = requestAnimationFrame(() => {
      this._tick();
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _tick() {
    if (this._isRunning) {
      const CURRENT_TIME = Date.now();
      let delta = CURRENT_TIME - this._lastTick;

      delta = delta > MAX_SKIP_DURATION ? MAX_SKIP_DURATION : delta;
      if (delta >= FRAME_DURATION) {
        this._time += FRAME_DURATION;
        this._lastTick = CURRENT_TIME;
      }
      this._frameId = requestAnimationFrame(() => {
        this._tick();
      });
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   *
   * @return {Engine} - A new engine instance.
   */
  static createInstance(logService, messageService) {
    return new Engine(logService, messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Engine;
