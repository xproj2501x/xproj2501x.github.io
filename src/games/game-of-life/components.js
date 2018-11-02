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
  SPRITE: 3
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
    color: 'string'
  }
];

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {COMPONENT_TEMPLATES, COMPONENT_TYPE};