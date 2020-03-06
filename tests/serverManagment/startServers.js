const util = require('../util');
const mockServer = require('../mockServer');
/**
 * Starts the servers for testing
 */
const startServers = async function() {
  const serverConfig = [];
  // 9009 is reserved as a good server, used to ensure the list always has one good server with code 200
  util.PORTS.forEach(port=>{
    if (port===9029) return;
    serverConfig.push({port,statusCode:util.getRandomStatusCode()})
  });
  serverConfig.push({port:9029,statusCode: 200});
  return {servers:await mockServer(serverConfig),serverConfig}
};
module.exports=startServers;