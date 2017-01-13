
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

    if (!codeBlock || codeBlock.type != opts.containerType) {
        throw new Error('Block passed to unwrapCodeBlockByKey should be a code block container');
    }

    // Transfrom the code block
    transform = transform.setNodeByKey(codeBlock.key, type);

    // Unwrap all lines into text node
    codeBlock.nodes.forEach(line => {
        line.nodes.forEach(node => {
            transform = transform.unwrapNodeByKey(node.key);
        });
    });

    return transform;
}

module.exports = unwrapCodeBlockByKey;
