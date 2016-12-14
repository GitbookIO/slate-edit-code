const getCurrentIndent = require('./getCurrentIndent');
const indentLines = require('./transforms/indentLines');

/**
 * User pressed Tab in an editor:
 * Insert a tab after detecting it from code block content.
 */
function onTab(event, data, state, opts) {
    event.preventDefault();
    event.stopPropagation();

    const { isCollapsed } = state;
    const transform = state.transform();

    const indent = getCurrentIndent(opts, state);

    // Selection is collapsed, we just insert an indent at cursor
    if (isCollapsed) {
        return transform
            .insertText(indent)
            .focus()
            .apply();
    }

    // We indent all selected lines
    return indentLines(opts, transform, indent)
        .apply();
}

module.exports = onTab;
