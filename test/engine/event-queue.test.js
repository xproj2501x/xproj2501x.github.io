////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import {expect} from 'chai';
import {mock} from 'sinon';
import EventQueue from '../../src/engine/event-queue';
import Queue from '../../src/common/data-structures/queue';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const LOG_SERVICE = {
  registerLogger: function(name) {}
};

const MESSAGE_SERVICE = mock({

});

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('EventQueue', () => {
  let eventQueue;

  describe('#ctor', () => {
    eventQueue = new EventQueue(LOG_SERVICE, MESSAGE_SERVICE);

    it('should be an instance of EventQueue', () => {
      expect(eventQueue instanceof EventQueue).to.equal(true);
    });

    it('should have a time of 0', () => {
      expect(eventQueue.time).to.equal(0);
    });

    it('should have a size of 0', () => {
      expect(eventQueue.size).to.equal(0);
    });
  });

  describe('#enqueue', () => {
    eventQueue = new EventQueue(LOG_SERVICE, MESSAGE_SERVICE);

    it('should add an event to the queue', () => {
      eventQueue.enqueue('foo', 1);
    });
  });

  describe('#clear', () => {

  });

  describe('#findEventTime', () => {

  });

  describe('#dequeue', () => {
    beforeEach(() => {
      eventQueue = new EventQueue(LOG_SERVICE, MESSAGE_SERVICE);
    });

    it('should return null when no events are available', () => {
      expect(eventQueue.dequeue()).to.equal(null);
    });

    it('should return the next event in the queue when available', () => {
      const EVENT = 'foo';

      eventQueue.enqueue(EVENT, 1);
      expect(eventQueue.dequeue()).to.equal(EVENT);
    });

    it('should remove returned events', () => {
      const EVENT = 'foo';

      eventQueue.enqueue(EVENT, 1);
      eventQueue.dequeue();
      expect(eventQueue.size).to.equal(0);
    });
  });

  describe('#removeEvent', () => {

  });

  describe('#createInstance', () => {

  });
});
