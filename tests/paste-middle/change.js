export default function(plugin, change) {
    return plugin.onPaste(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        {
            type: 'text',
            text: 'Yes\nNo\nQuestion?'
        },
        change
    );
};
