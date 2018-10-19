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
   * @type {object}
   */
  _templates;

  /**
   * @private
   * @type {object}
   */
  _assemblages;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * AssemblageManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {object} templates - Assemblage templates for the simulation.
   */
  constructor(logService, templates) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._templates = templates;
    this._assemblages = {};
    for (const KEY in this._templates) {
      if (this._templates.hasOwnProperty(KEY)) {
        this._assemblages[KEY] = {};
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new assemblage of the specified type.
   * @public
   * @param {string} id - The id of the parent entity (Default: null).
   * @param {string} type - The type of the assemblage.
   * @param {object} state - The state of the assemblage.
   *
   * @throws {InvalidAssemblageType}
   * @throws {AssemblageAlreadyExists}
   */
  createAssemblage(id, type, state) {
    const TEMPLATE = this._getTemplate(type);

    if (this._assemblages[type][id]) {
      throw new AssemblageAlreadyExists(`Error: Assemblage type ${type} already exists for entity ${id}.`);
    }
    for (const KEY in TEMPLATE) {
      if (TEMPLATE.hasOwnProperty(KEY) && !state.hasOwnProperty(KEY)) {
        throw new InvalidAssemblageState(`Error: Component ${KEY} missing for assemblage type ${type}.`);
      }
    }

    this._assemblages[type][id] = Assemblage.createInstance(id, type, TEMPLATE, state);
  }

  /**
   * Destroys an assemblage with a matching id.
   * @public
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the assemblage.
   *
   * @throws {AssemblageNotFound}
   */
  destroyAssemblage(id, type) {
    const ASSEMBLAGES = this.findAssemblagesOfType(type);

    if (!ASSEMBLAGES[id]) {
      throw new AssemblageNotFound(`Error: Assemblage type ${type} does not exist for entity ${id}.`);
    }
    delete ASSEMBLAGES[id];
  }

  /**
   * Finds an assemblage with a matching entity id and type
   * @public
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the assemblage.
   *
   * @throws {AssemblageNotFound}
   * @return {Assemblage}
   */
  findAssemblage(id, type) {
    const ASSEMBLAGES = this.findAssemblagesOfType(type);

    if (!ASSEMBLAGES[id]) {
      throw new AssemblageNotFound(`Error: Assemblage type ${type} does not exist for entity ${id}.`);
    }
    return ASSEMBLAGES[id];
  }

  /**
   * Finds all assemblages with a matching type.
   * @param {string} type - The type of the assemblage.
   *
   * @throws {InvalidAssemblageType}
   * @return {Array} A collection of matching assemblages.
   */
  findAssemblagesOfType(type) {
    if (!this._assemblages[type]) throw new InvalidAssemblageType(`Error: Assemblage type ${type} is not valid.`);
    return this._assemblages[type];
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
  _getTemplate(type) {
    if (!this._templates[type]) throw new InvalidAssemblageType(`Error: Assemblage type ${type} is not valid.`);
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @param {LogService} logService - The log service for the simulation.
   * @param {object} templates - The assemblage templates for the simulation.
   *
   * @return {AssemblageManager} - A new component manager instance.
   */
  static createInstance(logService, templates) {
    templates = templates || {};
    return new AssemblageManager(logService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default AssemblageManager;
