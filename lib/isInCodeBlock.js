/**
 * Test if current selection is in a code block.
 * @param  {Value} value
 * @return {Boolean}
 */
function isInCodeBlock(opts, value) {
    const { document, startKey } = value;
    const codeBlock = document.getClosest(
        startKey,
        block => block.type === opts.containerType
    );

    return Boolean(codeBlock);
}

export default isInCodeBlock;
