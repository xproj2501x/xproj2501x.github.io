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
import Assemblage from './assemblage';
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
   * DataManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {EntityManager} entityManager - The entity manager for the simulation.
   * @param {ComponentManager} componentManager - The component manager for the simulation.
   * @param {array} templates - A collection of assemblage templates for the simulation.
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
    const COMPONENTS = [];

    TEMPLATE.forEach((componentType) => {
      COMPONENTS.push(this._componentManager.findComponentsOfType(componentType));
    });
    for (let idx = 0; idx < COMPONENTS[0].length; idx++) {
      let components = [];

      for (let jdx = 0; jdx < COMPONENTS.length; jdx++) {
        if (!COMPONENTS[jdx][idx]) {
          break;
        }
        components.push(COMPONENTS[jdx][idx]);
      }
      if (components.length === TEMPLATE.length) {
        ASSEMBLAGES.push(Assemblage.createInstance(type, TEMPLATE, components, this._componentManager));
      }
    }
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
   * @return {array} The assemblage template.
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
   * @param {array} componentTemplates -
   * @param {array} assemblageTemplates -
   *
   * @return {DataManager} A new data manager instance.
   */
  static createInstance(logService, messageService, componentTemplates, assemblageTemplates) {
    const ENTITY_MANAGER = EntityManager.createInstance(logService);
    const COMPONENT_MANAGER = ComponentManager.createInstance(logService, componentTemplates);

    return new DataManager(logService, messageService, ENTITY_MANAGER, COMPONENT_MANAGER, assemblageTemplates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DataManager;
