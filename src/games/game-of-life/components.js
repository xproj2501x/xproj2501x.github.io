////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * Component Type enum
 * @enum {string}
 */
const COMPONENT_TYPE = {
  TIME: 'TIME',
  POSITION: 'POSITION',
  RULE: 'RULE',
  SPRITE: 'SPRITE'
};

/**
 *
 * @type {{}}
 */
const COMPONENT_TEMPLATES = {
  TIME: {
    start: 'number',
    current: 'number',
    increment: 'number'
  },
  POSITION: {
    x: 'number',
    y: 'number'
  },
  RULE: {
    life: 'string',
    death: 'string',
    cycles: 'number'
  },
  SPRITE: {
    color: 'string'
  }
};

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {COMPONENT_TEMPLATES, COMPONENT_TYPE};