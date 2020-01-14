/**
 * Cell Assemblage
 * ===
 *
 * @module cellAssemblage
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Assemblage from '../../../engine/assemblage';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * CellAssemblage
 * @class
 */
class CellAssemblage extends Assemblage {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * CellAssemblage
   * @constructor
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of the assemblage.
   */
  constructor(id, type) {
    super(id, type);

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @param {number} id - The id of the parent entity.
   * @param {string} type - The type of the assemblage.
   *
   * @return {CellAssemblage} - A new assemblage instance.
   */
  static createInstance(id, type) {
    return new CellAssemblage(id, type);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default CellAssemblage;