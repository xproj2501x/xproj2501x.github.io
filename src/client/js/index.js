////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import '../css/_site.scss';
import LogService from '../../common/services/log';
import MessageService from '../../common/services/message';
import World from '../../game/models/world';

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
  const WORLD = World.createInstance();
  // const STARTING_POPULATION = 150;
  // const POPULATION = [];
  // const MATING_POOL = [];

  WORLD.step();
  WORLD.step();
  // for (let idx = 0; idx < STARTING_POPULATION; idx++) {
  //   const DNA = [];
  //
  //   for (let jdx = 0; jdx < TARGET.length; jdx++) {
  //     DNA[idx] = CHARACTERS.substr((Math.floor(Math.random() * CHARACTERS.length)), 1);
  //   }
  //   const CREATURE = Creature.createInstance(DNA.join(''));
  //   let score = 0;
  //
  //   POPULATION.push(CREATURE);
  //   for (let jdx = 0; jdx < CREATURE.genes.length; jdx++) {
  //     if (CREATURE.genes[jdx] === TARGET[jdx]) {
  //       score++;
  //     }
  //   }
  //   const FITNESS = score / TARGET.length;
  //
  //   for (let jdx = 0; jdx < (FITNESS * 100); jdx++) {
  //     MATING_POOL.push(CREATURE);
  //   }
  //
  // }

});
