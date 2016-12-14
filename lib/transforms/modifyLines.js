const getLines = require('../getLines');

/**
 * Update all selected lines
 * @param  {Transform} transform
 * @param  {Function<line: String, offset: Number>: String} updater
 * @return {Transform}
 */
function modifyLines(transform, updater) {
    const { state } = transform;
    const { startText, startOffset, startKey, endKey } = state;
    let { endOffset } = state;

    const { text } = startText;

    // Split by lines
    const lines = getLines(text);

    // Limit scope to the code block
    if (startKey != endKey) {
        endOffset = text.length;
    }
}

module.exports = modifyLines;
