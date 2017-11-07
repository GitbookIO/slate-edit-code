import getCurrentIndent from './getCurrentIndent';
import indentLines from './changes/indentLines';

/**
 * User pressed Tab in an editor:
 * Insert a tab after detecting it from code block content.
 */
function onTab(event, data, change, opts) {
    const { value } = change;
    event.preventDefault();
    event.stopPropagation();

    const { isCollapsed } = value;
    const indent = getCurrentIndent(opts, value);

    // Selection is collapsed, we just insert an indent at cursor
    if (isCollapsed) {
        return change.insertText(indent).focus();
    }

    // We indent all selected lines
    return indentLines(opts, change, indent);
}

export default onTab;
