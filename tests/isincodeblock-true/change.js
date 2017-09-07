const assert = require('assert');

module.exports = function(plugin, change) {

    assert.equal(plugin.utils.isInCodeBlock(change.state), true);

    return change;
};
