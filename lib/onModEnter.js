/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */
function onModEnter(event, data, state, opts) {
    if (!state.isCollapsed) {
        return;
    }

    event.preventDefault();

    // Exit the code block
    const transform = state.transform();
    const result = opts.onExit(transform, opts);

    if (result) {
        return result.apply();
    }
}

module.exports = onModEnter;
