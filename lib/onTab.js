const getIndent = require('./getIndent');

/**
 * User pressed Tab in an editor:
 * Insert a tab after detcting from code block content.
 */
function onTab(event, data, state) {
    event.preventDefault();
    event.stopPropagation();

    let { startBlock } = state;
    let transform = state.transform();

    const indent = getIndent(startBlock.text);

    return transform
        .insertText(indent)
        .focus()
        .apply();
}

module.exports = onTab;
