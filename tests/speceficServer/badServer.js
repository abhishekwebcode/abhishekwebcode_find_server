const badServerPort = 9011;
const badServerStatus = 400;
const portDetector = require('../portDetector');
const serverMaker = require('../mockServer/createServer');
const serverUrl = `http://localhost:${badServerPort}`;

// returns a server with status code of 400
const createServer = async function() {
  // check if port is available
  await portDetector(badServerPort);
  return {
    server: await serverMaker(badServerPort, badServerStatus),
    url: serverUrl,
    priority: Math.floor( Math.random() *10 )+7,
  };
};
module.exports = createServer;