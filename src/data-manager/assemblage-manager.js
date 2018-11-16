/**
 * Assemblage Manager
 * ===
 *
 * @module assemblageManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {AssemblageAlreadyExists, AssemblageNotFound, InvalidAssemblageState, InvalidAssemblageType} from './exceptions';
import Assemblage from './assemblage';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * AssemblageManager
 * @class
 */
class AssemblageManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger for the entity manager.
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * A collection of assemblage templates for the simulation.
   * @private
   * @type {array}
   */
  _templates;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * AssemblageManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {array} templates - Assemblage templates for the simulation.
   */
  constructor(logService, templates) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._templates = templates;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new assemblage of the specified type.
   * @public
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the assemblage.
   * @param {object} state - The state of the assemblage.
   *
   * @throws {InvalidAssemblageType}
   * @throws {AssemblageAlreadyExists}
   */
  createAssemblage(id, type, state) {
    const TEMPLATE = this._findTemplate(type);

    return Assemblage.createInstance();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the template for the specified assemblage type.
   * @private
   * @param {string} type - The type of assemblage.
   *
   * @return {object} The assemblage template.
   * @throws {AssemblageTemplateNotFound}
   */
  _findTemplate(type) {
    if (!this._templates[type]) throw new InvalidAssemblageType(`Error: Assemblage type ${type} is not valid.`);
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @param {LogService} logService - The log service for the simulation.
   * @param {array} templates - The assemblage templates for the simulation.
   *
   * @return {AssemblageManager} - A new assemblage manager instance.
   */
  static createInstance(logService, templates) {
    templates = templates || [];
    return new AssemblageManager(logService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default AssemblageManager;
