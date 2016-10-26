
module.exports = function(plugin, state) {
    const block = state.document.findDescendant(node => node.type == 'code_block');

    const withCursor = state.transform()
        .collapseToStartOf(block)
        .moveToOffsets(0, 9)
        .apply();

    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'tab' },
        withCursor
    );
};
