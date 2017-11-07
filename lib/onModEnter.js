/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */
function onModEnter(event, data, change, opts) {
    const { value } = change;
    if (!value.isCollapsed) {
        return;
    }

    event.preventDefault();

    // Exit the code block
    return opts.onExit(change, opts);
}

export default onModEnter;
