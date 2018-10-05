////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * The number of milliseconds in one second.
 * @constant
 * @type {number}
 */
const MILLISECONDS = 1000;

/**
 * The default number of frames per second.
 * @constant
 * @type {number}
 */
const FPS = 30;

/**
 * The default length of a single frame.
 * @constant
 * @type {number}
 */
const FRAME_DURATION = MILLISECONDS / FPS;

/**
 * The maximum number of frames that can be skipped.
 * @constant
 * @type {number}
 */
const MAX_FRAME_SKIP = FRAME_DURATION * 5;

const ENTITY_LIMIT = 255;

const COMPONENT_LIMIT = 64;

const COMMAND = {
  CREATE_COMPONENT: 0,
  CREATE_ENTITY: 1,
  CREATE_ASSEMBLAGE: 2,
  DESTROY_COMPONENT: 3,
  DESTROY_ENTITY: 4,
  UPDATE_COMPONENT: 5
};

const EVENT = {
  COMPONENT_CREATED: 0,
  COMPONENT_DESTROYED: 1,
  COMPONENT_UPDATED: 2,
  ENTITY_CREATED: 3,
  ENTITY_DESTROYED: 4
};

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {MILLISECONDS, FPS, FRAME_DURATION, MAX_FRAME_SKIP, ENTITY_LIMIT, COMPONENT_LIMIT, COMMAND, EVENT};
