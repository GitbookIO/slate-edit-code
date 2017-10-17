const getCurrentCode = require('./getCurrentCode');

/**
 * User is Cmd+A to select all text
 */
function onSelectAll(event, change, opts) {
    const { state } = change;
    event.preventDefault();

    const currentCode = getCurrentCode(opts, state);
    return change
        .collapseToStartOf(currentCode.getFirstText())
        .extendToEndOf(currentCode.getLastText());
}

module.exports = onSelectAll;
