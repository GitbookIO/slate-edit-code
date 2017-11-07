// @flow
import { type Change } from 'slate';

import type Options from '../options';

/**
 * Unwrap a code block into a normal block.
 */
function unwrapCodeBlockByKey(
    opts: Options,
    change: Change,
    key: string,
    type: string
): Change {
    const { value } = change;
    const { document } = value;

    // Get the code block
    const codeBlock = document.getDescendant(key);

    if (!codeBlock || codeBlock.type != opts.containerType) {
        throw new Error(
            'Block passed to unwrapCodeBlockByKey should be a code block container'
        );
    }

    // change lines into paragraph
    codeBlock.nodes.forEach(line =>
        change
            .setNodeByKey(line.key, { type }, { normalize: false })
            .unwrapNodeByKey(line.key, { normalize: false })
    );

    return change;
}

export default unwrapCodeBlockByKey;
