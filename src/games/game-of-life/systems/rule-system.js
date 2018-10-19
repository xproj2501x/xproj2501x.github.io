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
import {COMMAND, EVENT} from '../../../engine/constants';

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
  constructor(messageService) {
    super(messageService);
    this._cycle = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The update routine for the system.
   * @param {number} delta
   */
  update(delta) {
    this._cycle++;
    if (this._cycle % 10 === 0) {
      this._buildGrid();
      for (let idx = 0; idx < GRID_SIZE; idx++) {
        for (let jdx = 0; jdx < GRID_SIZE; jdx++) {
          const POSITION = [idx, jdx];
          const NEIGHBORS = this._findNeighborCells(POSITION);

          this._checkRule(POSITION, NEIGHBORS);
        }
      }
      this._cleanCells();
    }
  }

  /**
   * Message handler for the component created and updated events.
   * @param {object} event - The component created or updated event message.
   */
  onComponentCreatedOrUpdated(event) {
    if (event.type === COMPONENT_TYPE.POSITION || event.type === COMPONENT_TYPE.RULE) {
      this._addOrUpdateAssemblage(event.id, event.type, event.state);
    }
  }

  /**
   * Message handler for the component destroyed event.
   * @param {object} event - The component destroyed message.
   */
  onComponentDestroyed(event) {
    if (event.type === COMPONENT_TYPE.POSITION || event.type === COMPONENT_TYPE.RULE) {
      this._destroyComponent(event.id, event.type);
    }
  }

  onEntityDestroyed(event) {
    this._destroyAssemblage(event.id);
  }

  onEntityCreated(event) {
    this._messageService.send(COMMAND.CREATE_COMPONENT,
      {id: event.id, type: COMPONENT_TYPE.POSITION, state: {
            x: this._currentAssemblage[0],
            y: this._currentAssemblage[1]
    }});
    this._messageService.send(COMMAND.CREATE_COMPONENT,
      {id: event.id, type: COMPONENT_TYPE.RULE, state: {
          life: parseInt('000000110', 2),
          death: parseInt('111110010', 2),
          cycles: 10
        }});
    this._messageService.send(COMMAND.CREATE_COMPONENT,
      {id: event.id, type: COMPONENT_TYPE.SPRITE, state: {
          color: '#F00'
        }});
    this._currentAssemblage = null;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Updates an assemblage used by the system.
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the component.
   * @param {object} state - The state of the component.
   * @private
   */
  _addOrUpdateAssemblage(id, type, state) {
    const ASSEMBLAGE = this._assemblages[id] || {};

    ASSEMBLAGE[type] = Object.assign({}, state);
    this._assemblages[id] = ASSEMBLAGE;
  }

  /**
   * Removes a component from an assemblage.
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the component.
   * @private
   */
  _destroyComponent(id, type) {
    const ASSEMBLAGE = this._assemblages[id] || {};

    if (type in ASSEMBLAGE) {
      delete ASSEMBLAGE[type];
    }
  }

  _destroyAssemblage(id) {
    if (this._assemblages[id]) delete this._assemblages[id];
  }

  /**
   * Builds the grid for the current state from the collection of assemblages.
   * @private
   */
  _buildGrid() {
    this._cells = [];
    this._cellsToDelete = [];
    this._cellsToAdd = [];
    for (let KEY in this._assemblages) {
      if (this._assemblages.hasOwnProperty(KEY)) {
        const ASSEMBLAGE = this._assemblages[KEY];

        if (ASSEMBLAGE[COMPONENT_TYPE.POSITION] && ASSEMBLAGE[COMPONENT_TYPE.RULE]) {
          const POSITION = ASSEMBLAGE[COMPONENT_TYPE.POSITION];

          this._cells[POSITION.x + (POSITION.y * GRID_SIZE)] = KEY;
        }
      }
    }
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
    const KEY = this._cells[x + (y * GRID_SIZE)];

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
      const POSITION = X + (Y * GRID_SIZE);

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
    if (parseInt('001100000', 2) & (1 << neighbors)) {
      this._cellsToAdd.push(position);
    }
  }


  _cleanCells() {
    this._cellsToDelete.forEach((cell) => {
      const ID = this._cells[cell[0] + (cell[1] * GRID_SIZE)];
      this._messageService.send(COMMAND.DESTROY_ENTITY, {id: ID});
    });
    this._messageService.subscribe(EVENT.ENTITY_CREATED, (event) => this.onEntityCreated(event));
    this._cellsToAdd.forEach((cell) => {
      this._currentAssemblage = cell;
      this._messageService.send(COMMAND.CREATE_ENTITY, {});
    });
    this._messageService.unsubscribe(EVENT.ENTITY_CREATED, (event) => this.onEntityCreated(event));
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
