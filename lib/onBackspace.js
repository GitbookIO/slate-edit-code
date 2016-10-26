const endsWith = require('ends-with');

const getNewLine = require('./getNewLine');
const getIndent = require('./getIndent');
const getLines = require('./getLines');
const LineAnchor = require('./LineAnchor');

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
function onBackspace(event, data, state) {
    if (!state.isCollapsed) {
        return;
    }

    const { startBlock, startOffset } = state;
    const blockText = startBlock.text;

    // Detect newline separator and indentation
    const newLine = getNewLine(blockText);
    const indent  = getIndent(blockText);

    // Get current line
    const lines      = getLines(blockText, newLine);
    const lineAnchor = LineAnchor.getForOffset(blockText, startOffset, newLine);

    const currentLine = lines.get(lineAnchor.line);
    const beforeSelection = currentLine.slice(0, lineAnchor.offset);

    // If the line before selection ending with the indentation?
    if (!endsWith(beforeSelection, indent)) {
        return;
    }

    // Remove indent
    event.preventDefault();

    return state
        .transform()
        .deleteBackward(indent.length)
        .focus()
        .apply();
}

module.exports = onBackspace;
