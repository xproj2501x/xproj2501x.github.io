/**
 * Abstract Game
 * ===
 *
 * @module games.AbstractGame
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {FRAME_DURATION, MAX_SKIP_DURATION} from './constants';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * AbstractGame
 * @class
 */
class AbstractGame {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger for the game.
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * @private
   * @type {StateManager}
   */
  _stateManager;

  /**
   * @private
   * @type {number}
   */
  _delta;

  _frameId;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * AbstractGame
   * @constructor
   */
  constructor() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Starts the game.
   * @public
   */
  start() {
    this._isRunning = true;
    this._delta = 0;
    this._lastRefresh = Date.now();
    this._frameId = requestAnimationFrame(() => this._tick());
  }

  /**
   * @public
   */
  stop() {
    this._isRunning = false;
    cancelAnimationFrame(this._frameId);
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _tick() {
    if (this._isRunning) {
      const CURRENT_TIME = Date.now();

      this._delta += CURRENT_TIME - this._lastRefresh;
      if (this._delta >= MAX_SKIP_DURATION) {
        // this._logger.writeErrorLog(`Delta ${this._delta} is greater than max frame duration ${MAX_SKIP_DURATION}`);
      }
      while (this._delta > FRAME_DURATION) {
        // this._logger.writeInfoLog(`Updating...`);
        this._delta -= FRAME_DURATION;
      }
      // this._logger.writeInfoLog(`Rendering...`);
      // this._engine.update();
      // this.render();
      this._lastRefresh = CURRENT_TIME;
      // this._logger.writeInfoLog(`Last refresh: ${this._lastRefresh}`);
      this._frameId = requestAnimationFrame(() => this._tick());
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Static factory method.
   * @static
   *
   * @return {AbstractGame} .
   */
  static
  createInstance() {
    return new AbstractGame();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default AbstractGame;