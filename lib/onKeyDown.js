
/**
 * User is pressing a key in the editor
 */
function onKeyDown(event, data, state) {
    const { startBlock } = state;

    // Select all the code in the block
    if (data.key === 'a' && data.isMod) {
        event.preventDefault();

        return state.transform()
            .collapseToStartOf(startBlock)
            .extendToEndOf(startBlock)
            .apply();
    }
}

module.exports = onKeyDown;
