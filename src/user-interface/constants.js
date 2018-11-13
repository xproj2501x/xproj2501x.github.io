/**
 * Constants
 * ===
 *
 * @module userInterface.Constants
 */

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const COMMAND = {
  PUSH_SCREEN: 0,
  POP_SCREEN: 1
};

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

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {COMMAND, MAX_SKIP_DURATION, FRAME_DURATION};
