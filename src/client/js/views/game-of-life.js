/**
 * Game of Life
 * ===
 *
 * @module gameOfLife
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import ContentArea from '../template/content-area';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * ContentArea
 * @class
 */
class GameOfLife extends React.Component {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * GameOfLife
   * @constructor
   */
  constructor(props) {
    super(props);

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
      <ContentArea
        left={<div>left</div>}
        right={<div>right</div>}
      />
    );
  }

}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default GameOfLife;
