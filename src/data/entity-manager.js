/**
 * EntityManager
 * ===
 *
 * @module entityManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {MAX_ENTITIES} from './constants';
import {EntityLimitExceeded, EntityNotFound} from './exceptions';
import Entity from './entity';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * EntityManager
 * @class
 */
class EntityManager {

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
   * The next available entity id.
   * @private
   * @type {number}
   */
  _nextId;

  /**
   * A collection of generated entities.
   * @private
   * @type {array}
   */
  _entities;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * EntityManager
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   */
  constructor(logService) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._entities = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new entity.
   * @public
   *
   * @throws {EntityLimitExceeded}
   * @return {Entity} The new entity.
   */
  createEntity() {
    this._nextId++;
    if (this._nextId >= MAX_ENTITIES) throw new EntityLimitExceeded(`Error: entity limit ${MAX_ENTITIES} exceeded.`);
    const ENTITY = Entity.createInstance(this._nextId);

    this._entities[this._nextId] = ENTITY;
    return ENTITY;
  }

  /**
   * Destroys an entity with a matching id.
   * @public
   * @param {number} id - The id of the entity.
   *
   * @throws {EntityNotFound}
   */
  destroyEntity(id) {
    if (!this._entities[id]) throw new EntityNotFound(`Error: Entity id ${id} does not exist.`);
    this._entities[id] = null;
  }

  /**
   * Finds an entity with a matching id.
   * @public
   * @param {number} id - The id of the entity.
   *
   * @throws {EntityNotFound}
   * @return {Entity}
   */
  findEntity(id) {
    if (!this._entities[id]) throw new EntityNotFound(`Error: Entity id ${id} does not exist.`);
    return this._entities[id];
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
   * @param {LogService} logService - The log service for the simulation.
   *
   * @return {EntityManager} - A new entity manager instance.
   */
  static createInstance(logService) {
    return new EntityManager(logService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default EntityManager;
