////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * The number of milliseconds in a second.
 * @constant
 * @default
 * @type {number}
 */
const MILLISECONDS = 1000;

/**
 * The desired number of frames per second.
 * @constant
 * @default
 * @type {number}
 */
const FRAMES_PER_SECOND = 60;

/**
 * The desired length of a single frame.
 * @constant
 * @default
 * @type {number}
 */
const FRAME_DURATION = MILLISECONDS / FRAMES_PER_SECOND;

/**
 * The maximum number of frames to skip.
 * @constant
 * @default
 * @type {number}
 */
const MAX_FRAME_SKIP = 5;

/**
 * The maximum length of time to skip.
 * @constant
 * @default
 * @type {number}
 */
const MAX_SKIP_DURATION = MAX_FRAME_SKIP * FRAME_DURATION;

/**
 * @default
 * @enum {string}
 */
const COMMAND = {
  CREATE_ASSEMBLAGE: 'CREATE_ASSEMBLAGE',
  CREATE_COMPONENT: 'CREATE_COMPONENT',
  CREATE_ENTITY: 'CREATE_ENTITY',
  DESTROY_COMPONENT: 'DESTROY_COMPONENT',
  DESTROY_ENTITY: 'DESTROY_ENTITY',
  FIND_ASSEMBLAGE: 'FIND_ASSEMBLAGE',
  FIND_COMPONENT: 'FIND_COMPONENT',
  FIND_ENTITY: 'FIND_ENTITY',
  UPDATE_COMPONENT: 'UPDATE_COMPONENT'
};

/**
 * @default
 * @enum {string}
 */
const EVENT = {
  ASSEMBLAGE_CREATED: 'ASSEMBLAGE_CREATED',
  ASSEMBLAGE_FOUND: 'ASSEMBLAGE_FOUND',
  COMPONENT_CREATED: 'COMPONENT_CREATED',
  COMPONENT_DESTROYED: 'COMPONENT_DESTROYED',
  COMPONENT_FOUND: 'COMPONENT_FOUND',
  COMPONENT_UPDATED: 'COMPONENT_UPDATED',
  ENTITY_CREATED: 'ENTITY_CREATED',
  ENTITY_DESTROYED: 'ENTITY_DESTROYED',
  ENTITY_FOUND: 'ENTITY_FOUND'
};

/**
 * @default
 * @enum {string}
 */
const QUERY = {
  GET_ASSEMBLAGE: 'GET_ASSEMBLAGE',
  GET_COMPONENT: 'GET_COMPONENT'
};

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {COMMAND, EVENT, QUERY, MILLISECONDS, FRAME_DURATION, MAX_FRAME_SKIP, MAX_SKIP_DURATION};
