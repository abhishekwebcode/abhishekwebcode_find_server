const lodash = require('lodash');

// this is the testing configuration
const util = {
  MAXSTATUSCODE: 510,
  MINSTATUSCODE: 200,
  PORTS : [9021,9022,9023,9024,9025,9026,9027,9028,9029],
  getRandomStatusCode:() => lodash.random(util.MINSTATUSCODE,util.MAXSTATUSCODE)
};

module.exports=util;