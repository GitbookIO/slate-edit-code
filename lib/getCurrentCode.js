
/**
 * Return the current code block, from current selection or from a node key.
 *
 * @param {PluginOptions} opts
 * @param {Slate.State} state
 * @param {String} key?
 * @return {Slate.Block || Void}
 */
function getCurrentCode(opts, state, key) {
    const { document, selection, startBlock } = state;

    let currentBlock;
    if (key) {
        currentBlock = document.getDescendant(key);
    } else {
        if (!selection.startKey) return null;
        currentBlock = startBlock;
    }

    // The structure is always code_block -> code_line -> text
    // So the parent of the currentBlock should be the code_block
    const parent = document.getParent(currentBlock.key);
    if (parent && parent.type === opts.containerType) {
        return parent;
    } else {
        return null;
    }
}

module.exports = getCurrentCode;
