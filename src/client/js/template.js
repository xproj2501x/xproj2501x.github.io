/**
 * Template
 * ===
 *
 * @module template
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import ActionBar from './components/action-bar';
import MessageService from '../../common/services/message/index';
import GameService from '../../games/index';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Template
 * @class
 */
class Template extends React.Component {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {boolean}
   */
  _debug;

  _messageService;
  _gameService;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Template
   * @constructor
   */
  constructor(props) {
    super(props);
    self._debug = this.props.location.search === '?DEBUG';

    this._messageService = MessageService.create();
    this.state = {
      infoPanelCollapsed: false,
      navBarCollapsed: true
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  componentDidMount() {
    this._gameService = GameService.create(this._messageService);
  }

  /**
   *
   * @return {*[]}
   */
  render() {
    return [
      <header className="o-app__header">
        <div className="c-container">
          <ActionBar title="heading 1"
            leftIcon="menu" onLeftIconClick={(event) => this.toggleMenu(event)}
            rightIcon="search" onRightIconClick={(event) => this.toggleInfoPanel(event)} />
        </div>
      </header>,
      <main className="c-container">
        <div className="c-grid c-grid--no-spacing o-app__content">
          <div className={this.state.navBarCollapsed ? 'navbar navbar--collapsed c-cell' : 'navbar c-cell'}>
            <div>nav</div>
          </div>
          <div className="o-game-panel c-cell">
            <section className="o-game-panel__display" id="display">
            </section>
          </div>
          <div className={this.state.infoPanelCollapsed ? 'o-info-panel o-info-panel--collapsed c-cell--col-6'
            : 'o-info-panel c-cell--6-col'}>
            <div>asdf asdfasdf</div>
          </div>
        </div>
      </main>,
      <footer className="o-app__footer">
        <div className="c-container">
          <ActionBar title={<h2>Title</h2>}
            leftIcon="menu" onLeftIconClick={(event) => this.toggleInfoPanel(event)}
            rightIcon="search" onRightIconClick={(event) => this.toggleInfoPanel(event)} />
        </div>
      </footer>
    ];
  }

  toggleMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState((prev) => ({navBarCollapsed: !prev.navBarCollapsed}));
  }

  toggleInfoPanel(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState((prev) => ({infoPanelCollapsed: !prev.infoPanelCollapsed}));
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Template;
