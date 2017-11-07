/**
 * Return the current code block, from current selection or from a node key.
 *
 * @param {PluginOptions} opts
 * @param {Slate.State} state
 * @param {String} key?
 * @return {Slate.Block || Void}
 */
function getCurrentCode(opts, state, key) {
    const { document } = state;

    let currentBlock;
    if (key) {
        currentBlock = state.document.getDescendant(key);
    } else {
        if (!state.selection.startKey) return null;
        currentBlock = state.startBlock;
    }

    // The structure is always code_block -> code_line -> text
    // So the parent of the currentBlock should be the code_block
    const parent = document.getParent(currentBlock.key);
    if (parent && parent.type === opts.containerType) {
        return parent;
    }
    return null;
}

export default getCurrentCode;
