
module.exports = function(plugin, change) {
    return plugin.onKeyDown(
        {
            key: 'a',
            metaKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );
};
