/**
 * Stops a server after testing
 * @param server The server to stop
 */
const serverTerminator = function(server) {
  return new Promise((resolve, reject) => {
    server.stop(function() {
      resolve(true);
    })
  });
};
/**
 * Stop the servers
 * @param serverList {Array} the list of servers
 * @return {Promise<Array>}
 */
const stopServers = async function(serverList) {
  const stopPromises = serverList.map(server=>serverTerminator(server));
  return Promise.all(stopPromises);
};
module.exports=stopServers;