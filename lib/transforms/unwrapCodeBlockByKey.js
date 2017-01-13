
/**
 * Unwrap a code block into a normal block.
 *
 * @param  {Transform} transform
 * @param  {String} key
 * @param  {Object || String} type
 * @return {Transform}
 */
function unwrapCodeBlockByKey(opts, transform, key, type) {
    const { state } = transform;
    const { document } = state;

    // Get the code block
    const codeBlock = document.getDescendant(key);

    // Transfrom the code block
    transform = transform.setNodeByKey(codeBlock.key, type);

    // Unwrap all lines into text node
    codeBlock.nodes.forEach(line => {
        transform = transform.unwrapBlockByKey(line.key, opts.lineType);
    });

    return transform;
}

module.exports = unwrapCodeBlockByKey;
