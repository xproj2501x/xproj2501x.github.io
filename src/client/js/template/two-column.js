/**
 * Two Colum
 * ===
 *
 * @module twoColum
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import Icon from '../components/icon';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * TwoColum
 * @class
 */
class TwoColumn extends React.Component {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ContentArea
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      infoPanelCollapsed: false
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   *
   * @return {*[]}
   */
  render() {
    return (
      <div className="o-content c-cell c-grid">
        <div className="o-content__left-panel c-cell">
          <div className="c-section">{this.props.left}</div>
        </div>
        <div className={this.state.infoPanelCollapsed ?
          'o-content__right-panel o-content__right-panel--collapsed c-cell' :
          'o-content__right-panel c-cell--4-col'} >
          <div className="c-section">
            <div className="c-action-bar">
              <h1 className="c-action-bar__title">Heading</h1>
              <Icon className="c-action-bar__right-icon c-icon" value="chevron_right"
                onClick={(event) => this.toggleInfoPanel(event)} />
            </div>
            {this.props.right}
          </div>
        </div>
      </div>
    );
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
export default TwoColumn;
