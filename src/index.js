const launcher = require('./launcher');
const serverSorterHelper = require('./sorter');

/**
 * Since our function is async, it returns a promise by default
 * @param {Array} serverList , list of servers to operate on
 * @returns {Promise<Object>}
 */
const findServer = async function(serverList) {
  // check for serverList length
  if (serverList.length === 0) {
    throw Error('No servers provided');
  }
  // launch all requests in parallel
  const promiseList = await launcher(serverList);
  // check for succeeded requests
  const resolved = promiseList.filter(e => e.state === 'fulfilled');
  if (resolved.length === 0) {
    throw new Error('No server is online');
  }
  // get the resolved servers by their indexes
  const resolvedServers = [];
  resolved.forEach(serverResult =>
    resolvedServers.push(serverList[serverResult.value]),
  );
  // return the lowest priority server
  const serverMap = serverSorterHelper(resolvedServers);
  return serverMap[0];
};

module.exports = { findServer };
