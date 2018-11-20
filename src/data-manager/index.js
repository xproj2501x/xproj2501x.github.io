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
   * @param {ComponentManager} componentManager - The component manager for the simulation.
   */
  constructor(logService, messageService, componentManager) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._entityManager = EntityManager.createInstance(logService);
    this._componentManager = componentManager;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates an entity with the specified components.
   * @param {array} components - The settings for the components to attach to the entity.
   */
  createEntity(components) {
    const ENTITY = this._entityManager.createEntity();

    components.forEach((component) => {
      const COMPONENT = this._componentManager.createComponent(ENTITY.id, component.type, component.state);

      ENTITY.attachComponent(COMPONENT);
    });
  }

  /**
   * Finds all entities with a specified group of components.
   * @param {number} type - The type of assemblage to find.
   *
   * @return {object} A collection of assemblages.
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
   * @param {ComponentManager} componentManager - The component manager for the simulation.
   *
   * @return {DataManager} A new data manager instance.
   */
  static createInstance(logService, messageService, componentManager) {
    return new DataManager(logService, messageService, componentManager);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DataManager;
