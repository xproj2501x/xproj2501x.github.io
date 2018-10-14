/**
 * Engine
 * ===
 *
 * @module engine
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {FRAME_DURATION, MAX_FRAME_SKIP} from './constants';
import EntityManager from './entity-manager';
import ComponentManager from './component-manager';
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
   * The message service for the simulation.
   * @private
   * @type {MessageService}
   */
  _messageService;

  _entityManager;

  _componentManager;

  _systemManager;

  /**
   * @private
   * @type {Boolean}
   */
  _isRunning;

  /**
   * @private
   * @type {int}
   */
  _time;

  /**
   * @private
   * @type {int}
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
   * Engine
   * @constructor
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {object} managers - Manager services for the simulation.
   */
  constructor(messageService, managers) {
    this._messageService = messageService;
    this._entityManager = managers.entityManager;
    this._componentManager = managers.componentManager;
    this._systemManager = managers.systemManager;
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

  /**
   * Stops the engine.
   */
  stop() {
    this._isRunning = false;
    cancelAnimationFrame(this._frameId);
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

      delta = delta > MAX_FRAME_SKIP ? MAX_FRAME_SKIP : delta;
      if (delta >= FRAME_DURATION) {
        this._update(delta);
        this._render(delta);
        this._lastTick = CURRENT_TIME;
      }
      this._frameId = requestAnimationFrame(() => {
        this._tick();
      });
    }
  }

  _update(delta) {
    while (delta >= FRAME_DURATION) {
      this._systemManager.update(delta);
      delta -= FRAME_DURATION;
    }
  }

  _render(interpolation) {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService -
   *
   * @return {Engine} - A new engine instance.
   */
  static createInstance(messageService, configuration) {
    const MANAGERS = {
      entityManager: EntityManager.createInstance(messageService),
      componentManager: ComponentManager.createInstance(messageService, configuration.componentTemplates),
      systemManager: SystemManager.createInstance(messageService, configuration.systems)
    };

    return new Engine(messageService, MANAGERS);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Engine;
