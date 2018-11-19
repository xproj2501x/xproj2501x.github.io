/**
 * Event Queue
 * ===
 *
 * @module engine.EventQueue
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * EventQueue
 * @class
 */
class EventQueue {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @private
   * @type {number}
   */
  _time;

  /**
   * @private
   * @type {array}
   */
  _eventTimes;

  /**
   * @private
   * @type {array}
   */
  _events;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _events.length
   * @public
   * @readonly
   *
   * @return {number}
   */
  get size() {
    return this._events.length;
  }

  /**
   * Get _time
   * @public
   * @readonly
   *
   * @return {number}
   */
  get time() {
    return this._time;
  }

  /**
   * EventQueue
   * @constructor
   */
  constructor() {
    this._time = 0;
    this._eventTimes = [];
    this._events = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Clears the queue.
   * @public
   */
  clear() {
    this._eventTimes = [];
    this._events = [];
  }

  /**
   * Dequeues the next event from the front of the queue.
   *
   * @return {?object} The next event in the queue.
   */
  dequeue() {
    if (!this._events.length) {return null;}
    const TIME = this._eventTimes.splice(0, 1)[0];

    if (TIME > 0) {
      this._time += TIME;
      for (let idx = 0; idx < this._eventTimes.length; idx++) {
        this._eventTimes[idx] -= TIME;
      }
    }
    return this._events.splice(0, 1)[0];
  }

  /**
   * Enqueues an event based on its time.
   * @public
   * @param {object} event - The event to add to the queue.
   */
  enqueue(event, time) {
    let index = this._events.length;

    for (let idx = 0; idx < this._events.length; idx++) {
      if (this._eventTimes > time) {
        index = idx;
        break;
      }
    }
    this._events.splice(index, 0, event);
    this._eventTimes.splice(index, 0, time);
  }

  /**
   * Finds the time a specified event should occur on..
   * @param {object} event - The event to find the time for.
   *
   * @return {?number} The time the event should occur
   */
  findEventTime(event) {
    let index = this._events.indexOf(event);

    if (index === -1) {return null;}
    return this._eventTimes[index];
  }

  /**
   * Removes an event from the queue.
   * @param {object} event - The event to remove from the queue.
   *
   * @return {boolean}
   */
  removeEvent(event) {
    let index = this._events.indexOf(event);

    if (index === -1) {return false;}
    this._events.splice(index, 1);
    this._eventTimes.splice(index, 1);
    return true;
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
   * @return {EventQueue} A new event queue instance.
   */
  static createInstance() {
    return new EventQueue();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default EventQueue;
