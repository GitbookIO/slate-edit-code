
module.exports = function(plugin, change) {
    return plugin.onPaste(
        {
            dataTransfer: {
                items: ['text'],
                getData: () => 'Yes\nNo\nQuestion?'
            },
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );
};
