// @flow
import { Block, Text } from 'slate';
import { List } from 'immutable';
import detectNewline from 'detect-newline';

import type Options from '../options';

const DEFAULT_NEWLINE = '\n';

/**
 * Deserialize a text into a code block
 */
function deserializeCode(opts: Options, text: string): Block {
    const sep = detectNewline(text) || DEFAULT_NEWLINE;

    const lines = List(text.split(sep)).map(line =>
        Block.create({
            type: opts.lineType,
            nodes: [Text.create(line)]
        })
    );

    const code = Block.create({
        type: opts.containerType,
        nodes: lines
    });

    return code;
}

export default deserializeCode;
