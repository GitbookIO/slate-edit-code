
module.exports = function(plugin, state) {
    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'a', isMod: true },
        state
    );
};
