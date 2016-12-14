const endsWith = require('ends-with');

const getIndent = require('./getIndent');
const getCurrentCode = require('./getCurrentCode');

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
function onBackspace(event, data, state, opts) {
    if (!state.isCollapsed) {
        return;
    }

    const { startBlock, startOffset } = state;

    const currentCode = getCurrentCode(opts, state);
    const indent = getIndent(currentCode.text);

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
