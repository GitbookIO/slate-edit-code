/**
 * User pressed Shift+Enter in an editor
 * Exit the current code block
 */
function onShiftEnter(event, data, state, opts) {
    if (!state.isCollapsed) {
        return;
    }

    event.preventDefault();

    // Exit the code block
    const transform = state.transform();
    transform.insertBlock({ type: opts.shiftEnterBlockType });

    const inserted = transform.state.startBlock;
    return transform.unwrapNodeByKey(inserted.key).apply();
}

module.exports = onShiftEnter;
