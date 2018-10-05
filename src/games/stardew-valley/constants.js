////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const MONTH_LENGTH = 28;

/**
 * @enum
 */
const ARTISAN_FLAG = {
  BEER: 0,
  CHEESE: 1,
  CLOTH: 2,
  COFFEE: 3,
  JELLY: 4,
  JUICE: 5,
  MAYONNAISE: 6,
  MEAD: 7,
  OIL: 8,
  PALE_ALE: 9,
  PICKLES: 10,
  WINE: 11
};

const SEASON_FLAG = {
  SPRING: 0,
  SUMMER: 1,
  FALL: 2,
  WINTER: 3
};

const CROP_TYPE = {
  FLOWER: 0,
  FRUIT: 1,
  VEGETABLE: 2
};

const MULTIPLIER = {
  SILVER: 1.25,
  GOLD: 1.5,
  IRIDIUM: 2
};

/**
 *
 * @enum
 */
const KEG_TIME = {
  BEER: 1750,
  COFFEE: 120,
  JUICE: 6000,
  MEAD: 0,
  PALE_ALE: 2250,
  WINE: 10000
};

/**
 *
 */
const CASK_TIME = {
  BEER: {
    SILVER: 7,
    GOLD: 7,
    IRIDIUM: 14
  },
  CHEESE: {
    SILVER: 3,
    GOLD: 4,
    IRIDIUM: 5
  },
  MEAD: {
    SILVER: 7,
    GOLD: 7,
    IRIDIUM: 14
  },
  PALE_ALE: {
    SILVER: 9,
    GOLD: 8,
    IRIDIUM: 17
  },
  WINE: {
    SILVER: 14,
    GOLD: 14,
    IRIDIUM: 28
  }
};

const PRESERVE_TIME = 4000;

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export {ARTISAN_FLAG, CASK_TIME, CROP_TYPE, KEG_TIME, MONTH_LENGTH, SEASON_FLAG, PRESERVE_TIME};
