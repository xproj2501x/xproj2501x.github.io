////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import '../css/_site.scss';
import LogService from '../../common/services/log';
import MessageService from '../../common/services/message';
import Engine from '../../engine';
import UserInterface from '../../user-interface';

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
  // const ENGINE = Engine.createInstance(LOG_SERVICE, MESSAGE_SERVICE);
  //
  // ENGINE.start();
  const zlib = require("zlib");
  const Buffer = require('buffer').Buffer;
  // const Blueprint = require('factorio-blueprint');
  const BLUEPRINT_STRING = '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';
  // const importedBlueprint = new Blueprint(BLUEPRINT_STRING);
  //
  // console.log(importedBlueprint);
  // console.log(importedBlueprint.toString());
  console.log(zlib.inflateSync(Buffer.from(BLUEPRINT_STRING.slice(1), 'base64')).toString('utf8'));
});
