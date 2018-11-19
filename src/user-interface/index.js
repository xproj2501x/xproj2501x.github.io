/**
 * User Interface
 * ===
 *
 * @module userInterface
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {COMMAND, MILLISECONDS, FRAMES_PER_SECOND, FRAME_DURATION, MAX_FRAME_SKIP, MAX_SKIP_DURATION} from './constants';
import Screen from './screen';
////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const OPTIONS = {
  containerId: 'game-wrapper',
  height: 60,
  width: 80,
  spacing: 4,
  scale: 1,
  fontSize: 15,
  fontFamily: 'monospace',
  fontStyle: '',
  foregroundColor: '#FFF',
  backgroundColor: '#000'
};
////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * UserInterface
 * @class
 */
class UserInterface {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger for the class.
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
   * @type {object}
   */
  _options;

  /**
   * A collection of screens owned by the display manager.
   * @private
   * @type {array}
   */
  _screens;

  /**
   * @private
   * @type {boolean}
   */
  _isRunning;

  /**
   * @private
   * @type {boolean}
   */
  _isAnimating;

  /**
   * @private
   * @type {number}
   */
  _frameId;

  /**
   * @private
   * @type {number}
   */
  _lastRenderTime;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * UserInterface
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {HTMLElement} container - The HTML container element.
   */
  constructor(logService, messageService, container) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._container = container;
    this._screens = [];
    document.addEventListener('keydown', (event) => this.handleInput(event));
    this._canvas = document.createElement('canvas');
    this._container.appendChild(this._canvas);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  handleInput(event) {
    const SCREEN = this._screens[this._screens.length - 1];
    const RESULT = SCREEN.handleInput(event.key);

    if (RESULT) {
      switch (RESULT._type) {
        case COMMAND.PUSH_SCREEN:
          break;
        case COMMAND.POP_SCREEN:
          break;
        default:
          this._messageService.send(RESULT._type, RESULT);
      }
    }
  }

  /**
   * Pushes a new screen to the top of the stack.
   * @public
   * @param {Screen} screen - The screen to push on to the stack.
   */
  pushScreen(screen) {
    this._screens.push(screen);
  }

  /**
   * Destroys a screen with a matching id.
   * @public
   * @param {string} id - The id of the screen.
   *
   * @throws {ScreenNotFound}
   */
  popScreen() {
    const SCREEN = this._screens.pop();

  }

  /**
   * Runs the render routine for each screen in the display.
   * @param {array} sprites - A collection of sprites to draw to the screen.
   */
  render(sprites) {
    this._refresh();
    const CONTEXT = this._canvas.getContext('2d');

    CONTEXT.fillStyle = '#F00';
    sprites.forEach((sprite) => {
      CONTEXT.fillRect(sprite.x * OPTIONS.spacing, sprite.y * OPTIONS.spacing, OPTIONS.spacing, OPTIONS.spacing);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _setOptions(options) {

  }

  _refresh() {
    let spacing;

    if (this._container.clientHeight > this._container.clientWidth) {
      spacing = Math.floor(this._container.clientHeight / OPTIONS.height);
    } else {
      spacing = Math.floor(this._container.clientWidth / OPTIONS.width);
    }
    this._canvas.height = OPTIONS.height * spacing;
    this._canvas.width = OPTIONS.width * spacing;
  }

  /**
   *
   * @private
   */
  _tick() {
    if (this._isRunning) {
      const CURRENT_TIME = Date.now();
      let delta = CURRENT_TIME - this._lastRenderTime;

      delta = delta > MAX_SKIP_DURATION ? MAX_SKIP_DURATION : delta;
      while (delta >= FRAME_DURATION) {
        delta -= FRAME_DURATION;

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
   *
   * @return {UserInterface} - A new display manager instance.
   */
  static createInstance(logService, messageService) {
    const CONTAINER = document.getElementById(OPTIONS.containerId);

    return new UserInterface(logService, messageService, CONTAINER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default UserInterface;
