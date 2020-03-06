const goodServerPort = 9010;
const goodServerStatus = 200;
const portDetector = require('../portDetector');
const serverMaker = require('../mockServer/createServer');
const serverUrl = `http://localhost:${goodServerPort}`;

// returns a server with status code of 200
const createServer = async function() {
  // check if port is available
  await portDetector(goodServerPort);
  return {
    server: await serverMaker(goodServerPort, goodServerStatus),
    url: serverUrl,
    priority: Math.floor( Math.random() *10 )+7,
  };
};
module.exports = createServer;