const assert = require('assert');

module.exports = function(plugin, state) {
    const newState = plugin.transforms.wrapCodeBlock(
        state.transform()
    )
    .apply();

    assert.equal(newState.startOffset, 5);

    return newState;
};
