const lodash = require('lodash');

/**
 * Sort valid servers by priority
 * @param serverList {Array<Object>} the list of resolved servers
 */
const sorter=function(serverList) {
    return lodash.sortBy(serverList,'priority');
};
module.exports=sorter;