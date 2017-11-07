import getCurrentIndent from './getCurrentIndent';
import dedentLines from './changes/dedentLines';

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(event, data, change, opts) {
    const { value } = change;
    event.preventDefault();
    event.stopPropagation();

    const indent = getCurrentIndent(opts, value);

    // We dedent all selected lines
    return dedentLines(opts, change, indent);
}

export default onShiftTab;
