////////////////////////////////////////////////////////////////////////////////
// Import
////////////////////////////////////////////////////////////////////////////////
import {MONTH_LENGTH} from './constants';
import * as crops from './crops.json';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
let result = [];

// The general formula is: Minimum Gold per Day = ((Max Harvests × Sell Price per Harvest) − Seed Price) / Growing Days
// Growing Days = Days to Maturity + ((Max Harvests − 1) × Days to Regrow)

crops.forEach((crop) => {
  let growLength = 0;
  let maxHarvests = 1;

  for (const NAME in crop.seasons) {
    if (crop.seasons.hasOwnProperty(NAME)) {
      if (crop.seasons[NAME]) {
        growLength += MONTH_LENGTH;
      }
    }
  }
  if (crop.regrow) {
    maxHarvests += Math.floor((growLength - crop.harvest) / crop.regrow);
  }
  let growTime = (crop.harvest + 1) + ((maxHarvests - 1) * crop.regrow);
  let profitPerDay = ((maxHarvests * (crop.salePrice.base * crop.yield)) - crop.cost) / growTime;

  result.push({
    name: crop.name,
    growTime: growTime,
    harvests: maxHarvests,
    profitPerDay: profitPerDay
  });
});

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default result;
