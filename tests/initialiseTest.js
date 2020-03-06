const chalk = require('chalk');
const startServers = require('./serverManagment/startServers');
const portDetector = require('./portDetector');
/**
 * Initialise servers to start mocha testing
 * @return {Promise<{servers: [], serverConfig: []}|boolean>}
 */
const initialiseTests = async function() {
  let serverResult;
  try {
    // first we check if ports are open, if not then return error
    await portDetector();
    serverResult = await startServers();
  }
  catch (port) {
    // give helpful error message for the blocked port
    console.log(chalk.red(`Sorry ${port} is not available, please kill the process blocking this port and try again`));
    return false;
  }
  return serverResult;
};

module.exports=initialiseTests;
