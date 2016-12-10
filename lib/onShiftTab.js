
/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(event, data, state) {
    event.preventDefault();
    event.stopPropagation();

}

module.exports = onShiftTab;
