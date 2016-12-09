
/**
 * User is Cmd+A to select all text
 */
function onSelectAll(event, data, state) {
    const { startBlock } = state;
    event.preventDefault();

    return state.transform()
        .collapseToStartOf(startBlock)
        .extendToEndOf(startBlock)
        .apply();
}

module.exports = onSelectAll;
