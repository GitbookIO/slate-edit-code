const getLines = require('../getLines');

/**
 * Indent all lines in selection
 * @param  {Transform} transform
 * @param  {String} indent
 * @return {Transform}
 */
function indentLines(transform, indent) {
    let { state } = transform;
    let { startBlock, endBlock,
        startOffset, endOffset, selection } = state;

    let innerText = startBlock.text;
    let lines = getLines(innerText);

    if (startBlock != endBlock) {
        endOffset = innerText.length;
    }

    let offset = 0;
    innerText = lines
        .map(function(line) {
            let result = line;

            if (offset >= startOffset && offset < endOffset) {
                result = indent + line;
            }

            offset += line.length;
            return result;
        })
        .join('\n');

    return transform
        .insertTextAtRange(
            selection.moveToRangeOf(startBlock),
            innerText
        );
}

module.exports = indentLines;
