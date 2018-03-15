// @flow
import type { Change, Node, Mark } from 'slate';
import { Set } from 'immutable';

import type Options from '../options';

/**
 * Returns a validateNode function, handling validation specific to code blocks that
 * cannot be expressed using the schema.
 */
function validateNode(opts: Options): (node: Node) => ?Change {
    return function validateCodeNode(node) {
        /**
         * A rule that ensure code blocks contains no marks
         */
        if (!opts.allowMarks && node.type === opts.lineType) {
            const marks = getMarks(node);

            if (marks.size > 0) {
                return change => {
                    const selection = change.value.selection;
                    const range = selection.moveToRangeOf(node);

                    return marks.reduce(
                        (c, mark) => c.removeMarkAtRange(range, mark),
                        change
                    );
                };
            }
        }

        return undefined;
    };
}

/**
 * All the marks in the node
 */
function getMarks(node: Node): Set<Mark> {
    const texts = node.getTexts();

    const marks = texts.reduce(
        (all, text) =>
            text.characters.reduce(
                (accu, chars) => accu.union(chars.marks),
                all
            ),
        new Set()
    );

    return marks;
}

export default validateNode;
