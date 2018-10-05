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
import {Switch, Route } from 'react-router-dom';
import ActionBar from './components/action-bar';
import MessageService from '../../common/services/message/index';
import Header from './template/header';
import Nav from './template/nav';
import Home from './views/home';
import GameOfLife from './views/game-of-life';
import StardewValley from './views/stardew-valley';


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

  /**
   * @private
   * @type {MessageService}
   */
  _messageService;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Template
   * @constructor
   */
  constructor(props) {
    super(props);
    // self._debug = this.props.location.search === '?DEBUG';
    // console.log(this.props.match.params.id);

    this._messageService = MessageService.create();
    this.state = {
      debugPanelCollapsed: true,
      infoPanelCollapsed: false,
      navMenuCollapsed: true,
      searchBoxCollapsed: true
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  componentDidMount() {
    // this._gameService = GameService.create(this._messageService);

  }

  /**
   *
   * @return {*[]}
   */
  render() {
    return [
      <Header leftIconClick={(event) => this.toggleMenu(event)}
        rightIconClick={(event) => this.toggleInfoPanel(event)} />,
      <main className="o-app__main c-container">
        <Nav collapsed={this.state.navMenuCollapsed} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/game-of-life' component={GameOfLife} />
          <Route path='/stardew-valley' component={StardewValley} />
        </Switch>
      </main>,
      <footer className="o-app__footer">
        <div className="c-container">
          <div className="c-action-bar">
            <span className="c-action-bar__left-icon c-icon">menu</span>
            <a href="/"><h2 className="c-action-bar__title">Heading</h2></a>
            <span className="c-action-bar__right-icon c-icon">search</span>
          </div>
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

  /**
   * Toggles a section of the UI.
   * @private
   * @param {string} name - The name of the section to toggle.
   * @param {MouseEvent} event
   */
  _toggleSection(name, event) {
    event.preventDefault();
    event.stopPropagation();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Template;
