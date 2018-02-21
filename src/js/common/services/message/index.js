/**
 * Message Service
 * ===
 *
 * @module messageService
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
 * MessageService
 * @class
 */
class MessageService {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type {object}
   */
  _subscribers;
  _queue;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * MessageService
   * @constructor
   */
  constructor() {
    this._subscribers = {};
    this._queue = [];
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Adds a subscriber for the subject
   * @param {string} subject - the subject of the message
   * @param {function} subscriber - the subscriber to be added
   */
  subscribe(subject, subscriber) {
    if (!(this._subscribers[subject])) {
      this._subscribers[subject] = [];
    }
    const SUBSCRIBERS = this._subscribers[subject];

    SUBSCRIBERS.push(subscriber);
  }

  /**
   * Removes a subscriber for the subject
   * @param {string} subject - the subject of the message
   * @param {function} subscriber - the subscriber to be removed
   */
  unsubscribe(subject, subscriber) {
    if (subject in this._subscribers) {
      const SUBSCRIBERS = this._subscribers[subject];
      const INDEX = SUBSCRIBERS.indexOf(subscriber);
      const VALUE = -1;

      if (INDEX > VALUE) {
        SUBSCRIBERS.slice(INDEX, 0);
      }
    }
  }

  send(sender, recipient, subject, body) {

  }

  /**
   * Publishes a message to all subscribers
   * @param {object} message -
   */
  publish(message) {
    const SUBSCRIBERS = this._subscribers[message.subject];

    SUBSCRIBERS.forEach((subscriber) => {
      subscriber(message);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Verifies that the subscriber exists for the message
   * @private
   * @param {string} subject - the subject of the message
   * @param {string} subscriber - the message subscriber
   * @return {int}
   */
  _hasSubscriber(subject, subscriber) {
    const SUBSCRIBERS = this._subscribers[subject];

    return SUBSCRIBERS.indexOf(subscriber);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Static Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @return {MessageService}
   */
  static create() {
    return new MessageService();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default MessageService;
