
module.exports = function(plugin, change) {
    return plugin.onKeyDown(
        {
            key: 'Enter',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );
};
