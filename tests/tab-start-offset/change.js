export default function(plugin, change) {
    const { value } = change;
    const block = value.document.findDescendant(
        node => node.type == 'code_block'
    );

    change.collapseToStartOf(block).moveOffsetsTo(0);

    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {},
            key: 'Tab'
        },
        change,
        {}
    );
}
