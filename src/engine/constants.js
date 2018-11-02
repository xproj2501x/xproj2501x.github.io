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

const QUERY = {
  GET_ASSEMBLAGE: 'GET_ASSEMBLAGE',
  GET_COMPONENT: 'GET_COMPONENT'
};

/**
 * Enum for event message subjects.
 * @enum {number}
 */
const MESSAGE = {
  CREATE_ASSEMBLAGE: 0,
  CREATE_COMPONENT: 1,
  CREATE_ENTITY: 2,
  DESTROY_COMPONENT: 3,
  DESTROY_ENTITY: 4,
  UPDATE_COMPONENT: 5,
  ASSEMBLAGE_CREATED: 6,
  COMPONENT_CREATED: 7,
  COMPONENT_DESTROYED: 8,
  COMPONENT_UPDATED: 9,
  ENTITY_CREATED: 10,
  ENTITY_DESTROYED: 11,
};

/**
 * The maximum number of entities allowed.
 * @constant
 * @type {number}
 */
const MAX_ENTITIES = 1024;

/**
 * The maximum number of components allowed.
 * @constant
 * @type {number}
 */
const MAX_COMPONENTS = 128;


////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {COMMAND, EVENT, QUERY, MESSAGE, MAX_COMPONENTS, MAX_ENTITIES, MILLISECONDS, FRAMES_PER_SECOND, FRAME_DURATION,
  MAX_FRAME_SKIP, MAX_SKIP_DURATION};
