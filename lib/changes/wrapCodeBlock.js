import wrapCodeBlockByKey from './wrapCodeBlockByKey';

/**
 * Wrap current block into a code block.
 * @param  {Change} change
 * @return {Change}
 */
function wrapCodeBlock(opts, change) {
    const { state } = change;
    const { startBlock, selection } = state;

    // Convert to code block
    change = wrapCodeBlockByKey(opts, change, startBlock.key);

    // Move selection back in the block
    change
        .collapseToStartOf(change.state.document.getDescendant(startBlock.key))
        .moveOffsetsTo(selection.startOffset);

    return change;
}

export default wrapCodeBlock;
