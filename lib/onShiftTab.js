const getIndent = require('./getIndent');
const getCurrentCode = require('./getCurrentCode');
const dedentLines = require('./transforms/dedentLines');

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(event, data, state, opts) {
    event.preventDefault();
    event.stopPropagation();

    const transform = state.transform();

    // TODO could be optimized if the current code block is huge,
    // instead look for existing indent line by line
    const currentCode = getCurrentCode(opts, state);
    const indent = getIndent(currentCode.text);

    // We dedent all selected lines
    return dedentLines(opts, transform, indent)
        .apply();
}

module.exports = onShiftTab;
