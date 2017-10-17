const getCurrentIndent = require('./getCurrentIndent');
const dedentLines = require('./changes/dedentLines');

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(event, change, opts) {
    const { state } = change;
    event.preventDefault();
    event.stopPropagation();

    const indent = getCurrentIndent(opts, state);

    // We dedent all selected lines
    return dedentLines(opts, change, indent);
}

module.exports = onShiftTab;
