
module.exports = function(plugin, state) {
    return plugin.transforms.wrapCodeBlock(
        state.transform()
    )
    .apply();
};
