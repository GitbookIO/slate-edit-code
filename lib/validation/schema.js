// @flow

import { Block, type Change, type Node } from 'slate';
import {
    CHILD_TYPE_INVALID,
    CHILD_INVALID,
    PARENT_TYPE_INVALID,
    PARENT_INVALID
} from 'slate-schema-violations';
import { List } from 'immutable';

import type Options from '../options';
import { deserializeCode } from '../utils';

/**
 * Create a schema definition with rules to normalize code blocks
 */
function schema(opts: Options): Object {
    const baseSchema = {
        blocks: {
            [opts.containerType]: {
                nodes: [{ types: [opts.lineType] }],
                normalize(change: Change, violation: string, context: Object) {
                    switch (violation) {
                        case CHILD_INVALID:
                        case CHILD_TYPE_INVALID:
                            return onlyLine(opts, change, context);
                        default:
                            return undefined;
                    }
                }
            },
            [opts.lineType]: {
                nodes: [{ objects: ['text'], min: 1 }],
                parent: { types: [opts.containerType] },
                normalize(change: Change, violation: string, context: Object) {
                    switch (violation) {
                        // This constant does not exist yet in
                        // official Slate, but exists in GitBook's
                        // fork. Until the PR is merged, we accept both
                        // https://github.com/ianstormtaylor/slate/pull/1842
                        case PARENT_INVALID:
                        case PARENT_TYPE_INVALID:
                            return noOrphanLine(opts, change, context);
                        default:
                            return undefined;
                    }
                }
            }
        }
    };

    if (!opts.allowMarks) {
        baseSchema.blocks[opts.lineType].marks = [];
    }

    return baseSchema;
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

/**
 * Return a list of group of code lines. Used to wrap them together in
 * independent code blocks.
 */
function getSuccessiveCodeLines(
    opts: Options,
    nodes: List<Node>
): List<List<Node>> {
    const isLine = n => n.type === opts.lineType;

    const nonLines = nodes.takeUntil(isLine);
    const afterNonLines = nodes.skip(nonLines.size);
    if (afterNonLines.isEmpty()) {
        return List();
    }

    const firstGroup = afterNonLines.takeWhile(isLine);
    const restOfNodes = afterNonLines.skip(firstGroup.size);

    return List([firstGroup]).concat(getSuccessiveCodeLines(opts, restOfNodes));
}

/**
 * A rule that ensure code lines are always children
 * of a code block.
 */
function noOrphanLine(opts: Options, change: Change, context: Object): ?Change {
    const { parent } = context;

    const linesGroup = getSuccessiveCodeLines(opts, parent.nodes);

    linesGroup.forEach(group => {
        const container = Block.create({ type: opts.containerType, nodes: [] });
        const firstLineIndex = parent.nodes.indexOf(group.first());

        change.insertNodeByKey(parent.key, firstLineIndex, container, {
            normalize: false
        });

        group.forEach((line, index) =>
            change.moveNodeByKey(line.key, container.key, index, {
                normalize: false
            })
        );
    });
}

export default schema;
