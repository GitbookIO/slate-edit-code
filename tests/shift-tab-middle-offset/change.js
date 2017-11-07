export default function(plugin, change) {
    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'tab', isShift: true },
        change
    );
};
