/**
 * Game Manager
 * ===
 *
 * @module gameManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Engine from '../engine';
import DataManager from '../data';
import {COMPONENT_TYPE, COMPONENT_TEMPLATES} from './game-of-life/components';
import {ASSEMBLAGE_TYPE, ASSEMBLAGE_TEMPLATES} from './game-of-life/assemblages';

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

  /**
   * The log service for the simulation.
   * @private
   * @type {LogService}
   */
  _logService;

  /**
   * The message service for the application.
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * The engine for the simulation.
   * @private
   * @type {Engine}
   */
  _engine;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * GameManager
   * @constructor
   * @param {LogService} logService - The log service for the application.
   * @param {MessageService} messageService - The message service for the application.
   * @param {Engine} engine - The engine for the simulation.
   */
  constructor(logService, messageService) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._logService = logService;
    this._messageService = messageService;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  start(componentTemplates, assemblageTemplates) {
    const DATA_MANAGER = DataManager.createInstance(this._logService, this._messageService, componentTemplates, assemblageTemplates);

    this._engine = Engine.createInstance(this._logService, this._messageService, DATA_MANAGER, []);
    this._engine.start();
  }

  stop() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _buildGame(id) {

  }


  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {LogService} logService - The log service for the application.
   * @param {MessageService} messageService - The message service for the application.
   *
   * @return {GameManager} - A new game manager instance.
   */
  static createInstance(logService, messageService) {
    return new GameManager(logService, messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default GameManager;
