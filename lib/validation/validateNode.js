// @flow
import { Text, type Change, type Node, type Mark } from 'slate';
import { Set, List } from 'immutable';

import type Options from '../options';

type Normalizer = Change => any;
type Validator = Node => void | Normalizer;

// Old format for Slate rules
type Rule = {
    match: Node => boolean,
    validate: Node => any,
    normalize: (Change, Node, any) => Normalizer
};

/**
 * Returns a validateNode function, handling validation specific to code blocks that
 * cannot be expressed using the schema.
 */
function validateNode(opts: Options): Validator {
    const rules = [
        noOrphanLine(opts),
        onlyLine(opts),
        onlyText(opts),
        noMarks(opts)
    ];
    const validators = rules.map(toValidateNode);

    return function validateTableNode(node) {
        let changer;
        validators.find(validator => {
            changer = validator(node);
            return Boolean(changer);
        });

        return changer;
    };
}

// Convert an old rule definition to an individual plugin with on "validateNode"
function toValidateNode(rule: Rule): Validator {
    return function validateRule(node: Node) {
        if (!rule.match(node)) {
            return undefined;
        }
        const validationResult = rule.validate(node);
        if (validationResult == null) {
            return undefined;
        }

        return change => rule.normalize(change, node, validationResult);
    };
}

/**
 * A rule that ensure code lines are always children
 * of a code block.
 */
function noOrphanLine(opts: Options) {
    return {
        // Match all blocks that are not code blocks
        match(node) {
            return (
                (node.kind === 'block' || node.kind === 'document') &&
                node.type !== opts.containerType
            );
        },

        validate(node) {
            const codeLines = node.nodes.filter(n => n.type === opts.lineType);

            if (codeLines.isEmpty()) {
                // All good
                return null;
            }
            // Wrap the orphan lines
            return {
                toWrap: codeLines
            };
        },

        /**
         * Wrap the given blocks in code containers
         * @param {List<Nodes>} value.toWrap
         */
        normalize(change, node, value) {
            return value.toWrap.reduce(
                (c, n) => c.wrapBlockByKey(n.key, opts.containerType),
                change
            );
        }
    };
}

/**
 * A rule that ensure code blocks only contain lines of code, and no marks
 */
function onlyLine(opts: Options) {
    return {
        match: node => node.type === opts.containerType,

        validate(node) {
            const { nodes } = node;

            const toWrap = [];
            const toRemove = [];

            nodes.forEach(child => {
                if (child.kind === 'text') toWrap.push(child);
                else if (child.type !== opts.lineType) toRemove.push(child);
            });

            if (toWrap.length || toRemove.length) {
                return { toWrap, toRemove };
            }
            return null;
        },

        normalize(change, node, { toWrap, toRemove }) {
            toRemove.forEach(child => {
                change.removeNodeByKey(child.key);
            });

            toWrap.forEach(child => {
                change.wrapBlockByKey(child.key, opts.lineType);
            });

            // Also remove marks here (since the no mark rule for
            // lines will not be applied afterward).
            return applyRule(noMarks(opts), change, node.key);
        }
    };
}

/**
 * A rule that ensure code lines only contain one text
 * node.
 */
function onlyText(opts: Options) {
    return {
        match: node => node.type === opts.lineType,

        validate(node) {
            const { nodes } = node;

            const toRemove = nodes.filterNot(n => n.kind === 'text');
            if (!toRemove.isEmpty()) {
                // Remove them, and the rest
                // will be done in the next validation call.
                return { toRemove };
            } else if (nodes.size > 1) {
                // Else, there are only text nodes

                return { toJoin: nodes };
            } else if (nodes.size === 0) {
                return { toAdd: [Text.create()] };
            }

            // There is a single text node -> valid
            return null;
        },

        /**
         * Clean up the child nodes.
         */
        normalize(
            change,
            node,
            { toRemove = List(), toAdd = List(), toJoin = List() }
        ) {
            // Remove invalids
            toRemove.reduce(
                (c, child) =>
                    c.removeNodeByKey(child.key, { normalize: false }),
                change
            );

            // Join nodes.
            const pairs = toJoin
                .butLast()
                .map((child, index) => [child.key, toJoin.get(index + 1).key]);

            // Join every node onto the previous one.
            pairs.reverse().reduce(
                (c, [childKey, nextChildKey]) =>
                    c.joinNodeByKey(nextChildKey, childKey, {
                        normalize: false
                    }),
                change
            );

            // Add missing nodes
            toAdd.reduce(
                (c, child) => c.insertNodeByKey(node.key, 0, child),
                change
            );

            return change;
        }
    };
}

/**
 * A rule that ensure code blocks contains no marks
 */
function noMarks(opts: Options) {
    return {
        // Match at the line level, to optimize memoization
        match: node => node.type === opts.lineType,

        validate(node) {
            if (opts.allowMarks) return null;

            const marks = getMarks(node);

            if (marks.isEmpty()) {
                return null;
            }
            return {
                removeMarks: marks
            };
        },

        /**
         * Removes the given marks
         * @param {Set<Marks>} value.removeMarks
         */
        normalize(change, node, { removeMarks }) {
            const selection = change.value.selection;
            const range = selection.moveToRangeOf(node);

            return removeMarks.reduce(
                (c, mark) => c.removeMarkAtRange(range, mark),
                change
            );
        }
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

/**
 * Apply a normalization rule to a node
 */
function applyRule(rule: Rule, change: Change, key: string): Change {
    const node = change.value.document.getDescendant(key);
    const notValid = rule.validate(node);
    if (notValid) {
        rule.normalize(change, node, notValid);
    }

    return change;
}

export default validateNode;
