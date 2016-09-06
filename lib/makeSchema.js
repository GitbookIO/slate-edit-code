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
            onlyText(opts.onlyIn),
            noMarks(opts.onlyIn)
        ]
    };
}

/**
 * @param {Function} onlyIn Filter for code blocks
 * @return {Object} A rule that ensure code blocks only contain text
 * nodes.
 */
function onlyText(onlyIn) {
    return {
        match: onlyIn,

        validate (node) {
            const texts = node.nodes.filter(n => n.kind === 'text');

            if (node.nodes.isEmpty() || texts.isEmpty()) {
                // No text nodes, put one
                return {
                    nodes: [new Slate.Text()]
                };
            } else if (node.nodes.size === 1) {
                // There is a single text node -> valid
                return null;
            } else {
                // Keep only the text nodes
                return {
                    nodes: texts
                };
            }
        },

        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize (transform, node, value) {
            return transform.setNodeByKey(node.key, {
                nodes: value.nodes
            });
        }
    };
}

/**
 * @param {Function} onlyIn Filter for code blocks
 * @return {Object} A rule that ensure code blocks contains no marks
 */
function noMarks(onlyIn) {
    return {
        match: onlyIn,

        validate (node) {
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
        normalize (transform, node, value) {
            const selection = transform.state.selection;
            const range = selection.moveToRangeOf(node);

            return value.removeMarks.reduce(
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
        function (marks, text) {
            return text.characters.reduce(
                (marks, chars) => marks.union(chars.marks),
                marks
            );
        },
        new Set()
    );

    return marks;
}

module.exports = makeSchema;
