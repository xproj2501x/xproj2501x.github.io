/**
 * Assemblage Manager
 * ===
 *
 * @module assemblageManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {COMMAND, EVENT, MESSAGE} from './constants';
import {AssemblageAlreadyExists, AssemblageNotFound, InvalidAssemblageType} from './exceptions';
import Assemblage from './assemblage';
import UUID from '../common/utilities/uuid';

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
   * The message service for the simulation.
   * @private
   * @type {MessageService}
   */
  _messageService;

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
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {Array} templates - Assemblage templates for the simulation.
   */
  constructor(messageService, templates) {
    this._messageService = messageService;
    this._templates = templates;
    this._assemblages = {};
    this._messageService.subscribe(COMMAND.CREATE_ASSEMBLAGE, (command) => this.onCreateAssemblage(command));
    this._messageService.subscribe(MESSAGE.ENTITY_CREATED, (event) => this.onEntityCreated(event));
    this._messageService.subscribe(MESSAGE.ENTITY_DESTROYED, (event) => this.onEntityDestroyed(event));
    this._messageService.subscribe(MESSAGE.COMPONENT_CREATED, (event) => this.onComponentCreated(event));
    this._messageService.subscribe(MESSAGE.COMPONENT_DESTROYED, (event) => this.onComponentDestroyed(event));
    this._messageService.subscribe(MESSAGE.COMPONENT_UPDATED, (event) => this.onComponentUpdated(event));
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Message handler for the create assemblage command.
   * @param {object} command - The create assemblage command message.
   */
  onCreateAssemblage(command) {
    const ID = command.id || UUID.create();

    // Find entity if it exists, otherwise create a new one
    this._createAssemblage(ID, command.type);
    this._messageService.send(MESSAGE.CREATE_ENTITY, {id: ID});
    command.components.forEach((component) => {
      this._messageService.send(MESSAGE.CREATE_COMPONENT, {id: ID, type: component.type, state: component.state});
    });
  }

  /**
   * Message handler for the entity created event.
   * @public
   * @param {object} event - The entity created event message.
   */
  onEntityCreated(event) {
    this._createAssemblage(event.id);
  }

  /**
   * Message handler for the entity destroyed event.
   * @public
   * @param {object} event - The entity destroyed event message.
   */
  onEntityDestroyed(event) {
    this._destroyAssemblage(event.id);
  }


  /**
   * Message handler for the component created event.
   * @public
   * @param {object} event - The component created event message.
   */
  onComponentCreated(event) {
    this._attachComponentToAssemblage(event.id, event.type, event.state);
  }

  /**
   * Message handler for the component destroyed event.
   * @public
   * @param {object} event - The component destroyed event message.
   */
  onComponentDestroyed(event) {
    this._detachComponentFromAssemblage(event.id, event.type);
  }

  /**
   * Message handler for the component updated event.
   * @public
   * @param {object} event - The component updated event message.
   */
  onComponentUpdated(event) {
    this._updateComponentForAssemblage(event.id, event.type, event.state);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new assemblage of the specified type.
   * @private
   * @param {string} id - The id of the parent entity (Default: null).
   * @param {string} type - The type of the assemblage.
   *
   * @throws {InvalidAssemblageType}
   * @throws {AssemblageAlreadyExists}
   */
  _createAssemblage(id, type) {
    if (!this._assemblages[type]) throw new InvalidAssemblageType(`Error: Assemblage type ${type} is not valid.`);
    if (this._assemblages[type][id]) {
      throw new AssemblageAlreadyExists(`Error: Assemblage type ${type} already exists for entity ${id}.`);
    }
    const TEMPLATE = this._getTemplate(type);
    const ASSEMBLAGE = TEMPLATE.createInstance(id);

    this._assemblages[type][id] = ASSEMBLAGE;
  }

  /**
   * Destroys an assemblage with a matching id.
   * @private
   * @param {number} id - The id of the parent entity.
   *
   * @throws {InvalidAssemblageType}
   * @throws {AssemblageNotFound}
   */
  _destroyAssemblage(id, type) {
    if (!this._assemblages[type]) throw new InvalidAssemblageType(`Error: Assemblage type ${type} is not valid.`);
    if (!this._assemblages[type][id]) {
      throw new AssemblageNotFound(`Error: Assemblage type ${type} does not exist for entity ${id}.`);
    }
    this._assemblages[id] = null;
  }

  /**
   * Returns an assemblage with a matching entity id and type
   * @private
   * @param {string} id - The id of the parent entity.
   * @param {string} type - The type of the assemblage.
   *
   * @throws {InvalidAssemblageType}
   * @return {Assemblage}
   */
  _findAssemblage(id, type) {
    if (!this._assemblages[type]) throw new InvalidAssemblageType(`Error: Assemblage type ${type} is not valid.`);
  }

  /**
   * Attaches a component to an assemblage with a matching id.
   * @private
   * @param {number} id - The id of the parent entity.
   * @param {object} component -
   *
   * @throws {AssemblageNotFound}
   */
  _attachComponentToAssemblage(id, type, state) {
    if (!this._assemblages[id]) throw new AssemblageNotFound(`Error: Assemblage id ${id} does not exist.`);
  }

  /**
   * Detaches a component from an assemblage with a matching id.
   * @private
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of the component.
   *
   * @throws {AssemblageNotFound}
   * @throws {ComponentNotFound}
   */
  _detachComponentFromAssemblage(id, type) {
    if (!this._assemblages[id]) throw new AssemblageNotFound(`Error: Assemblage id ${id} does not exist.`);
  }

  /**
   * Updates a component for an assemblage with a matching id.
   * @public
   * @param {number} id - The id of the parent entity.
   * @param {number} type - The type of the component.
   * @param {object} state - The state of the component.
   *
   * @throws {AssemblageNotFound}
   * @throws {ComponentNotFound}
   */
  _updateComponentForAssemblage(id, type, state) {
    if (!this._assemblages[id]) throw AssemblageNotFound(`Error: Assemblage id ${id} does not exist.`);
  }

  /**
   * Gets the template for the specified assemblage type.
   * @private
   * @param {string} type - The type of assemblage.
   *
   * @return {object} The assemblage template.
   * @throws {AssemblageTemplateNotFound}
   */
  _getTemplate(type) {
    if (!this._templates[type]) throw InvalidAssemblageType(`Error: Assemblage type ${type} is not valid.`);
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @param {MessageService} messageService - The message service for the simulation.
   * @param {Array} templates - The component templates for the simulation.
   *
   * @return {AssemblageManager} - A new component manager instance.
   */
  static createInstance(messageService, templates) {
    templates = templates || [];
    return new AssemblageManager(messageService, templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default AssemblageManager;
