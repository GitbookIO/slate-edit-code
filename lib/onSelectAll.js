const getCurrentCode = require('./getCurrentCode');

/**
 * User is Cmd+A to select all text
 */
function onSelectAll(event, data, state, opts) {
    event.preventDefault();

    const currentCode = getCurrentCode(opts, state);
    return state.transform()
        .collapseToStartOf(currentCode.getFirstText())
        .extendToEndOf(currentCode.getLastText())
        .apply();
}

module.exports = onSelectAll;
