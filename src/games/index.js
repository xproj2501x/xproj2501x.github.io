/**
 * Game Manager
 * ===
 *
 * @module gameManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import StateManager from '../ecs';
import Engine from '../engine';
import {COMPONENT, COMPONENT_TEMPLATES} from './targeting/components';
import {SYSTEM_TEMPLATES} from './targeting/systems';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * GameManager
 * @class
 */
class GameManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger for the class.
   * @private
   * @type {Logger}
   */
  _logger;

  _stateManager;

  _engine;

  /**
   * @private
   * @type {boolean}
   */
  _isRunning;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * GameManager
   * @constructor
   * @param {LogService} logService - The log service for the application.
   */
  constructor(logService, stateManager, engine) {
    this._logger = logService.register(this.constructor.name);
    this._stateManager = stateManager;
    this._engine = engine;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  start() {
    this._isRunning = true;
    this._stateManager.buildEntity([
      {
        type: COMPONENT.POSITION,
        state: {x: 0, y: 0}
      },
      {
        type: COMPONENT.TARGET,
        state: {x: 250, y: 250}
      },
      {
        type: COMPONENT.VELOCITY,
        state: {x: 0, y: 0}
      },
      {
        type: COMPONENT.ACCELERATION,
        state: {x: 0, y: 0}
      },
    ]);
    requestAnimationFrame(() => this._tick());
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _tick() {
    this._engine.update();
    this._render();
    requestAnimationFrame(() => this._tick());
  }

  _render() {
    const CONTAINER = document.getElementById('canvas-wrapper');
    const CANVAS = document.createElement('canvas');
    const ENTITY = this._stateManager.getSystemData({
      resources: [],
      components: [
        COMPONENT.POSITION
      ]
    }).entities[0];

    CANVAS.width = CONTAINER.clientWidth;
    CANVAS.height = CONTAINER.clientHeight;
    CONTAINER.removeEventListener('click', (event) => {console.log(event);});
    CONTAINER.addEventListener('click', (event) => {console.log(event);});
    const CONTEXT = CANVAS.getContext('2d');

    CONTEXT.fillStyle = `rgb(0, 0, 0)`;
    CONTEXT.fillRect(ENTITY[COMPONENT.POSITION].x, ENTITY[COMPONENT.POSITION].y, 10, 10);
    if (CONTAINER.firstChild) CONTAINER.removeChild(CONTAINER.firstChild);
    CONTAINER.appendChild(CANVAS);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {LogService} logService - The log service for the application.
   *
   * @return {GameManager} - A new game manager instance.
   */
  static createInstance(logService) {
    const STATE_MANAGER = StateManager.createInstance(logService, COMPONENT_TEMPLATES);
    const ENGINE = Engine.createInstance(logService, STATE_MANAGER, SYSTEM_TEMPLATES);

    return new GameManager(logService, STATE_MANAGER, ENGINE);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default GameManager;
