/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */
function onModEnter(event, data, change, opts) {
    const { state } = change;
    if (!state.isCollapsed) {
        return;
    }

    event.preventDefault();

    // Exit the code block
    change.insertBlock({ type: opts.exitBlockType });

    const inserted = change.state.startBlock;
    return change.unwrapNodeByKey(inserted.key);
}

module.exports = onModEnter;
