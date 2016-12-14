const getIndent  = require('./getIndent');

/**
 * User pressed Enter in an editor:
 * Insert a new code line and start it with the indentation from previous line
 */
function onEnter(event, data, state) {
    if (!state.isCollapsed) {
        return;
    }

    // TODO Exit the code block
    // By letting the next plugin/core handle this event
    if (data.isMod) {
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
