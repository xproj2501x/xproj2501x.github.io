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
/**
 *
 *
 */
const DEFAULT_OPTIONS = {
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

// #3c3c3c - grid
// #282828 - background

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
   * @private
   * @type {HTMLElement}
   */
  _container;

  /**
   * @private
   * @type {HTMLCanvasElement}
   */
  _canvas;


  _context;

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
   * @param {object} options - The configuration for the user interface.
   */
  constructor(logService, messageService, options) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._options = options;
    this._screens = [];
    document.addEventListener('keydown', (event) => this.handleInput(event));
    this._container = document.getElementById(this._options.containerId);
    this._canvas = document.createElement('canvas');
    this._container.appendChild(this._canvas);
    this._context = this._canvas.getContext('2d');
    this.render();
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
  render() {
    this._refresh();
    this._drawGrid();

  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _setOptions(options) {
    for (const KEY in options) {
      if (options.hasOwnProperty(KEY) && this._options.hasOwnProperty(KEY)) {
        this._options[KEY] = options[KEY];
      }
    }
  }

  _refresh() {
    this._context.clearRect(0, 0, this._options.width, this._options.height);
    if (this._container.clientHeight > this._container.clientWidth) {
      this._options.spacing = Math.floor(this._container.clientHeight / this._options.height);
    } else {
      this._options.spacing = Math.floor(this._container.clientWidth / this._options.width);
    }
    this._canvas.height = this._options.height * this._options.spacing;
    this._canvas.width = this._options.width * this._options.spacing;
    this._context.fillStyle = '#282828';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _drawGrid() {
    for (let idx = 0; idx < this._canvas.width; idx += this._options.spacing) {
      this._context.moveTo(idx, 0);
      this._context.lineTo(idx, this._canvas.height);
    }
    for (let idx = 0; idx < this._canvas.height; idx += this._options.spacing) {
      this._context.moveTo(0, idx);
      this._context.lineTo(this._canvas.width, idx);
    }
    this._context.lineWidth = 3;
    this._context.strokeStyle = '#3c3c3c';
    this._context.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {object} options - The configuration for the user interface.
   *
   * @return {UserInterface} - A new display manager instance.
   */
  static createInstance(logService, messageService, options) {
    options = options || DEFAULT_OPTIONS;
    return new UserInterface(logService, messageService, options);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default UserInterface;
