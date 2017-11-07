import getIndent from './getIndent';

/**
 * User pressed Enter in an editor:
 * Insert a new code line and start it with the indentation from previous line
 */
function onEnter(event, data, change, opts) {
    const { value } = change;
    if (!value.isCollapsed) {
        return;
    }

    event.preventDefault();

    const { startBlock } = value;
    const currentLineText = startBlock.text;
    const indent = getIndent(currentLineText, '');

    return change
        .splitBlock()
        .insertText(indent)
        .focus();
}

export default onEnter;
