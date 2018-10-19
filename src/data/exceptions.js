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
 * AssemblageAlreadyExists
 * @class
 * @extends ExtendableError
 */
class AssemblageAlreadyExists extends ExtendableError {}

/**
 * AssemblageNotFound
 * @class
 * @extends ExtendableError
 */
class AssemblageNotFound extends ExtendableError {}

/**
 * AssemblageTemplateNotFound
 * @class
 * @extends ExtendableError
 */
class AssemblageTemplateNotFound extends ExtendableError {}

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
 * InvalidAssemblageState
 * @class
 * @extends ExtendableError
 */
class InvalidAssemblageState extends ExtendableError {}

/**
 * InvalidAssemblageType
 * @class
 * @extends ExtendableError
 */
class InvalidAssemblageType extends ExtendableError {}

/**
 * InvalidComponentState
 * @class
 * @extends ExtendableError
 */
class InvalidComponentState extends ExtendableError {}

/**
 * InvalidComponentType
 * @class
 * @extends ExtendableError
 */
class InvalidComponentType extends ExtendableError {}

/**
 * InvalidEntityId
 * @class
 * @extends ExtendableError
 */
class InvalidEntityId extends ExtendableError {}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {AssemblageAlreadyExists, AssemblageNotFound, AssemblageTemplateNotFound, ComponentAlreadyExists,
  ComponentNotFound, ComponentTemplateNotFound, EntityLimitExceeded, EntityNotFound, InvalidAssemblageState,
  InvalidAssemblageType, InvalidComponentState, InvalidComponentType, InvalidEntityId};
