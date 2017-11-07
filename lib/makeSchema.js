const { Set, List } = require('immutable');
import Slate from 'slate';

/**
 * Create a schema for code blocks.
 * @param {Options} opts
 * @return {Object} A schema definition with normalization rules
 */
function makeSchema(opts) {
    return {
        rules: [
            noOrphanLine(opts),
            onlyLine(opts),
            onlyText(opts),
            noMarks(opts)
        ]
    };
}

/**
 * @return {Object} A rule that ensure code lines are always children
 * of a code block.
 */
function noOrphanLine(opts) {
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
 * @return {Object} A rule that ensure code blocks only contain lines of code, and no marks
 */
function onlyLine(opts) {
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
 * @return {Object} A rule that ensure code lines only contain one text
 * node.
 */
function onlyText(opts) {
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
                return { toAdd: [Slate.Text.create()] };
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
 * @return {Object} A rule that ensure code blocks contains no marks
 */
function noMarks(opts) {
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
            const selection = change.state.selection;
            const range = selection.moveToRangeOf(node);

            return removeMarks.reduce(
                (c, mark) => c.removeMarkAtRange(range, mark),
                change
            );
        }
    };
}

/**
 * @param {Node} node
 * @return {Set<Marks>} All the marks in the node
 */
function getMarks(node) {
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
 * @param {Rule} rule
 * @param {Change} change
 * @param {String} key
 * @return {Change}
 */
function applyRule(rule, change, key) {
    const node = change.state.document.getDescendant(key);
    const notValid = rule.validate(node);
    if (notValid) {
        rule.normalize(change, node, notValid);
    }

    return change;
}

export default makeSchema;
