const getIndent  = require('./getIndent');

/**
 * User pressed Enter in an editor:
 * Insert a new code line and start it with the indentation from previous line
 */
function onEnter(event, data, state, opts) {
    if (!state.isCollapsed) {
        return;
    }

    event.preventDefault();

    if (data.isShift && opts.shiftEnterBlockType) {
        // Exit the code block
        const transform = state.transform();
        transform.insertBlock({ type: opts.shiftEnterBlockType });

        const inserted = transform.state.startBlock;
        return transform.unwrapNodeByKey(inserted.key).apply();
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
