const unwrapCodeBlockByKey = require('./unwrapCodeBlockByKey');

/**
 * Convert a code block to a normal block.
 * @param  {Transform} transform
 * @param  {Object || String} type
 * @return {Transform}
 */
function unwrapCodeBlock(opts, transform, type) {
    const { state } = transform;
    const { startBlock } = state;

    // Convert to paragraph
    transform = unwrapCodeBlockByKey(opts, transform, startBlock.key, type);

    return transform;
}

module.exports = unwrapCodeBlock;
