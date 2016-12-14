const endsWith = require('ends-with');

const getCurrentIndent = require('./getCurrentIndent');

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
function onBackspace(event, data, state, opts) {
    if (!state.isCollapsed) {
        return;
    }

    const { startBlock, startOffset } = state;

    const indent = getCurrentIndent(opts, state);

    const currentLineText = startBlock.text;
    const beforeSelection = currentLineText.slice(0, startOffset);

    // If the line before selection ending with the indentation?
    if (!endsWith(beforeSelection, indent)) {
        return;
    }

    // Remove indent
    event.preventDefault();

    return state.transform()
        .deleteBackward(indent.length)
        .focus()
        .apply();
}

module.exports = onBackspace;
