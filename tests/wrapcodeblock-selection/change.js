const assert = require('assert');

module.exports = function(plugin, change) {
    plugin.changes.wrapCodeBlock(change);

    assert.equal(change.state.startOffset, 5);

    return change;
};
