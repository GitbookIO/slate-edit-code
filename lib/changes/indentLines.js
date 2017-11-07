/**
 * Indent all lines in selection
 * @param  {Change} change
 * @param  {String} indent
 * @return {Change}
 */
function indentLines(opts, change, indent) {
    const { value } = change;
    const { document, selection } = value;
    const lines = document
        .getBlocksAtRange(selection)
        .filter(node => node.type === opts.lineType);

    return lines.reduce((c, line) => {
        // Insert an indent at start of line
        const text = line.nodes.first();
        return c.insertTextByKey(text.key, 0, indent);
    }, change);
}

export default indentLines;
