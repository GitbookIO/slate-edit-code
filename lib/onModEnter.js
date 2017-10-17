/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */
function onModEnter(event, change, opts) {
    const { state } = change;
    if (!state.isCollapsed) {
        return;
    }

    event.preventDefault();

    // Exit the code block
    return opts.onExit(change, opts);
}

module.exports = onModEnter;
