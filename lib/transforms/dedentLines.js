/**
 * Dedent all lines in selection
 * @param  {Transform} transform
 * @param  {String} indent To remove
 * @return {Transform}
 */
function dedentLines(opts, transform, indent) {
    const { state } = transform;
    const { document, selection } = state;
    const lines = document
        .getBlocksAtRange(selection)
        .filter(node => node.type === opts.lineType);

    return lines.reduce((tr, line) => {
        // Remove a level of indent from the start of line
        const text = line.nodes.first();
        const lengthToRemove = text.characters
            .takeWhile((char, index) => indent.charAt(index) === char.text)
            .count();
        return tr.removeTextByKey(text.key, 0, lengthToRemove);
    }, transform);
}

module.exports = dedentLines;
