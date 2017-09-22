const { Block, Text } = require('slate');
const { List } = require('immutable');
const detectNewline = require('detect-newline');

const DEFAULT_NEWLINE = '\n';

/**
 * Deserialize a text into a code block
 * @param {Option} opts
 * @param {String} text
 * @return {Block}
 */
function deserializeCode(opts, text) {
    const sep = detectNewline(text) || DEFAULT_NEWLINE;

    const lines = List(text.split(sep)).map(line => Block.fromJSON({
        type: opts.lineType,
        nodes: [ Text.create(line) ]
    }));

    const code = Block.fromJSON({
        type: opts.containerType,
        nodes: lines
    });

    return code;
}

module.exports = deserializeCode;
