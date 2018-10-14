/**
 * Rule System
 * ===
 *
 * @module RuleSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import System from '../../../engine/system';
import {COMPONENT_TYPE} from '../components';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const GRID_SIZE = 50;
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
const OFF = 0;
const ON = 1;

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
  _dirtyCells;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * RuleSystem
   * @constructor
   */
  constructor(messageService) {
    super(messageService);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @param {number} delta
   */
  update(delta) {
    this._buildCells();
    for (let idx = 0; idx < GRID_SIZE; idx++) {
      for (let jdx = 0; jdx < GRID_SIZE; jdx++) {
        const NEIGHBORS = this._checkNeighbors([idx, jdx]);
        const CELL = this._getCell(idx, jdx);

        this._checkRule(CELL, NEIGHBORS);
      }
    }
    this._cleanCells();
  }

  onComponentCreated(event) {
    if (event.type === COMPONENT_TYPE.POSITION || event.type === COMPONENT_TYPE.RULE) {
      this._updateAssemblage(event.id, event.type, event.state);
    }
  }

  onComponentUpdated(event) {
    if (event.id in this._assemblages) {
      if (event.type === COMPONENT_TYPE.POSITION || event.type === COMPONENT_TYPE.RULE) {
        this._updateAssemblage(event.id, event.type, event.state);
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _updateAssemblage(id, type, state) {
    const ASSEMBLAGE = this._assemblages[id] || {};

    ASSEMBLAGE[type] = state;
    this._assemblages[id] = ASSEMBLAGE;
  }

  _buildCells() {
    this._cells = new Array(Math.pow(GRID_SIZE, 2)).fill(OFF);
    this._dirtyCells = [];
    this._assemblages.forEach((assemblage) => {
      const POSITION = assemblage[COMPONENT_TYPE.POSITION];

      this._cells[POSITION.x + (POSITION.y * GRID_SIZE)] = assemblage;
    });
  }
  _checkNeighbors(position) {
    const NEIGHBORS = [];

    DIRECTIONS.forEach((direction) => {
      const X = position[0] + direction[0];
      const Y = position[1] + direction[1];
      const POSITION = X + (Y * GRID_SIZE);

      if (this._cells[POSITION]) {
        NEIGHBORS.push([X, Y]);
      }
    });
    return NEIGHBORS.length;
  }

  _checkRule(cell, neighbors) {
    if (cell) {
      const RULE = cell[COMPONENT_TYPE.RULE];
      const LIFE = parseInt(RULE.life, 2);
      const DEATH = parseInt(RULE.death, 2);

      if (LIFE & neighbors) {
        console.log('life');
      }
      else if (DEATH & neighbors) {
        console.log('death');
      }
    }

  }

  _getCell(x, y) {
    const INDEX = this._cells[x + (y * GRID_SIZE)];

    if (INDEX) {
      return this._assemblages[INDEX];
    }
    return INDEX;
  }
  _cleanCells() {
    this._dirtyCells.forEach((cell) => {

    });
    this._dirtyCells = [];
  }
  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {MessaageService} messageService - The message service for the simulation.
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
