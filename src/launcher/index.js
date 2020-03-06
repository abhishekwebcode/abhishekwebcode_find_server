const Q = require('q');
const request = require('../request');

/**
 * Launches the requests in parallel
 * @param {Array} serverList The list of servers
 * @return {Array<Promise>}
 */
const launcher = function (serverList) {
    // launching all request asynchronously in parallel with negligible time difference
    const axiosList = [];
    serverList.forEach((serverObject,index)=>{
        axiosList.push(request(index,serverObject.url))
    });
    // wrap the promises to promise all library,
    // this is done instead of Promise.all as we don't want rejected promises
    // to override other server requests
    return Q.allSettled(axiosList);
};
module.exports=launcher;