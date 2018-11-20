/**
 * Population Builder
 * ===
 *
 * @module game.Builders.PopulationBuilder
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {COMPONENT_TYPE} from '../components';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

const DEFAULT_OPTIONS = {
  maxPopulation: 150,
  worldHeight: 60,
  worldWidth: 80
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * PopulationBuilder
 * @class
 */
class PopulationBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {PRNG}
   */
  _prng;

  /**
   * @private
   * @type {object}
   */
  _options;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * PopulationBuilder
   * @constructor
   */
  constructor(prng, options) {
    this._prng = prng;
    this._options = options;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @return {array}
   */
  build() {
    const CREATURES = [];

    for (let idx = 0; idx < this._options.maxPopulation; idx++) {
      const CREATURE = [];
      const LAST_HALF = this._prng.getLinearValue();
      const GENES = this._prng.getLinearValue() + LAST_HALF;

      CREATURE.push({type: COMPONENT_TYPE.GENES, state: {value: GENES}});
      const X = Math.floor(Math.random() * this._options.worldWidth);
      const Y = Math.floor(Math.random() * this._options.worldHeight);

      CREATURE.push({type: COMPONENT_TYPE.POSITION, state: {x: X, y: Y}});
      CREATURES.push(CREATURE);
    }
    return CREATURES;
  }


  generateCreatures() {
    const CREATURES = [];

    for (let idx = 0; idx < this._maxPopulation; idx++) {
      const CREATURE = [];
      const LAST_HALF = this._prng.getLinearValue();
      const GENES = this._prng.getLinearValue() + LAST_HALF;

      CREATURE.push([COMPONENT_TYPE.GENES, {value: GENES}]);

      CREATURES.push(CREATURE);
    }
    return CREATURES;
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
   * @param {PRNG} prng - The pseudo random number generator for the simulation.
   * @param {object} options - The options for the builder.
   *
   * @return {PopulationBuilder} A new population builder instance.
   */
  static createInstance(prng, options) {
    options = options || DEFAULT_OPTIONS;
    return new PopulationBuilder(prng, options);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default PopulationBuilder;
