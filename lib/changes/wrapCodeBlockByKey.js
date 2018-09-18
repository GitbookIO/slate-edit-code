// @flow
import { type Change } from '@gitbook/slate';

import type Options from '../options';
import { deserializeCode } from '../utils';

/**
 * Wrap a block into a code block.
 */
function wrapCodeBlockByKey(
    opts: Options,
    change: Change,
    key: string
): Change {
    const { value } = change;
    const { document } = value;

    const startBlock = document.getDescendant(key);
    const text = startBlock.text;

    // Remove all child
    startBlock.nodes.forEach(node => {
        change.removeNodeByKey(node.key, { normalize: false });
    });

    // Insert new text
    const toInsert = deserializeCode(opts, text);

    toInsert.nodes.forEach((node, i) => {
        change.insertNodeByKey(startBlock.key, i, node, { normalize: false });
    });

    // Set node type
    change.setNodeByKey(startBlock.key, {
        type: opts.containerType
    });

    return change;
}

export default wrapCodeBlockByKey;
