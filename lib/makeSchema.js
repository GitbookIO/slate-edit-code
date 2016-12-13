const { Set } = require('immutable');
const Slate = require('slate');

/**
 * Create a schema for code blocks.
 * @param {Object} opts
 * @param {Function} opts.onlyIn Filter for code blocks
 * @return {Object} A schema definition with normalization rules
 */
function makeSchema(opts) {
    return {
        rules: [
            noMarks(opts),
            onlyLine(opts),
            onlyText(opts)
        ]
    };
}

/**
 * @return {Object} A rule that ensure code blocks only contain lines of code, and no marks
 */
function onlyLine(opts) {
    return {
        match: opts.onlyIn,

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
            const noMarksRule = noMarks(opts);
            const newNode = transform.state.document.getNode(node.key);
            const notValid = noMarksRule.validate(newNode);
            if (notValid) {
                noMarksRule.normalize(transform, newNode, notValid);
            }

            return transform;
        }
    };
}

/**
 * @return {Object} A rule that ensure code blocks only contain text
 * nodes.
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

module.exports = makeSchema;
