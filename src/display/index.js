/**
 * Display Manager
 * ===
 *
 * @module displayManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

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
   * The message service for the application.
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * @private
   * @type {HTMLElement}
   */
  _container;

  /**
   * A collection of screens owned by the display manager.
   * @private
   * @type {object}
   */
  _screens;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * DisplayManager
   * @constructor
   * @param {LogService} logService - The log service for the application.
   * @param {MessageService} messageService - The message service for the application.
   */
  constructor(logService, messageService, container) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._container = container;
    this._screens = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Registers a screen with the display manager.
   * @public
   * @param {string} id - The id of the screen.
   */
  registerScreen(id) {
    if (this._screens[id]) throw new Error(`Error: Screen id ${id} is already registered with the display manager.`);

  }

  /**
   * Removes a screen from the display manager.
   * @public
   * @param {string} id - The id of the screen.
   */
  removeScreen(id) {
    if (!this._screens[id]) throw new Error(`Error: Screen id ${id} is not registered with the display manager.`);

  }

  render(sprites) {
    this._screens.forEach((screen) => {
      if (screen.isDirty) {

      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _refresh() {

  }

  _draw() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {LogService} logService - The log service for the application.
   * @param {MessageService} messageService - The message service for the application.
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
