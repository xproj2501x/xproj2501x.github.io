/**
 * Scheduler
 * ===
 *
 * @module engine.Scheduler
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import EventQueue from './event-queue';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Scheduler
 * @class
 */
class Scheduler {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {EventQueue}
   */
  _eventQueue;

  /**
   * @private
   * @type {array}
   */
  _repeatQueue;

  /**
   * @private
   * @type {object}
   */
  _currentEvent;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _eventQueue.time
   * @public
   * @readonly
   *
   * @return {number}
   */
  get time() {
    return this._eventQueue.time;
  }

  /**
   * Scheduler
   * @constructor
   */
  constructor() {
    this._eventQueue = EventQueue.createInstance();
    this._repeatQueue = [];
    this._currentEvent = null;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  clear() {
    this._eventQueue.clear();
    this._repeatQueue = [];
    this._currentEvent = null;
  }

  dequeue() {
    this._currentEvent = this._eventQueue.dequeue();
    return this._currentEvent;
  }

  /**
   * Enqueues an event in the event queue
   * @param {object} event
   * @param {number} time -
   * @param {boolean} repeat
   */
  enqueue(event, time, repeat) {
    this._eventQueue.enqueue(event, time);
    if (repeat) {
      this._repeatQueue.push(event);
    }
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
   *
   * @return {Scheduler} - A new scheduler
   * instance.
   */
  static createInstance() {
    return new Scheduler();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Scheduler;