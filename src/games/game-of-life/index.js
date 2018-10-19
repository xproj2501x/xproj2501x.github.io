/**
 * Game Of Life
 * ===
 *
 * @module gameOfLife
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import MessageService from '../../common/services/message';
import Engine from '../../engine/';
import {COMMAND, EVENT, MESSAGE} from '../../engine/constants';
import {COMPONENT_TEMPLATES, COMPONENT_TYPE} from './components';
import {SYSTEMS} from './systems';

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
const GRID_SIZE = 50;

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * GameOfLife
 * @class
 */
class GameOfLife {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The message service for the simulation.
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
   * GameOfLife
   * @constructor
   * @param {MessageService} messageService - The message service for the application.
   * @param {Engine}
   */
  constructor(messageService, engine) {
    this._messageService = messageService;
    this._engine = engine;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  start() {
    this.generateWorld();
    this._engine.start();
  }

  generateWorld() {
    const ASSEMBLAGES = [];

    this._messageService.subscribe(EVENT.ENTITY_CREATED, (event) => this.onEntityCreated(event));
    for (let idx = 0; idx < GRID_SIZE; idx++) {
      for (let jdx = 0; jdx < GRID_SIZE; jdx++) {
        if (Math.floor(Math.random() * Math.floor(100)) > 75) {
          ASSEMBLAGES.push([
            {
              type: COMPONENT_TYPE.POSITION,
              values: {
                x: idx,
                y: jdx
              }
            },
            {
              type: COMPONENT_TYPE.RULE,
              values: {
                life: parseInt('000000110', 2),
                death: parseInt('111110010', 2),
                cycles: 10
              }
            },
            {
              type: COMPONENT_TYPE.SPRITE,
              values: {
                color: '#F00'
              }
            }
          ]);
        }
      }
    }
    ASSEMBLAGES.forEach((assemblage) => {
      this._currentAssemblage = assemblage;
      this._messageService.send(COMMAND.CREATE_ENTITY, {});
    });
    this._messageService.unsubscribe(EVENT.ENTITY_CREATED, (event) => this.onEntityCreated(event));
  }

  onEntityCreated(event) {
    this._currentAssemblage.forEach((component) => {
      this._messageService.send(COMMAND.CREATE_COMPONENT,
                                {id: event.id, type: component.type, state: component.values});
    });
    this._currentAssemblage = null;
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
   *
   * @return {GameOfLife} A new game of life instance.
   */
  static createInstance() {
    const MESSAGE_SERVICE = MessageService.createInstance();
    const CONFIGURATION = {
      componentTemplates: COMPONENT_TEMPLATES,
      systems: SYSTEMS
    };
    const ENGINE = Engine.createInstance(MESSAGE_SERVICE, CONFIGURATION);

    return new GameOfLife(MESSAGE_SERVICE, ENGINE);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default GameOfLife;
