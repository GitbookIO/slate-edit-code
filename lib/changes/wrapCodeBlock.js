import wrapCodeBlockByKey from './wrapCodeBlockByKey';

/**
 * Wrap current block into a code block.
 * @param  {Change} change
 * @return {Change}
 */
function wrapCodeBlock(opts, change) {
    const { value } = change;
    const { startBlock, selection } = value;

    // Convert to code block
    wrapCodeBlockByKey(opts, change, startBlock.key);

    // Move selection back in the block
    change
        .collapseToStartOf(change.value.document.getDescendant(startBlock.key))
        .moveOffsetsTo(selection.startOffset);

    return change;
}

export default wrapCodeBlock;
