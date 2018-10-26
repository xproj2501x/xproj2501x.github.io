/**
 * Worker Service
 * ===
 *
 * @module workerService
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import UUID from '../../utilities/uuid';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * WorkerService
 * @class
 */
class WorkerService {

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
   * The message service for the simulation.
   * @private
   * @type {MessageService}
   */
  _messageService;

  /**
   * A collection of scripts that can be run by workers.
   * @private
   * @type {object}
   */
  _scripts;

  /**
   * A collection of workers.
   * @private
   * @type {object}
   */
  _workers;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * WorkerService
   * @constructor
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   */
  constructor(logService, messageService) {
    this._logger = logService.registerLogger(this.constructor.name);
    this._messageService = messageService;
    this._scripts = {};
    this._workers = {};
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Registers a new worker with the service
   * @param {string} id - The id of the worker.
   * @param {string} script - The name of the script for the worker to run.
   */
  registerScript(id, script) {
    this._scripts[id] = script;
  }

  /**
   * Starts the script with the specified id on worker thread.
   * @param {string} id - The id of the script for the worker to run.
   */
  startWorker(id) {
    const ID = UUID.create();
    const SCRIPT = this._scripts[id];
    const WORKER = new Worker(SCRIPT);
  }

  /**
   * Closes a worker thread with the specified id.
   * @param {string} id - The id of the worker.
   */
  closeWorker(id) {
    const WORKER = this._workers[id];

    WORKER.terminate();
    delete this._workers[id];
  }
  ////////////////////////////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////////
  // Static Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   * @param {LogService} logService - The log service for the simulation.
   * @param {MessageService} messageService - The message service for the simulation.
   *
   * @return {WorkerService} - A new worker service instance.
   */
  static createInstance(logService, messageService) {
    return new WorkerService(logService, messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default WorkerService;
