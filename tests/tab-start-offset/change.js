
module.exports = function(plugin, change) {
    const { state } = change;
    const block = state.document.findDescendant(node => node.type == 'code_block');

    change
        .collapseToStartOf(block)
        .moveOffsetsTo(0);

    return plugin.onKeyDown(
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );
};
