/**
 * Data Manager
 * ===
 *
 * @module dataManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import EntityManager from './entity-manager';
import ComponentManager from './component-manager';
import {InvalidAssemblageType} from './exceptions';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////

/**
 * DataManager
 * @class
 */
class DataManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger for the class.
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * The message service for the simulation.
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * The entity manager for the simulation.
   * @private
   * @type {EntityManager}
   */
  _entityManager;

  /**
   * The component manager for the simulation.
   * @private
   * @type {ComponentManager}
   */
  _componentManager;

  _templates;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * DataManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {EntityManager} entityManager - The entity manager for the simulation.
   * @param {ComponentManager} componentManager - The component manager for the simulation.
   * @param {array} templates -
   */
  constructor(logService, messageService, entityManager, componentManager, templates) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._entityManager = entityManager;
    this._componentManager = componentManager;
    this._templates = templates;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates an entity from an assemblage template.
   * @param {number} type - The type of assemblage to create.
   * @param {array} settings - The settings for the assemblage.
   */
  createAssemblage(type, settings) {
    const TEMPLATE = this._findTemplate(type);
    const ENTITY = this._entityManager.createEntity();

    for (let idx = 0; idx < TEMPLATE.length; idx++) {
      this._componentManager.createComponent(ENTITY.id, TEMPLATE[idx], settings[idx]);
      ENTITY.attachComponent(TEMPLATE[idx]);
    }
  }

  /**
   * Finds all entities with a specified group of components.
   * @param {number} type - The type of assemblage to find.
   *
   * @retrun {object} A collection of assemblages.
   */
  findAssemblagesOfType(type) {
    const TEMPLATE = this._findTemplate(type);
    const ASSEMBLAGES = [];

    TEMPLATE.forEach((componentType) => {
      ASSEMBLAGES[componentType] = this._componentManager.findComponentsOfType(componentType);
    });
    return ASSEMBLAGES;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the template for the specified assemblage type.
   * @private
   * @param {number} type - The type of assemblage.
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
   * @static
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {ComponentManager} componentManager
   * @param {array} templates -
   *
   * @return {DataManager} A new data manager instance.
   */
  static createInstance(logService, messageService, componentManager, templates) {
    const ENTITY_MANAGER = EntityManager.createInstance(logService);

    return new DataManager(logService, messageService, ENTITY_MANAGER, componentManager, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DataManager;
