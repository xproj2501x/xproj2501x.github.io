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
import ActionBar from './site/components/action-bar';
import Card from './site/components/card';
import MessageService from './common/services/message';
import GameService from './games';

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
    this._messageService = MessageService.create();
    this.state = {
      infoPanelCollapsed: false,
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
            leftIcon="menu" onLeftIconClick={(event) => this.toggleInfoPanel(event)}
            rightIcon="search" onRightIconClick={(event) => this.toggleInfoPanel(event)} />
        </div>
      </header>,
      <main className="c-container">
        <div className="c-grid c-grid--no-spacing o-app__content">
          <div className="o-game-panel c-cell">
            <section className="o-game-panel__display" id="display">
            </section>
          </div>
          <div className={this.state.infoPanelCollapsed ? 'o-info-panel o-info-panel--collapsed c-cell--col-6'
            : 'o-info-panel c-cell--6-col'}>
            <Card title="Description" className="c-section">
              asdfasfd
            </Card>
            {/*<ActionBar title="heading 2"*/}
              {/*rightIcon="keyboard_arrow_right"*/}
              {/*onRightIconClick={(event) => this.toggleInfoPanel(event)} />*/}
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

  toggleInfoPanel(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({infoPanelCollapsed: !this.state.infoPanelCollapsed});
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Template;
