// @flow

import type { Change } from 'slate';
import { CHILD_TYPE_INVALID } from 'slate-schema-violations';
import { List } from 'immutable';

import type Options from '../options';
import { deserializeCode } from '../utils';

/**
 * Create a schema definition with rules to normalize code blocks
 */
function schema(opts: Options): Object {
    return {
        blocks: {
            [opts.containerType]: {
                nodes: [{ types: [opts.lineType] }],
                normalize(change: Change, violation: string, context: Object) {
                    switch (violation) {
                        case CHILD_TYPE_INVALID:
                            return onlyLine(opts, change, context);
                        default:
                            return undefined;
                    }
                }
            }
        }
    };
}

/**
 * A rule that ensure code blocks only contain lines of code, and no marks
 */
function onlyLine(opts: Options, change: Change, context: Object) {
    return change.withoutNormalization(c => {
        let codeLines = List();

        context.node.nodes.forEach(node => {
            if (node.object === opts.lineType) {
                return;
            }

            if (node.object === 'text') {
                if (node.text.length === 0) {
                    return;
                }

                codeLines = codeLines.concat(
                    deserializeCode(opts, node.text).nodes
                );
            }

            c.removeNodeByKey(node.key);
        });

        codeLines.forEach((codeLine, index) => {
            c.insertNodeByKey(context.node.key, index, codeLine);
        });

        return c;
    });
}

export default schema;
