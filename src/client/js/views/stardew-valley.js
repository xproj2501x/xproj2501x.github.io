/**
 * Stardew Valley
 * ===
 *
 * @module stardewValley
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import Icon from '../components/icon';
import TwoColumn from '../template/two-column';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * StardewValley
 * @class
 */
class StardewValley extends React.Component {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * StardewValley
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      level: 10,
      tiller: true,
      skill: 'artisan',
      average: true,
      season: 'spring',
      currentDay: 1,
      crossSeason: true,
      crops: []
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    console.log('stardew-valley');
  }

  /**
   *
   * @return {*[]}
   */
  render() {
    let crops;

    if (this.state.crops) {
      crops = this.state.crops.map((crop, index) => this._renderCropFields(crop, index));
    }

    return (
      <div className="o-content c-cell c-grid">
        <div className="o-content__left-panel c-cell">
          <div className="c-section">
            Stardew Valley
          </div>
        </div>
        <div className="o-content__right-panel c-cell--4-col" >
          <div className="c-section">
            <div className="c-action-bar">
              <h1 className="c-action-bar__title">Heading</h1>
              <Icon className="c-action-bar__right-icon c-icon" value="chevron_right" />
            </div>
            <div className="c-section">
              <div className="c-grid">
                <div className="c-cell--3-col">
                  Farming Level
                </div>
                <div className="c-input c-cell--3-col">
                  <input type="number" className="c-input__text" name="level" value={this.state.level}
                    onChange={(event) => this._handleChange(event)} />
                </div>
                <div className="c-cell--3-col">
                  Tiller
                </div>
                <div className="c-input c-cell--3-col">
                  <input type="checkbox" className="c-input__text" name="tiller" value={this.state.tiller}
                    onChange={(event) => this._handleChange(event)} />
                </div>
                <div className="c-cell--3-col">
                  Level 10 Skill
                </div>
                <div className="c-input c-cell--3-col">
                  <select className="c-input__select" name="skill" value={this.state.skill}
                    onChange={(event) => this._handleChange(event)} >
                    <option>Agriculturist</option>
                    <option>Artisan</option>
                  </select>
                </div>
                <div className="c-cell--3-col">
                  Average Profits
                </div>
                <div className="c-input c-cell--3-col">
                  <input type="checkbox" className="c-input__text" name="average" value={this.state.average}
                    onChange={(event) => this._handleChange(event)} />
                </div>
                <div className="c-cell--3-col">
                  Season
                </div>
                <div className="c-input c-cell--3-col">
                  <select className="c-input__select" name="season" value={this.state.season}
                    onChange={(event) => this._handleChange(event)} >
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option>Fall</option>
                    <option>Greenhouse</option>
                  </select>
                </div>
                <div className="c-cell--3-col">
                  Current Day
                </div>
                <div className="c-input c-cell--3-col">
                  <input type="text" className="c-input__text" name="currentDay" value={this.state.currentDay}
                    onChange={(event) => this._handleChange(event)} />
                </div>
                <div className="c-cell--3-col">
                  Cross Season
                </div>
                <div className="c-input c-cell--3-col">
                  <input type="checkbox" className="c-input__text" name="crossSeason" value={this.state.crossSeason}
                    onChange={(event) => this._handleChange(event)} />
                </div>
              </div>
              {crops}
              <button className="c-button" onClick={(event) => this._addCrop(event)}>Add</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Exports
  //////////////////////////////////////////////////////////////////////////////
  _renderCropFields(crop, index) {
    return (
      <div className="c-section" key={index}>
        <div className="c-grid">
          <div className="c-cell--3-col">
            Crop
          </div>
          <div className="c-input c-cell--3-col">
            <select className="c-input__select">
              <option>None</option>
              <option>Basic Fertilizer</option>
              <option>Quality Fertilizer</option>
              <option>Speed-Gro</option>
              <option>Deluxe Speed-Gro</option>
            </select>
          </div>
          <div className="c-cell--3-col">
            Quantity
          </div>
          <div className="c-input c-cell--3-col">
            <input type="checkbox" className="c-input__text" />
          </div>
          <div className="c-cell--3-col">
            Produce Type
          </div>
          <div className="c-input c-cell--3-col">
            <select className="c-input__select">
              <option>Raw</option>
              <option>Jar</option>
              <option>Keg</option>
            </select>
          </div>
          <div className="c-cell--3-col">
            Pay for Seeds
          </div>
          <div className="c-input c-cell--3-col">
            <input type="checkbox" className="c-input__text" />
          </div>
          <div className="c-cell--3-col">
            Fertilizer
          </div>
          <div className="c-input c-cell--3-col">
            <select className="c-input__select">
              <option>None</option>
              <option>Basic Fertilizer</option>
              <option>Quality Fertilizer</option>
              <option>Speed-Gro</option>
              <option>Deluxe Speed-Gro</option>
            </select>
          </div>
          <div className="c-cell--3-col">
            Pay for Fertilizer
          </div>
          <div className="c-input c-cell--3-col">
            <input type="checkbox" className="c-input__text" />
          </div>
        </div>
      </div>
    );
  }

  _changeSeason(event) {
    console.log(event.target.value);
  }

  _handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(target);
    console.log(value);
    console.log(name);
    console.log(this.state);
  }

  _resetGraph(event) {
    console.log('refresh graph');
  }

  _addCrop(event) {
    this.setState({
      crops: [...this.state.crops, {}]
    });

  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default StardewValley;
