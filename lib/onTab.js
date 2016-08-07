const getIndent = require('./getIndent');
const indentLines = require('./transforms/indentLines');

/**
 * User pressed Tab in an editor:
 * Insert a tab after detcting from code block content.
 */
function onTab(event, data, state) {
    event.preventDefault();
    event.stopPropagation();

    let { startBlock, isCollapsed } = state;
    let transform = state.transform();

    const innerText = startBlock.text;
    const indent = getIndent(innerText);

    // Selection is collapsed, we just insert a new tab
    if (isCollapsed) {
        return transform
            .insertText(indent)
            .focus()
            .apply();
    }

    // We indent all selected lines
    return indentLines(transform, indent)
        .apply();
}

module.exports = onTab;
