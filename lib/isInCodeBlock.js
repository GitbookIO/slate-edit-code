/**
 * Test if current selection is in a code block.
 * @param  {State} state
 * @return {Boolean}
 */
function isInCodeBlock(opts, state) {
    const { document, startKey } = state;
    const codeBlock = document.getClosest(
        startKey,
        block => block.type === opts.containerType
    );

    return Boolean(codeBlock);
}

module.exports = isInCodeBlock;
