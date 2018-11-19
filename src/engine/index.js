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
import Scheduler from './scheduler';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const TURN_LENGTH = 1000;

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
   * @type {Scheduler}
   */
  _scheduler;

  /**
   * @private
   * @type {boolean}
   */
  _isLocked;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Engine
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   */
  constructor(logService, messageService) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._messageService.subscribe('INPUT_COMMAND', (command) => this.handleCommand(command));
    this._scheduler = Scheduler.createInstance();

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  handleCommand(command) {
    if (!this._isLocked) {
      this._logger.writeLogMessage(`Handling command: ${command}`);
      this._isLocked = true;

      this._scheduler.enqueue(command.message, 1, false);
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _update() {
    this._scheduler.enqueue('A', 1, true);
    this._scheduler.enqueue('B', 3, false);

    console.log(`event: ${this._scheduler.dequeue()}`);
    console.log(`time: ${this._scheduler.time}`);

    console.log(`event: ${this._scheduler.dequeue()}`);
    console.log(`time: ${this._scheduler.time}`);

    console.log(`event: ${this._scheduler.dequeue()}`);
    console.log(`time: ${this._scheduler.time}`);
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
   * @return {Engine} - A new engine instance.
   */
  static createInstance(logService, messageService) {
    return new Engine(logService, messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Engine;
