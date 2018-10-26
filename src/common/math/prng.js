/**
 * PRNG System
 * ===
 *
 * @module prngSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import System from '../../engine/system';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * The maximum length for a seed value.
 * @constant
 * @type {number}
 */
const MAX_LENGTH = 64;

/**
 * The multiplier used when generating a new seed.
 * @type {number}
 */
const MULTIPLIER = 0x5D588B656C078965;

/**
 * The addend used when generating a new seed.
 * @type {number}
 */
const ADDEND = 0x0000000000269EC3;

/**
 *
 * @constant
 * @enum {number}
 */
const FORMAT = {
  BIN: 2,
  DEC: 10,
  HEX: 16
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * PRNGSystem
 * @class
 * @implements System
 */
class PRNGSystem extends System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The seed value for the pseudo random number generator.
   * @private
   * @type {string}
   */
  _seed;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * PRNGSystem
   * @constructor
   * @param {string} initialSeed - The initial value for the prng seed.
   */
  constructor(initialSeed) {
    super();
    this._seed = initialSeed;
    this._advanceSeed();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Updates the state
   */
  update() {
    this._advanceSeed();
  }

  /**
   * Generates a 32 bit pseudo random number and advances the seed one step.
   *
   * @return {string}
   */
  getLinearValue() {
    const RESULT = this._seed.substr(0, MAX_LENGTH);

    this._advanceSeed();
    return RESULT;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Advances the seed value using a linear congruential formula.
   * @private
   */
  _advanceSeed() {
    const RESULT = MULTIPLIER * parseInt(this._seed, FORMAT.BIN) + ADDEND;
    const RESULT_BIN = RESULT.toString(FORMAT.BIN);

    this._seed = RESULT_BIN.substr(0, RESULT_BIN.length - MAX_LENGTH);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {number} time - A timestamp used to generate the initial seed.
   *
   * @return {PRNGSystem}
   */
  static createInstance(time) {
    const INITIAL_SEED = (Date.now() - time).toString(FORMAT.BIN);

    return new PRNGSystem(INITIAL_SEED);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default PRNGSystem;
