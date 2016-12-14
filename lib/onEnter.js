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
