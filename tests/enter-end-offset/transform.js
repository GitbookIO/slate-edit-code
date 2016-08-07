
module.exports = function(plugin, state) {
    let block = state.document.findDescendant(node => node.type == 'code_block');

    let withCursor = state.transform()
        .collapseToEndOf(block)
        .apply();

    return plugin.onKeyDown(
        {
            preventDefault: function() {},
            stopPropagation: function() {}
        },
        { key: 'enter' },
        withCursor
    );
};
