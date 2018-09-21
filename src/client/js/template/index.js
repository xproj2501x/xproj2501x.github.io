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
import Icon from './components/icon';
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
      navMenuCollapsed: true
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
          <div className="c-action-bar">
            <Icon className="c-action-bar__left-icon c-icon" value="menu" onClick={(event) => this.toggleMenu(event)} />
            <h1 className="c-action-bar__title">Heading</h1>
            <Icon className="c-action-bar__right-icon c-icon" value="search"
              onClick={(event) => this.toggleInfoPanel(event)} />
          </div>

        </div>
      </header>,
      <main className="c-container">
        <div className="o-app__main c-grid c-grid--no-spacing">
          <div className={this.state.navMenuCollapsed ? 'o-nav o-nav--collapsed c-cell' : 'o-nav c-cell'}>
            <ul className="o-nav__menu">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
          <div className="o-content c-cell c-grid c-grid--no-spacing">
            <div className="o-content__left-panel c-cell">
              <div className="c-section">left</div>
            </div>
            <div className={this.state.infoPanelCollapsed ?
              'o-content__right-panel o-content__right-panel--collapsed c-cell' :
              'o-content_right-panel c-cell--4-col'}>
              <div className="c-section">
                <h2>heading</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                </p>
              </div>
            </div>
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
    this.setState((prev) => ({navMenuCollapsed: !prev.navMenuCollapsed}));
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
