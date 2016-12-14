const { Set } = require('immutable');
const Slate = require('slate');

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
            return (node.kind === 'block' || node.kind === 'document')
                && node.type !== opts.containerType;
        },

        validate(node) {
            const codeLines = node.nodes.filter(n => n.type === opts.lineType);

            if (codeLines.isEmpty()) {
                // All good
                return null;
            } else {
                // Wrap the orphan lines
                return {
                    toWrap: codeLines
                };
            }
        },

        /**
         * Wrap the given blocks in code containers
         * @param {List<Nodes>} value.toWrap
         */
        normalize(transform, node, value) {
            return value.toWrap.reduce((tr, n) => {
                return tr.wrapBlockByKey(n.key, opts.containerType);
            }, transform);
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
            } else {
                return null;
            }
        },

        normalize(transform, node, { toWrap, toRemove }) {
            toRemove.forEach(child => {
                transform.removeNodeByKey(child.key);
            });

            toWrap.forEach(child => {
                transform.wrapBlockByKey(child.key, opts.lineType);
            });

            // Also remove marks here (since the no mark rule for
            // lines will not be applied afterward).
            return applyRule(noMarks(opts), transform, node.key);
        }
    };
}

/**
 * @return {Object} A rule that ensure code lines only contain one text
 * node.
 */
function onlyText(opts) {
    return {
        match: (node) => node.type === opts.lineType,

        validate(node) {
            const { nodes } = node;

            if (nodes.size === 1 && nodes.first().kind === 'text') {
                // There is a single text node -> valid
                return null;
            }

            const invalids = nodes.filterNot(n => n.kind === 'text');

            return {
                invalids,
                add: invalids.size == nodes.size ? [Slate.Text.create()] : []
            };
        },

        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize(transform, node, {invalids = [], add = []}) {
            // Remove invalids
            transform = invalids.reduce((t, child) => {
                return t.removeNodeByKey(child.key, { normalize: false });
            }, transform);

            transform = add.reduce((t, child) => {
                return t.insertNodeByKey(node.key, 0, child);
            }, transform);

            return transform;
        }
    };
}

/**
 * @return {Object} A rule that ensure code blocks contains no marks
 */
function noMarks(opts) {
    return {
        // Match at the line level, to optimize memoization
        match: (node) => node.type === opts.lineType,

        validate(node) {
            const marks = getMarks(node);

            if (marks.isEmpty()) {
                return null;
            } else {
                return {
                    removeMarks: marks
                };
            }
        },

        /**
         * Removes the given marks
         * @param {Set<Marks>} value.removeMarks
         */
        normalize(transform, node, { removeMarks }) {
            const selection = transform.state.selection;
            const range = selection.moveToRangeOf(node);

            return removeMarks.reduce(
                (tr, mark) => tr.removeMarkAtRange(range, mark),
                transform
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
        (all, text) => {
            return text.characters.reduce(
                (accu, chars) => accu.union(chars.marks),
                all
            );
        },
        new Set()
    );

    return marks;
}

/**
 * Apply a normalization rule to a node
 * @param {Rule} rule
 * @param {Transform} transform
 * @param {String} key
 * @return {Transform}
 */
function applyRule(rule, transform, key) {
    const node = transform.state.document.getDescendant(key);
    const notValid = rule.validate(node);
    if (notValid) {
        rule.normalize(transform, node, notValid);
    }

    return transform;
}

module.exports = makeSchema;
