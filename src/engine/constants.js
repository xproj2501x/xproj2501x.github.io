////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const MILLISECONDS = 1000;

const FRAME_DURATION = MILLISECONDS / 30;

const MAX_FRAME_SKIP = FRAME_DURATION * 5;

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
export {MESSAGE, MAX_COMPONENTS, MAX_ENTITIES, MILLISECONDS, FRAME_DURATION, MAX_FRAME_SKIP};