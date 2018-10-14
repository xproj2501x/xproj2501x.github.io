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
 * ComponentAlreadyExists
 * @class
 * @extends ExtendableError
 */
class ComponentAlreadyExists extends ExtendableError {}

/**
 * ComponentNotFound
 * @class
 * @extends ExtendableError
 */
class ComponentNotFound extends ExtendableError {}

/**
 * ComponentTemplateNotFound
 * @class
 * @extends ExtendableError
 */
class ComponentTemplateNotFound extends ExtendableError {}

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

/**
 * @class
 * @extends ExtendableError
 */
class InvalidComponentState extends ExtendableError {}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {AssemblageNotFound, ComponentAlreadyExists, ComponentNotFound, ComponentTemplateNotFound, EntityLimitExceeded,
  EntityNotFound, InvalidComponentState};