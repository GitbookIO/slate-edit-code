// @flow
import { type Change } from '@gitbook/slate';

import type Options from '../options';
import { getCurrentCode } from '../utils';

import unwrapCodeBlockByKey from './unwrapCodeBlockByKey';

/**
 * Convert a code block to a normal block.
 */
function unwrapCodeBlock(opts: Options, change: Change, type: string): Change {
    const { value } = change;

    const codeBlock = getCurrentCode(opts, value);

    if (!codeBlock) {
        return change;
    }

    // Convert to paragraph
    unwrapCodeBlockByKey(opts, change, codeBlock.key, type);

    return change;
}

export default unwrapCodeBlock;
