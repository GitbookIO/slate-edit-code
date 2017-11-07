// @flow
import { type Change } from 'slate';

import type Options from '../options';

/**
 * Dedent all lines in selection
 */
function dedentLines(
    opts: Options,
    change: Change,
    // Indent to remove
    indent: string
): Change {
    const { value } = change;
    const { document, selection } = value;
    const lines = document
        .getBlocksAtRange(selection)
        .filter(node => node.type === opts.lineType);

    return lines.reduce((c, line) => {
        // Remove a level of indent from the start of line
        const text = line.nodes.first();
        const lengthToRemove = text.characters
            .takeWhile((char, index) => indent.charAt(index) === char.text)
            .count();
        return c.removeTextByKey(text.key, 0, lengthToRemove);
    }, change);
}

export default dedentLines;
