/**
 * User Interface
 * ===
 *
 * @module userInterface
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Screen from './screen';
import {COMMAND, FRAME_DURATION, MAX_SKIP_DURATION} from './constants';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

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
   * The HTML container element for the display.
   * @private
   * @type {HTMLElement}
   */
  _container;

  /**
   * A collection of screens owned by the display manager.
   * @private
   * @type {array}
   */
  _screens;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * UserInterface
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {HTMLElement} container - The HTML container element for the display.
   */
  constructor(logService, messageService, container) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._container = container;
    this._screens = [];
    document.addEventListener('keydown', (event) => this.handleInput(event));
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
    screen.render();
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
    this._screens.forEach((screen) => {
      screen.render();
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @private
   */
  _tick() {
    if (this._isRunning) {
      const CURRENT_TIME = Date.now();
      let delta = CURRENT_TIME - this._lastRender;

      delta = delta > MAX_SKIP_DURATION ? MAX_SKIP_DURATION : delta;
      if (delta >= FRAME_DURATION) {
        this._screens.forEach((screen) => {
          screen.render();
        });
      }
      this._lastRender = CURRENT_TIME;
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
   * @param {string} containerId - The id for the HTML container element.
   *
   * @return {UserInterface} - A new display manager instance.
   */
  static createInstance(logService, messageService, containerId) {
    const CONTAINER = document.getElementById(containerId);

    return new UserInterface(logService, messageService, CONTAINER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default UserInterface;
