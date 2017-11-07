
module.exports = function(plugin, change) {
    return plugin.onKeyDown(
        {
            key: 'Tab',
            shiftKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );
};
