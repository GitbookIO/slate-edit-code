
module.exports = function(plugin, change) {
    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'enter', isMod: true },
        change
    );
};
