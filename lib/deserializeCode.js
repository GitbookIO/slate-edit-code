const { Block, Text } = require('slate');

import { List } from 'immutable';
import detectNewline from 'detect-newline';

const DEFAULT_NEWLINE = '\n';

/**
 * Deserialize a text into a code block
 * @param {Option} opts
 * @param {String} text
 * @return {Block}
 */
function deserializeCode(opts, text) {
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
