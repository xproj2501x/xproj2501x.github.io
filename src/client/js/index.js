////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import '../css/_site.scss';
import LogService from '../../common/services/log';
import MessageService from '../../common/services/message';
import Game from '../../game';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const LOG_SERVICE = LogService.createInstance(0);
const MESSAGE_SERVICE = MessageService.createInstance();

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

  /**
   * The game manager for the application.
   * @private
   * @type {Game}
   */
  _game;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  constructor() {
    const MENU_BUTTON = document.getElementById('menu-button');
    const INFO_BUTTON = document.getElementById('info-button');
    const LINKS = document.getElementsByClassName('o-nav__menu__item');

    this._navMenu = document.getElementById('nav-menu');
    this._infoPanel = document.getElementById('info-panel');
    MENU_BUTTON.addEventListener('click', (event) => {this.toggleMenu(event)});
    INFO_BUTTON.addEventListener('click', (event) => {this.toggleInfoPanel(event)});

    // TODO: Should be in a router class
    for (const KEY in LINKS) {
      if (LINKS.hasOwnProperty(KEY)) {
        LINKS[KEY].addEventListener('click', (event) => {
          const PATH_NAME = event.target.innerText.toLowerCase();

          window.history.pushState({}, PATH_NAME, window.location.origin + '/' + PATH_NAME.split(' ').join('-'));
        });
      }
    }
    window.onpopstate = () => {
      console.log(`pop: ${window.location.href}`);
    };

    this._game = Game.createInstance(LOG_SERVICE, MESSAGE_SERVICE);
    this._game.step();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
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
  const APP = App.createInstance();
});
