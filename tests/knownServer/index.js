const detectPort = require('../portDetector');
const createServer = require('../mockServer/createServer');
const ports = [9050, 9051, 9052, 9053];
const chalk = require('chalk');
const priorities = [3, 5, 6, 2];
const statusCodes = [201, 430, 340, 230];
/**
 * Create servers with known configuration
 */
const getKnownServers = async function() {
  try {
    for (let index in ports) {
      await detectPort(ports[index]);
    }
    const config = [];
    await Promise.all(
      ports.map(async function(port, index) {
        config.push({
          server: await createServer(port, statusCodes[index]),
          url: `http://localhost:${port}`,
          port,
          priority: priorities[index],
        });
      }),
    );
    return config;
  } catch (e) {
    console.log(chalk.red('Port ' + e + ' is not available, please release the port for testing to continue'));
    return false;
  }
};

module.exports = getKnownServers;