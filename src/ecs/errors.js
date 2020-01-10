/**
 * Errors
 * ===
 *
 * @module ecs.Errors
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import ExtendableError from '../common/utilities/extendable-error';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * ComponentAlreadyExistsError
 * @class
 * @extends ExtendableError
 */
class ComponentAlreadyExistsError extends ExtendableError {}

/**
 * ComponentNotFoundError
 * @class
 * @extends ExtendableError
 */
class ComponentNotFoundError extends ExtendableError {}

/**
 * ComponentAlreadyRegisteredError
 * @class
 * @extends ExtendableError
 */
class ComponentTypeAlreadyRegisteredError extends ExtendableError {}

/**
 * ComponentTypeNotFoundError
 * @class
 * @extends ExtendableError
 */
class ComponentTypeNotFoundError extends ExtendableError {}

/**
 * EntityNotFoundError
 * @class
 * @extends ExtendableError
 */
class EntityNotFoundError extends ExtendableError {}

/**
 * InvalidComponentStateError
 * @class
 * @extends ExtendableError
 */
class InvalidComponentStateError extends ExtendableError {}

/**
 * InvalidComponentTypeError
 * @class
 * @extends ExtendableError
 */
class InvalidComponentTypeError extends ExtendableError {}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {ComponentAlreadyExistsError, ComponentNotFoundError, ComponentTypeAlreadyRegisteredError,
  ComponentTypeNotFoundError, EntityNotFoundError, InvalidComponentStateError, InvalidComponentTypeError};
