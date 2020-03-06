const ServerMock = require("mock-http-server");
const mockConfig = require('./config');

/**
 * create a mock server with the parameters and return it
 * @param port {Number}
 * @param statusCode {Number}
 * @return {Promise<ServerMock>}
 */
const createMockServer = function(port,statusCode) {
  return new Promise((resolve) => {
    // start mock server
    const server = new ServerMock({
      host:mockConfig.host,
      port
    },null);
    // create request handler to send status code for mock server
    server.on({
      method: mockConfig.method,
      path: mockConfig.path,
      reply: {
        status:  statusCode
      }
    });
    // start mock server
    server.start(function() {
      // return server instance, will be used to stop the server
      resolve(server)
    });
  });
};

module.exports=createMockServer;
