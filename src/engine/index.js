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
   * @type {SystemManager}
   */
  _systemManager;

  /**
   * @private
   * @type {boolean}
   */
  _isRunning;

  /**
   * @private
   * @type {boolean}
   */
  _isPaused;

  /**
   * @private
   * @type {number}
   */
  _time;

  /**
   * @private
   * @type {number}
   */
  _startTime;

  /**
   * @private
   * @type {number}
   */
  _lastTick;

  /**
   * @private
   */
  _frameId;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @public
   * @readonly
   * @return {number}
   */
  get elapsedTime() {
    return Date.now() - this._startTime;
  }

  /**
   * Engine
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {SystemManager} systemManager - The system manager for the simulation.
   */
  constructor(logService, messageService, systemManager) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._systemManager = systemManager;
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
    this._startTime = Date.now();
    this._lastTick = this._startTime;
    this._frameId = requestAnimationFrame(() => this._tick());
  }

  /**
   * Stops the engine.
   * @public
   */
  stop() {
    if (this._isRunning) {
      this._isRunning = false;
      cancelAnimationFrame(this._frameId);
    }
  }

  /**
   * Pauses the engine
   * @public
   */
  pause() {
    this._isPaused = !this._isPaused;
    if (this._isPaused) {
      this._timePaused = Date.now();
    } else {

    }
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @private
   */
  _tick() {
    // Needs to call the render loop and draw the next frame every time
    // If there is not input then the update loop needs to handle only animation / display systems
    // If there is input then all systems should update
    if (this._isRunning) {
      const CURRENT_TIME = Date.now();
      let delta = CURRENT_TIME - this._lastTick;

      delta = delta > MAX_SKIP_DURATION ? MAX_SKIP_DURATION : delta;
      while (delta >= FRAME_DURATION) {
        this._systemManager.update(FRAME_DURATION);
        delta -= FRAME_DURATION;
        this._lastTick += FRAME_DURATION;
      }

      this._frameId = requestAnimationFrame(() => this._tick());
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
   * @param {DataManager} dataManager - The data manager for the simulation.
   * @param {array} systems - The systems used by the simulation.
   *
   * @return {Engine} - A new engine instance.
   */
  static createInstance(logService, messageService, dataManager, systems) {
    const SYSTEM_MANAGER = SystemManager.createInstance(logService, messageService, dataManager, systems);

    return new Engine(logService, messageService, SYSTEM_MANAGER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Engine;
