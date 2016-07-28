const getIndent = require('./getIndent');

/**
 * User pressed Tab in an editor:
 * Insert a tab after detcting from code block content.
 */
function onTab(e, data, state) {
    const { startBlock } = state;
    const indent = getIndent(startBlock.text);

    var transform = state.transform();

    if (!state.isCollapsed) {
        transform = transform.delete();
    }

    return transform
        .insertText(indent)
        .apply();
}

module.exports = onTab;
