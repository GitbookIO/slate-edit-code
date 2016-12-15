
module.exports = function(plugin, state) {
    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'enter', isMod: true },
        state
    );
};
