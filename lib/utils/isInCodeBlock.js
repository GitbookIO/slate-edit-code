// @flow

import { type Value } from 'slate';

import type Options from '../options';

/**
 * Test if current selection is in a code block.
 */
function isInCodeBlock(opts: Options, value: Value): boolean {
    const { document, startKey } = value;
    const codeBlock = document.getClosest(
        startKey,
        block => block.type === opts.containerType
    );

    return Boolean(codeBlock);
}

export default isInCodeBlock;
