const deserializeCode = require('../deserializeCode');

/**
 * Wrap a block into a code block.
 *
 * @param  {Transform} transform
 * @param  {String} key
 * @return {Transform}
 */
function wrapCodeBlockByKey(opts, transform, key) {
    const { state } = transform;
    const { document } = state;

    const startBlock = document.getDescendant(key);
    const text = startBlock.text;

    // Remove all child
    startBlock.nodes.forEach(node => {
        transform.removeNodeByKey(node.key);
    });

    // Set node type
    transform.setNodeByKey(startBlock.key, {
        type: opts.containerType
    });

    // Insert new text
    const toInsert = deserializeCode(opts, text);

    toInsert.nodes.forEach((node, i) => {
        transform.insertNodeByKey(startBlock.key, i, node);
    });

    return transform;
}

module.exports = wrapCodeBlockByKey;
