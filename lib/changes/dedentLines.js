/**
 * Dedent all lines in selection
 * @param  {Change} change
 * @param  {String} indent To remove
 * @return {Change}
 */
function dedentLines(opts, change, indent) {
    const { state } = change;
    const { document, selection } = state;
    const lines = document
        .getBlocksAtRange(selection)
        .filter(node => node.type === opts.lineType);

    return lines.reduce((c, line) => {
        // Remove a level of indent from the start of line
        const text = line.nodes.first();
        const lengthToRemove = text.characters
            .takeWhile((char, index) => indent.charAt(index) === char.text)
            .count();
        return c.removeTextByKey(text.key, 0, lengthToRemove);
    }, change);
}

module.exports = dedentLines;
