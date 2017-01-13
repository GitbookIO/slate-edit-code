const assert = require('assert');

module.exports = function(plugin, state) {

    assert.equal(plugin.utils.isInCodeBlock(state), true);

    return state;
};
