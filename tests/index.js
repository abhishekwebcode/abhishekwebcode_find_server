// findServer method from findServer module
const findServer = require('../index').findServer;
const testTimeout = 10 * 1000; // 10 seconds
const expect = require('chai').expect;
const { describe, it, before, after } = require('mocha');
const launcher = require('../src/launcher/index');
// known servers with pre-defined configuration for testing
const knownServers = require('./knownServer');

// set up the servers to start testing
const initializer = require('./initialiseTest');
let servers, serverConfig, knownServerArray;
const serverList = [];
// stop the servers
const serverStopper = require('./serverManagment/stopServers');

// for specific server tests
const goodServerMaker = require('./speceficServer/goodServer');
const badServerMaker = require('./speceficServer/badServer');

// these tests will run using local server as these tests are network independent and only
// test the main functionality of the code
describe('findServer', async function() {
  // start the servers
  before(async () => {
    // initialise known servers
    knownServerArray = await knownServers();
    // initialise other random servers
    const serverResult = await initializer();
    servers = serverResult.servers;
    serverConfig = serverResult.serverConfig;
    if (!serverResult) {
      return new Error('Error during server startup');
    }
    serverConfig.forEach(config => {
      serverList.push({ url: `http://localhost:${config.port}`, port: config.port, statusCode: config.statusCode });
    });
    return true;
  });
  // stop the servers
  after(async function() {
    await serverStopper(servers);
    return true;
  });
  // initialise the mock servers
  describe('basic tests', function() {
    // check for basic requesting ability
    it('should successfully request servers', async function() {
      const { server, url, priority } = await goodServerMaker();
      const result = await findServer([{ url, priority }]);
      server.stop(() => {
      });
      expect(result.priority === priority).to.be.true;
    }).timeout(testTimeout);
    // check for sorting logic
    it('should sort servers correctly', async function() {
      // always available server list
      const bestServer = await findServer(knownServerArray);
      expect(bestServer.priority === 2).to.be.true;
      expect(bestServer.url === 'http://localhost:9053').to.be.true;
    }).timeout(testTimeout);
    // check for status code validation
    it('should check status codes correctly', async function() {
      // checks via random servers, not the known ones
      // launch all requests in parallel
      const promiseList = await launcher(serverList);
      // check for succeeded and failed requests
      const resolved = promiseList.filter(e => e.state === 'fulfilled');
      const rejected = promiseList.filter(e => e.state !== 'fulfilled');
      // check for correct status codes
      // check if our library returns the responses of all the servers in serverList
      expect(resolved.length + rejected.length === serverList.length).to.be.true;
      // check if all resolved servers are as expected by statusCode
      resolved.forEach(resolvedObject => {
        const resolvedServer = serverList[resolvedObject.value];
        const shouldResolveStatus = resolvedServer.statusCode;
        // check if it is working as per assignment documentation
        expect(shouldResolveStatus < 300).to.be.true;
      });
      // check if all rejected servers compulsorily had statusCode>299
      rejected.forEach(rejectedObject => {
        const rejectedServer = serverList[rejectedObject.reason];
        const shouldBeRejectedStatus = rejectedServer.statusCode;
        // check if our sorting is correct for rejection
        expect(shouldBeRejectedStatus > 299).to.be.true;
      });
    }).timeout(testTimeout);
  });
  describe('edge cases', function() {
    // check if module rejects for empty server-list
    it('should reject for no server(s)', async function() {
      try {
        const noServerResult = await findServer([]);
      } catch (e) {
        return true;
      }
      return new Error('No rejection for empty server array');
    }).timeout(testTimeout);
    // check for rejection if no server is online
    it('should reject if no server is online', async function() {
      const { server, url, priority } = await badServerMaker();
      try {
        const result = await findServer([{ url, priority }]);
      } catch (e) {
        return true;
      } finally {
        server.stop(() => {
        });
      }
      return new Error('No rejection for bad server');
    }).timeout(testTimeout);
  });
  // full test to check overall module
  describe('full test', function() {
    it('should work as expected for random servers', async function() {
      // it just checks if the module works fine by using system testing,
      // it ensures working of the module is without error,individual logical parts are
      // verified by unit tests
      try {
        await findServer(serverList);
      } catch (e) {
        throw new Error('Full test was unsuccessful, please check integration of the findServer\'s components');
      }
      return true;
    }).timeout(testTimeout);
  });
});
