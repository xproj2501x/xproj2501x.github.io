/**
 * Input Manager
 * ===
 *
 * @module inputManager
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
 * InputManager
 * @class
 */
class InputManager {

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
   * The HTML container element.
   * @private
   * @type {HTMLElement}
   */
  _container;

  /**
   * @private
   * @type {Keyboard}
   */
  _keyboard;

  /**
   * @private
   * @type {Mouse}
   */
  _mouse;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * InputManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {HTMLElement} container - The HTML container element.
   */
  constructor(logService, messageService, container) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._container = container;
    document.addEventListener('click', (event) => this.handleInput(event));
    document.addEventListener('contextmenu', (event) => this.handleInput(event));
    document.addEventListener('dblclick', (event) => this.handleInput(event));
    document.addEventListener('keydown', (event) => this.handleInput(event));
    document.addEventListener('keypress', (event) => this.handleInput(event));
    document.addEventListener('keyup', (event) => this.handleInput(event));
    document.addEventListener('mousedown', (event) => this.handleInput(event));
    document.addEventListener('mouseup', (event) => this.handleInput(event));
    document.addEventListener('wheel', (event) => this.handleInput(event));

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  start() {

  }

  stop() {

  }

  /**
   * Handles input for the simulation.
   * @public
   * @param {object} event - The input event.
   */
  handleInput(event) {
    event.stopPropagation();
    event.preventDefault();
    if (event instanceof MouseEvent) {
      console.log('mouse');
    } else if (event instanceof WheelEvent) {
      console.log('wheel');
    } else if (event instanceof KeyboardEvent) {
      console.log('keyboard');
    }
    console.log(event);
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
   * @param {string} containerId - The id of the HTML container element.
   *
   * @return {InputManager} - A new input manager instance.
   */
  static createInstance(logService, messageService, containerId) {
    const CONTAINER = document.getElementById(containerId);

    return new InputManager(logService, messageService, CONTAINER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default InputManager;
