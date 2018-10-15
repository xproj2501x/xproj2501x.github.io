/**
 * EntityManager
 * ===
 *
 * @module entityManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {MESSAGE, MAX_ENTITIES} from './constants';
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
   * @private
   * @type {number}
   */
  _nextId;

  /**
   * A collection of generated entities.
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
   * @param {MessageService} messageService - The message service for the simulation.
   */
  constructor(messageService) {
    this._nextId = -1;
    this._entities = new Array(MAX_ENTITIES).fill(null);
    this._messageService = messageService;
    this._messageService.subscribe(MESSAGE.CREATE_ENTITY, (command) => this.onCreateEntity(command));
    this._messageService.subscribe(MESSAGE.DESTROY_ENTITY, (command) => this.onDestroyEntity(command));
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Message handler for create entity command.
   * @param {object} command - The create entity command message.
   */
  onCreateEntity(command) {
    const ID = this._createEntity();

    this._messageService.send(MESSAGE.ENTITY_CREATED, {id: ID});
  }

  /**
   * Message handler for create entity command.
   * @param {object} command - The destroy entity command message.
   */
  onDestroyEntity(command) {
    const ID = command.id;

    this._destroyEntity(ID);
    this._messageService.send(MESSAGE.ENTITY_DESTROYED, {id: ID});
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new entity.
   * @private
   *
   * @return {number} The id of the new entity.
   */
  _createEntity() {
    this._nextId++;
    if (this._nextId >= MAX_ENTITIES) throw new EntityLimitExceeded(`Error: Entity limit ${MAX_ENTITIES} reached.`);
    const ENTITY = Entity.createInstance(this._nextId);

    this._entities[this._nextId] = ENTITY;
    return this._nextId;
  }

  /**
   * Destroys an entity with a matching id.
   * @private
   * @param {number} id - The id of the entity.
   *
   * @throws {EntityNotFound}
   */
  _destroyEntity(id) {
    if (!this._entities[id]) throw new EntityNotFound(`Error: Entity id ${id} does not exist.`);
    this._entities[id] = null;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @param {MessageService} messageService - The message service for the simulation.
   *
   * @return {EntityManager} - A new entity manager instance.
   */
  static createInstance(messageService) {
    return new EntityManager(messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default EntityManager;
