const getIndent = require('./getIndent');
const getNewLine = require('./getNewLine');

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(event, data, state) {
    event.preventDefault();
    event.stopPropagation();

    const { startText, startBlock, isCollapsed, startOffset } = state;
    const transform = state.transform();

    const blockText = startBlock.text;

    // Detect new line and indent
    const newLine = getNewLine(blockText);
    const indent = getIndent(blockText);

    const anchor = LineAnchor.getForOffset(startText.text, startOffset, newLine);

    // Selection is collapsed, we just insert a new tab
    if (isCollapsed) {
        return transform
            .removeTextByKey(startText.key, 0, indent.length)
            .focus()
            .apply();
    }

    // We indent all selected lines
    // return indentLines(transform, indent)
        // .apply();
}

module.exports = onShiftTab;
