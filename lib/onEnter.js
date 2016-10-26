const LineAnchor = require('./LineAnchor');
const getLines   = require('./getLines');
const getNewLine = require('./getNewLine');
const getIndent  = require('./getIndent');

/**
 * User pressed Enter in an editor:
 * Insert a soft line and start it with the indentation from previous line
 */
function onEnter(event, data, state) {
    if (!state.isCollapsed) {
        return;
    }

    // Exit the code block
    // By letting the next plugin/core handle this event
    if (data.isMod) {
        return;
    }

    event.preventDefault();

    const { startBlock, startOffset } = state;
    const blockText = startBlock.text;
    const newLine = getNewLine(blockText);
    const lines  = getLines(blockText, newLine);
    const anchor = LineAnchor.getForOffset(blockText, startOffset, newLine);
    const currentLine  = lines.get(anchor.line);
    const lineToInsert = newLine + getIndent(currentLine, '');

    return state
        .transform()
        .insertText(lineToInsert)
        .focus()
        .apply();
}

module.exports = onEnter;
