var BigNumber = require('bignumber.js');

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN
});


module.exports = BigNumber;