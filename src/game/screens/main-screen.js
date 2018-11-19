/**
 * Main Screen
 * ===
 *
 * @module game.Screens.MainScreen
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Screen from '../../user-interface/screen';
import Command from '../../common/services/message/command';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const KEY = {
  // Movement
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',

  // Other
  INVENTORY: 'i',
  QUESTS: 'q',
  CHARACTER: 'c',
  JOURNAL: 'j',
  PICK_UP: 'p',
  OPEN: 'o'

};

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
 * MainScreen
 * @class
 * @extends Screen
 */
class MainScreen extends Screen {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * MainScreen
   * @constructor
   * @param {string} id - The id of the MainScreen.
   * @param {HTMLCanvasElement} canvas - The canvas element for the MainScreen.
   */
  constructor(id, canvas) {
    super(id, canvas);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @param input
   */
  handleInput(input) {
    let command;

    switch (input) {
      case KEY.UP:
        command = Command.createInstance('INPUT_COMMAND', {action: 'MOVE', direction: [0, -1], speed: 1});
        break;
      case KEY.DOWN:
        command = Command.createInstance('INPUT_COMMAND', {action: 'MOVE', direction: [0, 1], speed: 1});
        break;
      case KEY.LEFT:
        command = Command.createInstance('INPUT_COMMAND', {action: 'MOVE', direction: [-1, 0], speed: 1});
        break;
      case KEY.RIGHT:
        command = Command.createInstance('INPUT_COMMAND', {action: 'MOVE', direction: [1, 0], speed: 1});
        break;
      default:
        break;
    }
    return command;
  }

  render(sprites) {
    sprites.forEach((sprite) => {

    });
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {string} id - The id of the MainScreen.
   * @param {HTMLElement} container - The HTML container for the screen.
   *
   * @return {MainScreen} A new main screen instance.
   */
  static createInstance(id, container) {
    const CANVAS = document.createElement('canvas');

    container.appendChild(CANVAS);
    return new MainScreen(id, CANVAS);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default MainScreen;
