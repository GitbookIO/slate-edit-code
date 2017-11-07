import deserializeCode from '../deserializeCode';

/**
 * Wrap a block into a code block.
 *
 * @param  {Change} change
 * @param  {String} key
 * @return {Change}
 */
function wrapCodeBlockByKey(opts, change, key) {
    const { value } = change;
    const { document } = value;

    const startBlock = document.getDescendant(key);
    const text = startBlock.text;

    // Remove all child
    startBlock.nodes.forEach(node => {
        change.removeNodeByKey(node.key, { normalize: false });
    });

    // Insert new text
    const toInsert = deserializeCode(opts, text);

    toInsert.nodes.forEach((node, i) => {
        change.insertNodeByKey(startBlock.key, i, node);
    });

    // Set node type
    change.setNodeByKey(startBlock.key, {
        type: opts.containerType
    });

    return change;
}

export default wrapCodeBlockByKey;
