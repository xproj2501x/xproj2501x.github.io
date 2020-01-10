/**
 * State Manager
 * ===
 *
 * @module ecs.StateManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import EntityManager from './entity-manager';
import ComponentManager from './component-manager';
import ResourceManager from './resource-manager';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * The radix used for converting a number to a string of bits.
 * @type {number}
 */
const RADIX = 2;

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * StateManager
 * @class
 */
class StateManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The logger registered for the state manager.
   * @private
   * @type {Logger}
   */
  _logger;

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
   * The resource manager for the simulation.
   * @private
   * @type {ResourceManager}
   */
  _resourceManager;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ECS
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {EntityManager} entityManager - The entity manager for the simulation.
   * @param {ComponentManager} componentManager - The component manager for the simulation.
   * @param {ResourceManager} resourceManager - The resource manager for the simulation.
   */
  constructor(logService, entityManager, componentManager, resourceManager) {
    this._logger = logService.register(this.constructor.name);
    this._entityManager = entityManager;
    this._componentManager = componentManager;
    this._resourceManager = resourceManager;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds an entity from a collection of component states.
   * @public
   * @param {object[]} components - A collection of initial states for components to be attached to the entity.
   */
  buildEntity(components) {
    const ENTITY = this._entityManager.createEntity();

    components.forEach((component) => {
      this._componentManager.createComponent(ENTITY.id, component.type, component.state);
      ENTITY.attachComponent(component.type);
    });
  }

  /**
   * Updates or attaches new components to an entity with a matching id.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {object[]} components - A collection of initial states for components to be updated or attached to the entity.
   */
  updateEntity(id, components) {
    const ENTITY = this._entityManager.findEntity(id);

    components.forEach((component) => {
      if (ENTITY.hasComponent(component.type)) {
        this._componentManager.updateComponent(id, component.type, component.state);
      } else {
        this._componentManager.createComponent(id, component.type, component.state);
        ENTITY.attachComponent(component.type);
      }
    });
  }

  /**
   * Destroys a component with a matching id and type.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of component to destroy.
   */
  destroyComponent(id, type) {
    const ENTITY = this._entityManager.findEntity(id);

    if (ENTITY.hasComponent(type)) {
      ENTITY.detachComponent(type);
      this._componentManager.destroyComponent(id, type);
    }
  }

  /**
   * Destroys an entity and all components attached to it.
   * @public
   * @param {number} id - The id of the entity to destroy.
   */
  destroyEntity(id) {
    const ENTITY = this._entityManager.findEntity(id);

    for (let idx = 0; idx < ENTITY.key.toString(RADIX).length; idx++) {
      if ((ENTITY.key >> idx) & 1) {
        ENTITY.detachComponent(idx);
        this._componentManager.destroyComponent(id, idx);
      }
    }
    this._entityManager.destroyEntity(id);
  }


  /**
   * Queries the state manager for all specified resources and component types.
   * @public
   * @param {object} query - The resource and component types to search for.
   *
   * @return {object}
   */
  getSystemData(query) {
    const DATA = {
      resources: {},
      entities: []
    };

    let key;

    query.resources.forEach((resource) => {
      DATA.resources[resource] = this._resourceManager.findResource(resource);
    });
    query.components.forEach((type) => {
      key |= (1 << type);
    });
    const ENTITY_IDS = this._entityManager.findEntitiesWithKey(key);

    ENTITY_IDS.forEach((id) => {
      const ENTITY = {id: id};

      query.components.forEach((type) => {
        ENTITY[type] = this._componentManager.findComponent(id, type).state;
      });
      DATA.entities.push(ENTITY);
    });
    return DATA;
  }

  /**
   * Registers resources with the simulation.
   * @public
   * @param {Array} resources - The resources to register with the simulation.
   */
  registerResource(resources) {
    resources.forEach((resource) => {
      this._resourceManager.registerResource(resource.id, resource.data);
    });
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
   * @param {LogService} logService -
   * @param {Array} componentTypes -
   *
   * @return {StateManager} .
   */
  static createInstance(logService, componentTypes) {
    const ENTITY_MANAGER = EntityManager.createInstance();
    const COMPONENT_MANAGER = ComponentManager.createInstance(componentTypes);
    const RESOURCE_MANAGER = ResourceManager.createInstance();

    return new StateManager(logService, ENTITY_MANAGER, COMPONENT_MANAGER, RESOURCE_MANAGER);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default StateManager;
