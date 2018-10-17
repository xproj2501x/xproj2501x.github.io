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
import UUID from '../common/utilities/uuid';

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
   * A collection of generated entities.
   * @private
   * @type {object}
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
    this._entities = {};
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
   * @param {?string} id - The id of the entity (Default: null)
   *
   * @return {string} The id of the new entity.
   */
  _createEntity(id=null) {
    if (Object.keys(this._entities).length >= MAX_ENTITIES) {
      throw new EntityLimitExceeded(`Error: Entity limit ${MAX_ENTITIES} reached.`);
    }
    id = id || UUID.create();
    const ENTITY = Entity.createInstance(id);

    this._entities[id] = ENTITY;
    return id;
  }

  /**
   * Destroys an entity with a matching id.
   * @private
   * @param {string} id - The id of the entity.
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
