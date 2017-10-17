
module.exports = function(plugin, change) {
    return plugin.onKeyDown(
        {
            key: 'Enter',
            metaKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );
};
