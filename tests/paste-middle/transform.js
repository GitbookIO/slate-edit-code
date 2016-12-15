
module.exports = function(plugin, state) {
    return plugin.onPaste(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        {
            type: 'text',
            text: 'Yes\nNo\nQuestion?'
        },
        state
    );
};
