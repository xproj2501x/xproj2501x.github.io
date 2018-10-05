/**
 * Grow Component
 * ===
 *
 * @module growComponent
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Component from '../../../engine/component';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * GrowComponent
 * @class
 * @extends Component
 */
class GrowComponent extends Component {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get harvestTime() {
    return this.state.harvestTime;
  }

  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get harvestItem() {
    return this.state.harvestItem;
  }

  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get harvestQuantity() {
    return this.state.harvestQuantity;
  }

  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get regrowTime() {
    return this.state.regrowTime;
  }

  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get seasonsFlags() {
    return this.state.seasonFlags;
  }

  /**
   * @public
   * @readonly
   *
   * @return {number}
   */
  get elapsedTime() {
    return this.state.elapsedTime;
  }

  /**
   * GrowComponent
   * @constructor
   * @param {string} id - The identifier for the parent entity.
   * @param {object} state - The initial state of the component.
   */
  constructor(id, state) { // eslint-disable-line id-length
    super(id, state);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {string} id - The identifier for the parent entity.
   * @param {object} state - The initial state of the grow component.
   *
   * @return {GrowComponent}
   */
  static create(id, state) { // eslint-disable-line id-length
    return new GrowComponent(id, state);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default GrowComponent;
