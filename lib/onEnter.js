
/**
 * User pressed Enter in an editor
 */
function onEnter(e, data, state) {
    return state
        .transform()
        .insertText('\n')
        .apply();
}

module.exports = onEnter;
