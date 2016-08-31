const { Set } = require('immutable');

const EMPTY_TEXT = {
    kind: 'text'
};

/**
 * Create a schema for code blocks.
 * @param {Object} opts
 * @param {Function} opts.onlyIn Filter for code blocks
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
                return {
                    nodes: [EMPTY_TEXT]
                };
            } else if (node.nodes.size === 1) {
                // There is a single text node -> valid
                return null;
            } else {
                // Keep only the text nodes
                return {
                    nodes: [texts]
                };
            }
        },

        normalize: normalizeChildren
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

        normalize: normalizeChildren
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

/**
 * Rule normalization that replaces the node's children
 * @param {List<Nodes>} nodes
 */
function normalizeChildren(transform, node, nodes) {
    return transform.setNodeByKey(node.key, {
        nodes
    });
}

module.exports = makeSchema;
