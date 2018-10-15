/**
 * System
 * ===
 *
 * @module system
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {MESSAGE} from './constants';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * System
 * @interface
 */
class System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * A collection of assemblages used by the simulation.
   * @protected
   * @type {Array}
   */
  _assemblages;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * System
   * @constructor
   * @param {MessageService} messageService - The message service for the simulation.
   */
  constructor(messageService) {
    this._messageService = messageService;
    this._assemblages = [];
    this._messageService.subscribe(MESSAGE.COMPONENT_CREATED, (event) => this.onComponentCreated(event));
    this._messageService.subscribe(MESSAGE.COMPONENT_DESTROYED, (event) => this.onComponentDestroyed(event));
    this._messageService.subscribe(MESSAGE.COMPONENT_UPDATED, (event) => this.onComponentUpdated(event));
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Update routine for the system.
   * @public
   * @abstract
   * @param {number} delta - The time elapsed since the last update.
   */
  update(delta) {
    throw Error(`Error: Update called from System base class`);
  }

  /**
   * Message handler for the on assemblage created event.
   * @public
   * @abstract
   * @param {object} event - The on assemblage created event message.
   */
  onAssemblageCreated(event) {
    throw Error(`Error: OnAssemblageCreated called from System base class`);
  }

  /**
   * Message handler for the on component created event.
   * @public
   * @abstract
   * @param {object} event - The on component created event message.
   */
  onComponentCreated(event) {
    throw Error(`Error: OnComponentCreated called from System base class`);
  }

  /**
   * Message handler for the on component destroyed event.
   * @public
   * @abstract
   * @param {object} event - The on component destroyed event message.
   */
  onComponentDestroyed(event) {
    throw Error(`Error: OnComponentDestroyed called from System base class`);
  }

  /**
   * Message handler for the on component updated event.
   * @public
   * @abstract
   * @param {object} event - The on component updated event message.
   */
  onComponentUpdated(event) {
    throw Error(`Error: OnComponentEvent called from System base class`);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default System;
