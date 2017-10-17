const getCurrentIndent = require('./getCurrentIndent');
const indentLines = require('./changes/indentLines');

/**
 * User pressed Tab in an editor:
 * Insert a tab after detecting it from code block content.
 */
function onTab(event, change, opts) {
    const { state } = change;
    event.preventDefault();
    event.stopPropagation();

    const { isCollapsed } = state;
    const indent = getCurrentIndent(opts, state);

    // Selection is collapsed, we just insert an indent at cursor
    if (isCollapsed) {
        return change
            .insertText(indent)
            .focus();
    }

    // We indent all selected lines
    return indentLines(opts, change, indent);
}

module.exports = onTab;
