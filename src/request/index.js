/**
 * @param {Number} index The index of this request, to uniquely identify it
 * @param {string} url Url of the server
 * @param {Number} priority Priority of the server
 * @return Result Promise<{index,valid}>
 */
const axios = require('axios').default;
const constants = require('../constants');
const utils = require('../util');

const requester = async function (index,url) {
    try {
        // make the server request
        const request = await axios({
            method: constants.method,
            url,
            timeout: constants.timeout
        });
        // return the result by determining status code,
        // or throw the object as error in case status code is not within
        // the success range
        if (utils.isValidRequest(request.status)) {
            return index;
        } else {
            throw index;
        }
    }
    catch (e) {
        // if axios rejects the promise, send the error as this function is async so it behaves pseudo synchronously
        throw index
    }
};
module.exports=requester;