////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import '../css/_site.scss';
import Display from './display';
import GameOfLife from '../../games/game-of-life';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
class App {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The HTML element for the navigation menu.
   * @private
   * @type {HTMLElement}
   */
  _navMenu;

  /**
   * The HTML element for the canvas panel.
   * @private
   * @type {HTMLElement}
   */
  _canvasPanel;

  /**
   * The HTML element for the info panel.
   * @private
   * @type {HTMLElement}
   */
  _infoPanel;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  constructor() {
    const MENU_BUTTON = document.getElementById('menuButton');
    const INFO_BUTTON = document.getElementById('infoButton');
    const LINKS = document.getElementsByClassName('o-nav__menu__item');

    this._navMenu = document.getElementById('navMenu');
    this._infoPanel = document.getElementById('infoPanel');
    MENU_BUTTON.addEventListener('click', (event) => {this.toggleMenu(event)});
    INFO_BUTTON.addEventListener('click', (event) => {this.toggleInfoPanel(event)});

    // TODO: Should be in a router class
    for (const KEY in LINKS) {
      if (LINKS.hasOwnProperty(KEY)) {
        LINKS[KEY].addEventListener('click', (event) => {
          const PATH_NAME = event.target.innerText.toLowerCase();

          window.history.pushState({}, PATH_NAME, window.location.origin + '/' + PATH_NAME);
          console.log(`push: ${window.location.href}`);
        });
      }
    }
    window.onpopstate = () => {
      console.log(`pop: ${window.location.href}`);
    };
    this.start();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /*

   */
  start() {
    const GAME_OF_LIFE = GameOfLife.createInstance();

    GAME_OF_LIFE.start();
  }

  toggleMenu(event) {
    this._navMenu.classList.toggle('o-nav--collapsed');
  }

  toggleInfoPanel(event) {
    this._infoPanel.classList.toggle('o-info-panel--collapsed');
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
   *
   * @return {App} A new app instance.
   */
  static createInstance() {
    return new App();
  }
}

window.addEventListener('load', (event) => {
  const DISPLAY = Display.createInstance('canvas-wrapper');
  const APP = App.createInstance();

});
