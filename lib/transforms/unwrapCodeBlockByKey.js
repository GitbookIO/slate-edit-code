
/**
 * Unwrap a code block into a normal block.
 *
 * @param  {Transform} transform
 * @param  {String} key
 * @param  {String} type
 * @return {Transform}
 */
function unwrapCodeBlockByKey(opts, transform, key, type) {
    const { state } = transform;
    const { document } = state;

    // Get the code block
    const codeBlock = document.getDescendant(key);

    if (!codeBlock || codeBlock.type != opts.containerType) {
        throw new Error('Block passed to unwrapCodeBlockByKey should be a code block container');
    }

    // Transform lines into paragraph
    codeBlock.nodes.forEach(line => {
        transform = transform.setNodeByKey(line.key, { type });
        transform = transform.unwrapNodeByKey(line.key);
    });

    return transform;
}

module.exports = unwrapCodeBlockByKey;
