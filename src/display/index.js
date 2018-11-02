/**
 * Display Manager
 * ===
 *
 * @module displayManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {ScreenAlreadyExists, ScreenNotFound} from './exceptions';
import Screen from './screen';
import UUID from '../common/utilities/uuid';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * DisplayManager
 * @class
 */
class DisplayManager {

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
   * DisplayManager
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
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Pushes a new screen to the top of the stack.
   * @public
   * @param {Screen} screen - The screen to push on to the stack.
   */
  pushScreen(screen) {

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
   * @return {DisplayManager} - A new display manager instance.
   */
  static createInstance(logService, messageService, containerId) {
    const CONTAINER = document.getElementById(containerId);

    return new DisplayManager(logService, messageService, CONTAINER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DisplayManager;
