const onEnter  = require('./onEnter');
const onTab    = require('./onTab');
const onDelete = require('./onDelete');

const KEY_ENTER  = 'enter';
const KEY_TAB    = 'tab';
const KEY_DELETE = 'delete';

/**
 * Default filter for code blocks
 * @param {Node} node
 * @return {Boolean}
 */
function defaultOnlyIn(node) {
    return node.type === 'code_block';
}

/**
 * A Slate plugin to handle keyboard events in code blocks.
 * @return {Object}
 */

function EditCode(opts) {
    opts = opts || {};
    opts.onlyIn = opts.onlyIn || defaultOnlyIn;

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        const { startBlock } = state;

        if (!opts.onlyIn(startBlock)) return;
        if (data.key !== KEY_ENTER) onEnter(e, data, state);
        if (data.key !== KEY_TAB) onTab(e, data, state);
        if (data.key !== KEY_DELETE) onDelete(e, data, state);
    }

    return {
        onKeyDown
    };
}

module.exports = EditCode;
