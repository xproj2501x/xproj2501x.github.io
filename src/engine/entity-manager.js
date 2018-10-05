/**
 * Entity Manager
 * ===
 *
 * @module entityManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Entity from './entity';
import {EntityLimitExceededError} from './errors';
import {ENTITY_LIMIT, COMMAND} from './constants';

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
   * @private
   * @type {Logger}
   */
  _logger;

  /**
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * @private
   * @type {int}
   */
  _nextId;

  /**
   *
   * @private
   * @type {Array}
   */
  _entities;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * EntityManager
   * @constructor
   */
  constructor(messageService) {
    this._messageService = messageService;
    this._nextId = 0;
    this._entities = new Array(ENTITY_LIMIT).fill(null);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new entity and returns its identity.
   * @public
   *
   * @return {int} The identity of the entity.
   */
  createEntity() {
    if (this._nextId > ENTITY_LIMIT) throw new EntityLimitExceededError(`Error: Entity limit ${ENTITY_LIMIT} exceeded.`);
    const ENTITY = Entity.create(this._nextId);

    this._entities[this._nextId] = ENTITY;
    this._nextId++;
    return ENTITY.id;
  }

  /**
   * Destroys the entity with the the specified identity.
   * @public
   * @param {int} id - The identity of the entity.
   */
  destroyEntity(id) {
    if (!this.hasEntity(id)) throw new Error(`Error: Entity id ${id} does not exist.`);
    this._entities[id] = null;
  }

  /**
   *
   * @public
   * @param {int} id - The identity of the entity.
   *
   * @return {boolean}
   */
  hasEntity(id) {
    return this._entities[id] !== null;
  }

  /**
   *
   * @public
   * @param {int} id - The identity of the entity.
   *
   * @return {Entity}
   */
  getEntity(id) {
    if (!this.hasEntity(id)) throw new Error(`Error: Entity id ${id} does not exist.`);
    return this._entities[id];
  }

  /**
   * Attaches a component to the specified entity.
   * @param {int} id - The identity of the entity.
   * @param {int} component - The type of the component to be attached.
   */
  attachComponent(id, component) {
    const ENTITY = this.getEntity(id);

    ENTITY.attachComponent(component);
  }

  /**
   * Detaches a component from the specified entity.
   * @param {int} id - The identity of the entity.
   * @param {int} component - The type of the component to be detached.
   */
  detachComponent(id, component) {
    const ENTITY = this.getEntity(id);

    ENTITY.detachComponent(component);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param {MessageService} messageService
   *
   * @return {EntityManager}
   */
  static create(messageService) {
    return new EntityManager(messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default EntityManager;
