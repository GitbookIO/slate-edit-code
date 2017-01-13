
module.exports = function(plugin, state) {
    return plugin.transforms.unwrapCodeBlock(
        state.transform(),
        'paragraph'
    )
    .apply();
};
