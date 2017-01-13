const assert = require('assert');

module.exports = function(plugin, state) {
    const newState = plugin.transforms.unwrapCodeBlock(
        state.transform(),
        'paragraph'
    )
    .apply();

    assert.equal(newState.startOffset, 5);

    return newState;
};
