const endsWith = require('ends-with');

const getCurrentIndent = require('./getCurrentIndent');
const getCurrentCode = require('./getCurrentCode');

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
function onBackspace(event, change, opts) {
    const { state } = change;
    if (state.isExpanded) {
        return;
    }

    const {
        startOffset,
        startText
    } = state;

    const currentLine = state.startBlock;

    // Detect and remove indentation at cursor
    const indent = getCurrentIndent(opts, state);
    const beforeSelection = currentLine.text.slice(0, startOffset);

    // If the line before selection ending with the indentation?
    if (endsWith(beforeSelection, indent)) {
        // Remove indent
        event.preventDefault();

        return change
            .deleteBackward(indent.length)
            .focus();
    }

    // Otherwise check if we are in an empty code container...
    else if (opts.exitBlockType) {
        const currentCode = getCurrentCode(opts, state);
        const isStartOfCode = startOffset === 0
                  && currentCode.getFirstText() === startText;
        // PERF: avoid checking for whole currentCode.text
        const isEmpty = currentCode.nodes.size === 1 && currentLine.text.length === 0;

        if (isStartOfCode && isEmpty) {

            event.preventDefault();
            // Convert it to default exit type
            return change
                .setBlock(opts.exitBlockType)
                .unwrapNodeByKey(currentLine.key);
        }
    }
}

module.exports = onBackspace;
