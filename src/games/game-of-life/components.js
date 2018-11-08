////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * Component Type enum
 * @enum {number}
 */
const COMPONENT_TYPE = {
  TIME: 0,
  POSITION: 1,
  RULE: 2,
  STATE: 3,
  SPRITE: 4
};

/**
 *
 * @type {array}
 */
const COMPONENT_TEMPLATES = [
  {
    start: 'number',
    current: 'number',
    increment: 'number'
  },
  {
    x: 'number',
    y: 'number'
  },
  {
    life: 'string',
    death: 'string',
    cycles: 'number'
  },
  {
    on: 'boolean'
  },
  {
    color: 'string'
  }
];

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {COMPONENT_TEMPLATES, COMPONENT_TYPE};