/**
 * Exceptions
 * ===
 *
 * @module engine.Exceptions
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import ExtendableError from '../common/utilities/extendable-error';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * AssemblageNotFound
 * @class
 * @extends ExtendableError
 */
class AssemblageNotFound extends ExtendableError {}

/**
 * ComponentNotFound
 * @class
 * @extends ExtendableError
 */
class ComponentNotFound extends ExtendableError {}

/**
 * EntityLimitExceeded
 * @class
 * @extends ExtendableError
 */
class EntityLimitExceeded extends ExtendableError { }

/**
 * EntityNotFound
 * @class
 * @extends ExtendableError
 */
class EntityNotFound extends ExtendableError {}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {AssemblageNotFound, ComponentNotFound, EntityLimitExceeded, EntityNotFound};