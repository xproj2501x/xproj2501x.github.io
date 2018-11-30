/**
 * Game
 * ===
 *
 * @module game
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import DataManager from '../data-manager';
import ComponentManager from '../data-manager/component-manager';
import Engine from '../engine';
import UserInterface from '../user-interface';
import PRNG from '../common/math/prng';
import GameBuilder from './builders/game-builder';
import Creature from './models/creature';
import {COMPONENTS} from './components';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const CHARACTERS = 'abcdefghijklmnopqrkstuvwxyz ';
const TARGET = 'to be or not to be';
const MAX_POPULATION = 150;

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Game
 * @class
 */
class Game {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _seed;

  _entities;

  _population;

  /**
   * @private
   * @type {Engine}
   */
  _engine;

  /**
   * @private
   * @type {UserInterface}
   */
  _userInterface;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Game
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {DataManager} dataManager - The data manager for the simulation.
   */
  constructor(logService, messageService, dataManager) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._dataManager = dataManager;
    this._engine = Engine.createInstance(logService, messageService);
    this._userInterface = UserInterface.createInstance(logService, messageService);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  step() {
    const NEXT_GENERATION = [];

    if (!this._population.length) {
      for (let idx = 0; idx < MAX_POPULATION; idx++) {
        const GENES = [];

        for (let jdx = 0; jdx < TARGET.length; jdx++) {
          GENES.push(TARGET[Math.floor(Math.random() * TARGET.length)]);
        }
        const X = Math.floor(Math.random() * 80);
        const Y = Math.floor(Math.random() * 60);
        NEXT_GENERATION.push(Creature.createInstance(GENES.join(''), X, Y));
      }
      this._population.push(NEXT_GENERATION);
    } else {
      const PARENT_GENERATION = this._population[this._population.length - 1];
      const MATING_POOL = [];

      for (let idx = 0; idx < PARENT_GENERATION.length; idx++) {
        const GENES = PARENT_GENERATION[idx].genes;
        let score = 0;

        for (let jdx = 0; jdx < GENES.length; jdx++) {
          if (GENES[idx] === TARGET[idx]) {
            score++;
          }
        }
        for (let jdx = 0; jdx < score; jdx++) {
          MATING_POOL.push(PARENT_GENERATION[idx]);
        }
      }
      for (let idx = 0; idx < PARENT_GENERATION.length; idx++) {

      }
    }
    this._userInterface.render(NEXT_GENERATION);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _build() {

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
   * @return {Game} - A new display manager instance.
   */
  static createInstance(logService, messageService) {
    const COMPONENT_MANAGER = ComponentManager.createInstance(logService, COMPONENTS);
    const DATA_MANAGER = DataManager.createInstance(logService, messageService, COMPONENT_MANAGER);
    const RANDOM_GENERATOR = PRNG.createInstance();
    const GAME_BUILDER = GameBuilder.createInstance(RANDOM_GENERATOR, DATA_MANAGER);

    GAME_BUILDER.build();
    return new Game(logService, messageService, DATA_MANAGER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Game;
