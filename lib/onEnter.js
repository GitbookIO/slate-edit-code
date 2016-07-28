
/**
 * User pressed Enter in an editor:
 * Insert a soft line and start it with the indentation from previous line
 */
function onEnter(e, data, state) {
    return state
        .transform()
        .insertText('\n')
        .apply();
}

module.exports = onEnter;
