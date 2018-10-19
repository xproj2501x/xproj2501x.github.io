/**
 * Render System
 * ===
 *
 * @module renderSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import System from '../../../engine/system';
import {COMPONENT_TYPE} from '../components';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const SCALE = 5;

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * RenderSystem
 * @class
 */
class RenderSystem extends System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _context;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * RenderSystem
   * @constructor
   */
  constructor(messageService) {
    super(messageService);

    const CONTAINER = document.getElementById('canvas-wrapper');
    const CANVAS = document.createElement('canvas');

    CANVAS.height = CONTAINER.clientHeight;
    CANVAS.width = CONTAINER.clientWidth;
    CONTAINER.appendChild(CANVAS);
    this._context = CANVAS.getContext('2d');
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The update routine for the system.
   * @param {number} delta
   */
  update(delta) {
    this._context.save();
    this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    for (const KEY in this._assemblages) {
      if (this._assemblages.hasOwnProperty(KEY)) {
        const ASSEMBLAGE = this._assemblages[KEY];


        this._context.fillStyle = ASSEMBLAGE[COMPONENT_TYPE.SPRITE].color;
        this._context.fillRect((ASSEMBLAGE[COMPONENT_TYPE.POSITION].x * SCALE), (ASSEMBLAGE[COMPONENT_TYPE.POSITION].y * SCALE), SCALE, SCALE);

      }
    }
    this._context.restore();
  }

  /**
   * Message handler for the component created and updated events.
   * @param {object} event - The component created or updated event message.
   */
  onComponentCreatedOrUpdated(event) {
    if (event.type === COMPONENT_TYPE.POSITION || event.type === COMPONENT_TYPE.SPRITE) {
      this._addOrUpdateAssemblage(event.id, event.type, event.state);
    }
  }

  /**
   * Message handler for the component destroyed event.
   * @param {object} event - The component destroyed message.
   */
  onComponentDestroyed(event) {
    if (event.type === COMPONENT_TYPE.POSITION || event.type === COMPONENT_TYPE.SPRITE) {
      this._destroyComponent(event.id, event.type);
    }
  }

  onEntityDestroyed(event) {
    this._destroyAssemblage(event.id);
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

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {MessageService} messageService - The message service for the simulation.
   *
   * @return {RenderSystem} A new game of life instance.
   */
  static createInstance(messageService) {
    return new RenderSystem(messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default RenderSystem;
