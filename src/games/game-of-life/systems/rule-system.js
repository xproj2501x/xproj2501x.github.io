/**
 * Rule System
 * ===
 *
 * @module ruleSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import System from '../../../engine/system';
import {COMPONENT_TYPE} from '../components';
import {ASSEMBLAGE_TYPE} from '../assemblages';


////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const HEIGHT = 750;
const WIDTH = 250;
const DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
];

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * RuleSystem
 * @class
 */
class RuleSystem extends System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _cycle;

  /**
   * A collection of cells active at the start of the frame.
   * @private
   * @type {Array}
   */
  _cells;

  /**
   * A collection of cells flagged for deletion.
   * @private
   * @type {Array}
   */
  _cellsToDelete;

  _cellsToAdd;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * RuleSystem
   * @constructor
   */
  constructor(logService, messageService) {
    super(logService, messageService, ASSEMBLAGE_TYPE.CELL);
    this._cycle = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The update routine for the system.
   * @param {array} assemblages - A collection of assemblages used by system.
   */
  update(assemblages) {
    this._cycle++;
    this._buildGrid(assemblages);
      for (let idx = 0; idx < WIDTH; idx++) {
        for (let jdx = 0; jdx < HEIGHT; jdx++) {
          const POSITION = [idx, jdx];
          const NEIGHBORS = this._findNeighborCells(POSITION);

          this._checkRule(POSITION, NEIGHBORS);
        }
      }
      this._cleanCells();

  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Builds the grid for the current state from the collection of assemblages.
   * @private
   */
  _buildGrid(assemblages) {
    this._cells = [];
    this._cellsToDelete = [];
    this._cellsToAdd = [];
    let position;

    assemblages.forEach((assemblage) => {
      position = assemblage.getComponent(COMPONENT_TYPE.POSITION);
      this._cells[position.x + (position.y * HEIGHT)] = assemblage;
    });
  }

  /**
   * Finds the assemblage for the cell at position x, y.
   * @private
   * @param {number} x - The x coordinate of the cell.
   * @param {number} y - The y coordinate of the cell.
   *
   * @return {object, null}
   */
  _findCell(x, y) {
    const KEY = this._cells[x + (y * HEIGHT)];

    if (KEY) {
      return this._assemblages[KEY];
    }
    return null;
  }

  /**
   * Finds the live neighbors of the cell at position x, y.
   * @private
   * @param {Array} position - The x and y coordinates of the cell.
   *
   * @return {number}
   */
  _findNeighborCells(position) {
    const NEIGHBORS = [];

    DIRECTIONS.forEach((direction) => {
      const X = position[0] + direction[0];
      const Y = position[1] + direction[1];
      const POSITION = X + (Y * HEIGHT);

      if (this._cells[POSITION]) {
        NEIGHBORS.push([X, Y]);
      }
    });
    return NEIGHBORS.length;
  }

  /**
   * Checks the rule for the cell at position x, y to determine state for the next generation.
   * @private
   * @param {object} position - The assemblage for the cell at position x, y.
   * @param {number} neighbors - The coordinates for the live neightbors of the cell.
   */
  _checkRule(position, neighbors) {
    const CELL = this._findCell(position[0], position[1]);

    if (CELL) {
      const RULE = CELL[COMPONENT_TYPE.RULE];
      const LIFE = RULE.life;
      const DEATH = RULE.death;

      if (DEATH & (1 << neighbors)) {
        this._cellsToDelete.push(position);
      }
    }
    if (parseInt('000000110', 2) & (1 << neighbors)) {
      this._cellsToAdd.push(position);
    }
  }


  _cleanCells() {
    this._cellsToDelete.forEach((cell) => {
      const ID = this._cells[cell[0] + (cell[1] * HEIGHT)];
    });
    this._cellsToAdd.forEach((cell) => {
      this._currentAssemblage = cell;

    });

    this._cellsToDelete = [];
    this._cellsToAdd = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {MessageService} messageService - The message service for the simulation.
   *
   * @return {RuleSystem} A new game of life instance.
   */
  static createInstance(messageService) {
    return new RuleSystem(messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default RuleSystem;
