/**
 * Screen
 * ===
 *
 * @module screen
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const OPTIONS = {
  height: 60,
  width: 80,
  spacing: 16,
  scale: 1,
  xOffset: 0,
  yOffset: 0,
  fontSize: 15,
  fontFamily: 'monospace',
  fontStyle: '',
  foregroundColor: '#FFF',
  backgroundColor: '#000'
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Screen
 * @class
 */
class Screen {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The id of the screen.
   * @private
   * @type {string}
   */
  _id;

  /**
   * The canvas element for the screen.
   * @private
   * @type {HTMLCanvasElement}
   */
  _canvas;

  /**
   * @private
   * @type {object}
   */
  _options;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Screen
   * @constructor
   * @param {string} id - The id of the screen.
   * @param {HTMLCanvasElement} canvas - The canvas element for the screen.
   */
  constructor(id, canvas) {
    this._id = id;
    this._canvas = canvas;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  handleInput(input) {

  }

  render(sprites) {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _refresh() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {string} id - The id of the screen.
   * @param {HTMLElement} container - The HTML container for the screen.
   *
   * @return {Screen} A new screen instance.
   */
  static createInstance(id, container) {
    const CANVAS = document.createElement('canvas');

    container.appendChild(CANVAS);
    return new Screen(id, CANVAS);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Screen;
