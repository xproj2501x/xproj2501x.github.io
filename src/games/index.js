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
import {SYSTEMS} from './game-of-life/systems';

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
    this.start(logService);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  start(logService) {
    const DATA_MANAGER = DataManager.createInstance(
      logService, this._messageService, COMPONENT_TEMPLATES, ASSEMBLAGE_TEMPLATES);
    const ENGINE = Engine.createInstance(logService, this._messageService, DATA_MANAGER, SYSTEMS);

    for (let idx = 0; idx < 250; idx++) {
      for (let jdx = 0; jdx < 750; jdx++) {
        const CHANCE = Math.floor(Math.random() * Math.floor(100));

        if (CHANCE > 65) {
          const SETTINGS = [
            {
              x: idx,
              y: jdx
            },
            {
              life: '000000110',
              death: '111110010',
              cycles: 10
            },
            {
              color: '#F00'
            }
          ];

          DATA_MANAGER.createAssemblage(ASSEMBLAGE_TYPE.CELL, SETTINGS);
        }
      }
    }

    ENGINE.start();
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
