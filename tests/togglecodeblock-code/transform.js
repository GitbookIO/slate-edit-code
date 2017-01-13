
module.exports = function(plugin, state) {
    return plugin.transforms.toggleCodeBlock(
        state.transform(),
        'paragraph'
    )
    .apply();
};
