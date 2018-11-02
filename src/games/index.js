/**
 * Game Manager
 * ===
 *
 * @module gameManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import DataManager from '../data';
import ComponentManager from '../data/component-manager';
import Engine from '../engine';
import {ASSEMBLAGE_TEMPLATES, ASSEMBLAGE_TYPE} from './game-of-life/assemblages';
import {COMPONENT_TEMPLATES, COMPONENT_TYPE} from './game-of-life/components';

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
   * The message service for the application.
   * @private
   * @type {MessageService}
   */
  _messageService;

  _games;
  
  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * GameManager
   * @constructor
   * @param {LogService} logService - The log service for the application.
   * @param {MessageService} messageService - The message service for the application.
   */
  constructor(logService, messageService) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this.start(logService);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  start(logService) {
    const COMPONENT_MANAGER = ComponentManager.createInstance(logService, COMPONENT_TEMPLATES);
    const DATA_MANAGER = DataManager.createInstance(
      logService, this._messageService, COMPONENT_MANAGER, ASSEMBLAGE_TEMPLATES);
    const ENGINE = Engine.createInstance(logService, this._messageService);

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
