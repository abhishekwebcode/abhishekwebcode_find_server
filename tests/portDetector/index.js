const ports = require('../util').PORTS;
const detectPort = require('detect-port');

// check if all ports are available
const portDetector = async function() {
  try {
    for (let index in ports) {
      const port = ports[index];
      // it will raise an error if the port is not free
      await detectPort(port);
    }
    return true;
  } catch (_) {
    // return false if any port is blocked
    throw port;
  }
};

module.exports=portDetector;