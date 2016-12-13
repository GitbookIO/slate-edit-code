
module.exports = function(plugin, state) {
    const block = state.document.findDescendant(node => node.type == 'code_block');

    const withCursor = state.transform()
        .moveToRangeOf(block)
        .apply();

    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'tab', isShift: true },
        withCursor
    );
};
