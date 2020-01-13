/**
 * Movement System
 * ===
 *
 * @module games.Targeting.Systems.MovementSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import System from '../../../ecs/system';
import Vector2 from '../../../common/math/vector2';
import {COMPONENT} from '../components';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const DATA = {
  resources: [],
  components: [
    COMPONENT.POSITION,
    COMPONENT.VELOCITY,
    COMPONENT.ACCELERATION,
    COMPONENT.TARGET
  ]
};

const MAX_SPEED = 8;
const MAX_FORCE = 0.2;

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * MovementSystem
 * @class
 * @extends System
 */
class MovementSystem extends System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * MovementSystem
   * @constructor
   */
  constructor() {
    super(DATA);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Update routine for the system.
   * @public
   * @param {object} systemData -
   *
   * @return {object[]}
   */
  update(systemData) {
    const RESULTS = [];

    systemData.entities.forEach((entity) => {
      const ACCELERATION = Vector2.createInstance(entity[COMPONENT.ACCELERATION].x, entity[COMPONENT.ACCELERATION].y);
      const VELOCITY = Vector2.createInstance(entity[COMPONENT.VELOCITY].x, entity[COMPONENT.VELOCITY].y);
      const POSITION = Vector2.createInstance(entity[COMPONENT.POSITION].x, entity[COMPONENT.POSITION].y);
      const TARGET = Vector2.createInstance(entity[COMPONENT.TARGET].x, entity[COMPONENT.TARGET].y);
      const DESIRED = Vector2.createInstance(TARGET.x, TARGET.y);

      DESIRED.subtract(POSITION);
      DESIRED.setMagnitude(MAX_SPEED);
      const STEERING = Vector2.createInstance(DESIRED.x, DESIRED.y);

      STEERING.subtract(VELOCITY);
      STEERING.limit(MAX_FORCE);
      ACCELERATION.add(STEERING);
      VELOCITY.add(ACCELERATION);
      VELOCITY.limit(MAX_SPEED);
      POSITION.add(VELOCITY);
      ACCELERATION.multiply(0);
      RESULTS.push({
        action: 'update',
        id: entity.id,
        type: COMPONENT.POSITION,
        state: {
          x: POSITION.x,
          y: POSITION.y,
        }
      });
    });
    return RESULTS;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   *
   * @return {MovementSystem} A new Movement system instance.
   */
  static createInstance() {
    return new MovementSystem();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default MovementSystem;
