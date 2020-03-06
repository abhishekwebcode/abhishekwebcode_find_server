const serverGenerator = require('./createServer');

/**
 * generate the mock servers to start testing
 * @param mockServerConfig {Array<{port,statusCode}>}
 * @return {[]}
 */
const getMockServers = async function(mockServerConfig) {
  const mockServers = [];
  mockServerConfig.forEach(config=>{
    mockServers.push(serverGenerator(config.port,config.statusCode));
  });
  return await Promise.all(mockServers);
};

module.exports=getMockServers;