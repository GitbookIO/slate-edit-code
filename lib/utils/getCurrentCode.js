// @flow
import { type Value, type Block } from 'slate';

import type Options from '../options';

/**
 * Return the current code block, from current selection or from a node key.
 */
function getCurrentCode(opts: Options, value: Value, key?: string): ?Block {
    let currentBlock;
    if (key) {
        currentBlock = value.document.getDescendant(key);
    } else {
        if (!value.selection.start.key) return null;
        currentBlock = value.startBlock;
    }

    // The structure is always code_block -> code_line -> text
    // So the parent of the currentBlock should be the code_block
    const parent = value.document.getParent(currentBlock.key);
    if (parent && parent.type === opts.containerType) {
        return parent;
    }
    return null;
}

export default getCurrentCode;
