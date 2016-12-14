const getCurrentIndent = require('./getCurrentIndent');
const dedentLines = require('./transforms/dedentLines');

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(event, data, state, opts) {
    event.preventDefault();
    event.stopPropagation();

    const transform = state.transform();

    const indent = getCurrentIndent(opts, state);

    // We dedent all selected lines
    return dedentLines(opts, transform, indent)
        .apply();
}

module.exports = onShiftTab;
