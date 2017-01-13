const wrapCodeBlockByKey = require('./wrapCodeBlockByKey');

/**
 * Wrap current block into a code block.
 * @param  {Transform} transform
 * @return {Transform}
 */
function wrapCodeBlock(opts, transform) {
    const { state } = transform;
    const { startBlock, selection } = state;

    // Convert to code block
    transform = wrapCodeBlockByKey(opts, transform, startBlock.key);

    // Move selection back in the block
    transform = transform.moveTo(
        selection
        .collapseToStartOf(startBlock)
        .moveToOffsets(selection.startOffset)
    );

    return transform;
}

module.exports = wrapCodeBlock;
