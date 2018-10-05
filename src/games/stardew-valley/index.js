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
  let maxHarvests = 1;
  let availableTime = 0;
  let growLength = crop.harvest + 1;

  for (const NAME in crop.seasons) {
    if (crop.seasons.hasOwnProperty(NAME)) {
      if (crop.seasons[NAME]) availableTime += MONTH_LENGTH;
    }
  }
  if (crop.regrow) {
    maxHarvests += Math.floor((availableTime - growLength) / crop.regrow);
  }
  let output = crop.yield * maxHarvests;
  let netIncome = output * crop.price;
  let grossIncome = netIncome - crop.cost;
  let profitPerDay = parseFloat(grossIncome / growLength).toFixed(2);

  result.push({
    name: crop.name,
    availableTime: availableTime,
    growLength: growLength,
    maxHarvests: maxHarvests,
    output: output,
    cost: crop.cost,
    netIncome: netIncome,
    grossIncome: grossIncome,
    profitPerDay: profitPerDay
  });
});

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default result;
