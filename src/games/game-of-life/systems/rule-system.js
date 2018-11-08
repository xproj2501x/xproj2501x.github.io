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
const HEIGHT = 100;
const WIDTH = 100;
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
   * A collection of cells flagged for update.
   * @private
   * @type {Array}
   */
  _cellsToUpdate;

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
    let cell;

    for (let idx = 0; idx < WIDTH; idx++) {
      for (let jdx = 0; jdx < HEIGHT; jdx++) {
        cell = this._findCell(idx, jdx);
        let neighbors = this._findNeighbors(cell);

        this._checkRule(cell, neighbors);
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
    this._cellsToUpdate = [];
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
    return this._cells[x + (y * HEIGHT)] ? this._cells[x + (y * HEIGHT)] : null;
  }

  /**
   * Finds the live neighbors of the cell at position x, y.
   * @private
   * @param {Array} position - The x and y coordinates of the cell.
   *
   * @return {number}
   */
  _findNeighbors(cell) {
    const POSITION = cell.getComponent(COMPONENT_TYPE.POSITION);
    const NEIGHBORS = [];

    DIRECTIONS.forEach((direction) => {
      const NEIGHBOR = this._findCell(POSITION.x + direction[0], POSITION.y + direction[1]);

      if (NEIGHBOR) {
        const NEIGHBOR_STATE = NEIGHBOR.getComponent(COMPONENT_TYPE.STATE);

        if (NEIGHBOR_STATE.on) {
          NEIGHBORS.push(NEIGHBOR);
        }
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
  _checkRule(cell, neighbors) {
    const RULE = cell.getComponent(COMPONENT_TYPE.RULE);
    const LIFE = parseInt(RULE.life, 2);
    const DEATH = parseInt(RULE.death, 2);

    if (DEATH & (1 << neighbors)) {
      this._cellsToUpdate.push(cell);
    }
  }


  _cleanCells() {
    this._cellsToUpdate.forEach((cell) => {
      const STATE = cell.getComponent(COMPONENT_TYPE.STATE);

      cell.updateComponent(COMPONENT_TYPE.STATE, {on: !STATE.on});
    });
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
