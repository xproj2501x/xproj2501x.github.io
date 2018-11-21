/**
 * Size Component
 * ===
 *
 * @module game.Components.SizeComponent
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Component from '../../data-manager/component';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const TEMPLATE = {
  height: 'number',
  width: 'number',
  facing: 'number'
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * SizeComponent
 * @class
 * @extends Component
 */
class SizeComponent extends Component {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * SizeComponent
   * @constructor
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of the SizeComponent.
   * @param {object} state - The state of the SizeComponent.
   */
  constructor(id, type, state) {
    super(id, type, state);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Static factory method.
   * @static
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of the SizeComponent.
   * @param {object} template - The template for the SizeComponent.
   * @param {object} state - The state of the SizeComponent.
   *
   * @return {SizeComponent} A new Glyph component instance.
   */
  static createInstance(id, type, template, state) {
    return new SizeComponent(id, type, state);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default SizeComponent;
