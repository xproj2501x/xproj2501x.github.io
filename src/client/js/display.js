/**
 * Display
 * ===
 *
 * @module display
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * Display
 * @class
 */
class Display {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {HTMLElement}
   */
  _container;

  /**
   * @private
   * @type {HTMLElement}
   */
  _canvas;

  /**
   * @private
   * @type {CanvasRenderingContext2D}
   */
  _context;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Display
   * @constructor
   * @param {HTMLElement} container - The parent container for the display.
   */
  constructor(container) {
    this._container = container;
    this._canvas = document.createElement('canvas');
    this._context = this._canvas.getContext('2d');
    this._container.appendChild(this._canvas);
    this._refresh();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Draws a collection of sprites on the canvas.
   * @param {Array} sprites - A collection of sprite objects.
   */
  render(sprites) {
    this._refresh();
    this._context.save();

    this._context.restore();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Clears the canvas and resets the dimensions to the current width and height of the container.
   * @private
   */
  _refresh() {
    this._context.clearRect(0, 0, this._canvas.height, this._canvas.width);
    this._canvas.height = this._container.clientHeight;
    this._canvas.width = this._container.clientWidth;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {string} containerId - The id for the container element.
   *
   * @return {Display} A new display instance.
   */
  static createInstance(containerId) {
    const CONTAINER = document.getElementById(containerId);

    return new Display(CONTAINER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Display;
