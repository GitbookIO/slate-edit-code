
module.exports = function(plugin, state) {
    const newState = plugin.transforms.unwrapCodeBlock(
        state.transform(),
        'paragraph'
    )
    .apply();

    return newState;
};
