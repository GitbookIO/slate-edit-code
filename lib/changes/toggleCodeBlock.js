// @flow
import { type Change } from '@gitbook/slate';

import type Options from '../options';
import { isInCodeBlock } from '../utils';

import wrapCodeBlock from './wrapCodeBlock';
import unwrapCodeBlock from './unwrapCodeBlock';

/**
 * Toggle code block / paragraph.
 */
function toggleCodeBlock(
    opts: Options,
    change: Change,
    // When toggling a code block off, type to convert to
    type: string
): Change {
    if (isInCodeBlock(opts, change.value)) {
        return unwrapCodeBlock(opts, change, type);
    }
    return wrapCodeBlock(opts, change);
}

export default toggleCodeBlock;
