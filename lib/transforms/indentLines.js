/**
 * Indent all lines in selection
 * @param  {Transform} transform
 * @param  {String} indent
 * @return {Transform}
 */
function indentLines(opts, transform, indent) {
    const { state } = transform;
    const { document, selection } = state;
    const lines = document
        .getBlocksAtRange(selection)
        .filter(node => node.type === opts.lineType);

    return lines.reduce((tr, line) => {
        // Insert an indent at start of line
        const text = line.nodes.first();
        return tr.insertTextByKey(text.key, 0, indent);
    }, transform);
}

module.exports = indentLines;
