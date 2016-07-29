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

    var { startBlock, startOffset } = state;
    var blockText = startBlock.text;

    // Detect newline separator and indentation
    var newLine = getNewLine(blockText);
    var indent  = getIndent(blockText);

    // Get current line
    var lines      = getLines(blockText, newLine);
    var lineAnchor = LineAnchor.getForOffset(blockText, startOffset, newLine);

    var currentLine = lines.get(lineAnchor.line);
    var beforeSelection = currentLine.slice(0, lineAnchor.offset);

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
