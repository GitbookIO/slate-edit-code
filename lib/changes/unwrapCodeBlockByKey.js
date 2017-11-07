/**
 * Unwrap a code block into a normal block.
 *
 * @param  {Change} change
 * @param  {String} key
 * @param  {String} type
 * @return {Change}
 */
function unwrapCodeBlockByKey(opts, change, key, type) {
    const { state } = change;
    const { document } = state;

    // Get the code block
    const codeBlock = document.getDescendant(key);

    if (!codeBlock || codeBlock.type != opts.containerType) {
        throw new Error(
            'Block passed to unwrapCodeBlockByKey should be a code block container'
        );
    }

    // change lines into paragraph
    codeBlock.nodes.forEach(line =>
        change.setNodeByKey(line.key, { type }).unwrapNodeByKey(line.key)
    );

    return change;
}

export default unwrapCodeBlockByKey;
