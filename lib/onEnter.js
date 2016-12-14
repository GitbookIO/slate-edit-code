const getIndent  = require('./getIndent');

/**
 * User pressed Enter in an editor:
 * Insert a new code line and start it with the indentation from previous line
 */
function onEnter(event, data, state, opts) {
    if (!state.isCollapsed) {
        return;
    }


    // Exit the code block
    if (data.isMod) {
        if (!opts.shiftEnterBlockType) return;

        event.preventDefault();
        return state
            .transform()
            .splitBlock(2) // Split the current line, and code container
            .setBlock({ type: opts.shiftEnterBlockType })
            .apply();
    }

    event.preventDefault();

    const { startBlock } = state;
    const currentLineText = startBlock.text;
    const indent = getIndent(currentLineText, '');

    return state
        .transform()
        .splitBlock()
        .insertText(indent)
        .focus()
        .apply();
}

module.exports = onEnter;
